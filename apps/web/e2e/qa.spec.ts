import { test, expect } from '@playwright/test';

test.describe('Public Website & Dashboard QA', () => {

  test('Homepage loads correctly', async ({ page }) => {
    // Navigate to homepage
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    // Verify some text or basic element is on screen
    // The portfolio is for "Personal OS" - check title or heading
    await expect(page).toHaveTitle(/Personal OS|Portfolio|Owner/i);

    // Ensure no broken images (check first image if any exists)
    const images = await page.$$('img');
    for (const img of images) {
       const isVisible = await img.isVisible();
       if (isVisible) {
           const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
           expect(naturalWidth).toBeGreaterThan(0);
       }
    }
  });

  test('Dashboard redirects unauthenticated users', async ({ page }) => {
    const response = await page.goto('/owner');
    // Should redirect to /owner/login
    await expect(page).toHaveURL(/\/owner\/login/);
  });

});
