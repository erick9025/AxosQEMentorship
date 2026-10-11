import { expect, test } from "@playwright/test";
import userData from "../W4E2/userData.json";
import { StudentRegistrationPage } from "./pages/StudentRegistrationPage";

test("fills the student registration form using page object methods", async ({ page }) => {
	const registrationPage = new StudentRegistrationPage(page);

	await test.step("open the student registration form", async () => {
		await registrationPage.open();
		await expect(page.getByRole("heading", { name: "Student Registration Form" })).toBeVisible();
	});

	await test.step("fill in personal details", async () => {
		await registrationPage.fillPersonalDetails(userData);
	});

	await test.step("select location and hobbies", async () => {
		await registrationPage.selectStateAndCity(userData.state, userData.city);
		await registrationPage.selectHobbies(userData.hobbies);
	});

	await test.step("fill in the address and attach a profile picture", async () => {
		await registrationPage.fillAddress(userData.address);
		await registrationPage.uploadProfilePicture(
			userData.profilePictureFileName,
			userData.profilePictureContent,
		);
	});

	await test.step("verify the completed form through the page object", async () => {
		await registrationPage.expectFormData(userData);
	});
});
