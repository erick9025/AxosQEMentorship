import { ITestCase, TestStatus } from './ITestCase';

export class TestCase implements ITestCase {
  private id: string;
  private title: string;
  private status: TestStatus;

  constructor(id: string, title: string, status: TestStatus) {
    this.id = id;
    this.title = title;
    this.status = status;
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getStatus(): TestStatus {
    return this.status;
  }

  // Setters
  public setTitle(title: string): void {
    this.title = title;
  }

  public setStatus(status: TestStatus): void {
    this.status = status;
  }
}