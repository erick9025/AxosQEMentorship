import { test, expect } from '@playwright/test';

test('Login to SauceDemo', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    const user = page.locator('#user-name');
    const button = page.locator('#login-button');

    await expect(user).toBeVisible();
    await expect(button).toBeVisible();

    await user.fill('standard_user');
    await page.locator('#password').fill('secret_sauce');

    const initialURL = page.url();

    await button.click();

    await expect(page).not.toHaveURL(initialURL);

    await expect(page.locator('.title')).toHaveText('Products');

});