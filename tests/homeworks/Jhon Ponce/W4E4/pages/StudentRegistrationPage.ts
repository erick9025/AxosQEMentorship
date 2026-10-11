import { expect, type Locator, type Page } from "@playwright/test";

interface StudentRegistrationData {
	name: string;
	email: string;
	gender: string;
	mobile: string;
	dateOfBirth: string;
	subject: string;
	hobbies: string[];
	address: string;
	state: string;
	city: string;
	profilePictureFileName: string;
	profilePictureContent: string;
}

export class StudentRegistrationPage {
	readonly nameInput: Locator;
	readonly emailInput: Locator;
	readonly mobileInput: Locator;
	readonly dateOfBirthInput: Locator;
	readonly subjectInput: Locator;
	readonly stateDropdown: Locator;
	readonly cityDropdown: Locator;
	readonly addressInput: Locator;
	readonly profilePictureInput: Locator;

	constructor(private readonly page: Page) {
		this.nameInput = page.locator("#name");
		this.emailInput = page.locator("#email");
		this.mobileInput = page.locator("#mobile");
		this.dateOfBirthInput = page.locator("#dob");
		this.subjectInput = page.locator("#subjects");
		this.stateDropdown = page.locator("#state");
		this.cityDropdown = page.locator("#city");
		this.addressInput = page.locator("textarea");
		this.profilePictureInput = page.locator('input[type="file"]');
	}

	async open(): Promise<void> {
		await this.page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php");
	}

	async fillPersonalDetails(data: StudentRegistrationData): Promise<void> {
		await this.nameInput.fill(data.name);
		await this.emailInput.fill(data.email);
		await this.page
			.getByText(data.gender, { exact: true })
			.locator("..")
			.locator('input[type="radio"]')
			.check();
		await this.mobileInput.fill(data.mobile);
		await this.dateOfBirthInput.fill(data.dateOfBirth);
		await this.subjectInput.fill(data.subject);
	}

	async selectStateAndCity(state: string, city: string): Promise<void> {
		await this.stateDropdown.selectOption({ label: state });
		await this.cityDropdown.selectOption({ label: city });
	}

	async selectHobbies(hobbies: string[]): Promise<void> {
		for (const hobby of hobbies) {
			await this.page
				.getByText(hobby, { exact: true })
				.locator("..")
				.locator('input[type="checkbox"]')
				.check();
		}
	}

	async fillAddress(address: string): Promise<void> {
		await this.addressInput.fill(address);
	}

	async uploadProfilePicture(fileName: string, content: string): Promise<void> {
		await this.profilePictureInput.setInputFiles({
			name: fileName,
			mimeType: "text/plain",
			buffer: Buffer.from(content),
		});
	}

	async expectFormData(data: StudentRegistrationData): Promise<void> {
		await expect(this.nameInput).toHaveValue(data.name);
		await expect(this.emailInput).toHaveValue(data.email);
		await expect(
			this.page.getByText(data.gender, { exact: true }).locator("..").locator('input[type="radio"]'),
		).toBeChecked();
		await expect(this.mobileInput).toHaveValue(data.mobile);
		await expect(this.dateOfBirthInput).toHaveValue(data.dateOfBirth);
		await expect(this.subjectInput).toHaveValue(data.subject);
		await expect(this.stateDropdown).toHaveValue(data.state);
		await expect(this.cityDropdown).toHaveValue(data.city);
		await expect(this.addressInput).toHaveValue(data.address);

		for (const hobby of data.hobbies) {
			await expect(
				this.page.getByText(hobby, { exact: true }).locator("..").locator('input[type="checkbox"]'),
			).toBeChecked();
		}

		await expect(this.profilePictureInput).toHaveValue(
			new RegExp(`${data.profilePictureFileName.replace(".", "\\.")}$`),
		);
	}
}
