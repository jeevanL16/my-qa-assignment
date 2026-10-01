# QA Automation — Playwright + TypeScript

A small, focused test suite that covers **UI automation** against [saucedemo.com](https://www.saucedemo.com) and **API automation** against [reqres.in](https://reqres.in), built with [Playwright](https://playwright.dev) and TypeScript.

---

## What's Tested

| # | Type | Scenario | File |
|---|------|----------|------|
| 1 | UI | Valid login → "Products" page is shown | `tests/ui/login.spec.ts` |
| 2 | UI | Locked-out user → error containing "locked out" | `tests/ui/login.spec.ts` |
| 3 | UI | Add to cart → cart badge shows **1** | `tests/ui/cart.spec.ts` |
| 4 | UI | Remove from cart → badge disappears *(bonus)* | `tests/ui/cart.spec.ts` |
| 5 | UI | Logout → returns to login page *(bonus)* | `tests/ui/cart.spec.ts` |
| 6 | API | `GET /api/users/2` → 200 with `data.email` | `tests/api/users.spec.ts` |
| 7 | API | `POST /api/users` → 201 with name `"morpheus"` | `tests/api/users.spec.ts` |
| 8 | API | `GET /api/users/23` → 404 *(bonus)* | `tests/api/users.spec.ts` |

**All 8 tests pass.** Bonus: login steps use a Page Object (`pages/LoginPage.ts`).

---

## Prerequisites

| Tool | Version |
|------|---------|
| [Node.js](https://nodejs.org) | 18 or newer |
| npm | Comes with Node.js |

> No other global tools are needed. Playwright and browsers are installed locally.

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/jeevanL16/my-qa-assignment.git
cd my-qa-assignment
```

### 2. Install dependencies

```bash
npm install
npx playwright install chromium
```

### 3. Set up the API key

The API tests call [reqres.in](https://reqres.in), which requires a free API key in the `x-api-key` header.

**macOS / Linux:**
```bash
cp .env.example .env
```

**Windows (Command Prompt):**
```cmd
copy .env.example .env
```

**Windows (PowerShell):**
```powershell
Copy-Item .env.example .env
```

Then open `.env` and replace the placeholder with your key:

```
REQRES_API_KEY=your_actual_api_key_here
```

> **How to get a key:** Go to [reqres.in](https://reqres.in), create a free account, and copy the API key from your dashboard.

### 4. Run the tests

```bash
npx playwright test
```

Expected output:

```
  8 passed
```

> **Note:** UI tests work immediately without an API key. Only the 3 API tests require the `.env` setup. If the key is missing, they fail fast with a clear message: `REQRES_API_KEY is not set. Copy .env.example to .env and add your key.`

---

## Useful Commands

| Command | What it does |
|---------|-------------|
| `npx playwright test` | Run all 8 tests (headless) |
| `npx playwright test tests/ui` | Run only the 5 UI tests |
| `npx playwright test tests/api` | Run only the 3 API tests |
| `npx playwright test -g "locked out"` | Run a single test by name |
| `npx playwright show-report` | Open the HTML test report |
| `npm run demo -- tests/ui` | Run UI tests in a visible browser with slow-motion (useful for walkthroughs) |

---

## Project Structure

```
my-qa-assignment/
├── tests/
│   ├── test-data.ts              # Shared URLs, credentials, product IDs
│   ├── ui/
│   │   ├── login.spec.ts         # Login flow tests (scenarios 1–2)
│   │   └── cart.spec.ts          # Cart and logout tests (scenarios 3–5)
│   └── api/
│       └── users.spec.ts         # ReqRes API tests (scenarios 6–8)
├── pages/
│   ├── LoginPage.ts              # Login page object (bonus)
│   └── InventoryPage.ts          # Inventory page object
├── playwright.config.ts          # Playwright config — Chromium only, data-test attribute
├── playwright.demo.config.ts     # Headed + slow-mo config for live demos
├── tsconfig.json                 # TypeScript strict mode
├── .env.example                  # Environment variable template
├── package.json
└── .gitignore
```

---

## Design Decisions

- **Page Object Model** — `LoginPage` and `InventoryPage` encapsulate locators and actions, keeping tests short and readable.
- **`getByTestId` locators** — saucedemo uses `data-test` attributes; `testIdAttribute: 'data-test'` is set in `playwright.config.ts` so `getByTestId` maps directly to them.
- **Centralized test data** — URLs, credentials, and product IDs live in `tests/test-data.ts`, not scattered across spec files.
- **Fail-fast API key check** — `getApiHeaders()` throws immediately with an actionable message if `REQRES_API_KEY` is missing.
- **Chromium only** — the assignment does not require multi-browser testing.
- **No CI / Docker / reporting tools** — kept out of scope per the assignment guidelines.

---

## Notes

- API tests use Playwright's built-in `request` fixture — no browser is launched for API tests.
- TypeScript strict mode (`strict: true`) is enabled with explicit types for API response bodies.
- The demo config (`npm run demo`) runs tests sequentially in a visible browser with 1-second delays between actions.
