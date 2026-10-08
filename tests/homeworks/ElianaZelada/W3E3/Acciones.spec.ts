import { test, expect } from '@playwright/test';

test('Acciones', async ({ page }) => {
  await page.goto('https://Saucedemo.com/');
  await page.locator('input[id="user-name"]').fill('standard_user');
  await page.locator('input[id="password"]').fill('secret_sauce');
  await page.locator('.submit-button.btn_action').click();
  });