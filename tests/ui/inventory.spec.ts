import { test } from "@playwright/test";
import { LoginPage } from "../../pom/pages/loginPage";
import userData from '../testData/users.json'
import productsData from '../testData/products.json'
import { InventoryPage } from "../../pom/pages/inventoryPage";

test.describe("Inventory scenarios", () => {

    let inventoryPage: InventoryPage;

    test.beforeEach("Login to inventory Page", async ({ page }) => {
        const loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        loginPage.goToLoginPage();
        await loginPage.login(userData.credentials.userValid.username, userData.credentials.userValid.password);
        await loginPage.validateLoginSuccesfully();
    })

    test('Validate user is able to add products to the cart', async () => {
        await inventoryPage.addProductsToCart(productsData.productsName);
        await inventoryPage.validateProductsAddedToCart(productsData.productsName);
    })
})