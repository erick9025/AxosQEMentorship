
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

  test('Create a new user', async ({ request }) => {

    const payload = {
      email: 'orlando.lopez@gmail.com',
      username: 'orlopez',
      password: 'password123',
      name: {
        firstname: 'Orlando',
        lastname: 'Lopez'
      },
      address: {
        city: 'Tepic',
        street: 'Av. Mexico',
        number: 134,
        zipcode: '63000',
        geolocation: {
          lat: '21.505',
          long: '-104.894'
        }
      },
      phone: '3111234567'
    };

    const response: APIResponse = await request.post(
      'https://fakestoreapi.com/users',
      {
        data: payload
      }
    );

    const statusCode: number = response.status();

    console.log('Response status code: ' + statusCode);

    expect(statusCode).toBe(201);
    expect(response.ok()).toBeTruthy();

    const createdUser = await response.json();

    console.log('Created user:', createdUser);

    expect(createdUser).toHaveProperty('id');

  });

});
