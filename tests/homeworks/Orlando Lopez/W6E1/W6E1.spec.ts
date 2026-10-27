
import { test, expect } from '@playwright/test';

// Base URL
const URL = 'https://www.saucedemo.com/';

// Navigate to the login page before each test
test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

// Test 1: Verify that the login page is displayed
test('should display the login page correctly', async ({ page }) => {
  await expect(page).toHaveTitle('Swag Labs');

  await expect(page.locator('[data-test="username"]')).toBeVisible();
  await expect(page.locator('[data-test="password"]')).toBeVisible();
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});

// Test 2: Verify successful login with valid credentials
test('should log in successfully with valid credentials', async ({ page }) => {
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();
  await expect(page.locator('.title')).toHaveText('Products');
});

// Test 3: Verify login failure for a locked-out user
test('should display an error for a locked-out user', async ({ page }) => {
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]'))
    .toContainText('locked out');
});

// Test 4: Verify login failure with invalid credentials
test('should display an error for invalid credentials', async ({ page }) => {
  await page.locator('[data-test="username"]').fill('invalid_user');
  await page.locator('[data-test="password"]').fill('wrong_password');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]'))
    .toContainText('Username and password do not match');
});

// Test 5: Verify login failure when the username is empty
test('should display an error when the username is empty', async ({ page }) => {
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]'))
    .toContainText('Username is required');
});

// Test 6: Verify login failure when the password is empty
test('should display an error when the password is empty', async ({ page }) => {
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]'))
    .toContainText('Password is required');
});
