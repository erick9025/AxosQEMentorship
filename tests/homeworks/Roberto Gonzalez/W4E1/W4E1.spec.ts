import { test, expect } from '@playwright/test';

// Ejecutar las pruebas secuencialmente
test.describe.configure({ mode: 'serial' });

test('Seleccionar checkbox Green y opción Honda del dropdown', async ({ page }) => {
    // 1. Abrir la página
    console.log('Navegando a la página de dropdown...');
    await page.goto('https://automationtesting.co.uk/dropdown.html');
    await page.waitForTimeout(2000);

    // 2. Seleccionar el checkbox Green
    console.log('Seleccionando el checkbox Green...');
    const checkboxGreen = page.locator('#cb_green');

    // Hacer clic en el label visible asociado al checkbox
    await page.locator('label[for="cb_green"]').click();
    await page.waitForTimeout(3000);
    // Validar que el checkbox esté seleccionado
    await expect(checkboxGreen).toBeChecked();
    console.log('Checkbox Green seleccionado correctamente.');

    // 3. Seleccionar Honda en el dropdown
    console.log('Seleccionando Honda en el dropdown...');
    const dropdown = page.locator('#cars');
    await dropdown.selectOption({ label: 'Honda' });
    await page.waitForTimeout(3000);
    // Validar la opción seleccionada
    await expect(dropdown).toHaveValue('honda');
    console.log('Opción Honda seleccionada correctamente.');
});