import { expect, test } from "@playwright/test";
import users from "./users.json";
import { LoginPage } from "./pages/LoginPage";

for (const user of users) {
	test(`logs in to SauceDemo as ${user.username}`, async ({ page }) => {
		const loginPage = new LoginPage(page);

		await loginPage.open();
		await loginPage.login(user.username, user.password);

		await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
		await expect(page.locator(".title")).toHaveText("Products");
	});
}
