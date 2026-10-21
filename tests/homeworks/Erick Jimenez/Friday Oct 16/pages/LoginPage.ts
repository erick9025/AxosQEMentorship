import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  private readonly _inputEmail: Locator;
  private readonly _inputPassword: Locator;
  private readonly _buttonLogin: Locator;
  private readonly _footerLegalDisclaimer: Locator;
  private _initialUrl: string = "";

  constructor(private readonly page: Page) {
    this._inputEmail = page.locator("#user-name");
    this._inputPassword = page.locator('#password');
    this._buttonLogin = page.locator('#login-button');
    this._footerLegalDisclaimer = page.locator('.footer_copy');
  }

  public async goto(): Promise<void> {
    await this.page.goto('https://saucedemo.com');
    this._initialUrl = this.page.url();
  }

  public async login(email: string, password: string): Promise<void> {
    await this._inputEmail.fill(email);
    await this._inputPassword.fill(password);
    await this._buttonLogin.click();

    await expect(this._footerLegalDisclaimer).toBeVisible({
      timeout: 5_000,
    });
    
    await this._inputPassword.waitFor({ state: 'hidden' });
    await expect.poll(() => this.page.url(), { timeout: 3_000 }).not.toBe(this._initialUrl);
  }
}
