import { Page, Locator, expect } from "@playwright/test";

export abstract class BasePage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
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

    protected async validateUrlContains(partialUrl: string): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(partialUrl));
        console.log(`The URL contains: ${partialUrl}`);
    }

    protected async validateUrlNotContains(partialUrl: string): Promise<void> {
        await expect(this.page).not.toHaveURL(new RegExp(partialUrl));
        console.log(`The URL does not contains: ${partialUrl}`);
    }

    protected async validateElementVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
        console.log(`Element ${locator} is visible`);
    }

    protected async validateElementNotVisible(locator: Locator): Promise<void> {
        await expect(locator).not.toBeVisible();
        console.log(`Element ${locator} is not visible`);
    }

    protected async validateElementHasText(locator: Locator, text: string): Promise<void> {
        await expect(locator).toHaveText(text);
        console.log(`Element ${locator} has the text ${text}`);
    }


}