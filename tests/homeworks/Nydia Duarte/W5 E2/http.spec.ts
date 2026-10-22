import { test, expect, APIResponse } from '@playwright/test';

test.describe('API Testing with Playwright', () => {
  const baseURL: string = 'https://reqres.in/api';

  // Test 1: GET
  test('GET - List users', async ({ request }) => {
    const response: APIResponse = await request.get(`${baseURL}/users?page=2`);

    // Verify status code is 200 OK
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    // Verify response contains data
    expect(body).toBeDefined();
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.page).toBe(2);
  });

  // Test 2: POST
  test('POST - Create user', async ({ request }) => {
    const payload = {
      name: 'Jazmín',
      job: 'QA Automation Engineer'
    };

    const response: APIResponse = await request.post(`${baseURL}/users`, {
      data: payload,
      headers: { 'Content-Type': 'application/json' }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.name).toBe(payload.name);
  });
});