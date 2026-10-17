import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginBox: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginBox = page.locator('#login_button_container');
    this.usernameInput = page.locator('[id="user-name"]');
    this.passwordInput = page.locator('[id="password"]');
    this.loginButton = page.locator('[id="login-button"]');
    this.errorContainer = page.locator('[data-test="error"]');
  }

  async navigate() {
    await this.page.goto('https://saucedemo.com');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async validateLoginBoxVisible() {
    await expect(this.loginBox).toBeVisible();
  }

  async validateFormElementsVisible() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async loginAndValidate(username: string, password: string) {
    const startTime = Date.now();
    await this.login(username, password);
    const duration = Date.now() - startTime;

    if (username === 'locked_out_user') {
      await expect(this.errorContainer).toBeVisible();
      await expect(this.errorContainer).toContainText('locked out');
    }

    return { duration };
  }
}
