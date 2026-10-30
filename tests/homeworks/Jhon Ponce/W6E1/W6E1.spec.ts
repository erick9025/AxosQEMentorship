import { expect, test } from "@playwright/test";

test.setTimeout(30_000);

test.beforeEach(async ({ page }) => {
	await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php");
});

test("displays the student registration form", async ({ page }) => {
	await expect(page.getByRole("heading", { name: "Student Registration Form" })).toBeVisible();
});

test("provides state and city dropdowns", async ({ page }) => {
	await expect(page.locator("#state")).toBeVisible();
	await expect(page.locator("#city")).toBeVisible();
	await expect(page.locator("#state option")).toHaveCount(5);
	await expect(page.locator("#city option")).toHaveCount(4);
});
