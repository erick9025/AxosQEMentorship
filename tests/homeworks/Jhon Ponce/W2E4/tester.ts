export class Tester {
	name = "Jhon Ponce";
	private results: { testName: string; passed: boolean }[] = [];

	startTests(): string {
		const message = "Starting automation tests.";
		console.log(message);
		return message;
	}

	recordResult(testName: string, passed: boolean): void {
		this.results.push({ testName, passed });
	}

	getSummary(): string {
		const passed = this.results.filter((result) => result.passed).length;
		const failed = this.results.length - passed;
		return `${this.name}: ${passed} passed, ${failed} failed.`;
	}
}