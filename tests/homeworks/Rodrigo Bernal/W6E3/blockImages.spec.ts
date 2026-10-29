import { test, expect, Locator } from "@playwright/test";

test.describe('Valid Navigation to Products page without images', () => {

    test.beforeEach('Navigate to Home Page', async ({ page }) => {
        await page.goto('https://valentinos-magic-beans.click/');
    })

    test('Validate products page is loaded without images', async ({ page }) => {
        const shopLocator: Locator = page.locator("//a[text()='Shop']");
        const productsTitleLocator: Locator = page.locator("//h1[text()='Our Coffee Collection']");
        const blockedImages: string[] = [];

        //Intercept image requests
        await page.route("**/*", async (route) => {
            if (route.request().resourceType() === "image") {
                blockedImages.push(route.request().url());
                console.log(`Blocked image : ${route.request().url()}`)
                return await route.abort();
            }
            return await route.continue();
        })

        await shopLocator.click();
        await page.waitForLoadState('networkidle');
        
        await expect(productsTitleLocator).toBeVisible();
        await expect(page).toHaveURL(/products/);
        expect(blockedImages.length).toBeGreaterThan(0);
        console.log(`Total images blocked: ${blockedImages.length}`)

    })

    test('Validate products page is loaded without images REGULAR', async ({ page }) => {
        const shopLocator: Locator = page.locator("//a[text()='Shop']");
        const productsTitleLocator: Locator = page.locator("//h1[text()='Our Coffee Collection']");

        await shopLocator.click();
        await page.waitForLoadState('networkidle');
        
        await expect(productsTitleLocator).toBeVisible();
        await expect(page).toHaveURL(/products/);
    })

})