import { Locator, expect } from "@playwright/test";
import { BasePage } from "./parent/basePage";

export class SauceLabsLoginPage extends BasePage {

    // MORE PERMISIVE TO LESS PERMISIVE
    // LESS RESTRICTIVE TO MORE RESTRICTIVE
    // public: access from anywhere
    // protected: access from the class and subclasses
    // private: access from the class only

    private readonly usernameFiled: Locator = this.page.locator("#user-name");
    private readonly passwordFiled: Locator = this.page.locator("#password");
    private readonly loginButton: Locator = this.page.locator("#login-button");
    private readonly productsTitle: Locator = this.page.locator(".title");

    public async login(username: string, password: string): Promise<void> {
        const url: string = "https://www.saucedemo.com/"

        await this.navigateTo(url, "Sauce Labs Login Page");
        await this.enterText(this.usernameFiled, "Username [Input]", username);
        await this.enterText(this.passwordFiled, "Password [Input]", password);
        await this.click(this.loginButton, "Login [Button]");   
        await this.waitForPartialURL("inventory.html");

        // Wait for productsTitle to be visible
        await expect(this.productsTitle).toBeVisible(); 
    }
}