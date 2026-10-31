import { test as base, expect } from '@playwright/test';
import { InventoryPage } from '../pom/ui/pages/sauceInventoryPage';
import { LoginPage } from '../pom/ui/pages/sauceLogInPage';
import importedTestData from './test-data/sauceDemoUsers.json';
import { TestUtilities } from '../pom/logging/testUtilities';

export const sauceDemoTestData = importedTestData;

type TestFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  testData: typeof sauceDemoTestData;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use, testInfo) => {
    const loginPage = new LoginPage(page);
    TestUtilities.logToConsole('Opening the Sauce Demo login page', testInfo.title);
    await loginPage.navigate();
    await use(loginPage);
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  testData: async ({}, use) => {
    await use(sauceDemoTestData);
  },
});

export { expect };
