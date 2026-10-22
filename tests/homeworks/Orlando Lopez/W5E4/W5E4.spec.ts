
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
      console.log(
        'Name: ' + user.name.firstname + ' ' + user.name.lastname
      );
      console.log('Email: ' + user.email);
      console.log('Username: ' + user.username);
    });

  });

  test('Create a new user and verify it with GET', async ({ request }) => {

    // 1. Define the new user data
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

    // 2. Create the user using POST
    const postResponse: APIResponse = await request.post(
      'https://fakestoreapi.com/users',
      {
        data: payload
      }
    );

    const postStatusCode: number = postResponse.status();

    console.log('POST response status code: ' + postStatusCode);

    expect(postResponse.ok()).toBeTruthy();
    expect(postStatusCode).toBe(201);

    // 3. Extract the ID from the POST response
    const createdUser = await postResponse.json();

    console.log('Created user:', createdUser);

    const userId = createdUser.id;

    console.log('Created user ID: ' + userId);

    expect(userId).toBeDefined();

    // 4. Retrieve the created user using GET
    const getResponse: APIResponse = await request.get(
      `https://fakestoreapi.com/users/${userId}`
    );

    const getStatusCode: number = getResponse.status();

    console.log('GET response status code: ' + getStatusCode);

    // 5. Validate the GET response
    expect(getResponse.ok()).toBeTruthy();
    expect(getStatusCode).toBe(200);

    // 6. Verify that the returned user has the expected ID
    const foundUser = await getResponse.json();

    console.log('Retrieved user:', foundUser);

    expect(foundUser.id).toBe(userId);

  });

});
