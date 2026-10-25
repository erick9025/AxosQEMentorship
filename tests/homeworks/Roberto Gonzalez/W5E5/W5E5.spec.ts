

import { test, expect, type APIResponse } from "@playwright/test";

test("Create product using API and validate it in the browser", async ({
  request,
  page,
}) => {
  const baseURL = "https://api.restful-api.dev/objects";

  // 1. Prepare the initial test data
  const timestamp = Date.now();

  const productData = {
    name: `Playwright Product ${timestamp}`,
    data: {
      Nombre: "Roberto Carlos Gonzalez Garcia",
      edad: 36,
      Company: "Unosquare",
      Position: "QA",
    },
  };

  // 2. Create the product through the API
  const apiResponse: APIResponse = await request.post(baseURL, {
    data: productData,
  });

  expect(apiResponse.status()).toBe(200);

  const createdProduct = await apiResponse.json();

  // 3. Validate the API response
  expect(createdProduct).toHaveProperty("id");
  expect(createdProduct.id).toBeTruthy();
  expect(createdProduct.name).toBe(productData.name);
  expect(createdProduct.data).toMatchObject(productData.data);

  console.log(`Product created with ID: ${createdProduct.id}`);

  // 4. Open the created product in the browser
  const browserResponse = await page.goto(
    `${baseURL}/${encodeURIComponent(createdProduct.id)}`
  );

  expect(browserResponse?.status()).toBe(200);

  // 5. Validate the product information visually
  const pageContent = page.locator("body");

  await expect(pageContent).toContainText(createdProduct.id);
  await expect(pageContent).toContainText(productData.name);
  await expect(pageContent).toContainText(
    productData.data.Nombre.toString()
  );
  await expect(pageContent).toContainText(
    productData.data.edad.toString()
  );
  await expect(pageContent).toContainText(productData.data.Company);
  await expect(pageContent).toContainText(productData.data.Position
    
  );
});
