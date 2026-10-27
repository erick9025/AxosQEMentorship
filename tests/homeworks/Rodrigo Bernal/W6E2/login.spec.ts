import { test, expect } from "@playwright/test";

test.describe('Valid Login using hooks', () => {
    //Credentials
    const username: string = "standard_user";
    const lockedUsername: string = "locked_out_user";
    const password: string = "secret_sauce";

    //Locators
    const usernamelocator: string = "#user-name";
    const passwordlocator: string = "#password";
    const loginButtonLocator: string = "#login-button";
    const productsTitleLocator: string = ".title";

    test.beforeEach('Navigate to Login Page', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    })

    test('Validate user is able to login with valid credentials', async ({ page }) => {

        await page.locator(usernamelocator).fill(username);
        await page.locator(passwordlocator).fill(password);
        await page.locator(loginButtonLocator).click();

        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator(productsTitleLocator)).toBeVisible();

    })

    test('Validate user is not able to login with locked credentials', async ({ page }) => {

        await page.locator(usernamelocator).fill(lockedUsername);
        await page.locator(passwordlocator).fill(password);
        await page.locator(loginButtonLocator).click();

        await expect(page).not.toHaveURL(/inventory/);
        await expect(page.locator(productsTitleLocator)).not.toBeVisible();

    })
})