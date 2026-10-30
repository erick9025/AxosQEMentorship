import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // Global settings for all the tests. Max amount of time a test can run for.
  timeout: 10 * 1_000,
  expect: {
    /** Maximum time expect() should wait for the condition to be met. */
    timeout: 5_000,
  },
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 2,
  reporter: [["html", { open: "never" }]],
  use: {
    viewport: { width: 1920, height: 1080 },
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    screenshot: "on",
    launchOptions: {
      slowMo: 300,
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], browserName: "chromium" },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"], browserName: "firefox" },
    },
  ],
});
