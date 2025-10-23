# Nexus - Cypress E2E + API + BDD for RealWorld Conduit

## Overview
Industry-grade test automation suite using Cypress (JavaScript), covering UI journeys, authenticated API flows (JWT), and BDD scenarios with consolidated HTML reporting.

## Stack
- Cypress 13 (JS), Cucumber preprocessor, esbuild preprocessor
- Reporter: cypress-mochawesome-reporter

## Structure
- cypress/
  - e2e/ui: core UI journeys
  - e2e/api: JWT auth + CRUD
  - e2e/bdd: Gherkin + steps
  - pages: Page Objects
  - support: commands, api, auth, hooks
- docs/: PerformanceTestPlan.md, SecurityTestPlan.md

## Setup
1) Install deps
   - npm install -D cypress @badeball/cypress-cucumber-preprocessor @bahmutov/cypress-esbuild-preprocessor esbuild cypress-mochawesome-reporter mochawesome mochawesome-merge mochawesome-report-generator rimraf
2) Open Cypress once to scaffold: npx cypress open

## Run
- UI: npm run test:ui
- API: npm run test:api
- BDD: npm run test:bdd
- Reports (Mochawesome): npm run report:merge && npm run report:generate
- Reports (Extent): npm run report:merge && npm run report:extent  # requires: npm i -D extent-reports
- Lint/Format: npm run lint && npm run format

## Module Structure
- cypress/modules/core: shared Cypress commands (API login/create/delete, JWT helpers)
- cypress/modules/ui: Page Objects for Conduit SPA
- cypress/modules/api: API client helpers (login/register/articles)
- cypress/modules/auth: UI auth helpers

## CI
- GitHub Actions workflow runs UI+API suites on PR/push and publishes Mochawesome report artifacts.

## Env
- baseUrl: https://react-redux.realworld.io
- apiBaseUrl: https://api.realworld.io/api
- No secrets needed; users are generated dynamically.

## Deliverables
- HTML report under cypress/reports/html/index.html
- Docs in docs/

## Notes
- Tests create disposable users/articles per run to avoid data collisions.
