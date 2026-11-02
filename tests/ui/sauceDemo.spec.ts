import { expect, test } from "../../fixtures/testFixtures";

test("signs in, adds an item to the cart, and verifies its contents", async ({
	cartPage,
	inventoryPage,
	loginPage,
	testData,
}) => {
	await loginPage.open();
	await loginPage.login(testData.standard.username, testData.standard.password);

	await expect(inventoryPage.title).toHaveText("Products");
	await expect(inventoryPage.productCards).toHaveCount(6);

	const productName = "Sauce Labs Backpack";
	await inventoryPage.addProductToCart(productName);
	await expect(inventoryPage.cartBadge).toHaveText("1");

	await inventoryPage.openCart();
	await expect(cartPage.title).toHaveText("Your Cart");
	await expect(cartPage.productNames).toHaveText([productName]);
});
