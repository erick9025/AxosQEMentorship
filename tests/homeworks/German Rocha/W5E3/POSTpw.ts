import { test, expect } from '@playwright/test';

test('POST request to Reqres.in - Create new user', async ({ request }) => {
    
    // Definition of the payload containing the information for the new user
    const userPayload = {
        name: "Brian Terrazas",
        job: "Automation Engineer"
    };

    // Execution of the POST request sending the payload inside the data property
    const response = await request.post('https://reqres.in', {
        data: userPayload
    });

    // Assertion to verify that the response status code is exactly 201 Created
    expect(response.status()).toBe(201);

    // Conversion of the response body into a readable JSON object
    const responseBody = await response.json();

    // Output of the server response in the console for visual verification
    console.log('--- USER CREATED SUCCESSFULLY ---');
    console.log(JSON.stringify(responseBody, null, 2));

    // Verification that the server successfully generated and assigned an id property
    expect(responseBody).toHaveProperty('id');
});
