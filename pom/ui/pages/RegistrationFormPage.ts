import type { Locator, Page } from "@playwright/test";
import { serviceUrls } from "../../../config/urls";
import { BasePage } from "./BasePage";

export class RegistrationFormPage extends BasePage {
	readonly heading: Locator;
	readonly studentNameInput: Locator;
	readonly stateDropdown: Locator;
	readonly cityDropdown: Locator;

	constructor(page: Page) {
		super(page);
		this.heading = page.getByRole("heading", { name: "Student Registration Form" });
		this.studentNameInput = page.locator("#name");
		this.stateDropdown = page.locator("#state");
		this.cityDropdown = page.locator("#city");
	}

	async open(): Promise<void> {
		await this.navigateTo(serviceUrls.registrationForm);
	}

	async enterStudentName(name: string): Promise<void> {
		await this.studentNameInput.fill(name);
	}
}
