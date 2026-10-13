import { test, expect, Locator } from "@playwright/test";

test.describe("Checkbox test", () => {
  test("Validate checkbox", async ({ page }) => {
    await page.goto(
      "https://www.testmuai.com/selenium-playground/checkbox-demo/",
    );

    // Locators
    const singleCheckbox: Locator = page.locator(
      "//label[text()='Click on check box']/input[@type='checkbox']",
    );

    await singleCheckbox.check();

    const option1Checkbox: Locator = page.locator(
      "//input[contains(@name,'option1')]",
    );
    const option2Checkbox: Locator = page.locator(
      "//input[contains(@name,'option2')]",
    );
    const option3Checkbox: Locator = page.locator(
      "//label[contains(.,'Option 3')]//input[@type='checkbox' and @disabled]",
    );

    await option1Checkbox.check();

    await expect(singleCheckbox).toBeChecked();
    await expect(option1Checkbox).toBeChecked();
    await expect(option2Checkbox).not.toBeChecked();
    await expect(option3Checkbox).toBeDisabled();
  });
});
