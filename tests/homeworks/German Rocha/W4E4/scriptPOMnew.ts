import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('Mi Prueba de Login usando Métodos POM', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Navegamos a la página
  await page.goto('https://github.com');
  await page.waitForTimeout(3000);

  // 2. Validamos visualmente que los elementos principales existan antes de usarlos
  await expect(loginPage.inputDeUsuario).toBeVisible();
  await expect(loginPage.elBotonParaEntrar).toBeVisible();

  // 3. Ejecutamos las acciones llamando a los métodos de nuestra clase
  await loginPage.ingresarUsuario('usuario_de_prueba@correo.com');
  await loginPage.hacerClickEnEntrar();
  await page.waitForTimeout(3000);
  
  // 4. Validamos el mensaje de error usando nuestro método de lectura
  await expect(loginPage.mensajeDeError).toBeVisible();
  
  const textoDelError = await loginPage.obtenerTextoError();
  expect(textoDelError).toContain('Incorrect username or password');
});
