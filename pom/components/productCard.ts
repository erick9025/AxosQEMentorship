import { Locator } from "@playwright/test";

export class ProductCard {
    private readonly productName: Locator;
    private readonly actionButton: Locator;

    constructor(private readonly card: Locator) {
        this.productName = card.locator(".inventory_item_name");
        this.actionButton = card.locator("button");
    }

    public async getName(): Promise<string> {
        return (await this.productName.textContent())?.trim() ?? "";
    }

    public async clickActionButton(): Promise<void> {
        const productName: string = await this.getName();
        await this.actionButton.click();
        console.log(`Product ${productName} is being added to the cart`)
    }
}