import { expect, test } from '@playwright/test';

test.describe('Homework for the 23th of October', () => {
  test('creates a brand through the API and finds it in the UI', async ({
    request,
    page,
  }) => {
    const uniqueId = Date.now();
    const brand = {
      name: `brand_for_QEMentorship_${uniqueId}`,
      slug: `new-brand-${uniqueId}`,
    };

    const createResponse = await request.post(
      'https://api.practicesoftwaretesting.com/brands',
      { data: brand }
    );

    expect(createResponse.status()).toBe(201);
    expect(await createResponse.json()).toMatchObject(brand);

    await page.goto('https://practicesoftwaretesting.com/');
    await expect(
      page.getByRole('checkbox', { name: brand.name, exact: true })
    ).toBeVisible();
  });
});
