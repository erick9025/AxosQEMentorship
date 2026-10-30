import { expect, test } from "@playwright/test";

test.setTimeout(30_000);

test("blocks image requests while keeping the page usable", async ({ page }) => {
	let blockedImageCount = 0;

	await page.route("**/*", async (route) => {
		if (route.request().resourceType() === "image") {
			blockedImageCount += 1;
			await route.abort();
			return;
		}

		await route.continue();
	});

	await page.goto("https://www.saucedemo.com/");
	await page.locator("#user-name").fill("standard_user");
	await page.locator("#password").fill("secret_sauce");
	await page.locator("#login-button").click();

	await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
	await expect(page.locator(".title")).toHaveText("Products");
	await expect.poll(() => blockedImageCount).toBeGreaterThan(0);
});
