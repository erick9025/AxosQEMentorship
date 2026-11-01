import { test } from '@playwright/test';
import users from '../data/users.json';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Login - Data-Driven Testing', () => {
  for (const user of users) {
    test(
      `should log in successfully with ${user.username}`,
      async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        // Navigate to the login page
        await loginPage.navigate();

        // Log in using the credentials from the JSON file
        await loginPage.login(
          user.username,
          user.password
        );

        // Verify that the inventory page is displayed
        await inventoryPage.verifyInventoryPage();
      }
    );
  }
});
