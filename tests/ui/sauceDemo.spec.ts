import { test, expect } from '@playwright/test';

// Automated initial navigation hook executed prior to the test scenario
test.beforeEach(async ({ page }) => {
    await page.goto('https://saucedemo.com');
});

test('validates login container element visibility status on the landing viewport', async ({ page }) => {
    // Locator definition targeting the principal login container element
    const loginBox = page.locator('#login_button_container');

    // Assertion verifying that the login interface element is fully visible
    await expect(loginBox).toBeVisible();
});
