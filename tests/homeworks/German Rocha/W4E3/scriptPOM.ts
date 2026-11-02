import { test, expect } from '@playwright/test';
// 1. Importamos la clase que acabamos de crear
import { LoginPage } from './pages/LoginPage';

test('Mi Prueba de Login con POM', async ({ page }) => {
  // 2. Creamos el objeto de la página de Login
  const loginPage = new LoginPage(page);

  await page.goto('https://github.com');
  await page.waitForTimeout(3000);

  // 3. Usamos los localizadores llamándolos desde 'loginPage'
  const seVeElInput = await loginPage.inputDeUsuario.isVisible();
  expect(seVeElInput).toBe(true);

  await loginPage.inputDeUsuario.click();
  await loginPage.inputDeUsuario.fill('usuario_de_prueba@correo.com');

  const seVeElBoton = await loginPage.elBotonParaEntrar.isVisible();
  expect(seVeElBoton).toBe(true);

  await loginPage.elBotonParaEntrar.click();
  await page.waitForTimeout(3000);
  
  // Validar de forma manual el mensaje de error usando el objeto
  const seVeElError = await loginPage.mensajeDeError.isVisible();
  expect(seVeElError).toBe(true);

  const textoDelError = await loginPage.mensajeDeError.innerText();
  expect(textoDelError).toContain('Incorrect username or password');
});
