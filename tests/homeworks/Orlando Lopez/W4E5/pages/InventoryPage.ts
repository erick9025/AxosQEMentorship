import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByText('Products', {
      exact: true
    });
  }

  async verifyInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(
      /inventory\.html/
    );

    await expect(this.title).toBeVisible();
  }
}
