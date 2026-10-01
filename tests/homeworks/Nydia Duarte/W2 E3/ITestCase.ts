export type TestStatus = 'Pass' | 'Fail';

export interface ITestCase {
  // Getters
  getId(): string;
  getTitle(): string;
  getStatus(): TestStatus;

  // Setters
  setTitle(title: string): void;
  setStatus(status: TestStatus): void;
}