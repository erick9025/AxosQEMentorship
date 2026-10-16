
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly inputUsername: Locator;
  readonly inputPassword: Locator;
  readonly buttonLogin: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Username input locator
    this.inputUsername = page.locator('#user-name');

    // Password input locator
    this.inputPassword = page.locator('#password');

    // Login button locator
    this.buttonLogin = page.locator('#login-button');

    // Error message locator
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Navigate to the login page
  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // Enter the username
  async enterUsername(username: string) {
    await this.inputUsername.fill(username);
  }

  // Enter the password
  async enterPassword(password: string) {
    await this.inputPassword.fill(password);
  }

  // Click the login button
  async clickLogin() {
    await this.buttonLogin.click();
  }

  // Log in using the provided credentials
  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  // Verify that the error message is visible
  async verifyErrorMessage() {
    await expect(this.errorMessage).toBeVisible();
  }
}
