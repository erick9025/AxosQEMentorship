


import { test, expect } from '@playwright/test';

test('Escribir and Click Actions', async ({ page }) => {
  await page.goto('https://support.saucelabs.com/s/login/?language=en_US');

  await page.locator('label.uiLabel-left.form-element__label.uiLabel').fill('User12345');
  await page.locator("#input-6").fill('Password12345');
  await page.waitForTimeout(5000);
  
  await page.locator("button:has-text('Log in')").click()
  await page.waitForTimeout(5000);
});













