import { expect, test } from "@playwright/test";

test("fills all fields in the Tutorialspoint student registration form", async ({ page }) => {
	await test.step("open the student registration practice form", async () => {
		await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php");
		await expect(page.getByRole("heading", { name: "Student Registration Form" })).toBeVisible();
	});

	await test.step("fill in personal details, date of birth, and subject", async () => {
		await page.locator("#name").fill("Jhon Ponce");
		await page.locator("#email").fill("jhon.ponce@example.com");
		await page.locator('input[type="radio"]').nth(1).check();
		await page.locator("#mobile").fill("5551234567");
		await page.locator("#dob").fill("1990-05-15");
		await page.locator("#subjects").fill("Software Testing");

		await expect(page.locator("#name")).toHaveValue("Jhon Ponce");
		await expect(page.locator("#email")).toHaveValue("jhon.ponce@example.com");
		await expect(page.locator('input[type="radio"]').nth(1)).toBeChecked();
		await expect(page.locator("#mobile")).toHaveValue("5551234567");
		await expect(page.locator("#dob")).toHaveValue("1990-05-15");
		await expect(page.locator("#subjects")).toHaveValue("Software Testing");
	});

	await test.step("select a state and city", async () => {
		const stateDropdown = page.locator("#state");
		const cityDropdown = page.locator("#city");

		await stateDropdown.selectOption({ label: "Uttar Pradesh" });
		await cityDropdown.selectOption({ label: "Agra" });

		await expect(stateDropdown).toHaveValue("Uttar Pradesh");
		await expect(cityDropdown).toHaveValue("Agra");
	});

	await test.step("select all hobbies and fill in the address", async () => {
		const hobbyCheckboxes = page.locator('input[type="checkbox"]');
		await expect(hobbyCheckboxes).toHaveCount(3);
		for (const checkbox of await hobbyCheckboxes.all()) {
			await checkbox.check();
			await expect(checkbox).toBeChecked();
		}

		await page.locator("textarea").fill("123 Test Street, Test City");
		await expect(page.locator("textarea")).toHaveValue("123 Test Street, Test City");
	});

	await test.step("attach a sample profile picture", async () => {
		const profilePicture = page.locator('input[type="file"]');
		await profilePicture.setInputFiles({
			name: "profile-picture.txt",
			mimeType: "text/plain",
			buffer: Buffer.from("Sample profile picture placeholder"),
		});
		await expect(profilePicture).toHaveValue(/profile-picture\.txt$/);
	});
});
