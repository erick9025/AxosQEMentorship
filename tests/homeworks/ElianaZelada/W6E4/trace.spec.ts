// Importa las funciones de Playwright para crear pruebas y hacer aserciones.
import { test, expect } from "@playwright/test";

// Importa los Page Objects que encapsulan las acciones y elementos de cada página.
import { LoginPage } from "../W4E5/Pages/LoginPage";
import { InventoryPage } from "../W4E5/Pages/InventoryPage";

// Carga las credenciales de prueba desde el archivo JSON.
const Datos = require("../W4E5/data/Users.json");

// Agrupa las pruebas relacionadas con el inicio de sesión.
test.describe("Pruebas de login", () => {
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
    const User = Datos.usuarios.standard;

    await loginPage.login(User.username, User.password);

    await expect(inventoryPage.ProductsTitle).toHaveText("Products");
    await expect(inventoryPage.ProductsTitle).toBeVisible();
    expect(await inventoryPage.getInventoryURL()).toMatch(/inventory\.html/);
  });

  // Comprueba que el usuario bloqueado no pueda iniciar sesión.
  test("Verify that locked out user cannot login", async () => {
    const User = Datos.usuarios.bloqueado;

    await loginPage.login(User.username, User.password);
    // Falla a propósito: este selector no existe en la página.
    await expect(loginPage.errorMessage).toContainText("locked out");
  });

  // Comprueba que la cuenta visual muestre la imagen esperada.
  test("Visual user displays the expected image", async ({ page }) => {
    const User = Datos.usuarios.Visual;

    await loginPage.login(User.username, User.password);

    await expect(inventoryPage.ProductsTitle).toHaveText("Products");

    // Muestra información de diagnóstico en la consola de la prueba.
    console.log("URL actual:", page.url());
    console.log(
      "Cantidad de imágenes:",
      await inventoryPage.InventoryItemImage.count(),
    );

    // Obtiene la dirección de la imagen y verifica que sea la esperada.
    const imageSrc = await inventoryPage.getImagesSource();
    console.log("Image src:", imageSrc);

    expect(imageSrc).toContain("/assets/sl-404-Cq1a9k9X.jpg");
  });

  // Intercepta las solicitudes de red para impedir la descarga de imágenes.
  test("Bloquea las imágenes para acelerar la prueba", async ({ page }) => {
    const User = Datos.usuarios.standard;

    // Lleva la cuenta de las solicitudes de imágenes que se cancelan.
    let imagenesBloqueadas = 0;

    // Examina cada solicitud: cancela imágenes y permite continuar las demás.
    await page.route("**/*", async (route) => {
      if (route.request().resourceType() === "image") {
        imagenesBloqueadas += 1;
        await route.abort();
        return;
      }

      await route.continue();
    });

    // Inicia sesión; las solicitudes de imágenes del inventario se interceptan.
    await loginPage.login(User.username, User.password);

    // Confirma que la página cargó y que al menos una imagen fue bloqueada.
    await expect(inventoryPage.ProductsTitle).toHaveText("Products");
    expect(imagenesBloqueadas).toBeGreaterThan(0);
  });
});
