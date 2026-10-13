const { test, expect } = require('@playwright/test');

// Leer los datos del archivo JSON
const datos = require('./datos.json');

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

  // Seleccionar el país desde el JSON
  await page.locator('#pais').selectOption(datos.pais);

  // Marcar la casilla si el JSON indica true
  if (datos.aceptarTerminos) {
    await page.locator('#terminos').check();
  }

  // Verificar el país seleccionado
  await expect(page.locator('#pais'))
    .toHaveValue(datos.pais);

  // Verificar el estado de la casilla
  await expect(page.locator('#terminos'))
    .toBeChecked();
});