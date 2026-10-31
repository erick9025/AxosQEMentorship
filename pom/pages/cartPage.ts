import { Locator, Page } from "@playwright/test";
import { BasePage } from "./parent/basePage";
import { BaseAssertions } from "../../utils/assertions/baseAssertions";

export class CartPage extends BasePage {
    private readonly cartItems: Locator;
    private readonly productNames: Locator;

    constructor(page: Page) {
        super(page);
        this.cartItems = page.locator(".cart_item");
        this.productNames = this.cartItems.locator(".inventory_item_name");
    }

    private async getProductsName(products: string[]): Promise<string[]> {
        await BaseAssertions.validateLocatorCount(this.productNames, products.length)
        return await this.productNames.allTextContents();
    }

    public async validateProductsAddedToCart(products: string[]): Promise<void> {
        const productsName: string [] = await this.getProductsName(products);
        await BaseAssertions.validateArraysAreEquals(productsName, products);
    }

}