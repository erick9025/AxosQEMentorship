import { test } from "@playwright/test";

test("finds the username and login button by ID, enters a username, and clicks Login", async ({ page }) => {
	await page.goto("https://www.saucedemo.com/");

	const usernameInput = page.locator("#user-name");
	const loginButton = page.locator("#login-button");

	await usernameInput.fill("standard_user");
	await loginButton.click();
});
