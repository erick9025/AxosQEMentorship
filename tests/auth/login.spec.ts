import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pom/pages/LoginPage';

test.describe('Inicio de sesión en Sauce Labs Support', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('muestra los controles del formulario', async () => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('oculta la contraseña ingresada', async () => {
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });

  test('permite iniciar sesión con credenciales válidas', async ({ page }) => {
    const email = process.env.SAUCE_USERNAME;
    const password = process.env.SAUCE_PASSWORD;

    test.skip(!email || !password, 'Configura SAUCE_USERNAME y SAUCE_PASSWORD en .env');

    await loginPage.login(email!, password!);
    await expect(page).not.toHaveURL(/\/s\/login\//, { timeout: 20_000 });
    await expect(loginPage.successHeading).toBeVisible({ timeout: 20_000 });
  });
});
