import type { Locator, Page } from "@playwright/test";

export class LoginPage {
	readonly usernameInput: Locator;
	readonly passwordInput: Locator;
	readonly loginButton: Locator;

	constructor(private readonly page: Page) {
		this.usernameInput = page.locator("#user-name");
		this.passwordInput = page.locator("#password");
		this.loginButton = page.locator("#login-button");
	}

	async open(): Promise<void> {
		await this.page.goto("https://www.saucedemo.com/");
	}

	async login(username: string, password: string): Promise<void> {
		await this.usernameInput.fill(username);
		await this.passwordInput.fill(password);
		await this.loginButton.click();
	}
}
