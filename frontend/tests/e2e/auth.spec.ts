// frontend/tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

// This test suite now assumes authentication is handled by global.setup.ts
// and storageState is configured in playwright.config.ts

test.describe('Authenticated User Access', () => {
  // Test that relies on the saved authentication state
  test('should access dashboard when logged in', async ({ page }) => {
    // Go directly to the dashboard page
    await page.goto('/dashboard');

    // Verify dashboard elements are visible, confirming login state is active
    await expect(page.locator('h1:has-text("Welcome")')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('button:has-text("Sign Out")')).toBeVisible();
    await expect(page.locator('h2:has-text("Assessments")')).toBeVisible();

    // Verify the URL is correct
    await expect(page.url()).toContain('/dashboard');
  });

  // We can add other tests here that require the user to be logged in.
  // The login steps themselves are now handled by global.setup.ts.
  // Tests for the login UI specifically (e.g., error messages for bad passwords)
  // would need to be run without relying on the saved storageState, potentially
  // in a separate test file or project configuration in playwright.config.ts.
});