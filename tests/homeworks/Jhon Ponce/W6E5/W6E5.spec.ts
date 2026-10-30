import { expect, test } from "@playwright/test";

test.setTimeout(30_000);

test("completes the SauceDemo login and adds a product to the cart", async ({ page }) => {
	await test.step("open SauceDemo and sign in", async () => {
		await page.goto("https://www.saucedemo.com/");
		await page.locator("#user-name").fill("standard_user");
		await page.locator("#password").fill("secret_sauce");
		await page.locator("#login-button").click();
	});

	await test.step("verify the inventory and add a product", async () => {
		await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
		await expect(page.locator(".inventory_item")).toHaveCount(6);
		await page.locator(".inventory_item").first().getByRole("button", { name: "Add to cart" }).click();
		await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
	});
});
