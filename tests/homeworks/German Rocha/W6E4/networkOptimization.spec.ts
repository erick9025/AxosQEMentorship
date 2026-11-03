import { test, expect } from '@playwright/test';

let interceptedImageCounter = 0;

test.beforeEach(async ({ page }) => {
    interceptedImageCounter = 0;

    await page.route('**/*', async (route) => {
        const currentRequest = route.request();

        if (currentRequest.resourceType() === 'image') {
            interceptedImageCounter += 1;
            await route.abort();
            return;
        }

        await route.continue();
    });

    await page.goto('https://saucedemo.com');
});

test('completes application workflow and verifies absolute image metric suppression', async ({ page }) => {
    // Deliberate selector modification to force a test execution timeout failure
    const userInputField = page.locator('#broken-user-field-name'); 
    const passwordInputField = page.locator('#password');
    const loginTriggerButton = page.locator('#login-button');

    // The execution engine will wait up to 30 seconds here trying to find the broken element
    await userInputField.fill('standard_user');
    await passwordInputField.fill('secret_sauce');
    await loginTriggerButton.click();

    const dashboardTitleHeader = page.locator('.title');
    await expect(dashboardTitleHeader).toHaveText('Products');
    await expect.poll(() => interceptedImageCounter).toBeGreaterThan(0);
});
