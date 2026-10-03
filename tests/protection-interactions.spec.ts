import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

test('shield separation is keyboard operable and selecting the actual sculpture changes the topic', async ({
  page,
}) => {
  await page.goto('/');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.shield-render')).toHaveAttribute('data-ready', 'true', {
    timeout: 20000,
  });
  const slider = page.getByRole('slider', { name: 'Explore the layers' });
  await slider.focus();
  await page.keyboard.press('End');
  await expect(slider).toHaveValue('100');
  await expect(slider).toHaveAttribute('aria-valuetext', '100% separated');
  const art = page.locator('.shield-render');
  await art.scrollIntoViewIfNeeded();
  const box = (await art.boundingBox())!;
  // The centre shield at full separation represents income.
  await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.46);
  await expect(page.getByRole('button', { name: 'Your income', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.locator('.chapter-detail')).toContainText('Recovery needs breathing room.');
  await slider.focus();
  await page.keyboard.press('Home');
  await expect(slider).toHaveValue('0');
});

test('life chapters persist as a third option and all stages hand off the matching enquiry', async ({
  page,
}) => {
  await page.goto('/?source=preview');
  await page.getByRole('button', { name: 'Life chapters', exact: true }).click();
  await expect(page).toHaveURL(/source=preview&hero=chapters/);
  await page.reload();
  await expect(page.getByRole('button', { name: 'Life chapters', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  for (const [name, topic] of [
    ['Starting out', 'Medical protection'],
    ['Growing a family', 'Life & family'],
    ['A new chapter', 'Policy review'],
  ]) {
    const button = page
      .getByRole('group', { name: 'Choose your life chapter' })
      .getByRole('button', { name });
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await page.getByRole('link', { name: 'Plan for this chapter' }).click();
    await expect(
      page.getByRole('combobox', { name: 'What would you like to talk about?' }),
    ).toHaveValue(topic);
  }
  await page.getByRole('button', { name: 'Sculpture', exact: true }).click();
  await expect(page).toHaveURL(/source=preview#contact/);
  await expect(page.locator('.shield-render')).toHaveAttribute('data-ready', 'true', {
    timeout: 20000,
  });
});

for (const width of [375, 768, 1440]) {
  test(`four protection cards animate without cutting through the selected card at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/?hero=portrait');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    const art = page.locator('.protection-art');
    const cards = page.locator('.protection-layer');
    await expect(cards).toHaveCount(4);
    for (const name of [
      'Critical illness',
      'Life & family',
      'Policy review',
      'Medical protection',
    ]) {
      await page.getByRole('tab', { name, exact: true }).click();
      await art.scrollIntoViewIfNeeded();
      await art.hover();
      await expect(page.locator('.protection-layer[data-active="true"]')).toHaveCount(1);
      // Inspect the real hit-tested paint order during and after the transition.
      for (const delay of [80, 200, 650]) {
        await page.waitForTimeout(delay);
        const uncovered = await page
          .locator('.protection-layer[data-active="true"]')
          .evaluate((el) => {
            const box = el.getBoundingClientRect();
            return [
              [0.4, 0.4],
              [0.6, 0.4],
              [0.4, 0.6],
              [0.6, 0.6],
              [0.5, 0.75],
            ].every(([x, y]) => {
              const top = document.elementFromPoint(box.x + box.width * x, box.y + box.height * y);
              return top === el || (top !== null && el.contains(top));
            });
          });
        expect(uncovered).toBe(true);
      }
    }
    // Fast repeated choices finish at the last selected card without stale state.
    await page.getByRole('tab', { name: 'Critical illness', exact: true }).click();
    await page.getByRole('tab', { name: 'Policy review', exact: true }).click();
    await page.getByRole('tab', { name: 'Life & family', exact: true }).click();
    await expect(page.locator('.protection-layer[data-active="true"]')).toContainText(
      'Your people',
    );
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await art.scrollIntoViewIfNeeded();
    await art.evaluate((el) => {
      const box = el.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + box.top - (innerHeight - box.height) / 2,
        behavior: 'instant',
      });
    });
    await mkdir('.impeccable/review', { recursive: true });
    await art.screenshot({ path: `.impeccable/review/protection-fixed-${width}.png` });
  });
}
