import { test, expect } from '@playwright/test';

test('SauceDemo login flow with actions and wait', async ({ page }) => {
  // Navigate
  await page.goto('https://www.saucedemo.com/');

  // 1. Fill test username
  await page.locator('#user-name').fill('standard_user');

  // 2. Fill test password
  await page.locator('#password').fill('secret_sauce');

  // 3. Click the login button
  await page.locator('#login-button').click();

  // Wait 5 seconds (5000 ms)
  await page.waitForTimeout(5000);

  // Verify successful login
  await expect(page).toHaveURL(/.*inventory.html/);
});