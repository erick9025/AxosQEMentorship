import { expect, test } from '@playwright/test';

test.describe('Homework for the 19th of October', () => {
  test('Print the location details from the api call', async ({ request }) => {
    const response = await request.get(
      'https://rahulshettyacademy.com/maps/api/place/get/json',
      {
        params: {
        key: 'qaclick123',
        place_id: 'e5c8484abb256e67d44b1824c61b38ec',
      },
    },
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  console.log(JSON.stringify(responseBody, null, 2));
  });

});