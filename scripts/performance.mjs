import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const browser = await chromium.launch({ channel: 'chrome' });
const results = [];
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('response', (response) => {
      if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
    });
    await page.addInitScript(() => {
      window.__metrics = { lcp: 0, cls: 0 };
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) window.__metrics.lcp = entry.startTime;
      }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries())
          if (!entry.hadRecentInput) window.__metrics.cls += entry.value;
      }).observe({ type: 'layout-shift', buffered: true });
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
    await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    const metrics = await page.evaluate(() => ({
      ...window.__metrics,
      transferredBytes: performance
        .getEntriesByType('resource')
        .reduce((sum, entry) => sum + entry.transferSize, 0),
    }));
    results.push({
      viewport: width,
      conditions:
        'Local production preview; 4x CPU slowdown, 100ms latency, 4Mbps download; cold browser context',
      ...metrics,
      errors,
    });
    await context.close();
  }
  await mkdir('.impeccable/review', { recursive: true });
  await writeFile('.impeccable/review/performance.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
