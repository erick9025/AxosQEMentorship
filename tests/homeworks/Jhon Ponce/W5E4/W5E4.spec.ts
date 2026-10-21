import { expect, test } from "@playwright/test";
import { ReqresClient } from "../W5/api/ReqresClient";
import { assertMatchesSchema } from "../W5/api/schemaValidator";
import type { CreatedReqresUser } from "../W5/interfaces/reqres";
import createdReqresUserSchema from "../W5/schemas/createdReqresUser.schema.json";
import emptyObjectSchema from "../W5/schemas/emptyObject.schema.json";

test("uses the POST-created ID for a GET and verifies Reqres persistence behavior", async ({ request }) => {
	const reqres = new ReqresClient(request);
	const createResponse = await reqres.createUser({
		name: "Jhon Ponce W5E4",
		job: "QA Automation Engineer",
	});
	const createdResponseBody: unknown = await createResponse.json();

	expect(createResponse.status()).toBe(201);
	assertMatchesSchema<CreatedReqresUser>(createdReqresUserSchema, createdResponseBody);

	const getResponse = await reqres.getUserById(createdResponseBody.id);
	const getResponseBody: unknown = await getResponse.json();

	expect(getResponse.status()).toBe(404);
	assertMatchesSchema<Record<string, never>>(emptyObjectSchema, getResponseBody);
	expect(getResponseBody).toEqual({});
});
