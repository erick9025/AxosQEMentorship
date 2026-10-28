import { Page, Locator, expect } from "@playwright/test";
import { TestUtilities } from "../../../utils/testUtilities";

export abstract class BasePage {
    private _page: Page

    protected get page(): Page {
        return this._page
    }

    private set page(value: Page) {
        this._page = value
    }

    constructor(page: Page) {
        this._page = page
    }

    // Reusable methods to do click, fill, and wait for elements to be visible
    protected async click(locator: Locator, description: string, timeout: number = 5_000): Promise<void> {
        await locator.click( { timeout: timeout } );
        this.logToConsole(`Clicked on ${description}`);
    }
    
    protected async enterText(locator: Locator, description: string, text: string, timeout: number = 5_000): Promise<void> {
        await locator.fill(text, { timeout: timeout });
        this.logToConsole(`Entered text '${text}' into ${description}`);
    }

    protected async navigateTo(url: string, description: string = "", timeout: number = 10_000): Promise<void> {
        await this._page.goto(url, { timeout: timeout });
        this.logToConsole(`Navigated to ${description} at URL: ${url}`);
    }      
    
    protected async waitForPartialURL(partialURL: string, timeout: number = 10_000): Promise<void> {
        await this.page.waitForURL(url => url.href.includes(partialURL), { timeout: timeout });
        this.logToConsole(`URL is correct and contains '${partialURL}'`);
    }

    protected logToConsole(message: string): void {
        TestUtilities.logToConsole(message);
    }
}
