
import { test, expect, APIResponse } from '@playwright/test';

test.describe('Users API', () => {

  test('Get users list', async ({ request }) => {

    const response: APIResponse = await request.get(
      'https://fakestoreapi.com/users'
    );

    const statusCode: number = response.status();

    console.log('Response status code: ' + statusCode);

    expect(response.ok()).toBeTruthy();
    expect(statusCode).toBe(200);

    const users: any[] = await response.json();

    console.log('Number of users: ' + users.length);
    console.log('Complete list of users:', users);

    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);

    users.forEach((user) => {
      console.log('--------------------------');
      console.log('User ID: ' + user.id);
      console.log('Name: ' + user.name.firstname + ' ' + user.name.lastname);
      console.log('Email: ' + user.email);
      console.log('Username: ' + user.username);
    });

  });

});
