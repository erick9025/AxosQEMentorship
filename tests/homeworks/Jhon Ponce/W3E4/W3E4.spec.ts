import { expect, test } from "@playwright/test";

test("logs in to SauceDemo and verifies the products page", async ({ page }) => {
	await test.step("open the SauceDemo login page", async () => {
		await page.goto("https://www.saucedemo.com/");
	});

	await test.step("enter valid credentials and submit the login form", async () => {
		await page.locator("#user-name").fill("standard_user");
		await page.locator("#password").fill("secret_sauce");
		await page.locator("#login-button").click();
	});

	await test.step("verify that the products page is displayed", async () => {
		await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
		await expect(page.locator(".title")).toHaveText("Products");
	});

	await test.step("add a product to the cart", async () => {
		const products = page.locator(".inventory_item");
		await expect(products).toHaveCount(6);

		await products.first().getByRole("button", { name: "Add to cart" }).click();
		await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
	});
});
