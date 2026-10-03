import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { PNG } from 'pngjs';

declare global {
  interface Window {
    __draws: number;
  }
}

test('direct enquiry entry defers the graphics download until the visitor returns to the hero', async ({
  page,
}) => {
  const sceneRequests: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('shield-scene')) sceneRequests.push(request.url());
  });
  await page.goto('/#contact');
  await expect(page.locator('#contact')).toBeInViewport();
  await page.waitForTimeout(500);
  expect(sceneRequests).toEqual([]);
  await expect(page.locator('.shield-render canvas')).toHaveCount(0);
  await page.locator('#home').scrollIntoViewIfNeeded();
  await expect(page.locator('.shield-render')).toHaveAttribute('data-ready', 'true', {
    timeout: 20000,
  });
  expect(sceneRequests.length).toBeGreaterThan(0);
});

test('graphics stop drawing when paused, offscreen, or unmounted and resume when visible', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const state = window as Window & { __draws: number };
    state.__draws = 0;
    for (const method of ['drawElements', 'drawArrays'] as const) {
      const original = WebGL2RenderingContext.prototype[method];
      WebGL2RenderingContext.prototype[method] = function (...args: number[]) {
        state.__draws++;
        return Reflect.apply(original, this, args);
      };
    }
  });
  const draws = () => page.evaluate(() => (window as Window & { __draws: number }).__draws);
  await page.goto('/');
  await expect(page.locator('.shield-render')).toHaveAttribute('data-ready', 'true', {
    timeout: 20000,
  });
  // Compare against browser frames, so this also works on 60/120Hz and slower CI hosts.
  // A 30fps gate skips most callbacks on a fast display and fails this regression.
  const paintedFrameRatio = await page.evaluate(async () => {
    let previous = window.__draws;
    let painted = 0;
    for (let frame = 0; frame < 30; frame++) {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      if (window.__draws > previous) painted++;
      previous = window.__draws;
    }
    return painted / 30;
  });
  expect(paintedFrameRatio).toBeGreaterThan(0.9);
  await page.getByRole('button', { name: 'Pause sculpture motion' }).click();
  await page.waitForTimeout(150);
  const paused = await draws();
  await page.waitForTimeout(250);
  expect(await draws()).toBe(paused);
  await page.getByRole('button', { name: 'Play sculpture motion' }).click();
  await expect.poll(draws).toBeGreaterThan(paused);
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  const hidden = await draws();
  await page.waitForTimeout(250);
  expect(await draws()).toBe(hidden);
  await page.locator('#home').scrollIntoViewIfNeeded();
  await expect.poll(draws).toBeGreaterThan(hidden);
  await page.getByRole('button', { name: 'Portrait', exact: true }).click();
  await expect(page.locator('.shield-render canvas')).toHaveCount(0);
  const disposed = await draws();
  await page.waitForTimeout(250);
  expect(await draws()).toBe(disposed);
});

test('graphics recover their actual rendered appearance after context loss', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const canvas = page.locator('.shield-render canvas');
  await expect(page.locator('.shield-render')).toHaveAttribute('data-ready', 'true', {
    timeout: 20000,
  });
  await mkdir('.impeccable/review', { recursive: true });
  const before = await canvas.screenshot({ path: '.impeccable/review/graphics-before-loss.png' });
  await canvas.evaluate((el) => {
    const gl = (el as HTMLCanvasElement).getContext('webgl2')!;
    const extension = gl.getExtension('WEBGL_lose_context')!;
    extension.loseContext();
    setTimeout(() => extension.restoreContext(), 300);
  });
  await expect(page.locator('.shield-render')).toHaveAttribute('data-ready', 'false');
  await expect(page.locator('.shield-render')).toHaveAttribute('data-ready', 'true', {
    timeout: 20000,
  });
  const restored = await canvas.screenshot({
    path: '.impeccable/review/graphics-after-restore.png',
  });
  const a = PNG.sync.read(before);
  const b = PNG.sync.read(restored);
  expect([b.width, b.height]).toEqual([a.width, a.height]);
  // Permit subpixel GPU differences, while catching the visibly dark, unlit recovery defect.
  let difference = 0;
  for (let index = 0; index < a.data.length; index++)
    difference += Math.abs(a.data[index] - b.data[index]);
  expect(difference / a.data.length).toBeLessThan(0.5);
});
