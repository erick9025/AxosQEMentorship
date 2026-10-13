import { test, expect } from '@playwright/test';

test.describe('Tarea 12 De Octubre, Selects & Checkboxes', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navegar a la página del playground
    await page.goto('https://www.testmuai.com/selenium-playground/radiobutton-demo/');
  });

  test('Debería seleccionar un género en la sección básica y verificar el valor', async ({ page }) => {
    // Seleccionar el radio button "Male" en la sección básica y verificar que esté seleccionado
    const maleRadio = page.locator('input[name="optradio"][value="Male"]');
    await maleRadio.check();
    await expect(maleRadio).toBeChecked();

    // Hacer clic en el botón 'Get value' y validar la confirmacion
    await page.getByRole('button', { name: 'Get value', exact: true }).click();
    const message = page.locator('.radiobutton');
    await expect(message).toHaveText("Radio button 'Male' is checked");

  });
  test('Validar el radio button deshabilitado', async ({ page }) => {
    // Buscar directamente el input de tipo radio que tenga el atributo disabled
    const disabledRadio = page.locator('input[type="radio"][disabled]'); 
    await expect(disabledRadio).toBeDisabled();
  });

});
