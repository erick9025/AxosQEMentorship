import { LoginTestCase } from "./classes/loginTestCase";

const testCase = new LoginTestCase(1, "Login test", "Passed");

console.log(testCase.getSummary);
console.log(testCase.isPassed);