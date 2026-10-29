import { Locator, Page } from "@playwright/test"
import { BasePage } from "./parent/basePage"

export class SauceLabsProductsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public async addProductToCart(productName: string): Promise<void> {
        const productLocator: Locator = this.page.locator(`.inventory_item:has-text("${productName}")`);
        const addToCartButton: Locator = productLocator.locator('button:has-text("Add to cart")');  

        await this.click(addToCartButton, `Add to cart [Button] for ${productName}`);
    }

    public async addProductToCartDynamic(productName: string): Promise<void> {
        const xpath: string = `//div[@class='inventory_item'][contains(., '${productName}')]/descendant::*[starts-with(@id,'add-to-cart')]`;
        const addToCartButton: Locator = this.page.locator(xpath);

        await this.click(addToCartButton, `Add to cart [Button] for ${productName}`);
    }
}