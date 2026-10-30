import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/pom/sauceLogInPage';
import { InventoryPage } from '../pom/pom/sauceInventoryPage';
const testData = require('../users/usersGera.json');

test.describe('Homework October 29, Trace Viewer', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
  });

  test.describe('Login Page Initial State', () => {
    test('Start Page loads correctly', async ({ page }) => {
      await expect(page).toHaveTitle(/Suag Laboratoriosssssss/);
      await loginPage.validateLoginBoxVisible();
    });

    test('Is the page showing the expected elements?', async () => {
      await loginPage.validateFormElementsVisible();
    });
  });

  test('Inventory loads with mocked product images', async ({ page }) => {
    let interceptedImageCount = 0;

    await page.route('**/*', async (route) => {
      if (route.request().resourceType() !== 'image') {
        await route.continue();
        return;
      }

      interceptedImageCount += 1;
      await route.fulfill({
        status: 200,
        contentType: 'image/svg+xml',
        body: '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>',
      });
    });

    await loginPage.login('standard_user', testData.generalPassword);
    await inventoryPage.validatePageLoaded();
    expect(interceptedImageCount).toBeGreaterThan(0);
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
