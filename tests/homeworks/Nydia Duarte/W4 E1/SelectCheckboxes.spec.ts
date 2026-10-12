import { test, expect } from '@playwright/test';

test('select dropdown and accept terms', async ({ page }) => {
  await page.goto('https://example.com/form');

  // 1. Select an option from a dropdown (<select>)
  await page.getByLabel('Country').selectOption({ label: 'Mexico' });

  // 2. Check the "Accept terms" checkbox
  const termsCheckbox = page.getByLabel('Aceptar términos');
  await termsCheckbox.check();

  // 3. Verify it is checked
  await expect(termsCheckbox).toBeChecked();
});