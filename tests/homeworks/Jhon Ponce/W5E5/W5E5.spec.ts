import { expect, test } from "@playwright/test";
import { RestfulApiClient } from "../W5/api/RestfulApiClient";
import { assertMatchesSchema } from "../W5/api/schemaValidator";
import type { RestfulObject } from "../W5/interfaces/restfulApi";
import restfulObjectSchema from "../W5/schemas/restfulObject.schema.json";

test("creates a record through the API and verifies it visually in the browser", async ({ request, page }) => {
	const api = new RestfulApiClient(request);
	const timestamp = Date.now();
	const userData = {
		name: `W5E5 User ${timestamp}`,
		data: {
			email: `w5e5-${timestamp}@example.test`,
			job: "QA Automation Engineer",
		},
	};

	const createdUser = await test.step("Create a record through the API", async () => {
		const response = await api.createObject(userData);
		console.log(`[POST] Status: ${response.status()}`);

		expect(response.status()).toBe(200);

		const responseBody: unknown = await response.json();
		assertMatchesSchema<RestfulObject>(restfulObjectSchema, responseBody);
		expect(responseBody.name).toBe(userData.name);
		expect(responseBody.data).toEqual(userData.data);

		console.log(`[POST] Created record ID: ${responseBody.id}`);
		return responseBody;
	});

	const retrievedUser = await test.step("Retrieve the record by ID", async () => {
		const response = await api.getObjectById(createdUser.id);
		console.log(`[GET] Status: ${response.status()}`);

		expect(response.status()).toBe(200);

		const responseBody: unknown = await response.json();
		assertMatchesSchema<RestfulObject>(restfulObjectSchema, responseBody);
		expect(responseBody.id).toBe(createdUser.id);
		expect(responseBody.name).toBe(createdUser.name);
		expect(responseBody.data).toEqual(createdUser.data);

		return responseBody;
	});

	await test.step("Verify the retrieved record in the browser", async () => {
		const response = await page.goto(
			`https://api.restful-api.dev/objects/${encodeURIComponent(retrievedUser.id)}`,
		);

		console.log(`[Browser] Status: ${response?.status()}`);
		expect(response?.status()).toBe(200);
		await expect(page.locator("body")).toContainText(retrievedUser.id);
		await expect(page.locator("body")).toContainText(retrievedUser.name);
		await expect(page.locator("body")).toContainText(retrievedUser.data.email);
		await expect(page.locator("body")).toContainText(retrievedUser.data.job);
	});
});
