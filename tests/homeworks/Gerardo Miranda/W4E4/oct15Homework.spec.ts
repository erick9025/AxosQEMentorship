import { test, expect } from '@playwright/test';
import {SaucePage} from '../pom/pom/sauceLogInPage.js';
import testData from '../users/usersGera.json';

// Homework October 15, Page Object Model
test.describe('Homework October 15, Page Object Model', () => {
  let saucePage: SaucePage;

  test.beforeEach(async ({ page }) => {
    saucePage = new SaucePage(page);
    await saucePage.navigate();
  });

  test('Start Page loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(saucePage.loginBox).toBeVisible();
  });

  test('Is the page showing the expected elements?', async () => {
    await expect(saucePage.usernameInput).toBeVisible();
    await expect(saucePage.passwordInput).toBeVisible();
    await expect(saucePage.loginButton).toBeVisible();
  });

  testData.users.forEach((username) => {
    
    test(`Login and validate successful login for: ${username}`, async ({ page }) => {
      // Normal Users Login validation using the page object method
      await saucePage.login(username, testData.generalPassword);
      
      // Locked out user validation
      if (username === 'locked_out_user') {
        await expect(saucePage.errorContainer).toBeVisible();
        await expect(saucePage.errorContainer).toContainText('locked out');
      } else {
        // Validate that the inventory page loaded correctly for standard users
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(saucePage.productSortContainer).toBeVisible();   
        await expect(saucePage.pageTitle).toHaveText('Products');
      }
    });

  });

});
