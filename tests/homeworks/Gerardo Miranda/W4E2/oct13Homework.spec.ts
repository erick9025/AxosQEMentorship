import { test, expect } from '@playwright/test';
import testData from './usersGera.json';

// Homework October 13, Data Driven Testing
test.describe('Homework October 13, Data Driven Testing', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
  });

  test('Start Page loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Swag Labs/);
    
    const loginBox = page.locator('#login_button_container');
    await expect(loginBox).toBeVisible();
  });

  test('Is the page showing the expected elements?', async ({ page }) => {
    await expect(page.locator('[id="user-name"]')).toBeVisible();
    await expect(page.locator('[id="password"]')).toBeVisible();
    await expect(page.locator('[id="login-button"]')).toBeVisible();
  });

  testData.users.forEach((username) => {
    
    test(`Login and validate successful login for: ${username}`, async ({ page }) => {
      //Normal Users Login validation
      await page.locator('[id="user-name"]').fill(username);
      await page.locator('[id="password"]').fill(testData.generalPassword);
      await page.locator('[id="login-button"]').click();
      
      // Locked out user validation
      if (username === 'locked_out_user') {
        const errorContainer = page.locator('[data-test="error"]');
        await expect(errorContainer).toBeVisible();
        await expect(errorContainer).toContainText('locked out');
      } else {
        // Validate that the inventory page loaded correctly for standard users
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.locator('[class="product_sort_container"]')).toBeVisible();   
        await expect(page.locator('[class="title"]')).toHaveText('Products');
      }
    });

  });

});
