import { test, expect } from '@playwright/test';

test('intercept network requests and block image loading to speed up execution', async ({ page }) => {
  // 1. Intercept all network routes matching image extensions or resource types
  await page.route(/(png|jpeg|jpg|svg|webp)$/i, (route) => {
    // Abort the request specifically for images
    route.abort();
  });

  // Alternatively, intercept by resourceType:
  // await page.route('**/*', (route) => {
  //   if (route.request().resourceType() === 'image') {
  //     route.abort();
  //   } else {
  //     route.continue();
  //   }
  // });

  // 2. Navigate to a real, content-heavy site
  await page.goto('https://playwright.dev/');

  // 3. Verify page functionality remains intact
  const getStartedButton = page.getByRole('link', { name: 'Get started' });
  await expect(getStartedButton).toBeVisible();

  // 4. Verify that the hero logo image failed to load or has naturalWidth = 0
  const logo = page.locator('.hero__logo img, img[alt="Playwright logo"]').first();
  if (await logo.count() > 0) {
    const naturalWidth = await logo.evaluate((img: HTMLImageElement) => img.naturalWidth);
    expect(naturalWidth).toBe(0);
  }
});