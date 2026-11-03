import { expect, test } from "@playwright/test";

// Setting a global execution timeout configuration for the test file
test.setTimeout(30_000);

// Centralized hook execution to perform initial page navigation prior to every test block
test.beforeEach(async ({ page }) => {
	await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php");
});

test("displays the student registration form header validation", async ({ page }) => {
    // Locator definition targeting the primary form heading element
    const formHeading = page.getByRole("heading", { name: "Student Registration Form" });
    
    // Assertion validating the visibility status of the target heading within the viewport
	await expect(formHeading).toBeVisible();
});

test("provides functional state and city dropdown selection menus", async ({ page }) => {
    // Locators setup for the dropdown select elements
    const stateDropdown = page.locator("#state");
    const cityDropdown = page.locator("#city");
    
    // Locators definition targeting the child option elements within each menu
    const stateOptions = page.locator("#state option");
    const cityOptions = page.locator("#city option");

    // Visibility status assertions for the dropdown elements
	await expect(stateDropdown).toBeVisible();
	await expect(cityDropdown).toBeVisible();
	
	// Quantitative assertions checking the total count of valid options available
	await expect(stateOptions).toHaveCount(5);
	await expect(cityOptions).toHaveCount(4);
});
