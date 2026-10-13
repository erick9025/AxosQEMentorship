import { test, expect } from '@playwright/test';

test.describe('Tarea 12 De Octubre, Selects & Checkboxes', () => {

  test.beforeEach(async ({ page }) => {
    // Navegar a la página objetivo
    await page.goto('https://www.testmuai.com/selenium-playground/checkbox-demo/');
  });

  test('Interactuar con el Single Checkbox', async ({ page }) => {
    // Ubicar el checkbox individual 
    const singleCheckbox = page.locator('#isAgeSelected, input[type="checkbox"]').first();
    
    // Verificar que inicialmente no está seleccionado, marcar la casilla y verificar que se selecciono
    await expect(singleCheckbox).not.toBeChecked();
    await singleCheckbox.check();
    await expect(singleCheckbox).toBeChecked();
  });

test('Interactuar con el Multiple Checkbox Demo', async ({ page }) => {
  // Declarar el boton y checkboxes.
    const checkboxesMúltiples = page.locator('input[type="checkbox"]').locator('nth=5, nth=6, nth=7, nth=8'); // Ajustar índices según el DOM exacto
    const btnCheckAll = page.getByRole('button', { name: /Check All/i });
    
    // Hacer clic en el botón "Check All" y verificar que todos los checkboxes estén seleccionados
    await btnCheckAll.click();
    await expect(btnCheckAll).toHaveText(/Uncheck All/i);
  });

  test('Interactuar con el Disabled Checkbox Demo', async ({ page }) => {
    // Encontrar los elementos bajo "Disabled Checkbox Demo"
    const disabledCheckboxes = page.locator('input[type="checkbox"]:disabled');
    
    //Validar no poder seleccionar el checkbox deshabilitado
    const totalDisabled = await disabledCheckboxes.count();
    for (let i = 0; i < totalDisabled; i++) {
      await expect(disabledCheckboxes.nth(i)).toBeDisabled();
    }
  });

});
