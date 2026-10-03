import { test, expect } from '@playwright/test';

test('opening mobile navigation with the keyboard reaches its links immediately', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/?hero=portrait');
  await page.getByRole('button', { name: 'Open menu' }).focus();
  await page.keyboard.press('Enter');
  await expect(
    page.getByRole('navigation').getByRole('link', { name: 'Meet Jayce' }),
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
});

test('browser Back keeps the displayed hero in sync with its URL', async ({ page }) => {
  await page.goto('/?hero=portrait');
  await page.getByRole('navigation').getByRole('link', { name: 'Meet Jayce' }).click();
  await page.getByRole('button', { name: 'Sculpture', exact: true }).click();
  await page.goBack();
  await expect(page).toHaveURL(/hero=portrait$/);
  await expect(page.getByRole('button', { name: 'Portrait', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

test('editing a prepared enquiry restores keyboard focus to the form', async ({ page }) => {
  await page.goto('/?hero=portrait#contact');
  await page.getByRole('textbox', { name: 'Your name' }).fill('Test Visitor');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Prepare my conversation' }).click();
  await page.getByRole('button', { name: 'Edit my details' }).click();
  await expect(page.getByRole('textbox', { name: 'Your name' })).toBeFocused();
});

test('privacy dialog stays open when clicking its internal padding', async ({ page }) => {
  await page.goto('/?hero=portrait');
  await page.getByRole('button', { name: 'Privacy & your information' }).click();
  const box = (await page.getByRole('dialog').boundingBox())!;
  await page.mouse.click(box.x + 12, box.y + box.height / 2);
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.mouse.click(4, 4);
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

test('mobile menu dismisses on outside interaction and resets across desktop resizing', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/?hero=portrait');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.mouse.click(20, 700);
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});

test('restarting the planning check clears the old attached answers', async ({ page }) => {
  await page.goto('/?hero=portrait');
  await page.getByRole('radio', { name: 'Growing my family', exact: true }).check();
  await page.getByRole('button', { name: 'Next question' }).click();
  await page.getByRole('radio', { name: 'Unexpected medical bills', exact: true }).check();
  await page.getByRole('button', { name: 'Next question' }).click();
  await page.getByRole('radio', { name: 'I have cover, but I’m unsure', exact: true }).check();
  await page.getByRole('button', { name: 'See my starting point' }).click();
  await page.getByRole('link', { name: 'Bring this to our conversation' }).click();
  await expect(page.locator('.attached-summary')).toBeVisible();
  await page.getByRole('textbox', { name: 'Your name' }).fill('Test Visitor');
  await page.getByRole('button', { name: 'Remove check-in' }).click();
  await expect(page.locator('.attached-summary')).toHaveCount(0);
  await expect(page.getByRole('textbox', { name: 'Your name' })).toHaveValue('Test Visitor');
  await expect(
    page.getByRole('combobox', { name: 'What would you like to talk about?' }),
  ).toHaveValue('Medical protection');
  await page.getByRole('link', { name: 'Bring this to our conversation' }).click();
  await expect(page.locator('.attached-summary')).toBeVisible();
  await page.getByRole('button', { name: 'Start again' }).click();
  await expect(page.locator('.attached-summary')).toHaveCount(0);
});
