

import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Bloquear las solicitudes de imágenes
  await page.route('**/*', async (route) => {
    if (route.request().resourceType() === 'image') {
      await route.abort();
    } else {
      await route.continue();
    }
  });

  // Abrir la página de inicio de sesión
  await page.goto(
    'https://support.saucelabs.com/s/login/?language=en_US'
  );
});

// Prueba 1: Inicio de sesión
test('Iniciar sesión correctamente', async ({ page }) => {
  await page.locator('input[placeholder="Email"]')
    .fill('rober010389@gmail.com');

  await page.locator('#input-6')
    .fill('Bankaxos1234#');

  const initialUrl = page.url();

  await page.getByRole('button', { name: 'Log in' }).click();

  // Validar que la URL cambie después del inicio de sesión
  await expect(page).not.toHaveURL(initialUrl, {
    timeout: 15000
  });

  // Validar el contenido de la página posterior al inicio de sesión
  await expect(
    page.getByText('Get answers to your Sauce questions')
  ).toBeVisible({
    timeout: 15000
  });
});

// Prueba 2: Visibilidad de los campos
test('Mostrar los campos del formulario de inicio de sesión', async ({ page }) => {
  await expect(
    page.locator('input[placeholder="Email"]')
  ).toBeVisible();

  await expect(
    page.locator('#input-6')
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'Log in' })
  ).toBeVisible();

  // Validar que la contraseña esté oculta
  await expect(
    page.locator('#input-6')
  ).toHaveAttribute('type', 'password');
});
