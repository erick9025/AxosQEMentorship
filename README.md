# AxosQEMentorship
Axos QE Mentorship with Playwright + TypeScript

## Project structure

```text
test-support/
  api/clients/     API request wrappers
  logging/         Shared test logging helpers
  ui/pages/        UI page objects
tests/
  api/             API specs
  ui/saucelabs/    Sauce Labs UI specs
  test-data/       Shared test data
  fixtures.ts      Shared Playwright fixtures
```

## Running tests

```powershell
npm test          # Run all Playwright tests
npm run test:api  # Run API tests
npm run test:ui   # Run UI tests
npm run typecheck # Type-check the project
```

## API tests

Run the API test suite with:

```powershell
npx playwright test tests/api
```

The specs contain test data and assertions; request methods and endpoints are
encapsulated in `test-support/api/clients`. These tests call public demo
services and create remote test records.
