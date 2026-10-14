import { Page, Locator, expect } from "@playwright/test"

export class SauceLabsProductsPage {
    private readonly _myPage: Page

    constructor(page: Page) {
        this._myPage = page
    }

    public async addProductToCart(productName: string): Promise<void> {
        const productLocator: Locator = this._myPage.locator(`.inventory_item:has-text("${productName}")`);
        const addToCartButton: Locator = productLocator.locator('button:has-text("Add to cart")');  

        await addToCartButton.click();
    }

    public async addProductToCartDynamic(productName: string): Promise<void> {
        const xpath: string = `//div[@class='inventory_item'][contains(., '${productName}')]/descendant::*[starts-with(@id,'add-to-cart')]`;
        const addToCartButton: Locator = this._myPage.locator(xpath);

        await addToCartButton.click();
    }
}