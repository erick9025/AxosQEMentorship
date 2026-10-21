import { test } from "@playwright/test";
import { ReqresClient } from "../W5/api/ReqresClient";

test("gets and prints the Reqres users list", async ({ request }) => {
	const reqres = new ReqresClient(request);
	const response = await reqres.getUsers();
	const responseBody: unknown = await response.json();

	console.log("Reqres users list:", JSON.stringify(responseBody, null, 2));
});
