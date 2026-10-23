
 
import { test, expect, APIResponse } from '@playwright/test';
 
test.describe('API dummy', () => {
 
  // Test POST: Create new user
  test('Create new user', async ({ request }) => {
 
    const responseObject: APIResponse = await request.post(
      'https://fakestoreapi.com/users',
      {
        data: {
          email: 'roberto@example.com',
          username: 'roberto123',
          password: 'password123',
          name: {
            firstname: 'Roberto',
            lastname: 'Gonzalez'
          },
          address: {
            city: 'Guadalajara',
            street: 'Av. Mexico',
            number: 123,
            zipcode: '44100',
            geolocation: {
              lat: '20.6736',
              long: '-103.344'
            }
          },
          phone: '3312345678'
        }
      }
    );
 
    // Validar el código de respuesta
    const statusCode: number = responseObject.status();
 
    console.log('Status code: ' + statusCode);
    expect(statusCode).toBe(201);
 
    // Obtener y validar la respuesta JSON
    const responseJson = await responseObject.json();
 
    console.log(responseJson);
    const userId: number = responseJson.id;
    console.log('User ID: ' + userId);
    console.log('Username: ' + responseJson.username);

    // Buscar inmediatamente el usuario recién creado por su ID
    const searchResponse: APIResponse = await request.get(
      `https://fakestoreapi.com/users/${userId}`
    );
    expect(searchResponse.status()).toBe(200);

    const searchedUser = await searchResponse.json();
    console.log('User found: ' + searchedUser.username);
    expect(searchedUser.id).toBe(userId);
  });
 
});
