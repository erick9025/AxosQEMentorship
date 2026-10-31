export class TestUtilities {
  public static logToConsole(message: string, context?: string): void {
    const prefix = context ? ` [${context}]` : '';
    console.info(`[${new Date().toISOString()}]${prefix} ${message}`);
  }
}
