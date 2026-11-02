import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
	readonly title: Locator;
	readonly productNames: Locator;

	constructor(page: Page) {
		super(page);
		this.title = page.locator(".title");
		this.productNames = page.locator(".inventory_item_name");
	}
}
