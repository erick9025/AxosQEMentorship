import { test, expect, APIResponse } from "@playwright/test";

test.describe("API dummy", () => {
  test("Get API", async ({ request }) => {
    const response = await request.get(
      "https://rahulshettyacademy.com/maps/api/place/get/json?key=qaclick123&place_id=e62147df4d064b076c94c4cdb0e72d09",
    );

    expect(response.status()).toBe(200);
    const body: any = await response.json();

    console.log("Response body:", body);

    console.log("latitude:", body.location.latitude);
    console.log("longitude:", body.location.longitude);
    console.log("accuracy:", body.accuracy);
    console.log("name:", body.name);
    console.log("phone_number:", body.phone_number);
    console.log("address:", body.address);
    console.log("types:", body.types);
    console.log("website:", body.website);
    console;
  });
});
