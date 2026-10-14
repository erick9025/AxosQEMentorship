import { test, expect } from '@playwright/test';
import userData from '../data/users.json';

test('Login using credentials loaded from JSON file', async ({ page }) => {
  // Navigate to the practice site
  await page.goto('https://www.saucedemo.com/');

  // Fill credentials from JSON
  await page.locator('[data-test="username"]').fill(userData.username);
  await page.locator('[data-test="password"]').fill(userData.password);
  await page.locator('[data-test="login-button"]').click();

  // Validate successful login
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.title')).toHaveText('Products');
});