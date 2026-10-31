import { Locator, Page } from "@playwright/test";
import { BasePage } from "./parent/basePage";
import { BaseAssertions } from "../../utils/assertions/baseAssertions";

export class LoginPage extends BasePage{
    private readonly inputUsername: Locator;
    private readonly inputPassword: Locator;
    private readonly buttonLogin: Locator;
    private readonly labelErrorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.inputUsername = page.locator("#user-name");
        this.inputPassword = page.locator("#password");
        this.buttonLogin = page.locator("#login-button");
        this.labelErrorMessage = page.locator("[data-test='error']");
    }

    public async goToLoginPage(): Promise<void> {
        await this.navigate("https://www.saucedemo.com/");
    }

    public async login (username: string, password: string): Promise <void> {
        await this.fillElement(this.inputUsername, username);
        await this.fillElement(this.inputPassword, password);
        await this.clickElement(this.buttonLogin);
    }

    public async validateLoginSuccesfully(): Promise <void> {
        await BaseAssertions.validateElementNotVisible(this.buttonLogin);
        await BaseAssertions.validateElementNotVisible(this.labelErrorMessage);
        await BaseAssertions.validateUrlContains(this.page, "inventory");
    }

    public async validateLoginNotSuccesfully(errorMessage: string): Promise <void> {
        await BaseAssertions.validateElementVisible(this.buttonLogin);
        await BaseAssertions.validateElementHasText(this.labelErrorMessage, errorMessage);
        await BaseAssertions.validateUrlNotContains(this.page, "inventory");
    }

}