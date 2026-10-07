import { test, expect, Locator } from '@playwright/test';

test.describe('Sauce Labs - Login', () => {

  test('Should successfully login with a valid user a', async ({ page }) => {

    const names: string[] = ['Erick', 'Jimenez', 'Rodriguez'];
    const firstName: string = 'Erick';

    expect(names).toContain(firstName); // await is not needed for expect, because it is not an async function
    expect(90).toBeGreaterThan(80);

    await page.goto('https://www.saucedemo.com/');
    //await page.waitForTimeout(5_000);

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click(); // await is needed for page.locator().click(), because it is an async function

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('Should successfully login with a valid user b', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    //await page.waitForTimeout(5_000);

    const locatorUserName: Locator = page.locator('[data-test="username"]'); // await here is not needed because page.locator() is not an async function
    const locatorPassword: string = '[data-test="password"]';

    await locatorUserName.fill('standard_user');
    await page.locator(locatorPassword).fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('Should successfully login with a valid user c', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    //await page.waitForTimeout(5_000);

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

});