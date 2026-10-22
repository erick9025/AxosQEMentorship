import { test, expect } from '@playwright/test';

test('should create a new user via API and return 201 Created', async ({ request }) => {
  const newUserPayload = {
    name: 'Jane Doe',
    job: 'QA Engineer',
    email: 'jane.doe@example.com'
  };

  const response = await request.post('https://reqres.in/api/users', {
    data: newUserPayload,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  expect(response.status()).toBe(201);

  const responseBody = await response.json();
  expect(responseBody).toMatchObject({
    name: newUserPayload.name,
    job: newUserPayload.job
  });
});