import { expect, test } from "@playwright/test";
import { ReqresClient } from "../W5/api/ReqresClient";
import { assertMatchesSchema } from "../W5/api/schemaValidator";
import type { CreateReqresUser, CreatedReqresUser } from "../W5/interfaces/reqres";
import createdReqresUserSchema from "../W5/schemas/createdReqresUser.schema.json";

test("creates a Reqres user and validates the response", async ({ request }) => {
	const reqres = new ReqresClient(request);
	const newUser: CreateReqresUser = {
		name: "Jhon Ponce",
		job: "QA Automation Engineer",
	};
	const response = await reqres.createUser(newUser);
	const responseBody: unknown = await response.json();

	expect(response.status()).toBe(201);
	expect(response.headers()["content-type"]).toMatch(/application\/json/i);
	assertMatchesSchema<CreatedReqresUser>(createdReqresUserSchema, responseBody);

	expect(responseBody.name).toBe(newUser.name);
	expect(responseBody.job).toBe(newUser.job);
	expect(Number.isNaN(Date.parse(responseBody.createdAt))).toBe(false);
});
