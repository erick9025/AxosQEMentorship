import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly inputDeUsuario;
  readonly elBotonParaEntrar;
  readonly mensajeDeError;

  constructor(page: Page) {
    this.page = page;
    // Localizadores usando selectores estándar de la página
    this.inputDeUsuario = page.locator('input[name="login"]');
    this.elBotonParaEntrar = page.locator('input.btn-primary');
    this.mensajeDeError = page.locator('div.js-flash-alert');
  }

  async abrirPagina() {
    await this.page.goto('https://github.com');
  }

  async realizarLogin(correo: string) {
    await this.inputDeUsuario.fill(correo);
    await this.elBotonParaEntrar.click();
  }

  async obtenerTextoError(): Promise<string> {
    // wait() espera automáticamente a que el elemento aparezca en el DOM
    await this.mensajeDeError.waitFor(); 
    return await this.mensajeDeError.innerText();
  }
}
