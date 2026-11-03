import { test, expect } from '@playwright/test';

let interceptedImageCounter = 0;

test.beforeEach(async ({ page }) => {
    // Resetting the execution counter value prior to running a new scenario track
    interceptedImageCounter = 0;

    await page.route('**/*', async (route) => {
        const currentRequest = route.request();

        // Evaluation of native browser resource classification metadata
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
    const userInputField = page.locator('#user-name');
    const passwordInputField = page.locator('#password');
    const loginTriggerButton = page.locator('#login-button');

    await userInputField.fill('standard_user');
    await passwordInputField.fill('secret_sauce');
    await loginTriggerButton.click();

    const dashboardTitleHeader = page.locator('.title');
    await expect(dashboardTitleHeader).toHaveText('Products');

    await expect.poll(() => interceptedImageCounter).toBeGreaterThan(0);
    
    console.log(`Execution complete. Total image payloads intercepted: ${interceptedImageCounter}`);
});
