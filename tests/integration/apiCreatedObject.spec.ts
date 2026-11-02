import { expect, test } from "../../fixtures/testFixtures";
import type { RestfulObject } from "../../api/models/restfulObject";
import restfulObjectSchema from "../../api/schemas/restfulObject.schema.json";
import { serviceUrls } from "../../config/urls";
import { expectSchema } from "../../utils/schemaAssertions";

test("creates an API object and verifies the retrieved data in the browser", async ({
	objectsService,
	page,
}, testInfo) => {
	const suffix = `${Date.now()}-${testInfo.project.name}`;
	const objectData = {
		name: `Framework object ${suffix}`,
		data: {
			email: `framework-${suffix}@example.test`,
			job: "QA Automation Engineer",
		},
	};

	const createResponse = await objectsService.createObject(objectData);
	expect(createResponse.status()).toBe(200);

	const createdBody: unknown = await createResponse.json();
	expectSchema<RestfulObject>(restfulObjectSchema, createdBody);
	expect(createdBody.name).toBe(objectData.name);
	expect(createdBody.data).toEqual(objectData.data);

	const getResponse = await objectsService.getObjectById(createdBody.id);
	expect(getResponse.status()).toBe(200);

	const retrievedBody: unknown = await getResponse.json();
	expectSchema<RestfulObject>(restfulObjectSchema, retrievedBody);
	expect(retrievedBody.id).toBe(createdBody.id);
	expect(retrievedBody.name).toBe(objectData.name);
	expect(retrievedBody.data).toEqual(objectData.data);

	const browserResponse = await page.goto(
		`${serviceUrls.restfulObjects}/objects/${encodeURIComponent(retrievedBody.id)}`,
	);
	expect(browserResponse?.status()).toBe(200);

	const document = page.locator("html");
	await expect(document).toContainText(retrievedBody.id);
	await expect(document).toContainText(retrievedBody.name);
	await expect(document).toContainText(retrievedBody.data.email);
	await expect(document).toContainText(retrievedBody.data.job);
});
