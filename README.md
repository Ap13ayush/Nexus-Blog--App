# Nexus — Cypress E2E + API + BDD test suite for RealWorld Conduit

[![CI](https://github.com/Ap13ayush/Nexus-Blog--App/actions/workflows/ci.yml/badge.svg)](https://github.com/Ap13ayush/Nexus-Blog--App/actions/workflows/ci.yml)

A complete, production-style test automation project built with Cypress (JavaScript). It validates the RealWorld Conduit application end‑to‑end (UI), exercises authenticated API flows (JWT), and supports BDD (Gherkin) with consolidated HTML reporting.


## Features
- UI E2E tests against Conduit SPA (React/Redux RealWorld)
- API tests for auth and CRUD (token-based)
- BDD using Cucumber preprocessor (.feature + step definitions)
- Single, mergeable HTML reports via Mochawesome
- Page Objects, custom Cypress commands, and reusable API helpers
- GitHub Actions CI running all suites and uploading reports


## Tech stack
- Cypress 13
- @badeball/cypress-cucumber-preprocessor + esbuild preprocessor
- cypress-mochawesome-reporter, mochawesome, mochawesome-merge, mochawesome-report-generator
- ESLint + Prettier


## Project structure
```
Nexus-Blog--App/
├─ cypress/
│  ├─ e2e/
│  │  ├─ ui/                      # Core UI journeys
│  │  ├─ api/                     # JWT auth + CRUD
│  │  └─ bdd/
│  │     ├─ features/             # Gherkin feature files
│  │     └─ step-defs/            # Step definitions
│  ├─ modules/
│  │  ├─ core/                    # Custom Cypress commands (JWT, API helpers)
│  │  ├─ ui/                      # Page Objects for Conduit SPA
│  │  └─ auth/                    # UI auth helpers
│  ├─ pages/                      # (reserved)
│  └─ support/                    # global commands, hooks, reporter
├─ docs/
│  ├─ PerformanceTestPlan.md
│  └─ SecurityTestPlan.md
├─ .github/workflows/ci.yml       # GitHub Actions CI
├─ cypress.config.js              # Cypress + reporter + cucumber setup
├─ .eslintrc.json, .prettierrc
├─ package.json, package-lock.json
└─ README.md
```


## Getting started
Prerequisites
- Node.js 18+
- npm 8+

Install
- npm install

Open Cypress (interactive)
- npm run cypress:open

Run test suites (headless)
- UI: npm run test:ui
- API: npm run test:api
- BDD: npm run test:bdd

Generate HTML report (Mochawesome)
- npm run report:merge && npm run report:generate
- Output: cypress/reports/html/index.html

Code quality
- Lint: npm run lint
- Format: npm run format
- Clean artifacts: npm run clean


## Configuration
Key defaults (see cypress.config.js)
- baseUrl: https://react-redux.realworld.io
- env.apiBaseUrl: https://api.realworld.io/api

Override at run-time
- npx cypress run --config baseUrl=https://my-host
- npx cypress run --env apiBaseUrl=https://my-api.example.com/api

You can also place values in cypress.env.json (not committed) if desired.


## How tests work
- Test data: Users and articles are generated per run to avoid collisions.
- Auth: JWT is stored in localStorage under key jwt when using helper commands.
- Flows: UI tests combine API seeding with UI interactions for speed and stability.

Custom commands and helpers
- cypress/modules/core/commands.js: apiRegisterRandomUser, apiLogin, apiCreateArticle, apiDeleteArticle, setJwt
- cypress/modules/auth/ui-auth.js: uiLogout, uiGoToNewArticle
- cypress/modules/api/client.js: login, register, createArticle, feed, deleteArticle

Page Objects (examples)
- cypress/modules/ui/pages.js: Header, HomePage, LoginPage, RegistrationPage, ArticleEditorPage, ArticlePage, UserProfilePage

BDD
- Feature files in cypress/e2e/bdd/features
- Step definitions in cypress/e2e/bdd/step-defs


## Reports
Mochawesome is configured in cypress.config.js and auto‑registers via support/e2e.js.
Typical flow:
- Run tests (npm run test:ui | test:api | test:bdd)
- Merge JSON: npm run report:merge
- Generate HTML: npm run report:generate
- Open cypress/reports/html/index.html in a browser

CI publishes the HTML folder as a build artifact.


## Continuous Integration (GitHub Actions)
- Workflow: .github/workflows/ci.yml
- Runs on push/PR to main
- Executes UI + API + BDD specs headless (Chrome)
- Merges JSON, generates HTML, uploads report artifact


## Writing new tests
- Place UI specs under cypress/e2e/ui and use the Page Objects from cypress/modules/ui/pages.js
- For API specs, prefer cy.request with tokens from apiRegisterRandomUser or apiLogin
- For BDD, add .feature files and matching step definitions using @badeball/cypress-cucumber-preprocessor

Naming conventions
- UI: Something.cy.js
- API: Something.cy.js
- BDD: .feature + .steps.js


## Troubleshooting
- 429 or API instability: The public RealWorld API rate-limits; re-run later or reduce concurrency.
- Token issues: Ensure JWT exists in Cypress.env('token') or set via apiRegisterRandomUser/apiLogin.
- Selector drift: RealWorld UI may change; update Page Objects in cypress/modules/ui/pages.js.
- Flakes: Prefer seeding via API + minimal UI hops; increase defaultCommandTimeout only when necessary.


## Security and performance test notes
- See docs/SecurityTestPlan.md for Broken Access Control checks
- See docs/PerformanceTestPlan.md for high-level load test approach


## Scripts (reference)
- cypress:open — open Cypress runner
- test:ui — run UI specs under cypress/e2e/ui
- test:api — run API specs under cypress/e2e/api
- test:bdd — run .feature specs under cypress/e2e/bdd
- report:merge — merge mochawesome JSON into cypress/reports/mochawesome.json
- report:generate — create HTML report at cypress/reports/html
- report:extent — optional Extent Reports (requires extra devDependency)
- lint, format, clean — quality and housekeeping


## License
ISC (see license field in package.json).
