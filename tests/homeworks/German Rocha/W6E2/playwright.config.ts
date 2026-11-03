import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Setting the directory path where test files are located
  testDir: './tests',
  
  // Setting global timeout threshold for each individual test case execution
  timeout: 30000,

  // Configuring the reporting format output layout
  reporter: 'html',

  // Definition of independent browser execution instances (Projects)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
