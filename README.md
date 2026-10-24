# Axos QE Mentorship — Playwright portfolio

A collection of Playwright and TypeScript exercises covering UI automation, page objects, data-driven tests, and REST API testing.

## Requirements

- Node.js 20 or newer
- Dependencies installed with `npm install`
- Chromium installed for Playwright with `npx playwright install chromium`

## Run the tests

```bash
npm test
```

The Playwright HTML report is generated in `playwright-report/` after the run. Open it with:

```bash
npm run report
```

Run the API exercises only:

```bash
npm run test:api
```

Check TypeScript files:

```bash
npm run typecheck
```

## API exercises (W5E1–W5E4)

The API exercises use the Rahul Shetty Maps practice API:

- W5E1 retrieves a place and checks the response.
- W5E2 validates coordinate ranges and response fields.
- W5E3 creates a place and checks the returned `place_id`.
- W5E4 creates a place, extracts its `place_id`, and retrieves it immediately with GET.

The add-place endpoint returns HTTP `200 OK` and a JSON body with `status: "OK"` and `place_id`; it does not return `201 Created`. The Maps API is a practice API without a user-facing UI, so the POST-to-GET test verifies that the created data can be retrieved.

## UI exercises

The UI exercises use SauceDemo and TestMu Selenium Playground. They are separate from the Maps API exercises because the Maps practice API does not share data with those sites.
