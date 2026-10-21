
import { test, expect, APIResponse } from '@playwright/test';

test.describe('API dummy', () => {


//Test get API
    test('Get product teen', async ({ request }) => {
    const responseObject: APIResponse = await request.get(
      'https://fakestoreapi.com/products/10'
    );

    const statusCode: number = responseObject.status();

    console.log('Status code: ' + statusCode);
    expect(statusCode).toBe(200);
    const responseJson = await responseObject.json();
    console.log(responseJson);

    // Validando de los datos de la respuesta
    expect(responseJson.id).toBe(10);
    expect(responseJson.title).toBe('SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s');
    expect(responseJson.price).toBe(109);
    expect(responseJson.category).toBe('electronics');

    console.log('Product title: ' + responseJson.title);
    console.log('Product price: ' + responseJson.price);
    console.log('Product description: ' + responseJson.description);
  });


  //Test Post API
  test('Create product', async ({ request }) => {
    const responseObject: APIResponse = await request.post(
      'https://fakestoreapi.com/products',
      {
        data: {
          title: 'New product',
          price: 18,
          description: 'Product created by Roberto',
          category: 'electronics'
        }
      }
    );

    const statusCode: number = responseObject.status();

    console.log('Status code: ' + statusCode);
    expect(statusCode).toBe(201);

    const responseJson: any = await responseObject.json();

    console.log(responseJson);
    console.log('Product ID: ' + responseJson.id);
    console.log('Product title: ' + responseJson.title);
  });

});
