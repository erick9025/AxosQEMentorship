import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly InputUsername: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.InputUsername = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    // Falla a propósito: este selector no existe en la página.
    this.errorMessage = page.locator('[data-test="erroressssssssssss"]');
  }

  async navigateToLoginPage() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(userName: string, password: string) {
    await this.InputUsername.fill(userName);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
