import { expect, Locator, Page } from '@playwright/test'

export class BaseAssertions {

    public static async validateUrlContains(page: Page, partialUrl: string): Promise<void> {
        await expect(page).toHaveURL(new RegExp(partialUrl));
        console.log(`The URL contains: ${partialUrl}`);
    }

    public static async validateUrlNotContains(page: Page, partialUrl: string): Promise<void> {
        await expect(page).not.toHaveURL(new RegExp(partialUrl));
        console.log(`The URL does not contains: ${partialUrl}`);
    }

    public static async validateElementVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
        console.log(`Element ${locator} is visible`);
    }

    public static async validateElementNotVisible(locator: Locator): Promise<void> {
        await expect(locator).not.toBeVisible();
        console.log(`Element ${locator} is not visible`);
    }

    public static async validateElementHasText(locator: Locator, text: string): Promise<void> {
        await expect(locator).toHaveText(text);
        console.log(`Element ${locator} has the text ${text}`);
    }

    public static validateArraysAreEquals(actualArray: string[], expectedArray: string[]): void {
        expect(actualArray).toEqual(expectedArray);
        console.log(`Actual array: ${actualArray} is equal to expected array: ${expectedArray}`);
    }
}