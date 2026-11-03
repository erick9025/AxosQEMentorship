import { test, expect } from '@playwright/test';
import { RestfulApiClient } from '../api/RestfulApiClient';

test('Creates a record through the API and verifies it visually in the browser', async ({ request, page }) => {
    const api = new RestfulApiClient(request);
    const timestamp = Date.now();
    
    // Setup of data payload containing the required name and details
    const userData = {
        name: `Brian Terrazas ${timestamp}`,
        data: {
            email: `brian-${timestamp}@example.test`,
            job: "QA Automation Engineer"
        }
    };

    // Step 1: Backend record creation via POST request
    const createdUser = await test.step('Create a record through the API', async () => {
        const response = await api.createObject(userData);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.name).toBe(userData.name);
        expect(responseBody.data).toEqual(userData.data);
        
        return responseBody;
    });

    // Step 2: Backend verification via GET request using the generated ID
    const retrievedUser = await test.step('Retrieve the record by ID', async () => {
        const response = await api.getObjectById(createdUser.id);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.id).toBe(createdUser.id);
        expect(responseBody.name).toBe(createdUser.name);
        
        return responseBody;
    });

    // Step 3: Viewport verification by rendering the target payload directly in the browser
    await test.step('Verify the retrieved record in the browser', async () => {
        const response = await page.goto(`https://api.restful-api.dev/objects/${encodeURIComponent(retrievedUser.id)}`);
        expect(response?.status()).toBe(200);

        // Verification of literal string occurrences inside the visible HTML body
        const pageDocument = page.locator('html');
        await expect(pageDocument).toContainText(retrievedUser.id);
        await expect(pageDocument).toContainText(retrievedUser.name);
        await expect(pageDocument).toContainText(retrievedUser.data.email);
        await expect(pageDocument).toContainText(retrievedUser.data.job);
    });
});
