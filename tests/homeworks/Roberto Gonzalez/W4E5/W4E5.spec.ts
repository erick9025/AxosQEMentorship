import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
test.use({ launchOptions: { slowMo: 500 } });

const testData: {
  password: string;
  users: { username: string; shouldLogin: boolean }[];
} = require('./Users.json');

test.describe('Inicio de sesión en SauceDemo con distintos usuarios', () => {
  for (const user of testData.users) {
    test(`Inicio de sesión para ${user.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(user.username, testData.password);

      if (user.shouldLogin) {
        await expect(loginPage.productsHeading).toBeVisible();

        if (user.username === 'standard_user') {
          await expect(loginPage.standardUserImage).toBeVisible();
        }

        if (user.username === 'visual_user') {
          await expect(loginPage.visualUserImage).toBeVisible();
        }
      } else {
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
      }
    });
  }
});
