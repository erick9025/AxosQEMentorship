import { expect, test } from '@playwright/test';

test.describe('Homework for October 21st', () => {
  test('Validate place can be created', async ({ request }) => {
    const datetime = new Date().toISOString();
    const requestBody = {
      location: {
        lat: 51.55778,
        lng: -0.10278,
      },
      accuracy: 2,
      name: 'Highbury Square',
      phone_number: '(52) 55 4000 4000',
      address:
        'QEMentorshiptest, Avenell Road, Highbury, London, N5, England',
      types: [
        'football',
        'arsenal',
        'entertainment',
        'stadium',
        'QEMentorshipTest',
        datetime,
      ],
      website: 'https://www.arsenal.com/',
      language: 'United States-SP',
    };

    const response = await request.post(
      'https://rahulshettyacademy.com/maps/api/place/add/json',
      {
        params: {
          key: 'qaclick1234',
        },
        data: requestBody,
      }
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log(JSON.stringify(responseBody, null, 2));

    expect(responseBody.status).toBe('OK');
    expect(responseBody.place_id).toBeTruthy();
    expect(responseBody.scope).toBe('APP');
    expect(responseBody.reference).toBeTruthy();
  });
});