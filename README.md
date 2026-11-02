# AxosQEMentorship

A maintainable UI and API automation framework built with Playwright Test and TypeScript.

## Architecture

The project separates test scenarios, automation workflows, and runtime infrastructure:

```text
api/
  client/       HTTP transport built on Playwright APIRequestContext
  models/       Typed API request and response shapes
  schemas/      JSON Schema contracts
  services/     API operations grouped by domain
config/         Environment-independent service URLs
fixtures/       Per-test dependency injection for pages and API services
pom/
  ui/pages/     Page Objects for user-facing pages
tests/
  api/          API contract tests
  integration/  API-created data verified in a browser
  ui/           Cross-browser UI scenarios
  test-data/    Non-secret test data
utils/          Shared schema assertions
```

### Design principles

- Tests describe behavior and assertions; Page Objects encapsulate UI interactions.
- API services express endpoint operations and delegate HTTP transport to `ApiClient`.
- Playwright fixtures construct dependencies per test, preserving isolation and safe parallel execution.
- JSON Schemas validate response contracts in addition to status codes and field-level expectations.
- A global Singleton is intentionally not used for `Page`, `BrowserContext`, or API request state. Playwright owns browser lifecycle, while test-scoped fixtures prevent state leaking between tests.

## Requirements

- Node.js 20 or newer
- npm

Install dependencies and the supported browsers:

```bash
npm install
npx playwright install chromium firefox
```

## Run tests

Run the complete suite:

```bash
npm test
```

Run only the browser suites:

```bash
npm run test:ui
```

Run API contract tests:

```bash
npm run test:api
```

Run the browser-based API/UI integration scenario:

```bash
npm run test:integration
```

Check TypeScript without generating output:

```bash
npm run typecheck
```

## HTML report

Playwright writes an HTML report to `playwright-report/` after a test run. Open it with:

```bash
npm run report
```

Screenshots, videos, and traces are retained for failed tests under `test-results/`.

## Test coverage

- Reqres API: successful user listing and creation, response schemas, missing-user behavior, and validation errors.
- RESTful API: create and retrieve an object, then verify the response rendered in a browser.
- SauceDemo UI: sign in, inspect inventory, add an item to the cart, and block image requests in a performance-focused scenario.
- Registration form UI: verify the form and exercise a text field.
- UI and API/UI scenarios run in Chromium and Firefox; API-only contract tests use Playwright's request fixture.
