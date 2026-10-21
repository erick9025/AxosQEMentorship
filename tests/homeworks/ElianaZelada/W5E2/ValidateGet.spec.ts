import { test, expect } from "@playwright/test";

test.describe("API dummy", () => {
  test("Get API", async ({ request }) => {
    const response = await request.get(
      "https://rahulshettyacademy.com/maps/api/place/get/json?key=qaclick123&place_id=e62147df4d064b076c94c4cdb0e72d09",
    );

    expect(response.status()).toBe(200);

    const body = await response.json();
    const latitude = Number(body.location.latitude);
    const longitude = Number(body.location.longitude);

    expect(Number.isFinite(latitude)).toBe(true);
    expect(latitude).toBeGreaterThanOrEqual(-90);
    expect(latitude).toBeLessThanOrEqual(90);

    expect(Number.isFinite(longitude)).toBe(true);
    expect(longitude).toBeGreaterThanOrEqual(-180);
    expect(longitude).toBeLessThanOrEqual(180);

    const accuracy = Number(body.accuracy);
    expect(Number.isFinite(accuracy)).toBe(true);

    for (const field of [
      "name",
      "phone_number",
      "address",
      "types",
      "website",
      "language",
    ]) {
      expect(String(body[field]).trim().length).toBeGreaterThan(0);
    }
  });
});
