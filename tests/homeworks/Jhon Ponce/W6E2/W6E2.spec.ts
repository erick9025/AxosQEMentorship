import { expect, test } from "@playwright/test";

test.setTimeout(30_000);

test("runs in Chromium or Firefox", async ({ browserName, page }) => {
	expect(["chromium", "firefox"]).toContain(browserName);

	await page.goto("https://www.saucedemo.com/");
	await expect(page.locator("#login-button")).toBeVisible();
});
