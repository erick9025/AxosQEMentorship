import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/pom/sauceLogInPage.js';
import { InventoryPage } from '../pom/pom/sauceInventoryPage';

const testData: { generalPassword: string; users: string[] } = require('../users/usersGera.json');

test.describe('Homework October 16, Weekly Challenge', () => {
  
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Start Page loads correctly', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(page).toHaveTitle(/Swag Labs/);
    await loginPage.validateLoginBoxVisible();
  });

  test('Is the page showing the expected elements?', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.validateFormElementsVisible();
  });

  testData.users.forEach((username) => {
    test(`Login validation workflow for: ${username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      const { duration } = await loginPage.loginAndValidate(username, testData.generalPassword);
      
      if (username !== 'locked_out_user') {
        await inventoryPage.validateInventoryBehavior(username, duration);
      }
    });
  });

});
