import { test, expect } from '@playwright/test';

test.describe('Authentication and Landing Validation', () => {
  test('should navigate to dashboard and render welcome message after login', async ({ page }) => {
    // 1. Navigate to the initial login screen
    await page.goto('https://example.com/login');

    // 2. Fill credentials and submit
    await page.getByLabel('Email or Username').fill('testuser@example.com');
    await page.getByLabel('Password').fill('SecurePassword123!');
    await page.getByRole('button', { name: 'Log In' }).click();

    // 3. Validate URL transition (supports regex or exact URL string)
    await expect(page).toHaveURL(/.*\/dashboard/);

    // 4. Validate the welcome heading visually and structurally
    const welcomeHeader = page.getByRole('heading', { name: /welcome back/i });
    
    // Asserts element is attached, visible (not hidden/transparent), and has non-zero size
    await expect(welcomeHeader).toBeVisible();
    await expect(welcomeHeader).toHaveText('Welcome back, Alex!');

    // 5. (Optional) Screenshot comparison for true pixel-level visual regression
    await expect(page).toHaveScreenshot('dashboard-welcome.png', {
      maxDiffPixelRatio: 0.05,
    });
  });
});