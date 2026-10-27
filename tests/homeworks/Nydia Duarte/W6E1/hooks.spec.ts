import { test, expect } from '@playwright/test';

test.describe('TodoMVC Tests', () => {
  // Runs before each test in this block
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
  });

  test('should display initial empty state and title', async ({ page }) => {
    await expect(page).toHaveTitle('React • TodoMVC');
    await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
  });

  test('should add a new task to the list', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('Schedule team meeting');
    await input.press('Enter');

    const todoItems = page.getByTestId('todo-item');
    await expect(todoItems).toHaveCount(1);
    await expect(todoItems.first()).toHaveText('Schedule team meeting');
  });

  test('should complete a task', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('Review pull request');
    await input.press('Enter');

    const todoItem = page.getByTestId('todo-item').first();
    await todoItem.getByRole('checkbox').check();

    await expect(todoItem).toHaveClass(/completed/);
  });
});