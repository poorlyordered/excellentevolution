// frontend/tests/e2e/global.setup.ts
import { chromium, FullConfig } from '@playwright/test';
import path from 'path';

// Define the path where the authentication state will be saved
export const STORAGE_STATE = path.join(__dirname, '../../playwright/.auth/user.json');

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log(`Navigating to base URL for login: ${baseURL}`);
    await page.goto(baseURL!); // Use the configured baseURL

    // --- Perform Login ---
    console.log('Attempting login...');
    // Expect the Sign In button or link
    const signInButton = page.locator('text=/Sign in/i').or(page.locator('a:has-text("Sign In")'));
    await signInButton.click();

    // Wait for Clerk form
    await page.locator('input[name="identifier"]').waitFor({ state: 'visible', timeout: 15000 });

    // Get credentials from environment variables
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    if (!email || !password) {
      throw new Error('Global setup failed: Test user credentials (TEST_USER_EMAIL, TEST_USER_PASSWORD) not set.');
    }
    console.log(`Using email: ${email}`);

    // Enter credentials
    await page.locator('input[name="identifier"]').fill(email);
    await page.locator('button[type="submit"]').click();
    await page.locator('input[name="password"]').waitFor({ state: 'visible', timeout: 10000 });
    await page.locator('input[name="password"]').fill(password);
    await page.locator('button[type="submit"]').click();

    // Wait for successful login (e.g., dashboard redirect)
    console.log('Waiting for dashboard redirect...');
    await page.waitForURL('**/dashboard', { timeout: 15000 });
    console.log('Login successful, saving state...');

    // Save authentication state
    await page.context().storageState({ path: STORAGE_STATE });
    console.log(`Authentication state saved to ${STORAGE_STATE}`);

  } catch (error) {
    console.error('Global setup failed during login:', error);
    // Optionally take a screenshot on failure
    // await page.screenshot({ path: 'playwright-report/global-setup-failure.png' });
    throw error; // Re-throw error to fail the setup
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
}

export default globalSetup;