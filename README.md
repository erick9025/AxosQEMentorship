# Playwright Automation Framework
 
A test automation framework built with **Playwright and TypeScript**, covering UI and API testing.
 
## Overview
 
This framework provides a structured approach to automated testing using the Page Object Model (POM) design pattern, reusable assertions, and centralized API services.
 
### Main Features
 
- UI automation using Playwright.
- Page Object Model (POM) architecture.
- Cross-browser testing with Chromium and Firefox.
- API testing using Playwright APIRequestContext.
- Reusable API client and service layers.
- Centralized assertions.
- JSON files for test data management.
- HTML test reports.
- Screenshots, videos, and traces for failed tests.
 
## Tech Stack
 
- **Language:** TypeScript
- **Automation:** Playwright
- **Test Framework:** Playwright Test
- **UI Testing:** SauceDemo
- **API Testing:** RESTful API (restful-api.dev)
- **Browsers:** Chromium and Firefox
 
## Project Structure
 
```text
├── api/
│   ├── client/
│   │   └── apiClient.ts
│   ├── models/
│   │   └── objectModel.ts
│   └── services/
│       └── objectsService.ts
│
├── pom/
│   ├── pages/
│   │   ├── loginPage.ts
│   │   ├── inventoryPage.ts
│   │   └── cartPage.ts
│   ├── parent/
│   │   └── basePage.ts
│   └── components/
│       └── productCard.ts
│
├── tests/
│   ├── ui/
│   │   ├── login.spec.ts
│   │   ├── inventory.spec.ts
│   │   └── cart.spec.ts
│   ├── testData/
│   │   └── users.json.
│   │   └── users.json.
│   └── api/
│       └── objects.spec.ts
│
├── utils/
│   └── assertions/
│       └── baseAssertions.ts
│
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```
 
## Installation
 
Clone the repository:
 
```bash
git clone <repository-url>
cd <project-folder>
```
 
Install dependencies:
 
```bash
npm install
```
 
Install Playwright browsers:
 
```bash
npx playwright install chromium firefox
```
 
## Running Tests
 
Run all tests:
 
```bash
npx playwright test
```
 
Run UI tests:
 
```bash
npm run test:ui
```
 
Run API tests:
 
```bash
npm run test:api
```
 
Run tests using a single worker:
 
```bash
npx playwright test --workers=1
```
 
Run a specific test file:
 
```bash
npx playwright test tests/ui/login.spec.ts
```
 
## Test Reports
 
Generate the HTML report after test execution:
 
```bash
npm run report
```
 
The framework is configured to capture screenshots, videos, and execution traces when tests fail.
 
## TypeScript Validation
 
Check TypeScript compilation:
 
```bash
npm run typecheck
```
 
## Architecture
 
### UI Automation
 
The UI tests follow the Page Object Model pattern to separate page interactions from test scenarios.
 
- **BasePage:** Provides common page functionality.
- **LoginPage:** Handles login interactions and validations.
- **InventoryPage:** Manages product selection and cart navigation.
- **CartPage:** Handles cart content and validations.
- **ProductCard:** Encapsulates individual product card interactions.
 
### API Automation
 
The API layer separates HTTP communication, data models, and business operations.
 
- **ApiClient:** Centralizes HTTP requests.
- **ObjectsService:** Provides methods to interact with the Objects API.
- **ObjectModel:** Defines the object data structure.
 
API test coverage includes:
 
- Retrieve all objects.
- Create a new object.
- Retrieve an object by ID.
- Delete an object.