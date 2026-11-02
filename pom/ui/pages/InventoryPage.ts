import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {
	readonly title: Locator;
	readonly productCards: Locator;
	readonly cartBadge: Locator;
	readonly cartLink: Locator;

	constructor(page: Page) {
		super(page);
		this.title = page.locator(".title");
		this.productCards = page.locator(".inventory_item");
		this.cartBadge = page.locator(".shopping_cart_badge");
		this.cartLink = page.locator(".shopping_cart_link");
	}

	async addProductToCart(productName: string): Promise<void> {
		const productCard = this.productCards.filter({ hasText: productName });
		await productCard.getByRole("button", { name: "Add to cart" }).click();
	}

	async openCart(): Promise<void> {
		await this.cartLink.click();
	}
}
