import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { expect, test } from "@playwright/test";

test.setTimeout(30_000);

test("locates the student name field and verifies its entered value", async ({ page }, testInfo) => {
	await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php");

	const studentName = page.locator("#name");
	await studentName.fill("Trace Viewer Practice");

	await expect(studentName).toHaveValue("Trace Viewer Practice");

	const evidenceDirectory = join(__dirname, "evidence");
	await mkdir(evidenceDirectory, { recursive: true });
	await page.screenshot({
		path: join(evidenceDirectory, `w6e4-form-filled-${testInfo.project.name}.png`),
		fullPage: true,
	});
});
