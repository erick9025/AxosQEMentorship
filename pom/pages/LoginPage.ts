import type { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly successHeading: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.locator('input[placeholder="Email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.successHeading = page.getByText('Get answers to your Sauce questions');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://support.saucelabs.com/s/login/?language=en_US');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
