import { Page, Locator } from '@playwright/test';

export class SaucePage {
  readonly page: Page;
  readonly loginBox: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorContainer: Locator;
  readonly productSortContainer: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginBox = page.locator('#login_button_container');
    this.usernameInput = page.locator('[id="user-name"]');
    this.passwordInput = page.locator('[id="password"]');
    this.loginButton = page.locator('[id="login-button"]');
    this.errorContainer = page.locator('[data-test="error"]');
    this.productSortContainer = page.locator('[class="product_sort_container"]');
    this.pageTitle = page.locator('[class="title"]');
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
