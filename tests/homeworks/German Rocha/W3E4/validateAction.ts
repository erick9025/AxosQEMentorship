import { test, expect } from '@playwright/test';

test('Mi Prueba de Login', async ({ page }) => {
  await page.goto('https://github.com');
  await page.waitForTimeout(3000);

  const inputDeUsuario = page.locator('input[name="login"]');
  const elBotonParaEntrar = page.locator('input.btn-primary');

  const seVeElInput = await inputDeUsuario.isVisible();
  expect(seVeElInput).toBe(true);

  await inputDeUsuario.click();
  await inputDeUsuario.fill('usuario_de_prueba@correo.com');

  const seVeElBoton = await elBotonParaEntrar.isVisible();
  expect(seVeElBoton).toBe(true);

  await elBotonParaEntrar.click();
  await page.waitForTimeout(3000);

  // Buscar el texto de alerta que sale arriba en la pantalla
  const mensajeDeError = page.locator('div.js-flash-alert');
  
  // Validar de forma manual que el texto es visible y dice lo correcto
  const seVeElError = await mensajeDeError.isVisible();
  expect(seVeElError).toBe(true);

  const textoDelError = await mensajeDeError.innerText();
  expect(textoDelError).toContain('Incorrect username or password');
});
