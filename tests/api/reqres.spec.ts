import { expect, test } from "../../fixtures/testFixtures";
import type { CreatedReqresUser, ReqresError, ReqresUsersList } from "../../api/models/reqres";
import createdReqresUserSchema from "../../api/schemas/createdReqresUser.schema.json";
import emptyObjectSchema from "../../api/schemas/emptyObject.schema.json";
import reqresErrorSchema from "../../api/schemas/reqresError.schema.json";
import reqresUsersListSchema from "../../api/schemas/reqresUsersList.schema.json";
import { expectSchema } from "../../utils/schemaAssertions";

test("returns a valid paginated user list", async ({ reqresService }) => {
	const response = await reqresService.getUsers();
	expect(response.status()).toBe(200);
	expect(response.headers()["content-type"]).toMatch(/application\/json/i);

	const responseBody: unknown = await response.json();
	expectSchema<ReqresUsersList>(reqresUsersListSchema, responseBody);

	expect(responseBody.data.length).toBeGreaterThan(0);
	expect(responseBody.page).toBe(2);
	expect(responseBody.total_pages).toBe(
		Math.ceil(responseBody.total / responseBody.per_page),
	);
	expect(new Set(responseBody.data.map((user) => user.id)).size).toBe(
		responseBody.data.length,
	);
});

test("returns a not-found response for an unknown user", async ({ reqresService }) => {
	const response = await reqresService.getUserById(999);
	expect(response.status()).toBe(404);
	expect(response.headers()["content-type"]).toMatch(/application\/json/i);

	const responseBody: unknown = await response.json();
	expectSchema<Record<string, never>>(emptyObjectSchema, responseBody);
	expect(responseBody).toEqual({});
});

test("creates a user and validates the response contract", async ({ reqresService }) => {
	const user = {
		name: "Framework Test User",
		job: "QA Automation Engineer",
	};
	const response = await reqresService.createUser(user);
	expect(response.status()).toBe(201);
	expect(response.headers()["content-type"]).toMatch(/application\/json/i);

	const responseBody: unknown = await response.json();
	expectSchema<CreatedReqresUser>(createdReqresUserSchema, responseBody);
	expect(responseBody.name).toBe(user.name);
	expect(responseBody.job).toBe(user.job);
	expect(Number.isNaN(Date.parse(responseBody.createdAt))).toBe(false);
});

test("validates the error response when login credentials omit an email", async ({
	reqresService,
}) => {
	const response = await reqresService.login({ password: "test-password" });
	expect(response.status()).toBe(400);
	expect(response.headers()["content-type"]).toMatch(/application\/json/i);

	const responseBody: unknown = await response.json();
	expectSchema<ReqresError>(reqresErrorSchema, responseBody);
	expect(responseBody.error).toBe("Missing email or username");
});
