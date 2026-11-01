import { test, expect } from '@playwright/test'

test.describe("Checkbox and selects tests", () => {
    
    test("Validate checkbox", async ({ page }) => {
        // 1. Abrir la página web
        await page.goto('https://www.testmuai.com/selenium-playground/checkbox-demo/');

        // Buscamos los elementos en la página (Locators)
        const singleCheckbox = page.locator("//label[text()='Click on check box']/input");
        const option1Checkbox = page.locator("//label[text()=' Option 1']/input");
        const option2Checkbox = page.locator("//label[text()=' Option 2']/input");
        const option3Checkbox = page.locator("//label[text()=' Option 3']/input");

        // 2. Interactuar: Marcar las casillas
        await singleCheckbox.check();
        await option1Checkbox.check();

        // 3. Validar: Verificar que los estados sean los correctos
        await expect(singleCheckbox).toBeChecked();
        await expect(option1Checkbox).toBeChecked();
        await expect(option2Checkbox).not.toBeChecked(); // Validamos que NO esté marcado
        await expect(option3Checkbox).not.toBeEnabled(); // Validamos que esté deshabilitado
    })

    test("Validate radio button", async ({ page }) => {
        await page.goto('https://www.testmuai.com/selenium-playground/radiobutton-demo/');

        const maleRadioButton = page.locator("input[name=optradio][value=Male]");
        const radioButton1 = page.locator("input[value=RadioButton1]");
        const radioButton3 = page.locator("input[value=RadioButton3]");
        const getValueButton = page.locator("#buttoncheck");
        const maleSelectedText = getValueButton.locator("+ p"); // Busca el párrafo que está justo después del botón

        // Seleccionar y verificar el radio button de género
        await maleRadioButton.check();
        await expect(maleRadioButton).toBeChecked();

        // Hacer clic en el botón para confirmar y marcar otra opción
        await getValueButton.click();
        await radioButton1.check();

        // Validaciones finales
        await expect(radioButton1).toBeChecked();
        await expect(radioButton3).not.toBeChecked();
        await expect(maleSelectedText).toBeVisible(); // Validamos que el texto de confirmación aparezca en pantalla
    })

    test("Validate select dropdown", async ({ page }) => {
        await page.goto('https://www.testmuai.com/selenium-playground/select-dropdown-demo/');

        // Variables con los valores que vamos a seleccionar
        const dayOption = 'Sunday';
        const firstOption = 'Florida';
        const lastOption = 'Texas';

        const selectDropdown = page.locator("#select-demo");
        const multiSelectOption = page.locator("#multi-select");

        // Seleccionar una opción simple en el menú desplegable
        await selectDropdown.selectOption(dayOption);
        await expect(selectDropdown).toHaveValue(dayOption);

        // Seleccionar múltiples opciones al mismo tiempo usando una lista []
        await multiSelectOption.selectOption([firstOption, lastOption]);
        await expect(multiSelectOption).toHaveValues([firstOption, lastOption]);
    })
})
