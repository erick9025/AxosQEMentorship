import { expect, test } from "@playwright/test";

test("creates an object and retrieves it by its generated ID", async ({ request }) => {
  const payload = {
    name: `Playwright object ${Date.now()}`,
    data: {
      year: 2024,
      price: 1299.99,
      color: "Black",
    },
  };

  const createResponse = await request.post("https://api.restful-api.dev/objects", { data: payload });
  expect(createResponse.ok()).toBeTruthy();

  const createdObject = await createResponse.json();
  expect(createdObject.id).toBeTruthy();
  expect(createdObject.name).toBe(payload.name);

  const getResponse = await request.get(`https://api.restful-api.dev/objects/${createdObject.id}`);
  expect(getResponse.ok()).toBeTruthy();

  const retrievedObject = await getResponse.json();
  expect(retrievedObject.id).toBe(createdObject.id);
  expect(retrievedObject.name).toBe(payload.name);
  expect(retrievedObject.data).toEqual(payload.data);
});

