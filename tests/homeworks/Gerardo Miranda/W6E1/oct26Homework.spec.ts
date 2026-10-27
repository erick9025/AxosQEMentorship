import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/pom/sauceLogInPage';
import { InventoryPage } from '../pom/pom/sauceInventoryPage';
import testData from '../users/usersGera.json';

test.describe('Homework October 16, Weekly Challenge', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
  });

  test.describe('Login Page Initial State', () => {
    test('Start Page loads correctly', async ({ page }) => {
      await expect(page).toHaveTitle(/Swag Labs/);
      await loginPage.validateLoginBoxVisible();
    });

    test('Is the page showing the expected elements?', async () => {
      await loginPage.validateFormElementsVisible();
    });
  });

  test.describe('User Authentication Workflows', () => {
    test.afterEach(async ({ page, context }) => {
      await context.clearCookies();
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
    });

    testData.users.forEach((username: string) => {
      test(`Login validation workflow for: ${username}`, async () => {
        const { duration } = await loginPage.loginAndValidate(username, testData.generalPassword);
        
        if (username !== 'locked_out_user') {
          await inventoryPage.validateInventoryBehavior(username, duration);
        }
      });
    });
  });
});
