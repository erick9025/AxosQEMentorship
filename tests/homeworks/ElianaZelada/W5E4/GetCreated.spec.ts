import { test, expect } from "@playwright/test";

test("Crear un lugar y buscarlo con GET", async ({ request }) => {
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

  const postResponse = await request.post(
    "https://rahulshettyacademy.com/maps/api/place/add/json?key=qaclick123",
    { data: payload },
  );

  expect(postResponse.status()).toBe(200);

  const postBody = await postResponse.json();
  expect(postBody.status).toBe("OK");

  const placeId = postBody.place_id;
  expect(placeId).toBeTruthy();
  console.log("ID del lugar creado:", placeId);

  const getResponse = await request.get(
    `https://rahulshettyacademy.com/maps/api/place/get/json?key=qaclick123&place_id=${placeId}`,
  );

  expect(getResponse.status()).toBe(200);

  const getBody = await getResponse.json();
  console.log("Lugar encontrado:", getBody);

  expect(getBody.name).toBe(payload.name);
});
