export interface ITestCase {
    id: number;
    title: string;
    status: string;

    getSummary(): string;
    isPassed(): boolean;
}