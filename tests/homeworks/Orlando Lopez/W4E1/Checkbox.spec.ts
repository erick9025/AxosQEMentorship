const { test, expect } = require('@playwright/test');

test('Seleccionar país y aceptar términos', async ({ page }) => {
  // Abrir un formulario de ejemplo
  await page.setContent(`
    <form>
      <label for="pais">Selecciona tu país:</label>
      <select id="pais">
        <option value="">Selecciona una opción</option>
        <option value="mexico">México</option>
        <option value="espana">España</option>
        <option value="colombia">Colombia</option>
      </select>

      <br><br>

      <input type="checkbox" id="terminos">
      <label for="terminos">Aceptar términos</label>

      <br><br>

      <button type="submit">Enviar</button>
    </form>
  `);

  // Seleccionar una opción del menú desplegable
  await page.locator('#pais').selectOption('mexico');

  // Marcar la casilla de aceptar términos
  await page.locator('#terminos').check();

  // Verificar que se seleccionó México
  await expect(page.locator('#pais')).toHaveValue('mexico');

  // Verificar que la casilla está marcada
  await expect(page.locator('#terminos')).toBeChecked();
});