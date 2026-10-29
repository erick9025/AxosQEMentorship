
import { test, expect } from '@playwright/test';

test('should block images to speed up the test', async ({ page }) => {
    
  // Intercept all network requests
  await page.route('**/*', async (route) => {

    // Check if the requested resource is an image
    if (route.request().resourceType() === 'image') {

      // Abort the image request
      await route.abort();

    } else {
      // Continue all other requests
      await route.continue();
    }
  });

  // Open the Sauce Demo website
  await page.goto('https://www.saucedemo.com/');

  // Verify that the login page is displayed
  await expect(page.locator('#login_button')).toBeVisible();
  await expect(page.locator('#user-name')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
});
