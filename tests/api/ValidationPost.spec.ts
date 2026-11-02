import { test, expect } from "@playwright/test";
//crea un lugar y luego lo busca con GET, validando que los datos sean correctos
test("Crear un lugar Con post ", async ({ request }) => {
  const payload = {
    location: {
      lat: 90.383494,
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
  //POST request to create a new place
  const postResponse = await request.post(
    "https://rahulshettyacademy.com/maps/api/place/add/json?key=qaclick123",
    { data: payload },
  );

  //Validar que la respuesta del POST sea exitosa y que el lugar se haya creado correctamente
  expect(postResponse.status()).toBe(200);
  //Validar que la respuesta del POST contenga un place_id válido
  const postBody = await postResponse.json();
  expect(postBody.status).toBe("OK");
  expect(postBody.place_id).toBeTruthy();
  //Obtener el place_id del lugar creado
  const placeId = postBody.place_id;
  console.log("ID del lugar creado:", placeId);

  //get para buscar el lugar creado con el place_id obtenido del POST
  const getResponse = await request.get(
    "https://rahulshettyacademy.com/maps/api/place/get/json",
    { params: { key: "qaclick123", place_id: placeId } },
  );
  //verificar que la respuesta del GET sea exitosa y que los datos del lugar sean correctos
  expect(getResponse.status()).toBe(200);
  //Validar que la respuesta del GET contenga los datos correctos del lugar creado
  const getBody = await getResponse.json();
  console.log("Lugar encontrado:", getBody);
  //validar que los datos del lugar encontrado sean iguales a los datos del lugar creado

  expect(Number(getBody.location.latitude)).toBe(payload.location.lat);
  expect(Number(getBody.location.longitude)).toBe(payload.location.lng);
  expect(Number(getBody.accuracy)).toBe(payload.accuracy);
  expect(getBody.name).toBe(payload.name);
  expect(getBody.phone_number).toBe(payload.phone_number);
  expect(getBody.address).toBe(payload.address);
  expect(getBody.types.split(",")).toEqual(payload.types);
  expect(getBody.website).toBe(payload.website);
  expect(getBody.language).toBe(payload.language);
});
