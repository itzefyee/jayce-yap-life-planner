import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const label = process.argv[2] === 'before' ? 'before' : 'after';
const browser = await chromium.launch({ channel: 'chrome' });
const results = [];
try {
  for (const width of [390, 1440]) {
    for (const hero of ['sculpture', 'portrait', 'chapters']) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('response', (response) => {
        if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
      });
      await page.addInitScript(() => {
        window.__audit = { lcp: 0, cls: 0, events: [], longTasks: [] };
        new PerformanceObserver((list) => {
          for (const e of list.getEntries()) window.__audit.lcp = e.startTime;
        }).observe({ type: 'largest-contentful-paint', buffered: true });
        new PerformanceObserver((list) => {
          for (const e of list.getEntries()) if (!e.hadRecentInput) window.__audit.cls += e.value;
        }).observe({ type: 'layout-shift', buffered: true });
        new PerformanceObserver((list) => {
          for (const e of list.getEntries())
            if (e.interactionId)
              window.__audit.events.push({
                name: e.name,
                duration: e.duration,
                interactionId: e.interactionId,
              });
        }).observe({ type: 'event', buffered: true, durationThreshold: 16 });
        new PerformanceObserver((list) => {
          for (const e of list.getEntries()) window.__audit.longTasks.push(e.duration);
        }).observe({ type: 'longtask', buffered: true });
      });
      const cdp = await context.newCDPSession(page);
      await cdp.send('Network.enable');
      await cdp.send('Network.emulateNetworkConditions', {
        offline: false,
        latency: 100,
        downloadThroughput: 500000,
        uploadThroughput: 250000,
      });
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      await page.goto(`http://127.0.0.1:4173/?hero=${hero}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      if (hero === 'sculpture')
        await page.locator('.shield-render[data-ready="true"]').waitFor({ timeout: 30000 });
      await page.waitForTimeout(500);
      const load = await page.evaluate(() => ({
        lcp: window.__audit.lcp,
        cls: window.__audit.cls,
        bytes: performance.getEntriesByType('resource').reduce((sum, e) => sum + e.transferSize, 0),
        startupBlockingMs: window.__audit.longTasks.reduce(
          (sum, duration) => sum + Math.max(0, duration - 50),
          0,
        ),
      }));
      await page.evaluate(() => {
        window.__audit.events = [];
        window.__audit.longTasks = [];
      });
      if (hero === 'sculpture')
        await page.getByRole('button', { name: 'Your income', exact: true }).click();
      if (hero === 'chapters')
        await page.getByRole('button', { name: 'Growing a family', exact: true }).click();
      for (const name of ['Critical illness', 'Life & family', 'Policy review'])
        await page.getByRole('tab', { name, exact: true }).click();
      await page.locator('.journal-card').first().click();
      await page.getByRole('button', { name: 'Close article' }).click();
      await page.locator('.faq-item button').nth(1).click();
      await page.getByRole('textbox', { name: 'Your name' }).fill('Performance Test');
      await page.getByRole('checkbox').check();
      await page.getByRole('button', { name: 'Prepare my conversation' }).click();
      await page.getByRole('button', { name: 'Edit my details' }).click();
      await page.waitForTimeout(300);
      const interaction = await page.evaluate(() => ({
        slowestInteractionMs: Math.max(0, ...window.__audit.events.map((e) => e.duration)),
        measuredEvents: window.__audit.events.length,
        interactionBlockingMs: window.__audit.longTasks.reduce(
          (sum, duration) => sum + Math.max(0, duration - 50),
          0,
        ),
      }));
      results.push({ width, hero, ...load, ...interaction, errors });
      await context.close();
    }
  }
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://127.0.0.1:4173/#contact', { waitUntil: 'networkidle' });
  results.push({
    scenario: 'direct-contact-entry',
    webglLoaded: await page.evaluate(() =>
      performance.getEntriesByType('resource').some((e) => /shield-scene/.test(e.name)),
    ),
    canvasCount: await page.locator('.shield-render canvas').count(),
  });
  await mkdir('.impeccable/review', { recursive: true });
  await writeFile(
    `.impeccable/review/optimization-${label}.json`,
    JSON.stringify(
      {
        conditions:
          'Chrome local production preview; 4x CPU; 100ms latency; 4Mbps; cold contexts. Event Timing is a synthetic interaction sample, not field INP.',
        results,
      },
      null,
      2,
    ),
  );
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
