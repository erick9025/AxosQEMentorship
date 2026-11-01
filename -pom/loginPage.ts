import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly inputUsername: Locator;
  readonly inputPassword: Locator;
  readonly buttonLogin: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.inputUsername = page.locator('#user-name');
    this.inputPassword = page.locator('#password');
    this.buttonLogin = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async enterUsername(username: string): Promise<void> {
    await this.inputUsername.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.inputPassword.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.buttonLogin.click();
  }

  async login(
    username: string,
    password: string
  ): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async verifyErrorMessage(): Promise<void> {
    await this.errorMessage.waitFor({
      state: 'visible'
    });
  }
}
