import { Page, Locator } from '@playwright/test';

export class LoginPage {
  // 1. Declaramos las variables que guardarán los localizadores
  readonly page: Page;
  readonly inputDeUsuario: Locator;
  readonly elBotonParaEntrar: Locator;
  readonly mensajeDeError: Locator;

  // 2. El constructor recibe la página activa del test y asigna los elementos
  constructor(page: Page) {
    this.page = page;
    this.inputDeUsuario = page.locator('input[name="login"]');
    this.elBotonParaEntrar = page.locator('input.btn-primary');
    this.mensajeDeError = page.locator('div.js-flash-alert');
  }
}
