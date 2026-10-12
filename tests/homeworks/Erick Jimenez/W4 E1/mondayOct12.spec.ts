import { test } from '@playwright/test';
import { SauceLabsLoginPage } from '../../../../pom/pages/sauceLabsLoginPage';
import { SauceLabsProductsPage } from '../../../../pom/pages/sauceLabsProductsPage';

test.describe('Login', () => {
    test('Login to sauce labs with username and password', async ({ page }) => {
        const myPage = new SauceLabsLoginPage(page);
        const productsPage = new SauceLabsProductsPage(page);

        await myPage.login('standard_user', 'secret_sauce');
        await productsPage.addProductToCartDynamic('Sauce Labs Backpack');
        await productsPage.addProductToCart('Jacket');
    });
});