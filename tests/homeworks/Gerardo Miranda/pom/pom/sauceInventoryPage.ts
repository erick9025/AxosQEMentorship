import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productSortContainer: Locator;
  readonly pageTitle: Locator;
  readonly firstProductImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productSortContainer = page.locator('[data-test="product-sort-container"]');
    this.pageTitle = page.locator('[data-test="title"]');
    this.firstProductImage = page.locator('[data-test="inventory-item-sauce-labs-backpack-img"]');
  }

  async validatePageLoaded(): Promise<void> {
    await this.page.waitForURL(/.*saucedemo.com\/inventory.html/);
    await expect(this.productSortContainer).toBeVisible();   
    await expect(this.pageTitle).toHaveText('Products');
  }

  async validateInventoryBehavior(username: string, performanceDuration: number): Promise<void> {
    await this.validatePageLoaded();

    switch (username) {
      case 'visual_user':
      case 'problem_user':
        await expect(this.firstProductImage).toHaveAttribute('src', /sl-404/);
        break;

      case 'performance_glitch_user':
        expect(performanceDuration, 'El tiempo de espera de carga debe simular un glitch de red').toBeGreaterThanOrEqual(5000);
        break;

      default:
        await expect(this.firstProductImage).toHaveAttribute('src', /sauce-backpack/);
        break;
    }
  }
}
