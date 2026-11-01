import { test, expect } from '@playwright/test';
// 1. Importamos el archivo JSON. Playwright leerá los datos automáticamente.
import datosTest from './datos.json';

test.describe("Checkbox and selects tests", () => {
    
    test("Validate checkbox", async ({ page }) => {
        await page.goto('https://testmuai.com');

        const singleCheckbox = page.locator("//label[text()='Click on check box']/input");
        const option1Checkbox = page.locator("//label[text()=' Option 1']/input");
        const option2Checkbox = page.locator("//label[text()=' Option 2']/input");
        const option3Checkbox = page.locator("//label[text()=' Option 3']/input");

        await singleCheckbox.check();
        await option1Checkbox.check();

        await expect(singleCheckbox).toBeChecked();
        await expect(option1Checkbox).toBeChecked();
        await expect(option2Checkbox).not.toBeChecked();
        await expect(option3Checkbox).not.toBeEnabled();
    });

    test("Validate radio button", async ({ page }) => {
        await page.goto('https://testmuai.com');

        const maleRadioButton = page.locator("input[name=optradio][value=Male]");
        const radioButton1 = page.locator("input[value=RadioButton1]");
        const radioButton3 = page.locator("input[value=RadioButton3]");
        const getValueButton = page.locator("#buttoncheck");
        const maleSelectedText = getValueButton.locator("+ p");

        await maleRadioButton.check();
        await expect(maleRadioButton).toBeChecked();

        await getValueButton.click();
        await radioButton1.check();

        await expect(radioButton1).toBeChecked();
        await expect(radioButton3).not.toBeChecked();
        await expect(maleSelectedText).toBeVisible();
    });

    test("Validate select dropdown", async ({ page }) => {
        await page.goto('https://testmuai.com');

        const selectDropdown = page.locator("#select-demo");
        const multiSelectOption = page.locator("#multi-select");

        // 2. En lugar de variables "quemadas", usamos datosTest con el punto (.)
        // Seleccionar una opción simple usando el JSON
        await selectDropdown.selectOption(datosTest.dayOption);
        await expect(selectDropdown).toHaveValue(datosTest.dayOption);

        // Seleccionar múltiples opciones usando el JSON
        await multiSelectOption.selectOption([datosTest.firstOption, datosTest.lastOption]);
        await expect(multiSelectOption).toHaveValues([datosTest.firstOption, datosTest.lastOption]);
    });
});
