import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

const credentials = require('./Credentials.json');

test('Escribir and Click Actions', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  // URL inicial
  const initialUrl = page.url();

  await loginPage.login(credentials.user, credentials.password);

  // Validar que la URL cambió
  await expect(page).not.toHaveURL(initialUrl, {
    timeout: 15000,
  });

  // Valida el título en la pantalla nueva
  await expect(loginPage.successHeading).toBeVisible({
    timeout: 15000,
  });
});
