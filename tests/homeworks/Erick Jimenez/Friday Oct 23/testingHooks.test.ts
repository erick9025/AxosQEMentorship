import { test, expect } from '@playwright/test';

test.describe('Testing hooks', () => {
    // Hooks
    test.beforeAll('BEFORE ALL', async () => { // 1
        console.log("This block gets executed ONLY ONCE at the START of the entire execution");
        // await instruction;
    });

    test.beforeEach('BEFORE EACH', async () => { // 3
        console.log("This block gets executed ONE TIME BEFORE each test");
        // await instruction;
    });

    test.afterEach('AFTER EACH', async () => { // 3
        console.log("This block gets executed ONE TIME AFTER each test");
        // await instruction;
    });

    test.afterAll('AFTER ALL', async () => { // 1
        console.log("This block gets executed ONLY ONCE at the END the entire execution");
        // await instruction;
    });

    // Tests

    test('TEST 1', async ({ page }) => { // 2
        console.log("Started test 1");
        await page.goto("https://facebook.com");        
        //expect(false).toBe(true); // Force failure
        console.log("Finished test 1");
    });

    test('TEST 2', async ({ page }) => { // 2
        console.log("Started test 2");
        await page.goto("https://facebook.com");
        console.log("Finished test 2");
    });

    test('TEST 3', async ({ page }) => { // 2
        console.log("Started test 3");
        await page.goto("https://facebook.com");
        console.log("Finished test 3");
    });
});