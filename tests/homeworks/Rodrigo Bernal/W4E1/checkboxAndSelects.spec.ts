import { test, expect, Locator } from '@playwright/test'


test.describe("Checkbox and selects tests", () => {
    test("Validate checkbox", async ({ page }) => {
        await page.goto('https://www.testmuai.com/selenium-playground/checkbox-demo/');

        //Locators
        const singleCheckbox: Locator = page.locator("//label[text()='Click on check box']/input");
        const option1Checkbox: Locator = page.locator("//label[text()=' Option 1']/input");
        const option2Checkbox: Locator = page.locator("//label[text()=' Option 2']/input");
        const option3Checkbox: Locator = page.locator("//label[text()=' Option 3']/input");


        await singleCheckbox.check();
        await option1Checkbox.check();

        await expect(singleCheckbox).toBeChecked();
        await expect(option1Checkbox).toBeChecked();
        await expect(option2Checkbox).not.toBeChecked();
        await expect(option3Checkbox).not.toBeEnabled();

    })
    test("Validate radio button", async ({ page }) => {
        await page.goto('https://www.testmuai.com/selenium-playground/radiobutton-demo/');

        //Locators
        const maleRadioButton: Locator = page.locator("input[name=optradio][value=Male]");
        const radioButton1: Locator = page.locator("input[value=RadioButton1]");
        const radioButton3: Locator = page.locator("input[value=RadioButton3]");
        const getValueButton: Locator = page.locator("#buttoncheck");
        const maleSelectedText: Locator = getValueButton.locator("+ p")


        await maleRadioButton.check();
        await expect(maleRadioButton).toBeChecked();

        await getValueButton.click();
        await radioButton1.check();

        await expect(radioButton1).toBeChecked();
        await expect(radioButton3).not.toBeChecked();
        await expect(maleSelectedText).toBeVisible();

    })

    test("Validate select dropdown", async ({ page }) => {
        await page.goto('https://www.testmuai.com/selenium-playground/select-dropdown-demo/');

        const dayOption: string = 'Sunday';
        const firstOption: string = 'Florida';
        const lastOption: string = 'Texas';

        //Locators
        const selectDropdown: Locator = page.locator("#select-demo");
        const multiSelectOption: Locator = page.locator("#multi-select");


        await selectDropdown.selectOption(dayOption);
        await expect(selectDropdown).toHaveValue(dayOption);

        await multiSelectOption.selectOption([firstOption, lastOption]);
        await expect(multiSelectOption).toHaveValues([firstOption, lastOption]);

    })
})