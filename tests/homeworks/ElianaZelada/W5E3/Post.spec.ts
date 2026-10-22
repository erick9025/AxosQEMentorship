import { test, expect } from "@playwright/test";

test.describe("API dummy", () => {
  test("POST API - crear lugar", async ({ request }) => {
    const payload = {
      location: {
        lat: -73.383494,
        lng: 83.427362,
      },
      accuracy: 2,
      name: "Cafe Unosquare Mentorship",
      phone_number: "(52) 55 4000 4000",
      address: "Patria 123",
      types: ["coffe", "restaurant", "bar", "brunch"],
      website: "https://unosquare.com",
      language: "United States-SP",
    };

    const response = await request.post(
      "https://rahulshettyacademy.com/maps/api/place/add/json?key=qaclick123",
      { data: payload },
    );

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log("Response body:", body);
  });
});
