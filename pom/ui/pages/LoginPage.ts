import type { Locator, Page } from "@playwright/test";
import { serviceUrls } from "../../../config/urls";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
	readonly usernameInput: Locator;
	readonly passwordInput: Locator;
	readonly loginButton: Locator;

	constructor(page: Page) {
		super(page);
		this.usernameInput = page.locator("#user-name");
		this.passwordInput = page.locator("#password");
		this.loginButton = page.locator("#login-button");
	}

	async open(): Promise<void> {
		await this.navigateTo(serviceUrls.sauceDemo);
	}

	async login(username: string, password: string): Promise<void> {
		await this.usernameInput.fill(username);
		await this.passwordInput.fill(password);
		await this.loginButton.click();
	}
}
