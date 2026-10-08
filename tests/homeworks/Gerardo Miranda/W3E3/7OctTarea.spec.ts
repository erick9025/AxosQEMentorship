import { test, expect } from '@playwright/test';
//Tarea de acciones, escribir y click
test.describe('Tarea 7 De Octubre, Acciones (Escribir, click)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://saucedemo.com');
  });

  test('Cargo la Pagina de Inicio', async ({ page }) => {
    await expect(page).toHaveTitle(/Swag Labs/);
    
    const loginBox = page.locator('#login_button_container');
    await expect(loginBox).toBeVisible();
  });

test('¿Esta mostrando el username, password y boton de login para iniciar sesion?', async ({ page }) => {
  await expect(page.locator('[id="user-name"]')).toBeVisible();
  await expect(page.locator('[id="password"]')).toBeVisible();
  await expect(page.locator('[id="login-button"]')).toBeVisible();
});

test('Escribir el username y password para al final hacer click en el boton de login', async ({ page }) => {
  const folder = 'tests/homeworks/Gerardo Miranda/screenshotsFromPracticeTests/';

  await page.locator('[id="user-name"]').fill('standard_user');
  await page.locator('[id="password"]').fill('secret_sauce');
  await page.screenshot({ path: folder + '01screenshotFormularioCompleto.png' });
  
  await page.locator('[id="login-button"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  await expect(page.locator('[class="title"]')).toHaveText('Products');
  await page.screenshot({ path: folder + '02screenshotPaginaInventario.png' });

});

});