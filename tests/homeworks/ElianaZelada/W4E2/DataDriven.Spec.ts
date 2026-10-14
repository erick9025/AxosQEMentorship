// Ejercicio 4: el usuario ya no está "quemado" en el código; se lee de data/usuarios.json.

import * as fs from "fs";
import * as path from "path";
import { test, expect } from "@playwright/test";

// El "molde" de los datos (igual que la interfaz del ejercicio 2).
interface Credenciales {
  username: string;
  password: string;
}

interface DatosDePrueba {
  baseUrl: string;
  usuarios: Record<string, Credenciales>;
}

// Leemos el archivo una sola vez, al cargar el spec.
// __dirname = la carpeta de ESTE archivo, así la ruta funciona sin importar desde dónde se ejecute.
const RutaDatos = path.join(__dirname, "data", "usuarios.json");
const Datos: DatosDePrueba = JSON.parse(fs.readFileSync(RutaDatos, "utf8"));

test("Login exitoso con usuario standard", async ({ page }) => {
  const Usuario = Datos.usuarios.standard;

  await page.goto(Datos.baseUrl);
  await page.getByPlaceholder("Username").fill(Usuario.username);
  await page.getByPlaceholder("Password").fill(Usuario.password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator(".title")).toHaveText("Products");
});

test("Login bloqueado muestra mensaje de error", async ({ page }) => {
  const usuario = Datos.usuarios.bloqueado;

  await page.goto(Datos.baseUrl);
  await page.getByPlaceholder("Username").fill(usuario.username);
  await page.getByPlaceholder("Password").fill(usuario.password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.locator('[data-test="error"]')).toContainText("locked out");
});
