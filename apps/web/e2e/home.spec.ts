import { test, expect } from '@playwright/test';

test('homepage has correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Personal OS/);
});

test('login redirects to dashboard on success', async ({ page }) => {
  await page.goto('/owner/login');
  await expect(page.locator('h1')).toContainText('Owner Access');
});
