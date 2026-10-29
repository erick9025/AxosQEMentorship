import { test, expect } from "@playwright/test";
import { LoginPage } from "../W4E5/Pages/LoginPage";
import { InventoryPage } from "../W4E5/Pages/InventoryPage";

const Datos = require("../W4E5/data/Users.json");

test.describe("Pruebas de login", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.navigateToLoginPage();
  });

  test.afterEach(async ({ page }) => {
    // Limpia el estado de la página al terminar cada prueba.
    await page.close();
  });

  test("Verify Login successfully with standard user", async () => {
    const User = Datos.usuarios.standard;

    await loginPage.login(User.username, User.password);

    await expect(inventoryPage.ProductsTitle).toHaveText("Products");
    await expect(inventoryPage.ProductsTitle).toBeVisible();
    expect(await inventoryPage.getInventoryURL()).toMatch(/inventory\.html/);
  });

  test("Verify that locked out user cannot login", async () => {
    const User = Datos.usuarios.bloqueado;

    await loginPage.login(User.username, User.password);

    await expect(loginPage.errorMessage).toContainText("locked out");
  });

  test("Visual user displays the expected image", async ({ page }) => {
    const User = Datos.usuarios.Visual;

    await loginPage.login(User.username, User.password);

    await expect(inventoryPage.ProductsTitle).toHaveText("Products");

    console.log("URL actual:", page.url());
    console.log(
      "Cantidad de imágenes:",
      await inventoryPage.InventoryItemImage.count(),
    );

    const imageSrc = await inventoryPage.getImagesSource();
    console.log("Image src:", imageSrc);

    expect(imageSrc).toContain("/assets/sl-404-Cq1a9k9X.jpg");
  });
  test("Bloquea las imágenes para acelerar la prueba", async ({ page }) => {
    const User = Datos.usuarios.standard;
    let imagenesBloqueadas = 0;

    await page.route("**/*", async (route) => {
      if (route.request().resourceType() === "image") {
        imagenesBloqueadas += 1;
        await route.abort();
        return;
      }

      await route.continue();
    });

    await loginPage.login(User.username, User.password);

    await expect(inventoryPage.ProductsTitle).toHaveText("Products");
    expect(imagenesBloqueadas).toBeGreaterThan(0);
  });
});

