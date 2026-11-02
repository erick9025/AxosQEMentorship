# Playwright automation framework

A compact UI and API automation framework built with Playwright, TypeScript, and Page Object Model.

## Requirements

- Node.js 20 or newer
- Install dependencies with `npm install`
- Install browsers with `npx playwright install chromium firefox`

## Project layout

```text
pom/
  pages/                 Page Object classes for SauceDemo
    parent/              Shared base page
 tests/
  api/                   REST API tests
  data/                  Test data
  fixtures/              Shared Playwright fixtures and Page Objects
  ui/                    Browser UI tests
playwright.config.ts     Chromium and Firefox projects
```

## Run tests

```bash
npm test
```

Run one browser or one test group:

```bash
npm run test:chromium
npm run test:firefox
npm run test:ui
npm run test:api
```

Check TypeScript without generating output:

```bash
npm run typecheck
```

The HTML report is generated in `playwright-report/`. Open the latest report with:

```bash
npm run report
```

## Coverage

The SauceDemo UI suite covers standard and locked-out login behavior, adding a product to the cart, expected product imagery, and loading the inventory while image requests are blocked. The API suite creates an object through `POST /objects`, extracts its generated ID, retrieves it with `GET /objects/{id}`, and checks the returned fields.
