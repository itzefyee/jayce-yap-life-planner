import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const label = process.argv[2] === 'before' ? 'before' : 'after';
const movingPointer = process.argv.includes('--pointer');
const browser = await chromium.launch({ channel: 'chrome' });
const results = [];
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    await page.addInitScript(() => {
      window.__draws = 0;
      for (const name of ['drawElements', 'drawArrays']) {
        const original = WebGL2RenderingContext.prototype[name];
        WebGL2RenderingContext.prototype[name] = function (...args) {
          window.__draws++;
          return original.apply(this, args);
        };
      }
    });
    await page.goto('http://127.0.0.1:4173/');
    await page.locator('.shield-render[data-ready="true"]').waitFor({ timeout: 60000 });
    await page.locator('.shield-render').scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    const measurement = await page.evaluate(async (movingPointer) => {
      const canvas = document.querySelector('.shield-render canvas');
      const surface = canvas.parentElement;
      const bounds = surface.getBoundingClientRect();
      const gl = canvas.getContext('webgl2');
      const debug = gl.getExtension('WEBGL_debug_renderer_info');
      const info = {
        renderer: debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : 'Unavailable',
        canvas: [canvas.width, canvas.height],
      };
      const samples = [];
      let previousDraws = window.__draws;
      let lastPaint = 0;
      const start = performance.now();
      const initialDraws = window.__draws;
      await new Promise((resolve) => {
        function frame(t) {
          if (movingPointer)
            surface.dispatchEvent(
              new PointerEvent('pointermove', {
                bubbles: true,
                pointerType: 'mouse',
                clientX: bounds.left + bounds.width * (0.5 + Math.sin(t / 500) * 0.4),
                clientY: bounds.top + bounds.height * (0.5 + Math.cos(t / 700) * 0.3),
              }),
            );
          if (window.__draws > previousDraws) {
            if (lastPaint) samples.push(t - lastPaint);
            lastPaint = t;
            previousDraws = window.__draws;
          }
          if (t - start < 5000) requestAnimationFrame(frame);
          else resolve();
        }
        requestAnimationFrame(frame);
      });
      const elapsed = performance.now() - start;
      const sorted = [...samples].sort((a, b) => a - b);
      return {
        ...info,
        renderedFps: Number((samples.length / (elapsed / 1000)).toFixed(1)),
        medianFrameMs: Number((sorted[Math.floor(sorted.length * 0.5)] ?? 0).toFixed(1)),
        p95FrameMs: Number((sorted[Math.floor(sorted.length * 0.95)] ?? 0).toFixed(1)),
        slowFramesOver40ms: samples.filter((t) => t > 40).length,
        drawCallsPerFrame: Math.round((window.__draws - initialDraws) / (samples.length + 1)),
      };
    }, movingPointer);
    results.push({ width, ...measurement });
    await page.close();
  }
  await mkdir('.impeccable/review', { recursive: true });
  await writeFile(
    `.impeccable/review/sculpture-${label}${movingPointer ? '-pointer' : ''}.json`,
    JSON.stringify(results, null, 2),
  );
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
