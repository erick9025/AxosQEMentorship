
import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';

test.describe('Login functionality', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    // Create a LoginPage instance
    loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.navigate();
  });

  test('should log in successfully with valid credentials', async ({ page }) => {
    // Enter valid credentials and log in
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify that the inventory page is displayed
    await expect(page).toHaveURL(/inventory\.html/);

    // Verify that the products title is visible
    await expect(
      page.getByText('Products', { exact: true })
    ).toBeVisible();
  });

  test('should display an error with an invalid username', async () => {
    // Enter invalid credentials
    await loginPage.login('invalid_user', 'secret_sauce');

    // Verify that the error message is displayed
    await loginPage.verifyErrorMessage();
  });

  test('should display an error when the username is empty', async () => {
    // Leave the username empty and enter a password
    await loginPage.enterPassword('secret_sauce');

    // Click the login button
    await loginPage.clickLogin();

    // Verify that the error message is displayed
    await loginPage.verifyErrorMessage();
  });
});
