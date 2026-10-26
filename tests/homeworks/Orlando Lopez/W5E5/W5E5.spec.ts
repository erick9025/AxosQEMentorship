
import { test, expect, APIResponse } from '@playwright/test';

test.describe('Users API + UI Tests', () => {

  test('Create user by API and validate user information in browser', async ({
    request,
    page
  }) => {

    // 1. Define test data
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

    // 2. Create user through API (POST)
    const postResponse: APIResponse = await request.post(
      'https://fakestoreapi.com/users',
      {
        data: payload
      }
    );

    const postStatusCode = postResponse.status();

    console.log('POST response status code:', postStatusCode);

    expect(postResponse.ok()).toBeTruthy();
    expect(postStatusCode).toBe(201);

    // 3. Read the API response
    const createdUser = await postResponse.json();

    console.log('Created user:', createdUser);

    const userId = createdUser.id;

    expect(userId).toBeDefined();

    console.log('Created user ID:', userId);

    // 4. Open the browser and display the test data
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>User Profile</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 40px;
              background-color: #f4f6f8;
            }

            .user-card {
              background: white;
              padding: 24px;
              border-radius: 10px;
              max-width: 500px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            h1 {
              color: #2563eb;
            }

            p {
              font-size: 16px;
              margin: 12px 0;
            }
          </style>
        </head>
        <body>
          <div class="user-card">
            <h1>User Profile</h1>
            <p data-testid="user-id">ID: ${userId}</p>
            <p data-testid="user-name">
              Name: ${payload.name.firstname} ${payload.name.lastname}
            </p>
            <p data-testid="user-email">
              Email: ${payload.email}
            </p>
            <p data-testid="username">
              Username: ${payload.username}
            </p>
            <p data-testid="user-city">
              City: ${payload.address.city}
            </p>
            <p data-testid="user-phone">
              Phone: ${payload.phone}
            </p>
          </div>
        </body>
      </html>
    `);

    // 5. Validate that the information is visible in the browser
    await expect(page.getByTestId('user-id'))
      .toHaveText(`ID: ${userId}`);

    await expect(page.getByTestId('user-name'))
      .toHaveText('Name: Orlando Lopez');

    await expect(page.getByTestId('user-email'))
      .toHaveText('Email: orlando.lopez@gmail.com');

    await expect(page.getByTestId('username'))
      .toHaveText('Username: orlopez');

    await expect(page.getByTestId('user-city'))
      .toHaveText('City: Tepic');

    await expect(page.getByTestId('user-phone'))
      .toHaveText('Phone: 3111234567');

    // 6. Print final result
    console.log('All UI validations passed successfully.');

  });

});
