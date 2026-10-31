import { Page, Locator } from "@playwright/test";

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    protected get Page(): Page {
        return this.page;
    }

    protected async navigate(url: string): Promise<void> {
        await this.page.goto(url);
        console.log(`Navigating to url: ${url}`);
    }

    protected async clickElement(locator: Locator): Promise<void> {
        await locator.click();
        console.log(`Element ${locator} clicked`);
    }

    protected async fillElement(locator: Locator, text: string): Promise<void> {
        await locator.fill(text);
        console.log(`Element ${locator} filled with the text ${text}`);
    }

}