import { test, expect } from '@playwright/test';
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
  });

test('Verificar si carga la pagina y elementos', async ({ page }) => {
  
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.locator('[id="user-name"]')).toBeVisible();
  await expect(page.locator('[id="password"]')).toBeVisible();
  await expect(page.locator('[id="login-button"]')).toBeVisible();
 
  
  });

test('Aserciones', async ({ page }) => {

  await page.locator('input[id="user-name"]').fill('standard_user');

  await page.locator('input[id="password"]').fill('secret_sauce');

  await page.locator('.submit-button.btn_action').click();
  
  await expect(page.getByText('Products')).toBeVisible();
  });