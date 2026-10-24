import { test, expect } from "@playwright/test";

test.describe("API dummy", () => {
  test("Get API", async ({ request }) => {
    const response = await request.get(
      "https://rahulshettyacademy.com/maps/api/place/get/json?key=qaclick123&place_id=e62147df4d064b076c94c4cdb0e72d09",
    );

    expect(response.status()).toBe(200);
    const body = await response.json();

    console.log("Response body:", body);

    expect(body.location.latitude).toBeTruthy();
    expect(body.location.longitude).toBeTruthy();
    expect(body.name).toBeTruthy();
  });
});
