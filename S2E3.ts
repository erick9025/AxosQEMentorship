export type TestCaseStatus = "Passed" | "Failed";

export interface TestCase {
	id: string;
	title: string;
	status: TestCaseStatus;
}

const exampleCase: TestCase = {
	id: "TC01",
	title: "Get to home page after login",
	status: "Passed"
};

console.log(exampleCase);