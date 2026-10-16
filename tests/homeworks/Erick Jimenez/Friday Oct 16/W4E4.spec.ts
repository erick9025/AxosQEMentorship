import { test } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
const credentials = require('./Credentials.json');

test.describe('Login Page Tests', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('Escribir and Click Actions', async () => {
    await loginPage.goto();
    await loginPage.login(credentials.user, credentials.password);
  });
});
