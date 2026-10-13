import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
});

test('Verificar si carga la pagina y elementos', async ({ page }) => {
  await expect(page).toHaveTitle(/Swag Labs/i);
  await expect(page.locator('[data-test="username"]')).toBeVisible();
  await expect(page.locator('[data-test="password"]')).toBeVisible();
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});

test('Aserciones', async ({ page }) => {
  const usernameInput = page.locator('[data-test="username"]');
  const passwordInput = page.locator('[data-test="password"]');
  const loginButton = page.locator('[data-test="login-button"]');

  await usernameInput.fill('standard_user');
  await passwordInput.fill('secret_sauce');
  await loginButton.click();

  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});