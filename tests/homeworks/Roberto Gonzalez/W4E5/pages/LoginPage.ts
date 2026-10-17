import { Page } from '@playwright/test';

export class LoginPage {
  private readonly usernameInput;
  private readonly passwordInput;
  private readonly loginButton;
  readonly productsHeading;
  readonly errorMessage;
  readonly standardUserImage;
  readonly visualUserImage;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.productsHeading = page.getByText('Products', { exact: true });
    this.errorMessage = page.locator('[data-test="error"]');
    this.standardUserImage = page.locator('img[src$="/assets/sauce-backpack-1200x1500-CjRW-Djj.jpg"]');
    this.visualUserImage = page.locator('img[src$="/assets/sl-404-Cq1a9k9X.jpg"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
