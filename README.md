# my-qa-assignment

Playwright + TypeScript test suite covering UI tests for [saucedemo.com](https://www.saucedemo.com) and API tests for [reqres.in](https://reqres.in).

## Prerequisites

- Node.js 18+

## Install

```bash
npm install
npx playwright install chromium
```

## API key setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Set your `REQRES_API_KEY` in `.env` (free key from [reqres.in](https://reqres.in)).

## Run tests

```bash
# Run all tests
npx playwright test

# Run only UI tests
npx playwright test tests/ui

# Run only API tests
npx playwright test tests/api

# Open the HTML report
npx playwright show-report
```

## Demo mode

Run tests in a visible browser with a 1.5 s delay between actions — useful for live walkthroughs:

```bash
# Single test
npm run demo -- -g "valid user can log in"

# All UI tests
npm run demo -- tests/ui
```

> API tests use HTTP requests with no browser, so there is nothing visual to show.
> Run them normally and inspect results with `npx playwright show-report`.

## Project structure

```
my-qa-assignment/
├── tests/
│   ├── test-data.ts          # Shared URLs, credentials, product IDs
│   ├── ui/
│   │   ├── login.spec.ts     # Login flow tests
│   │   └── cart.spec.ts      # Cart and logout tests
│   └── api/
│       └── users.spec.ts     # ReqRes API tests
├── pages/
│   ├── LoginPage.ts          # Login page object
│   └── InventoryPage.ts      # Inventory page object
├── playwright.config.ts      # Playwright configuration (Chromium only)
├── playwright.demo.config.ts # Headed slow-mo config for demos
├── tsconfig.json             # TypeScript strict mode config
├── .env.example              # Environment variable template
└── .gitignore
```

## Tests covered

| Type | Test | Status |
|------|------|--------|
| UI | Valid login shows "Products" | ✅ |
| UI | Locked out user sees error containing "locked out" | ✅ |
| UI | Add to cart shows badge "1" | ✅ |
| UI | Remove from cart hides badge | ✅ |
| UI | Logout returns to login page | ✅ |
| API | `GET /api/users/2` returns 200 and `data.email` | ✅ |
| API | `POST /api/users` returns 201 and name "morpheus" | ✅ |
| API | `GET /api/users/23` returns 404 | ✅ |

## Notes

- API tests require `REQRES_API_KEY` to be set in `.env`. They will fail fast with a clear error if the key is missing.
- Only Chromium is configured. No Firefox or WebKit projects.
- No CI configuration is included.
