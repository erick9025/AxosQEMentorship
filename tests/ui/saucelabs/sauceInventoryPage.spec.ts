import { test, expect } from '../../fixtures';

test.describe('Inventory Page Tests', () => {
  test('Inventory loads with mocked product images', async ({ page, loginPage, inventoryPage, testData }) => {
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

    await test.step('Log in with the standard user', async () => {
      await loginPage.login('standard_user', testData.generalPassword);
    });

    await test.step('Verify the inventory page and image interception', async () => {
      await inventoryPage.validatePageLoaded();
      expect(interceptedImageCount, 'At least one product image should be intercepted').toBeGreaterThan(0);
    });
  });
});