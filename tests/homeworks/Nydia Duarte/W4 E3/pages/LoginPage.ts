import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly inputUsername: Locator;
  readonly inputPassword: Locator;
  readonly buttonLogin: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputUsername = page.locator('#user-name');
    this.inputPassword = page.locator('#password');
    this.buttonLogin = page.locator('#login-button');
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.inputUsername.fill(username);
    await this.inputPassword.fill(password);
    await this.buttonLogin.click();
  }
}