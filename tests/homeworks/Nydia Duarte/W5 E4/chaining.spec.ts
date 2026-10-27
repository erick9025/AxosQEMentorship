import { test, expect } from '@playwright/test';

test('create user with POST and chain GET request using returned ID', async ({ request }) => {
  // 1. Send POST request to create the user
  const postResponse = await request.post('https://reqres.in/api/users', {
    data: {
      name: 'Jane Doe',
      job: 'QA Engineer'
    }
  });

  // Validate creation using APIResponse methods
  expect(postResponse.ok()).toBeTruthy();
  expect(postResponse.status()).toBe(201);

  // Parse JSON response body and extract the ID
  const createdUser = await postResponse.json();
  const userId = createdUser.id;
  expect(userId).toBeDefined();

  // 2. Chain immediate GET request using the extracted ID
  // Note: For mock endpoints like ReqRes where POSTed IDs aren't persisted,
  // we query an existing ID (e.g. '2') or the created endpoint to verify retrieval.
  const getResponse = await request.get(`https://reqres.in/api/users/${userId}`);

  // Validate GET response status and headers
  expect(getResponse.status()).toBe(200);
  expect(getResponse.headers()['content-type']).toContain('application/json');

  const fetchedUser = await getResponse.json();
  expect(fetchedUser).toBeDefined();
});