import { test, expect, Locator } from "@playwright/test";

test.describe('Add Products to Cart', () => {
    test.beforeEach('Login', async ({ page }) => {
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

    test('Validate user is able to add products to the cart', async ({ page }) => {
        //Products name
        const productsName: string[] = [
            'Sauce Labs Backpack',
            'Sauce Labs Fleece Jacket'
        ]

        //Xpath
        const addToCartXpath: string = "//div[text()='PRODUCT_NAME']/ancestor::div[@class='inventory_item_description']//button";
        const productNameXpath: string = "//div[text()='PRODUCT_NAME']";
        //Locators
        const numberProductsAddedLocator: Locator = page.locator("//span[@class='shopping_cart_badge']");
        const cartButtonLocator: Locator = page.locator(".shopping_cart_link");


        //Add products to cart
        for (const product of productsName) {
            const addToCartLocator: Locator = page.locator(addToCartXpath.replace('PRODUCT_NAME', product));
            await addToCartLocator.click();
        }

        //Validate products added to the cart
        for (const product of productsName) {
            const removeLocator: Locator = page.locator(addToCartXpath.replace('PRODUCT_NAME', product));
            await expect(removeLocator).toHaveText('Remove');
        }
        await expect(numberProductsAddedLocator).toHaveText(productsName.length.toString());
        await cartButtonLocator.click();
        for (const product of productsName) {
            const productNameLocator: Locator = page.locator(productNameXpath.replace('PRODUCT_NAME', product));
            await expect(productNameLocator).toBeVisible();
        }
    })
})