import { test, expect } from "@playwright/test";
import { LoginPage } from "../../W4E5/Pages/LoginPage";
import { InventoryPage } from "../../W4E5/Pages/InventoryPage";
const Datos = require("../../W4E5/data/Users.json");

test("Verify Login successfully with standard user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const User = Datos.usuarios.standard;

  await loginPage.navigateToLoginPage();
  await loginPage.login(User.username, User.password);
  await expect(inventoryPage.ProductsTitle).toHaveText("Products");
  await expect(inventoryPage.ProductsTitle).toBeVisible();
  expect(await inventoryPage.getInventoryURL()).toMatch(/inventory\.html/);
});

test("Verify that locked out user cannot login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const User = Datos.usuarios.bloqueado;

  await loginPage.navigateToLoginPage();
  await loginPage.login(User.username, User.password);
  await expect(loginPage.errorMessage).toContainText("locked out");
});

test("Visual user displays the expected image", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const User = Datos.usuarios.Visual;

  await loginPage.navigateToLoginPage();
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
