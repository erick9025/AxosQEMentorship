import { Page, Locator, expect } from "@playwright/test"

export class SauceLabsLoginPage {
    private readonly _myPage: Page

    constructor(page: Page) {
        this._myPage = page
    }

    // MORE PERMISIVE TO LESS PERMISIVE
    // LESS RESTRICTIVE TO MORE RESTRICTIVE
    // public: access from anywhere
    // protected: access from the class and subclasses
    // private: access from the class only

    public async login(username: string, password: string): Promise<void> {
        const url: string = "https://www.saucedemo.com/"

        await this._myPage.goto(url);

        const usernameFiled: Locator = this._myPage.locator("#user-name");
        const passwordFiled: Locator = this._myPage.locator("#password");
        const loginButton: Locator = this._myPage.locator("#login-button");
        const productsTitle: Locator = this._myPage.locator(".title");

        await usernameFiled.fill(username);
        console.log("Entered username: " + username);

        await passwordFiled.fill(password);
        console.log("Entered password: " + password);
        
        await loginButton.click();
        console.log("Clicked login button");

        await this._myPage.waitForURL(/inventory/);

        // Wait for productsTitle to be visible
        await expect(productsTitle).toBeVisible(); 
    }
}