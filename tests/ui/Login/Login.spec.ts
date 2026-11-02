import { test, expect } from "@playwright/test";

// Importa los Page Objects que encapsulan las acciones y elementos de cada página.
import { LoginPage } from "../../../pom/pages/LoginPage";
import { InventoryPage } from "../../../pom/pages/InventoryPage";

// Carga las credenciales de prueba desde el archivo JSON.
const Data = require("../../../pom/data/Users.json");

// Agrupa las pruebas relacionadas con el inicio de sesión.
test.describe("Login test", () => {
  // Variables para acceder a las páginas de login e inventario.
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  // Se ejecuta antes de cada prueba: crea los Page Objects y abre el login.
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.navigateToLoginPage();
  });

  // Se ejecuta después de cada prueba y cierra la página.
  test.afterEach(async ({ page }) => {
    await page.close();
  });

  // Comprueba que el usuario estándar pueda iniciar sesión y llegar al inventario.
  test("Verify Login successfully with standard user", async () => {
    const User = Data.users.standard;

    await loginPage.login(User.username, User.password);

    await expect(inventoryPage.ProductsTitle).toHaveText("Products");
    await expect(inventoryPage.ProductsTitle).toBeVisible();
    expect(await inventoryPage.getInventoryURL()).toMatch(/inventory\.html/);
  });

  // Comprueba que el usuario bloqueado no pueda iniciar sesión.
  test("Verify that locked out user cannot login", async () => {
    const User = Data.users.Blocked;

    await loginPage.login(User.username, User.password);
    await expect(loginPage.errorMessage).toContainText("locked out");
  });

  // Comprueba que la cuenta visual muestre la imagen esperada.
  test("Visual user displays the expected image", async ({ page }) => {
    const User = Data.users.Visual;

    await loginPage.login(User.username, User.password);

    await expect(inventoryPage.ProductsTitle).toHaveText("Products");

    // Muestra información de diagnóstico en la consola de la prueba.
    console.log("URL actual:", page.url());
    console.log(
      "Total images:",
      await inventoryPage.InventoryItemImage.count(),
    );

    // Obtiene la dirección de la imagen y verifica que sea la esperada.
    const imageSrc = await inventoryPage.getImagesSource();
    console.log("Image src:", imageSrc);

    expect(imageSrc).toContain("/assets/sl-404-Cq1a9k9X.jpg");
  });

  // Intercepta las solicitudes de red para impedir la descarga de imágenes.
  test("Block images to speed up the test", async ({ page }) => {
    const User = Data.users.standard;

    // Lleva la cuenta de las solicitudes de imágenes que se cancelan.
    let blockedImages = 0;

    // Examina cada solicitud: cancela imágenes y permite continuar las demás.
    await page.route("**/*", async (route) => {
      if (route.request().resourceType() === "image") {
        blockedImages += 1;
        await route.abort();
        return;
      }

      await route.continue();
    });

    // Inicia sesión; las solicitudes de imágenes del inventario se interceptan.
    await loginPage.login(User.username, User.password);

    // Confirma que la página cargó y que al menos una imagen fue bloqueada.
    await expect(inventoryPage.ProductsTitle).toHaveText("Products");
    expect(blockedImages).toBeGreaterThan(0);
  });
});
