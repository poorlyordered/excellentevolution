# Playwright Integration Testing Plan: Excellent Evolution

## 1. Introduction

This document outlines the strategy for implementing integration tests using Playwright for the Excellent Evolution frontend application. The goal is to ensure key user flows and core functionalities work reliably across different browsers and scenarios.

## 2. Objectives

- Verify critical end-to-end user journeys.
- Ensure core features (authentication, dashboard, assessments, development plans, navigation) function as expected.
- Validate the user interface consistency and responsiveness across major browsers.
- Automate regression testing to catch issues early in the development cycle.
- Integrate testing into the CI/CD pipeline.

## 3. Scope

### In Scope:

- **Authentication:** User registration, login, logout, session management (via Clerk.com integration).
- **Navigation:** Header links, active state highlighting, routing between pages.
- **Dashboard:** Display of user information, assessment list correctness, development plan summary, quick action links.
- **Assessments Page:** Navigation to the page, display of assessment information and external links.
- **Development Plan Page:** Navigation to the page, basic structure verification.
- **AI Coaching Page:** Navigation to the page, basic chat interface interaction (sending a message, verifying a response placeholder/structure if feasible).
- **Basic UI Checks:** Presence of key elements on each page.
- **Cross-Browser Testing:** Chromium, Firefox, WebKit.

### Out of Scope (Initially):

- **External Assessment Sites:** Testing the functionality of third-party assessment platforms.
- **Detailed AI Response Validation:** Verifying the specific content of AI-generated recommendations (focus on interface interaction).
- **Email Verification:** Testing email delivery and content (can be added later if needed).
- **Database State Verification:** Directly querying the database (tests focus on UI/API interactions).
- **Performance Testing:** Load and stress testing.
- **Visual Regression Testing:** Pixel-perfect UI comparisons (can be added with tools like Percy).

## 4. Setup and Configuration

1.  **Installation:**
    ```bash
    # Navigate to the frontend directory
    cd frontend

    # Install Playwright
    npm install --save-dev @playwright/test

    # Install browser binaries
    npx playwright install
    ```
2.  **Configuration (`frontend/playwright.config.ts`):**
    - Define the `baseURL` (e.g., `http://localhost:3000` for local testing).
    - Configure target browsers (Chromium, Firefox, WebKit).
    - Set up reporters (e.g., `html`, `list`).
    - Configure trace recording (`on-first-retry` or `retain-on-failure`).
    - Define project dependencies if needed (e.g., running a setup project for authentication).
    - Set `webServer` configuration to automatically start the Next.js dev server (`npm run dev`).

## 5. Test Structure and Organization

- **Directory:** Tests will reside in `frontend/tests/integration/`.
- **Naming Convention:** Use `[feature].spec.ts` (e.g., `auth.spec.ts`, `dashboard.spec.ts`).
- **Grouping:** Use `describe` blocks to group related tests within a file.
- **Page Object Model (POM):** Consider implementing POM for complex pages or shared components (e.g., `Header`, `LoginPage`) to improve maintainability and reduce code duplication as the test suite grows. Store POMs in `frontend/tests/integration/poms/`.
- **Test Data:** Store test credentials and other data securely (e.g., environment variables, `.env` files ignored by Git). Avoid hardcoding sensitive information.

## 6. Key Test Scenarios

### 6.1. Authentication (`auth.spec.ts`)

- User can successfully register a new account.
- User can successfully log in with valid credentials.
- User receives an error message with invalid login credentials.
- User can successfully log out.
- Unauthenticated users are redirected from protected routes (e.g., `/dashboard`) to the login page.
- Authenticated users are redirected from auth routes (e.g., `/login`) to the dashboard.

### 6.2. Navigation (`navigation.spec.ts`)

- Header links navigate to the correct pages (`/dashboard`, `/assessments`, etc.).
- The correct header link is highlighted (active state) based on the current page.
- Mobile navigation works as expected (if applicable).

### 6.3. Dashboard (`dashboard.spec.ts`)

- Displays the correct welcome message for the logged-in user.
- Displays the correct list of assessments (Big Five, Holland Code, etc.).
- Displays the development plan progress summary card.
- Quick action links navigate to the correct pages.

### 6.4. Assessments (`assessments.spec.ts`)

- Navigate to the assessments page.
- Verify the presence of links/information for each required assessment.
- (Optional) Click an assessment link and verify it attempts to navigate externally (without validating the external site).

### 6.5. Development Plan (`development.spec.ts`)

- Navigate to the development plan page.
- Verify the basic page structure loads (e.g., title, key sections).

### 6.6. AI Coaching (`coaching.spec.ts`)

- Navigate to the coaching/chat page.
- Verify the chat input and message display area are present.
- Send a basic message and verify it appears in the chat history.
- (Optional) Verify a placeholder or loading indicator appears while waiting for an AI response.

## 7. Authentication Handling Strategy

- Use Playwright's [Authentication](https://playwright.dev/docs/auth) features.
- Create a global setup file (`frontend/tests/integration/global.setup.ts`) that logs in a test user once.
- Save the authentication state (cookies, local storage) using `page.context().storageState({ path: authFile })`.
- Configure `playwright.config.ts` to use this saved `storageState` for tests requiring authentication, significantly speeding up execution by avoiding repeated logins.

## 8. Cross-Browser Testing Strategy

- Configure `playwright.config.ts` to run tests against Chromium, Firefox, and WebKit.
- Run the full test suite on all configured browsers during CI.

## 9. CI/CD Integration

- Add a script to `frontend/package.json` for running tests (e.g., `"test:integration": "playwright test"`).
- Configure the CI/CD pipeline (e.g., GitHub Actions, Vercel Deployment Checks) to:
    - Install dependencies (`npm ci`).
    - Install Playwright browsers (`npx playwright install --with-deps`).
    - Run the integration tests (`npm run test:integration`).
    - Fail the build/deployment if tests fail.

## 10. Reporting

- Utilize the built-in Playwright HTML reporter (`reporter: 'html'`) for detailed test results, including traces and screenshots on failure.
- Configure CI to archive the HTML report as an artifact for easy access.

## 11. Maintenance

- Regularly review and update tests as the application evolves.
- Refactor tests and POMs to keep the suite maintainable.
- Investigate and fix flaky tests promptly.