import { expect, test } from '@playwright/test';
import { LocationCreation } from '../../pom/api/clients/locationCreation';

test.describe('Location Creation and Validation', () => {
  test('Create a place with a POST call and retrieve it successfully with a GET call', async ({
    request,
  }) => {
    const locationCreation = new LocationCreation(request);
    const datetime = new Date().toISOString();
    const uniqueId = Date.now();

    const requestBody = {
      location: {
        lat: 51.55778,
        lng: -0.10278,
      },
      accuracy: 2,
      name: `Highbury Square ${uniqueId}`,
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

    const createResponse =
      await locationCreation.createLocation(requestBody);

    expect(createResponse.status()).toBe(200);

    const createResponseBody = await createResponse.json();

    expect(createResponseBody.status).toBe('OK');
    expect(createResponseBody.place_id).toBeTruthy();
    expect(createResponseBody.scope).toBe('APP');
    expect(createResponseBody.reference).toBeTruthy();

    const { place_id } = createResponseBody;

    const getResponse =
      await locationCreation.getLocation(place_id);

    expect(getResponse.status()).toBe(200);

    const getResponseBody = await getResponse.json();

    expect(getResponseBody).toMatchObject({
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

    const latitude = Number(getResponseBody.location.latitude);
    const longitude = Number(getResponseBody.location.longitude);

    expect(Number.isFinite(latitude)).toBe(true);
    expect(Number.isFinite(longitude)).toBe(true);

    expect(latitude).toBeGreaterThanOrEqual(-90);
    expect(latitude).toBeLessThanOrEqual(90);

    expect(longitude).toBeGreaterThanOrEqual(-180);
    expect(longitude).toBeLessThanOrEqual(180);

    expect(getResponseBody.name).toBe(requestBody.name);
    expect(getResponseBody.phone_number).toBe(
      requestBody.phone_number
    );
    expect(getResponseBody.address).toBe(requestBody.address);
    expect(getResponseBody.website).toBe(requestBody.website);
    expect(getResponseBody.language).toBe(requestBody.language);

    expect(getResponseBody.accuracy.trim().length).toBeGreaterThan(0);
    expect(getResponseBody.name.trim().length).toBeGreaterThan(0);
    expect(getResponseBody.phone_number.trim().length).toBeGreaterThan(0);
    expect(getResponseBody.address.trim().length).toBeGreaterThan(0);
    expect(getResponseBody.types.trim().length).toBeGreaterThan(0);
    expect(getResponseBody.website.trim().length).toBeGreaterThan(0);
    expect(getResponseBody.language.trim().length).toBeGreaterThan(0);
    expect(getResponseBody.types).toContain(datetime);
  });
});