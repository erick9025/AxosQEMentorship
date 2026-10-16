import { Page } from '@playwright/test';

export class LoginPage {
  private readonly emailInput;
  private readonly passwordInput;
  private readonly loginButton;
  readonly successHeading;

  constructor(private readonly page: Page) {
    this.emailInput = page.locator("input[placeholder='Email']");
    this.passwordInput = page.locator('#input-6');
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
