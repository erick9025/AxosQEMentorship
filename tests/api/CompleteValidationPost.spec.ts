import { expect, test } from "@playwright/test";

type User = {
  id: number;
  email: string;
  username: string;
};

const usersUrl = "https://fakestoreapi.com/users";

test("crea un usuario, consulta el ID y valida /users en el navegador", async ({
  page,
  request,
}) => {
  const uniqueValue = Date.now();
  const newUser = {
    email: `playwright.${uniqueValue}@example.com`,
    username: `pwuser${uniqueValue}`,
    password: "TestPass123",
    name: {
      firstname: "Playwright",
      lastname: "Test",
    },
    address: {
      city: "La Paz",
      street: "Calle de prueba",
      number: 123,
      zipcode: "00000",
      geolocation: {
        lat: "-16.5",
        long: "-68.15",
      },
    },
    phone: "555-0100",
  };

  // POST: FakeStoreAPI responde 201 y devuelve el ID simulado.
  const postResponse = await request.post(usersUrl, { data: newUser });
  expect(postResponse.status()).toBe(201);

  const createdUser = (await postResponse.json()) as { id: number };
  expect(createdUser.id).toBeTruthy();

  // GET: consulta con el ID que devolvió el POST. Las altas no se persisten.
  const getResponse = await request.get(`${usersUrl}/${createdUser.id}`);
  expect(getResponse.status()).toBe(200);

  const userById = (await getResponse.json()) as User | null;

  // UI: abre /users y valida el JSON que el navegador muestra.
  const pageResponse = await page.goto(usersUrl);
  expect(pageResponse?.status()).toBe(200);

  const displayedUsers = JSON.parse(
    await page.locator("body").innerText(),
  ) as User[];
  expect(displayedUsers.length).toBeGreaterThan(0);
  await expect(page.locator("body")).toContainText(displayedUsers[0].username);

  if (userById === null) {
    // El ID simulado no existe en el listado porque el POST no guarda el usuario.
    expect(displayedUsers.some((user) => user.id === createdUser.id)).toBe(false);
    await expect(page.locator("body")).not.toContainText(newUser.username);
  } else {
    // Si el ID coincide con un usuario de muestra, el GET y la UI deben concordar.
    expect(userById.id).toBe(createdUser.id);
    expect(displayedUsers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: userById.id,
          email: userById.email,
          username: userById.username,
        }),
      ]),
    );
    await expect(page.locator("body")).toContainText(userById.username);
    await expect(page.locator("body")).toContainText(userById.email);
  }
});
