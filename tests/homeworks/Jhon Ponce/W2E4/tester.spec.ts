import { expect, test } from "@playwright/test";
import { Tester } from "./tester";

test("starts an automation test run", () => {
	const tester = new Tester();

	expect(tester.name).toBe("Jhon Ponce");
	expect(tester.startTests()).toBe("Starting automation tests.");
});

test("records test results and creates a summary", () => {
	const tester = new Tester();
	tester.recordResult("Valid login", true);
	tester.recordResult("Invalid password", false);
	tester.recordResult("Logout", true);

	expect(tester.getSummary()).toBe("Jhon Ponce: 2 passed, 1 failed.");
});