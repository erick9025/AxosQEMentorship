import { test, expect } from '@playwright/test';
import { LoginPage } from './loginPage';

test('should login successfully using Page Object Model', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Navigate using POM method
  await loginPage.navigate();

  // Perform login using POM action
  await loginPage.login('standard_user', 'secret_sauce');

  // Verify successful redirection
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});