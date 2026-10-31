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

    private getProdutcCard(productName: string): ProductCard {
        const productCard: Locator = this.productList.filter({
            has: this.productList.locator(".inventory_item_name", {
                hasText: productName
            })
        })
        return new ProductCard(productCard);
    }

    private async addProduct(productName: string): Promise<void> {
        await this.getProdutcCard(productName).clickActionButton();
    }

    public async goToCartPage(): Promise <void> {
        this.clickElement(this.cartButton);
    }

    public async addProductsToCart(products: string[]): Promise<void> {
        for (const product of products) {
            this.addProduct(product);
        }
    }

    public async validateProductsAddedToCart(products: [string]): Promise<void> {
        BaseAssertions.validateElementVisible(this.cartBadge);
        BaseAssertions.validateElementHasText(this.cartBadge, products.length.toString());
    }

}