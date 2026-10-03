import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';

test('hero styles switch, preserve the original, and survive refresh through the URL', async ({
  page,
}) => {
  await page.goto('/');
  const styles = page.getByRole('group', { name: 'Hero style' });
  await expect(styles.getByRole('button', { name: 'Sculpture', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.locator('#home')).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await styles.getByRole('button', { name: 'Portrait', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('For the lifeyou’re building.');
  await expect(page.locator('.portrait-note')).toContainText('AI illustration');
  await expect(page.locator('.shield-render')).toHaveCount(0);
  await expect(page).toHaveURL(/hero=portrait/);
  await page.reload();
  await expect(styles.getByRole('button', { name: 'Portrait', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await styles.getByRole('button', { name: 'Sculpture', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Life isconnected.');
  await expect(page).not.toHaveURL(/hero=portrait/);
});

test('hero explorer changes explanation and carries the topic into the consultation', async ({
  page,
}) => {
  await page.goto('/');
  const choices = page.getByRole('group', { name: 'Explore what matters to you' });
  await choices.getByRole('button', { name: 'Your income' }).click();
  await expect(page.locator('.chapter-detail')).toContainText('Recovery needs breathing room.');
  await page.getByRole('link', { name: 'Talk about critical illness cover' }).click();
  await expect(
    page.getByRole('combobox', { name: 'What would you like to talk about?' }),
  ).toHaveValue('Critical illness');
  await choices.getByRole('button', { name: 'Your people' }).click();
  await expect(page.locator('.chapter-detail')).toContainText('Their future is part of yours.');
  await page.getByRole('link', { name: 'Plan around my family' }).click();
  await expect(
    page.getByRole('combobox', { name: 'What would you like to talk about?' }),
  ).toHaveValue('Life & family');
  await choices.getByRole('button', { name: 'Your health' }).click();
  await page.getByRole('link', { name: 'Make sense of my medical cover' }).click();
  await expect(
    page.getByRole('combobox', { name: 'What would you like to talk about?' }),
  ).toHaveValue('Medical protection');
});

test('motion can be paused and respects reduced-motion preference', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.shield-render')).toHaveAttribute('data-ready', 'true', {
    timeout: 20000,
  });
  await page.getByRole('button', { name: 'Pause sculpture motion' }).click();
  await expect(page.getByRole('button', { name: 'Play sculpture motion' })).toBeVisible();
  await page.getByRole('button', { name: 'Play sculpture motion' }).click();
  await expect(page.getByRole('button', { name: 'Pause sculpture motion' })).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.motion-control')).toHaveCount(0);
  await expect(page.locator('.connected-actions .button')).toBeVisible();
});

test('hero stays usable if WebGL is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof getContext>
    ) {
      if (String(args[0]).includes('webgl')) return null;
      return getContext.apply(this, args);
    } as typeof getContext;
  });
  await page.goto('/');
  await expect(page.locator('.shield-fallback')).toBeVisible();
  await page.getByRole('button', { name: 'Your people', exact: true }).click();
  await expect(page.locator('.chapter-detail')).toContainText('Their future is part of yours.');
  await page
    .getByRole('group', { name: 'Hero style' })
    .getByRole('button', { name: 'Portrait' })
    .click();
  await expect(page.locator('.portrait')).toBeVisible();
});

for (const width of [375, 768, 1440]) {
  for (const style of ['sculpture', 'portrait', 'chapters']) {
    test(`${style} hero fits and passes accessibility at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(`/?hero=${style}`);
      await page.evaluate(() => document.fonts.ready);
      if (style === 'sculpture')
        await expect(page.locator('.shield-render')).toHaveAttribute('data-ready', 'true', {
          timeout: 20000,
        });
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      const audit = await new AxeBuilder({ page })
        .include('#home')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'])
        .analyze();
      expect(
        audit.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.failureSummary) })),
      ).toEqual([]);
      if (process.env.REVIEW_CAPTURE !== '0') {
        await mkdir('.impeccable/review', { recursive: true });
        await page.screenshot({ path: `.impeccable/review/hero-${style}-${width}.png` });
        const fullHeight = await page
          .locator('#home')
          .evaluate((element) => Math.ceil(element.getBoundingClientRect().height) + 120);
        await page.setViewportSize({ width, height: Math.max(1000, fullHeight) });
        await page.evaluate(() => window.scrollTo(0, 0));
        await page
          .locator('#home')
          .screenshot({ path: `.impeccable/review/hero-${style}-${width}-full.png` });
      }
    });
  }
}
