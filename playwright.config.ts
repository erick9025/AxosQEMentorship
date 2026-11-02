import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 1 : 0,
	workers: process.env.CI ? 1 : undefined,
	timeout: 30_000,
	expect: {
		timeout: 5_000,
	},
	reporter: [
		["list"],
		["html", { outputFolder: "playwright-report", open: "never" }],
	],
	use: {
		trace: "retain-on-failure",
		screenshot: "only-on-failure",
		video: "retain-on-failure",
	},
	projects: [
		{
			name: "chromium",
			testIgnore: "**/api/**",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "firefox",
			testIgnore: "**/api/**",
			use: { ...devices["Desktop Firefox"] },
		},
		{
			name: "api",
			testMatch: "**/api/**/*.spec.ts",
		},
	],
});
