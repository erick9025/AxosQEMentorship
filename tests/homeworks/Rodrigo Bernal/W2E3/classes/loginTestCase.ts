import { ITestCase } from "../interfaces/iTestCase";

export class LoginTestCase implements ITestCase {
    id: number;
    title: string;
    status: string;

    constructor(id: number, title: string, status: string) {
        this.id = id;
        this.title = title;
        this.status = status;
    }

    getSummary(): string {
        return this.id + "-" + this.title + "-" + this.status;
    }

    isPassed(): boolean {
        if (this.status === "Passed") {
            return true;
        }
        return false;
    }

}