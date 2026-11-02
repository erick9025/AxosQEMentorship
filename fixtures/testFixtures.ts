import { test as base, expect } from "@playwright/test";
import { ApiClient } from "../api/client/ApiClient";
import { ObjectsService } from "../api/services/ObjectsService";
import { ReqresService } from "../api/services/ReqresService";
import { serviceUrls } from "../config/urls";
import sauceDemoUsers from "../tests/test-data/sauceDemoUsers.json";
import { CartPage } from "../pom/ui/pages/CartPage";
import { InventoryPage } from "../pom/ui/pages/InventoryPage";
import { LoginPage } from "../pom/ui/pages/LoginPage";
import { RegistrationFormPage } from "../pom/ui/pages/RegistrationFormPage";

type FrameworkFixtures = {
	cartPage: CartPage;
	inventoryPage: InventoryPage;
	loginPage: LoginPage;
	objectsService: ObjectsService;
	registrationFormPage: RegistrationFormPage;
	reqresService: ReqresService;
	testData: typeof sauceDemoUsers;
};

export const test = base.extend<FrameworkFixtures>({
	cartPage: async ({ page }, use) => {
		await use(new CartPage(page));
	},
	inventoryPage: async ({ page }, use) => {
		await use(new InventoryPage(page));
	},
	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page));
	},
	objectsService: async ({ request }, use) => {
		const client = new ApiClient(request, serviceUrls.restfulObjects);
		await use(new ObjectsService(client));
	},
	registrationFormPage: async ({ page }, use) => {
		await use(new RegistrationFormPage(page));
	},
	reqresService: async ({ request }, use) => {
		const client = new ApiClient(request, serviceUrls.reqres);
		await use(new ReqresService(client));
	},
	testData: async ({}, use) => {
		await use(sauceDemoUsers);
	},
});

export { expect };
