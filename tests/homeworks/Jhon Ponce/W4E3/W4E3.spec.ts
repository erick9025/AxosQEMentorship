import { expect, test } from "@playwright/test";
import userData from "../W4E2/userData.json";
import { LoginPage } from "./pages/LoginPage";

test("fills the student registration form using locators from LoginPage", async ({ page }) => {
	const registrationForm = new LoginPage(page);
	const genderIndices: Record<string, number> = { Male: 0, Female: 1, Other: 2 };
	const hobbyIndices: Record<string, number> = { Sports: 0, Reading: 1, Music: 2 };
	const genderIndex = genderIndices[userData.gender];

	await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php");
	await expect(page.getByRole("heading", { name: "Student Registration Form" })).toBeVisible();

	await registrationForm.nameInput.fill(userData.name);
	await registrationForm.emailInput.fill(userData.email);
	await registrationForm.genderOptions.nth(genderIndex).check();
	await registrationForm.mobileInput.fill(userData.mobile);
	await registrationForm.dateOfBirthInput.fill(userData.dateOfBirth);
	await registrationForm.subjectInput.fill(userData.subject);

	await registrationForm.stateDropdown.selectOption({ label: userData.state });
	await registrationForm.cityDropdown.selectOption({ label: userData.city });

	for (const hobby of userData.hobbies) {
		const hobbyIndex = hobbyIndices[hobby];
		await registrationForm.hobbyCheckboxes.nth(hobbyIndex).check();
	}

	await registrationForm.addressInput.fill(userData.address);
	await registrationForm.profilePictureInput.setInputFiles({
		name: userData.profilePictureFileName,
		mimeType: "text/plain",
		buffer: Buffer.from(userData.profilePictureContent),
	});

	await expect(registrationForm.nameInput).toHaveValue(userData.name);
	await expect(registrationForm.emailInput).toHaveValue(userData.email);
	await expect(registrationForm.genderOptions.nth(genderIndex)).toBeChecked();
	await expect(registrationForm.mobileInput).toHaveValue(userData.mobile);
	await expect(registrationForm.dateOfBirthInput).toHaveValue(userData.dateOfBirth);
	await expect(registrationForm.subjectInput).toHaveValue(userData.subject);
	await expect(registrationForm.stateDropdown).toHaveValue(userData.state);
	await expect(registrationForm.cityDropdown).toHaveValue(userData.city);
	await expect(registrationForm.addressInput).toHaveValue(userData.address);
	await expect(registrationForm.profilePictureInput).toHaveValue(
		new RegExp(`${userData.profilePictureFileName.replace(".", "\\.")}$`),
	);

	for (const hobby of userData.hobbies) {
		const hobbyIndex = hobbyIndices[hobby];
		await expect(registrationForm.hobbyCheckboxes.nth(hobbyIndex)).toBeChecked();
	}
});
