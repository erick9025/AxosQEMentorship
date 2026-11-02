import { expect, test } from "../../fixtures/testFixtures";

test("blocks image requests without preventing sign-in", async ({
	loginPage,
	inventoryPage,
	page,
	testData,
}) => {
	let blockedImageCount = 0;

	await page.route("**/*", async (route) => {
		if (route.request().resourceType() === "image") {
			blockedImageCount += 1;
			await route.abort();
			return;
		}

		await route.continue();
	});

	await loginPage.open();
	await loginPage.login(testData.standard.username, testData.standard.password);

	await expect(page).toHaveURL(/\/inventory\.html$/);
	await expect(inventoryPage.title).toHaveText("Products");
	await expect.poll(() => blockedImageCount).toBeGreaterThan(0);
});
