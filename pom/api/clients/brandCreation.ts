import type { APIRequestContext, APIResponse } from '@playwright/test';

const BRANDS_ENDPOINT =
  'https://api.practicesoftwaretesting.com/brands';

export type Brand = {
  name: string;
  slug: string;
};

export class BrandCreation {
  constructor(private readonly request: APIRequestContext) {}

  createBrand(brand: Brand): Promise<APIResponse> {
    return this.request.post(BRANDS_ENDPOINT, { data: brand });
  }
}