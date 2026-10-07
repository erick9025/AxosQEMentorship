import { test, expect, Locator } from "@playwright/test";


test('Validate user is able to login with valid credentials', async ({ page }) => {
    //Credentials
    const username: string = 'standard_user';
    const password: string = 'secret_sauce';

    //Locators
    const usernameFiled: Locator = page.locator("#user-name");
    const passwordFiled: Locator = page.locator("#password");
    const loginButton: Locator = page.locator("#login-button");
    const productsTitle: Locator = page.locator(".title");

    await page.goto('https://www.saucedemo.com/');

    await usernameFiled.fill(username);
    await passwordFiled.fill(password);
    await loginButton.click();

    await expect(page).toHaveURL(/inventory/);
    await expect(productsTitle).toBeVisible();
})