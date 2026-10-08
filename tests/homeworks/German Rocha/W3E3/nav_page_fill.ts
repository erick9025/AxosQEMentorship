import { test, expect } from '@playwright/test';

test('Prueba de Login y llenado', async ({ page }) => {
  // Primero entramos a la página de github para loguearnos
  await page.goto('https://github.com');

  // cuadro donde se escribe el correo con su selector completo
  const inputDeUsuario = page.locator('input[name="login"]');
  
  // botón verde para entrar usando el selector de la clase
  const elBotonParaEntrar = page.locator('input.btn-primary');

  // Revisamos si el input se puede ver en la pantalla
  const seVeElInput = await inputDeUsuario.isVisible();
  expect(seVeElInput).toBe(true);

  // clic en el cuadro de texto y escribimos el correo
  await inputDeUsuario.click();
  await inputDeUsuario.fill('usuario_de_prueba@correo.com');

  // Revisamos si el botón también se puede ver en la pantalla
  const seVeElBoton = await elBotonParaEntrar.isVisible();
  expect(seVeElBoton).toBe(true);

  // clic en el botón para intentar iniciar sesión
  await elBotonParaEntrar.click();
});
