import { test, expect, sauceDemoTestData } from '../../fixtures';
import { performance } from 'node:perf_hooks';

test.describe('Login Page', () => {
  test.describe('Initial State', () => {
    test('Start Page loads correctly', async ({ page, loginPage }) => {
      await expect(page).toHaveTitle(/Swag Labs/);
      await loginPage.validateLoginBoxVisible();
    });

    test('Is the page showing the expected elements?', async ({ loginPage }) => {
      await loginPage.validateFormElementsVisible();
    });
  });

  test.describe('User Authentication Workflows', () => {
    for (const username of sauceDemoTestData.users) {
      test(`Login validation workflow for: ${username}`, async ({ loginPage, inventoryPage, testData }) => {
        if (username === 'performance_glitch_user') {
          test.setTimeout(20_000);
        }

        await test.step(`Validate the ${username} login workflow`, async () => {
          const loginStartedAt = performance.now();
          await loginPage.loginAndValidate(username, testData.generalPassword);

          if (username !== 'locked_out_user') {
            await inventoryPage.validateInventoryBehavior(username, loginStartedAt);
          }
        });
      });
    }
  });
});