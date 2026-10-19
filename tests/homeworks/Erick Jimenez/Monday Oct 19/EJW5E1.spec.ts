import { test, expect, APIResponse } from '@playwright/test';

test.describe('API dummy', () => {

  test('Get product seventeen', async ({ request }) => {
    const responseObject: APIResponse<any> = await request.get(`https://fakestoreapi.com/products/17`);
    const statusCode: number = await responseObject.status();

    console.log("Status code: " + statusCode);
    expect(statusCode).toBe(200);    

    const responseJson: any = await responseObject.json(); 

    console.log(responseJson);

    console.log("Product title: " + responseJson.title);
    console.log("Product price: " + responseJson.price);
    console.log("Product description: " + responseJson.description);

  });

  for(let i = 1; i <= 20; i++) {
    test(`Get product ${i}`, async ({ request }) => {
      const responseObject: APIResponse<any> = await request.get(`https://fakestoreapi.com/products/${i}`);
      const statusCode: number = await responseObject.status();

      console.log("Status code: " + statusCode);
      expect(statusCode).toBe(200);

      const responseJson: any = await responseObject.json();

      console.log(responseJson);

      console.log("Product title: " + responseJson.title);
      console.log("Product price: " + responseJson.price);
      console.log("Product description: " + responseJson.description);
    });
  }
});
