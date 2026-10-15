import { Page, Locator } from "@playwright/test";

export abstract class BasePage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
        console.log(`Navigating to url: ${url}`);
    }

    async clickElement(locator: Locator): Promise<void> {
        await locator.click();
        console.log(`Element ${locator} clicked`);
    }

    async fillElement(locator: Locator, text: string): Promise<void> {
        await locator.fill(text);
        console.log(`Element ${locator} filled with the text ${text}`);
    }
}