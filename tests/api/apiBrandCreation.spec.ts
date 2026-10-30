import { expect, test } from '@playwright/test';
import { BrandCreation } from '../../test-support/api/clients/brandCreation';

test.describe('Brand Creation and Validation', () => {
  test('creates a brand through the API and finds it in the UI', async ({
    request,
    page,
  }) => {
    const brandCreation = new BrandCreation(request);
    const uniqueId = Date.now();
    const brand = {
      name: `brand_for_QEMentorship_${uniqueId}`,
      slug: `new-brand-${uniqueId}`,
    };

    const createResponse = await brandCreation.createBrand(brand);

    expect(createResponse.status()).toBe(201);
    expect(await createResponse.json()).toMatchObject(brand);

    await page.goto('https://practicesoftwaretesting.com/');
    await expect(
      page.getByRole('checkbox', { name: brand.name, exact: true })
    ).toBeVisible();
  });
});