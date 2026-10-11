import { expect, test } from "@playwright/test";
import userData from "./userData.json";

test("fills the student registration form using data from JSON", async ({ page }) => {
	await test.step("open the student registration practice form", async () => {
		await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php");
		await expect(page.getByRole("heading", { name: "Student Registration Form" })).toBeVisible();
	});

	await test.step("fill in personal details, date of birth, and subject", async () => {
		await page.locator("#name").fill(userData.name);
		await page.locator("#email").fill(userData.email);
		const genderRadio = page
			.getByText(userData.gender, { exact: true })
			.locator("..")
			.locator('input[type="radio"]');
		await genderRadio.check();
		await page.locator("#mobile").fill(userData.mobile);
		await page.locator("#dob").fill(userData.dateOfBirth);
		await page.locator("#subjects").fill(userData.subject);

		await expect(page.locator("#name")).toHaveValue(userData.name);
		await expect(page.locator("#email")).toHaveValue(userData.email);
		await expect(genderRadio).toBeChecked();
		await expect(page.locator("#mobile")).toHaveValue(userData.mobile);
		await expect(page.locator("#dob")).toHaveValue(userData.dateOfBirth);
		await expect(page.locator("#subjects")).toHaveValue(userData.subject);
	});

	await test.step("select the state and city from JSON", async () => {
		const stateDropdown = page.locator("#state");
		const cityDropdown = page.locator("#city");

		await stateDropdown.selectOption({ label: userData.state });
		await cityDropdown.selectOption({ label: userData.city });

		await expect(stateDropdown).toHaveValue(userData.state);
		await expect(cityDropdown).toHaveValue(userData.city);
	});

	await test.step("select hobbies and enter the address", async () => {
		for (const hobby of userData.hobbies) {
			const hobbyCheckbox = page
				.getByText(hobby, { exact: true })
				.locator("..")
				.locator('input[type="checkbox"]');
			await hobbyCheckbox.check();
			await expect(hobbyCheckbox).toBeChecked();
		}

		const addressField = page.locator("textarea");
		await addressField.fill(userData.address);
		await expect(addressField).toHaveValue(userData.address);
	});

	await test.step("attach the sample profile picture from JSON data", async () => {
		const profilePicture = page.locator('input[type="file"]');
		await profilePicture.setInputFiles({
			name: userData.profilePictureFileName,
			mimeType: "text/plain",
			buffer: Buffer.from(userData.profilePictureContent),
		});
		await expect(profilePicture).toHaveValue(new RegExp(`${userData.profilePictureFileName.replace(".", "\\.")}$`));
	});
});
