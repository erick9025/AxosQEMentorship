import { expect, test } from '@playwright/test';
import { FakeStoreApi, type CreatedResource, type Product } from '../../pom/api/FakeStoreApi';

test.describe('Productos de Fake Store API', () => {
  test('obtiene un producto por ID', async ({ request }) => {
    const api = new FakeStoreApi(request);
    const response = await api.getProduct(10);

    expect(response.status()).toBe(200);

    const product = await response.json() as Product;
    expect(product).toMatchObject({
      id: 10,
      title: 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
      price: 109,
      category: 'electronics',
    });
  });

  test('crea un producto', async ({ request }) => {
    const api = new FakeStoreApi(request);
    const product = {
      title: 'New product',
      price: 18,
      description: 'Product created by the Playwright framework',
      category: 'electronics',
    };
    const response = await api.createProduct(product);

    expect(response.status()).toBe(201);

    const createdProduct = await response.json() as CreatedResource;
    expect(createdProduct.id).toEqual(expect.any(Number));
    expect(createdProduct.title).toBe(product.title);
  });
});
