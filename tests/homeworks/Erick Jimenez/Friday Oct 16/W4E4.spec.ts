import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.describe('Login Page Tests', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('Cleaner test with only high level actions (business logic)', async () => {
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
  });
});
