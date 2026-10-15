import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Encontrar campo de texto y botón en UnoSquare', async ({ page }) => {
  // Navegar a la página
  await page.goto('https://www.unosquare.com/');

  // Crear una instancia de LoginPage
  const loginPage = new LoginPage(page);

  // Verificar que los elementos existen
  await expect(loginPage.usuario).toBeVisible();
  await expect(loginPage.boton).toBeVisible();
});