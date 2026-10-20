import { expect, test } from '@playwright/test';

test.describe('Homework for the 20th of October', () => {
  test('Validate the api call is working as expected.', async ({ request }) => {
    const response = await request.get(
      'https://rahulshettyacademy.com/maps/api/place/get/json',
      {
        params: {
          key: 'qaclick123',
          place_id: 'e5c8484abb256e67d44b1824c61b38ec',
        },
      }
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log(JSON.stringify(responseBody, null, 2));

    expect(responseBody).toMatchObject({
      location: {
        latitude: expect.any(String),
        longitude: expect.any(String),
      },
      accuracy: expect.any(String),
      name: expect.any(String),
      phone_number: expect.any(String),
      address: expect.any(String),
      types: expect.any(String),
      website: expect.any(String),
      language: expect.any(String),
    });

    const latitude = Number(responseBody.location.latitude);
    const longitude = Number(responseBody.location.longitude);

    expect(Number.isFinite(latitude)).toBe(true);
    expect(Number.isFinite(longitude)).toBe(true);

    expect(latitude).toBeGreaterThanOrEqual(-90);
    expect(latitude).toBeLessThanOrEqual(90);
    expect(longitude).toBeGreaterThanOrEqual(-180);
    expect(longitude).toBeLessThanOrEqual(180);

    expect(responseBody.accuracy.trim().length).toBeGreaterThan(0);
    expect(responseBody.name.trim().length).toBeGreaterThan(0);
    expect(responseBody.phone_number.trim().length).toBeGreaterThan(0);
    expect(responseBody.address.trim().length).toBeGreaterThan(0);
    expect(responseBody.types.trim().length).toBeGreaterThan(0);
    expect(responseBody.website.trim().length).toBeGreaterThan(0);
    expect(responseBody.language.trim().length).toBeGreaterThan(0);
  });
});