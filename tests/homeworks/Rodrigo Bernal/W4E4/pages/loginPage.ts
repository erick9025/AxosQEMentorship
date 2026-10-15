import { Locator, Page } from "@playwright/test";
import { BasePage } from "./parent/basePage";

export class LoginPage extends BasePage{
    private readonly inputUsername: Locator;
    private readonly inputPassword: Locator;
    private readonly buttonLogin: Locator;

    constructor(page: Page) {
        super(page);
        this.inputUsername = page.locator("#user-name");
        this.inputPassword = page.locator("#password");
        this.buttonLogin = page.locator("#login-button");
    }

    public async goToLoginPage(): Promise<void> {
        await this.navigate("https://www.saucedemo.com/");
    }

    public async login (username: string, password: string): Promise <void> {
        await this.fillElement(this.inputUsername, username);
        await this.fillElement(this.inputPassword, password);
        await this.clickElement(this.buttonLogin);
    }

}