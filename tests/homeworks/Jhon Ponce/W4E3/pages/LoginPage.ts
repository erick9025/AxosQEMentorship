import type { Locator, Page } from "@playwright/test";

export class LoginPage {
	readonly nameInput: Locator;
	readonly emailInput: Locator;
	readonly genderOptions: Locator;
	readonly mobileInput: Locator;
	readonly dateOfBirthInput: Locator;
	readonly subjectInput: Locator;
	readonly hobbyCheckboxes: Locator;
	readonly profilePictureInput: Locator;
	readonly addressInput: Locator;
	readonly stateDropdown: Locator;
	readonly cityDropdown: Locator;

	constructor(page: Page) {
		this.nameInput = page.locator("#name");
		this.emailInput = page.locator("#email");
		this.genderOptions = page.locator('input[type="radio"]');
		this.mobileInput = page.locator("#mobile");
		this.dateOfBirthInput = page.locator("#dob");
		this.subjectInput = page.locator("#subjects");
		this.hobbyCheckboxes = page.locator('input[type="checkbox"]');
		this.profilePictureInput = page.locator('input[type="file"]');
		this.addressInput = page.locator("textarea");
		this.stateDropdown = page.locator("#state");
		this.cityDropdown = page.locator("#city");
	}
}
