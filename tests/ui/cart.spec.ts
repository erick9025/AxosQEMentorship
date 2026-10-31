import { test } from "@playwright/test";
import { LoginPage } from "../../pom/pages/loginPage";
import userData from '../testData/users.json'
import productsData from '../testData/products.json'
import { InventoryPage } from "../../pom/pages/inventoryPage";
import { CartPage } from "../../pom/pages/cartPage";

test.describe("Cart scenarios", () => {

    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach("Add products to the cart", async ({ page }) => {
        const loginPage = new LoginPage(page);
        cartPage = new CartPage(page);
        inventoryPage = new InventoryPage(page);
        loginPage.goToLoginPage();
        await loginPage.login(userData.credentials.userValid.username, userData.credentials.userValid.password);
        await loginPage.validateLoginSuccesfully();
        await inventoryPage.addProductsToCart(productsData.productsName);
        await inventoryPage.validateProductsAddedToCart(productsData.productsName);
    })

    test('Validate products are displayed on the Cart Page', async () => {
        await inventoryPage.goToCartPage();
        await cartPage.validateProductsAddedToCart(productsData.productsName);
    })
})