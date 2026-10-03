import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';

async function finishQuiz(page: Page, interest = 'Unexpected medical bills') {
  await page.getByRole('radio', { name: 'Growing my family', exact: true }).check();
  await page.getByRole('button', { name: 'Next question' }).click();
  await page.getByRole('radio', { name: interest, exact: true }).check();
  await page.getByRole('button', { name: 'Next question' }).click();
  await page.getByRole('radio', { name: 'I have cover, but I’m unsure', exact: true }).check();
  await page.getByRole('button', { name: 'See my starting point' }).click();
}

test('navigation, images, console, and actual contact destinations are sound', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page).toHaveTitle(/Jayce Yap/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Life isconnected.');
  const broken = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((el) => el.getAttribute('href')!)
        .filter((href) => !document.getElementById(href.slice(1))),
    );
  expect(broken).toEqual([]);
  await page.locator('#journal').scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator('img')
        .evaluateAll((images) =>
          images.every(
            (img) => img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
  const destinations = await page
    .locator('a[href*="wa.me"]')
    .evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).href));
  expect(destinations.length).toBeGreaterThanOrEqual(4);
  for (const destination of destinations)
    expect(new URL(destination).pathname).toBe('/60146113822');
  expect(errors).toEqual([]);
});

test('coverage tabs support keyboard interaction and pass selected topic to booking', async ({
  page,
}) => {
  await page.goto('/');
  const medical = page.getByRole('tab', { name: 'Medical protection' });
  await medical.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Critical illness' })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('Space to recover.');
  await page.keyboard.press('End');
  await expect(page.getByRole('tab', { name: 'Policy review' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await page.getByRole('link', { name: 'Let’s talk about your policies' }).click();
  await expect(
    page.getByRole('combobox', { name: 'What would you like to talk about?' }),
  ).toHaveValue('Policy review');
});

for (const [interest, result] of [
  ['Unexpected medical bills', 'medical protection'],
  ['Income during recovery', 'critical illness'],
  ['People who depend on me', 'life & family'],
  ['Making sense of my policies', 'policy review'],
]) {
  test(`planning check maps ${interest} and can restart`, async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Next question' })).toBeDisabled();
    await finishQuiz(page, interest);
    await expect(page.locator('.quiz-result h3')).toContainText(result);
    await page.getByRole('link', { name: 'Bring this to our conversation' }).click();
    await expect(page.locator('.attached-summary')).toContainText(
      'Your planning check is included',
    );
    await page.getByRole('button', { name: 'Start again' }).click();
    await expect(page.getByRole('button', { name: 'Next question' })).toBeDisabled();
  });
}

test('full consultation flow validates input, preserves edits, and prepares the correct WhatsApp draft', async ({
  page,
}) => {
  await page.goto('/');
  await finishQuiz(page, 'People who depend on me');
  await page.getByRole('link', { name: 'Bring this to our conversation' }).click();
  await page.getByRole('button', { name: 'Prepare my conversation' }).click();
  await expect(page.locator('.booking-review')).toHaveCount(0);
  await page.getByRole('textbox', { name: 'Your name' }).fill('  ');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Prepare my conversation' }).click();
  await expect(page.getByRole('alert')).toContainText('at least two characters');
  await page.getByRole('textbox', { name: 'Your name' }).fill('Aisha Tan');
  await page.getByRole('radio', { name: 'Phone call', exact: true }).check();
  await page.getByRole('combobox', { name: 'Time of day' }).selectOption('Evening');
  await page.getByRole('button', { name: 'Prepare my conversation' }).click();
  const destination = new URL(
    (await page.getByRole('link', { name: 'Continue on WhatsApp' }).getAttribute('href'))!,
  );
  expect(destination.hostname).toBe('wa.me');
  expect(destination.pathname).toBe('/60146113822');
  const text = destination.searchParams.get('text')!;
  expect(text).toContain("I'm Aisha Tan");
  expect(text).toContain('life & family');
  expect(text).toContain('Phone call');
  expect(text).toContain('Evening (Malaysia time)');
  expect(text).toContain('My planning check: Growing my family');
  expect(text).toContain('subject to confirmation');
  await page.route('https://wa.me/**', (route) =>
    route.fulfill({
      body: '<html><body>WhatsApp test destination</body></html>',
      contentType: 'text/html',
    }),
  );
  await page.context().route('https://wa.me/**', (route) =>
    route.fulfill({
      body: '<html><body>WhatsApp test destination</body></html>',
      contentType: 'text/html',
    }),
  );
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Continue on WhatsApp' }).click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL(destination.toString());
  await popup.close();
  await expect(page.getByRole('status')).toContainText('not confirmed until Jayce replies');
  await page.getByRole('button', { name: 'Edit my details' }).click();
  await expect(page.getByRole('textbox', { name: 'Your name' })).toHaveValue('Aisha Tan');
  await expect(page.getByRole('radio', { name: 'Phone call', exact: true })).toBeChecked();
  await expect(page.getByRole('checkbox')).toBeChecked();
  expect(
    await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length })),
  ).toEqual({ local: 0, session: 0 });
});

test('past appointment dates are rejected', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Your name' }).fill('Aisha Tan');
  await page.getByRole('checkbox').check();
  await page.getByLabel('Preferred date (optional)').fill('2020-01-01');
  await page.getByRole('button', { name: 'Prepare my conversation' }).click();
  await expect(page.locator('.booking-review')).toHaveCount(0);
  expect(
    await page
      .getByLabel('Preferred date (optional)')
      .evaluate((el: HTMLInputElement) => el.validity.rangeUnderflow),
  ).toBe(true);
});

test('journal, FAQs, and privacy have working open, close, and keyboard states', async ({
  page,
}) => {
  await page.goto('/');
  for (let i = 0; i < 3; i++) {
    await page.locator('.journal-card').nth(i).click();
    await expect(page.locator('.article-detail')).toBeVisible();
    await expect(page.locator('.article-detail')).toBeFocused();
    await page.getByRole('button', { name: 'Close article' }).click();
    await expect(page.locator('.journal-card').nth(i)).toBeFocused();
  }
  for (const faq of await page.locator('.faq-item button').all()) {
    if ((await faq.getAttribute('aria-expanded')) !== 'true') await faq.click();
    await expect(faq).toHaveAttribute('aria-expanded', 'true');
    await faq.click();
    await expect(faq).toHaveAttribute('aria-expanded', 'false');
  }
  await page.getByRole('button', { name: 'Privacy & your information' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Privacy & your information' })).toBeFocused();
});

test('opening a journal note on mobile brings it into view and closing restores the card', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('.journal-card').first().click();
  await expect(page.locator('.article-detail h3')).toBeInViewport();
  await page.getByRole('button', { name: 'Close article' }).click();
  await expect(page.locator('.journal-card').first()).toBeInViewport();
});

test('mobile menu closes after navigation and with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.getByRole('navigation').getByRole('link', { name: 'Your protection' }).click();
  await expect(page.getByRole('navigation')).not.toBeVisible();
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
  await expect(page.getByRole('navigation')).not.toBeVisible();
});

for (const width of [375, 768, 1440]) {
  test(`responsive layout and automated accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    for (const img of await page.locator('img').all()) await img.scrollIntoViewIfNeeded();
    await page.evaluate(() => scrollTo(0, 0));
    await expect
      .poll(() =>
        page
          .locator('img')
          .evaluateAll((images) =>
            images.every(
              (img) => img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0,
            ),
          ),
      )
      .toBe(true);
    const overflow = await page.evaluate(() => ({
      doc: document.documentElement.scrollWidth,
      viewport: innerWidth,
    }));
    expect(overflow.doc).toBeLessThanOrEqual(overflow.viewport);
    if (process.env.REVIEW_CAPTURE !== '0') {
      await mkdir('.impeccable/review', { recursive: true });
      await page.screenshot({
        path: `.impeccable/review/${width === 1440 ? 'desktop' : width === 375 ? 'mobile' : 'tablet'}.png`,
        fullPage: true,
      });
      if (width === 1440 || width === 375)
        await page.screenshot({ path: `.impeccable/review/hero-${width}.png` });
    }
    const audit = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'])
      .analyze();
    expect(
      audit.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({ html: n.html, failure: n.failureSummary })),
      })),
    ).toEqual([]);
  });
}
