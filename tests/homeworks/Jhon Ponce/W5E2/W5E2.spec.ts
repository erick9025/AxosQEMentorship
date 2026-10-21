import { expect, test } from "@playwright/test";
import { ReqresClient } from "../W5/api/ReqresClient";
import { assertMatchesSchema } from "../W5/api/schemaValidator";
import type { ReqresError, ReqresUsersList } from "../W5/interfaces/reqres";
import emptyObjectSchema from "../W5/schemas/emptyObject.schema.json";
import reqresErrorSchema from "../W5/schemas/reqresError.schema.json";
import reqresUsersListSchema from "../W5/schemas/reqresUsersList.schema.json";

test("validates successful user-list status, headers, pagination and schema", async ({ request }) => {
	const reqres = new ReqresClient(request);
	const response = await reqres.getUsers();
	const responseBody: unknown = await response.json();

	expect(response.status()).toBe(200);
	expect(response.headers()["content-type"]).toMatch(/application\/json/i);
	assertMatchesSchema<ReqresUsersList>(reqresUsersListSchema, responseBody);

	expect(responseBody.data.length).toBeGreaterThan(0);
	expect(responseBody.page).toBe(2);
	expect(responseBody.total_pages).toBe(Math.ceil(responseBody.total / responseBody.per_page));

	const userIds = responseBody.data.map((user) => user.id);
	expect(new Set(userIds).size).toBe(userIds.length);
});

test("validates the not-found response for a missing user", async ({ request }) => {
	const reqres = new ReqresClient(request);
	const response = await reqres.getUserById(999);
	const responseBody: unknown = await response.json();

	expect(response.status()).toBe(404);
	expect(response.headers()["content-type"]).toMatch(/application\/json/i);
	assertMatchesSchema<Record<string, never>>(emptyObjectSchema, responseBody);
	expect(responseBody).toEqual({});
});

test("validates the error response when login credentials omit email", async ({ request }) => {
	const reqres = new ReqresClient(request);
	const response = await reqres.login({ password: "test-password" });
	const responseBody: unknown = await response.json();

	expect(response.status()).toBe(400);
	expect(response.headers()["content-type"]).toMatch(/application\/json/i);
	assertMatchesSchema<ReqresError>(reqresErrorSchema, responseBody);
	expect(responseBody.error).toBe("Missing email or username");
});
