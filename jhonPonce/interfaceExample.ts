export type TestCaseStatus = "Pass" | "Fail";

export interface TestCase {
	id: string;
	title: string;
	status: TestCaseStatus;
}

const exampleCase: TestCase = {
	id: "TC-001",
	title: "Login with valid credentials",
	status: "Pass",
};

console.log(exampleCase);
