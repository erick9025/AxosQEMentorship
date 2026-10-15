import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usuario;
  readonly boton;

  constructor(page: Page) {
    this.page = page;

    // Localizador del campo de usuario
    this.usuario = page.locator('#user-name');

    // Localizador del botón de login
    this.boton = page.locator('#login-button');
  }
}