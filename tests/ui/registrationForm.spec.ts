import { expect, test } from "../../fixtures/testFixtures";

test("opens the registration form and enters a student's name", async ({
	registrationFormPage,
}) => {
	await registrationFormPage.open();

	await expect(registrationFormPage.heading).toBeVisible();
	await expect(registrationFormPage.stateDropdown).toBeVisible();
	await expect(registrationFormPage.cityDropdown).toBeVisible();

	const studentName = "Framework Practice";
	await registrationFormPage.enterStudentName(studentName);
	await expect(registrationFormPage.studentNameInput).toHaveValue(studentName);
});
