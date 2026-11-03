import { test, expect } from '@playwright/test';
import { ReqresClient } from '../api/ReqresClient';
import type { CreatedUser } from '../interfaces/reqres';

test('Verify creation and persistence behavior using client pattern', async ({ request }) => {
    const reqres = new ReqresClient(request);

    // Execution of user creation using the defined client method
    const createResponse = await reqres.createUser('Brian Terrazas', 'QA Automation Engineer');
    expect(createResponse.status()).toBe(201);

    // Extraction of the typed response body
    const createdBody = await createResponse.json() as CreatedUser;
    const extractedId = createdBody.id;
    
    // Verification of properties on the created object
    expect(extractedId).toBeDefined();
    expect(createdBody.name).toBe('Brian Terrazas');

    // Execution of the sequential GET request using the extracted ID
    const getResponse = await reqres.getUserById(extractedId);
    
    // Assertion verifying that the mock server does not persist the record
    expect(getResponse.status()).toBe(404);
    
    const getBody = await getResponse.json();
    console.log(`GET response verification status: ${getResponse.status()}`);
    console.log(`Server empty response verification: ${JSON.stringify(getBody)}`);
});
