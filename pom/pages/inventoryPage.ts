import { Locator, Page } from "@playwright/test";
import { BasePage } from "./parent/basePage";
import { ProductCard } from "../components/productCard";
import { BaseAssertions } from "../../utils/assertions/baseAssertions";

export class InventoryPage extends BasePage {
    private readonly cartButton: Locator;
    private readonly productList: Locator;
    private readonly cartBadge: Locator

    constructor(page: Page) {
        super(page);
        this.cartButton = page.locator(".shopping_cart_link");
        this.productList = page.locator(".inventory_item");
        this.cartBadge = page.locator(".shopping_cart_badge");
    }

    private getProductCard(productName: string): ProductCard {
        const productCard: Locator = this.productList.filter({
            hasText: productName
        })
        return new ProductCard(productCard);
    }

    private async addProduct(productName: string): Promise<void> {
        await this.getProductCard(productName).clickActionButton();
    }

    public async goToCartPage(): Promise<void> {
        await this.clickElement(this.cartButton);
    }

    public async addProductsToCart(products: string[]): Promise<void> {
        for (const product of products) {
            await this.addProduct(product);
        }
    }

    public async validateProductsAddedToCart(products: string[]): Promise<void> {
        await BaseAssertions.validateElementVisible(this.cartBadge);
        await BaseAssertions.validateElementHasText(this.cartBadge, products.length.toString());
    }

}