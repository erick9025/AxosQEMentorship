import { test } from '@playwright/test';

test('has facebook', async ({ page }) => {
  await page.goto('https://facebook.com/');

  await page.waitForTimeout(8_000);
});