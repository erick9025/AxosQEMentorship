import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly inputDeUsuario: Locator;
  readonly elBotonParaEntrar: Locator;
  readonly mensajeDeError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputDeUsuario = page.locator('input[name="login"]');
    this.elBotonParaEntrar = page.locator('input.btn-primary');
    this.mensajeDeError = page.locator('div.js-flash-alert');
  }

  // Método para escribir el correo del usuario
  async ingresarUsuario(correo: string) {
    await this.inputDeUsuario.click();
    await this.inputDeUsuario.fill(correo);
  }

  // Método para hacer click en el botón de ingreso
  async hacerClickEnEntrar() {
    await this.elBotonParaEntrar.click();
  }

  // Método para obtener el texto del mensaje de error
  async obtenerTextoError(): Promise<string> {
    return await this.mensajeDeError.innerText();
  }
}
