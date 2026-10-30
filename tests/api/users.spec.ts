import { expect, test } from '@playwright/test';
import { FakeStoreApi, type CreatedResource, type NewUser } from '../../pom/api/FakeStoreApi';

test('crea un usuario', async ({ request }) => {
  const api = new FakeStoreApi(request);
  const user: NewUser = {
    email: 'roberto@example.com',
    username: 'roberto123',
    password: 'password123',
    name: {
      firstname: 'Roberto',
      lastname: 'Gonzalez',
    },
    address: {
      city: 'Guadalajara',
      street: 'Av. Mexico',
      number: 123,
      zipcode: '44100',
      geolocation: {
        lat: '20.6736',
        long: '-103.344',
      },
    },
    phone: '3312345678',
  };
  const response = await api.createUser(user);

  expect(response.status()).toBe(201);

  const createdUser = await response.json() as CreatedResource;
  expect(createdUser.id).toEqual(expect.any(Number));
});
