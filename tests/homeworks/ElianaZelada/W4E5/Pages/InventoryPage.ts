import { Page, Locator } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly ProductsTitle: Locator;
  readonly InventoryItemImage: Locator;
  readonly ImagesSource: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ProductsTitle = page.locator(".title");
    this.InventoryItemImage = page.locator(".inventory_item_img");
    this.ImagesSource = page.locator(".inventory_item_img img");
  }
  async getInventoryURL(): Promise<string> {
    return this.page.url();
  }
  async getImagesSource(): Promise<string | null> {
    return await this.ImagesSource.first().getAttribute("src");
  }
}
