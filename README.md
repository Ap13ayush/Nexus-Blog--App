# 🚀 Nexus Blog Test Automation Suite (Cypress)

<div align="center">

[![Build Status](https://github.com/Ap13ayush/Nexus-Blog--App/actions/workflows/ci.yml/badge.svg)](https://github.com/Ap13ayush/Nexus-Blog--App/actions)
[![Node](https://img.shields.io/badge/Node.js-18%2B-339933.svg?logo=nodedotjs&logoColor=white)](#)
[![npm](https://img.shields.io/badge/npm-8%2B-CB3837.svg?logo=npm&logoColor=white)](#)
[![Cypress](https://img.shields.io/badge/Cypress-13.x-17202C.svg?logo=cypress&logoColor=white)](https://www.cypress.io/)
[![Cucumber](https://img.shields.io/badge/Cucumber-Preprocessor-brightgreen.svg)](https://github.com/badeball/cypress-cucumber-preprocessor)
[![Mochawesome](https://img.shields.io/badge/Reports-Mochawesome-5D2E8E.svg)](https://github.com/adamgruber/mochawesome)
[![ESLint](https://img.shields.io/badge/ESLint-Configured-4B32C3.svg?logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-Enabled-F7B93E.svg?logo=prettier&logoColor=black)](https://prettier.io/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](./LICENSE)
[![Framework Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen.svg)](#)

**🎯 Industry-standard Cypress framework for UI, API, and BDD with consolidated HTML reporting**

*Covers RealWorld Conduit app with robust Page Objects, JWT-backed API flows, and CI-ready reporting.*

</div>

## 📋 Overview

The Nexus Blog Test Automation Suite is a production-ready testing solution built with Cypress. It validates the RealWorld Conduit application across:
- UI end-to-end journeys (React/Redux SPA)
- Authenticated API flows (JWT)
- BDD scenarios (Gherkin)

## ✨ What Makes This Framework Special

- 🏆 Complete implementation across UI, API, and BDD
- 📊 Professional Mochawesome HTML reports with screenshots
- 🚀 CI-ready via GitHub Actions (Chrome headless)
- 📚 Clear structure: Page Objects, custom commands, API helpers
- 🔄 Disposable test data: users/articles seeded per run

## 🎯 Core Framework Features

| Feature | Technology | Status |
|--------|------------|--------|
| 🌐 UI Automation | Cypress 13 + Page Object Model | ✅ Complete |
| 📝 BDD Testing | Cucumber Preprocessor + Gherkin | ✅ Complete |
| 🔗 API Automation | cy.request + JWT token flows | ✅ Complete |
| 📊 Test Reporting | Mochawesome + screenshots | ✅ Complete |
| ⚡ Performance Testing | docs/PerformanceTestPlan.md | ✅ Complete |
| 🔄 CI/CD Pipeline | GitHub Actions (Chrome headless) | ✅ Complete |
| 🏗️ Architecture | Commands + POM + helpers | ✅ Complete |
| 📱 Cross-browser | Chrome, Edge (Chromium), Firefox | ✅ Ready |
| 🛠️ Utilities | JWT helpers, seeding, config | ✅ Complete |

## 🌟 Validation Summary

- ✅ UI flows: register/login, create/publish article, add/delete comment, favorite
- ✅ API flows: login, article CRUD, feed retrieval
- ✅ BDD: Article interaction scenario implemented
- ✅ Reports: HTML with artifacts uploaded in CI

## 🚀 Quick Start

Prerequisites
- Node.js 18+
- npm 8+
- Git
- Chrome/Chromium (Firefox optional)

Install
- npm install

Open Cypress (interactive)
- npm run cypress:open

Run suites (headless)
- UI: npm run test:ui
- API: npm run test:api
- BDD: npm run test:bdd

Generate report
- npm run report:merge && npm run report:generate  → cypress/reports/html/index.html

## 🧭 Configuration

Defaults (see cypress.config.js)
- baseUrl: https://react-redux.realworld.io
- env.apiBaseUrl: https://api.realworld.io/api

Override at runtime
- npx cypress run --config baseUrl=https://my-host
- npx cypress run --env apiBaseUrl=https://my-api.example.com/api

Optional: create cypress.env.json (not committed) for local values.

## 🧩 How It Works

- Test data is generated on the fly to avoid collisions.
- JWT is stored in localStorage under key jwt by helper commands.
- UI tests use API seeding to reduce flakiness and speed up flows.

Key modules
- cypress/modules/core/commands.js → apiRegisterRandomUser, apiLogin, apiCreateArticle, apiDeleteArticle, setJwt
- cypress/modules/api/client.js → login, register, createArticle, feed, deleteArticle
- cypress/modules/auth/ui-auth.js → uiLogout, uiGoToNewArticle
- cypress/modules/ui/pages.js → Header, HomePage, LoginPage, RegistrationPage, ArticleEditorPage, ArticlePage, UserProfilePage

## 📁 Project Structure

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
│  │  ├─ core/                    # Custom Cypress commands
│  │  ├─ ui/                      # Page Objects
│  │  └─ auth/                    # UI auth helpers
│  ├─ support/                    # Global hooks, reporter registration
│  └─ pages/                      # (reserved)
├─ docs/
│  ├─ PerformanceTestPlan.md
│  └─ SecurityTestPlan.md
├─ .github/workflows/ci.yml
├─ cypress.config.js
├─ package.json
└─ README.md
```

## 🧪 Running Tests

Headless runs
- npm run test:ui
- npm run test:api
- npm run test:bdd

Interactive
- npm run cypress:open

Config overrides
- npx cypress run --config baseUrl=https://staging.example.com
- npx cypress run --env apiBaseUrl=https://staging-api.example.com/api

## 📊 Reports & Artifacts

- JSON merge: cypress/reports/mochawesome.json (npm run report:merge)
- HTML report: cypress/reports/html/index.html (npm run report:generate)
- Screenshots: cypress/screenshots
- Videos: cypress/videos
- CI: uploads HTML report as artifact

## 🔧 CI/CD (GitHub Actions)

- Workflow: .github/workflows/ci.yml
- Runs UI + API + BDD on push/PR to main
- Generates and uploads Mochawesome HTML report

## 🧱 Architecture & Practices

- Page Object Model for maintainable selectors and flows
- Custom commands for API auth/seed and JWT handling
- BDD layer with feature files + step-defs
- ESLint/Prettier for consistent code quality

## 🧰 Troubleshooting

- 429/instability from public API → re-run or reduce concurrency
- Missing JWT in tests → ensure apiRegisterRandomUser/apiLogin executed
- UI selector drift → update cypress/modules/ui/pages.js
- Flakiness → seed via API, minimize UI hops, avoid arbitrary waits

## 📚 Documentation

- Security test notes: docs/SecurityTestPlan.md
- Performance test plan: docs/PerformanceTestPlan.md

## 🤝 Contributing

- Fork → branch → PR
- Follow existing structure and naming
- Add/adjust tests + update docs when needed

## 📄 License

ISC (see package.json).
