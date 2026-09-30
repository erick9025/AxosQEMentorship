import { test } from '@playwright/test';

test('Erick open Facebook and wait 8 seconds', async ({ page }) => {
  await page.goto('https://facebook.com/');

  await page.waitForTimeout(8_000);
});