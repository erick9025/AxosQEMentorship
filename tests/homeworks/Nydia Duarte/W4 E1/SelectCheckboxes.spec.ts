import { test, expect } from '@playwright/test';

// Run sequentially in a single worker (parallelism postponed)
test.describe.configure({ mode: 'serial' });

test('Select dropdown option and check terms/checkbox', async ({ page }) => {
  // 1. Practice: Select option from dropdown
  console.log('Navigating to dropdown demo page...');
  await page.goto('https://the-internet.herokuapp.com/dropdown');

  const dropdown = page.locator('#dropdown');
  console.log('Selecting "Option 2" from dropdown...');
  await dropdown.selectOption({ label: 'Option 2' });

  // Assert dropdown selection
  await expect(dropdown).toHaveValue('2');
  console.log('Dropdown option verified.');

  // 2. Practice: Checkbox handling (Playwright standard docs)
  console.log('Navigating to checkboxes demo page...');
  await page.goto('https://the-internet.herokuapp.com/checkboxes');

  // Locator targeting the first checkbox (simulating "Accept terms")
  const termsCheckbox = page.getByRole('checkbox').first();

  console.log('Checking terms checkbox...');
  // check() automatically ensures the element is ready and checks it
  await termsCheckbox.check();

  // Assertion recommended by Playwright docs
  await expect(termsCheckbox).toBeChecked();
  console.log('Checkbox successfully checked and verified.');
});