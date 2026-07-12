import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Helper to ensure screenshots directory exists
const screenshotsDir = path.join(__dirname, '..', '..', '..', '..', '.gemini', 'antigravity', 'brain', '716146e4-e5a3-43be-80ed-134cb9ad0d00');

test.describe('Verification Evidence Capture', () => {
  test.use({ viewport: { width: 1280, height: 1024 } });

  test('capture all required evidence', async ({ page }) => {
    // 1. Homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(screenshotsDir, 'evidence_homepage.png'), fullPage: true });

    // 2. Owner Login
    await page.goto('/owner/login');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(screenshotsDir, 'evidence_owner_login.png'), fullPage: true });

    // 3. Login Action
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/owner');
    await page.waitForLoadState('networkidle');

    // 4. Dashboard
    await page.screenshot({ path: path.join(screenshotsDir, 'evidence_dashboard.png'), fullPage: true });

    // 5. Profile CRUD
    await page.goto('/owner/profile');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(screenshotsDir, 'evidence_profile_crud.png'), fullPage: true });

    // 6. Projects CRUD
    await page.goto('/owner/projects');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(screenshotsDir, 'evidence_projects_crud.png'), fullPage: true });

    // 7. Gallery CRUD
    await page.goto('/owner/gallery');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(screenshotsDir, 'evidence_gallery_crud.png'), fullPage: true });

    // 8. Timeline CRUD
    await page.goto('/owner/timeline');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(screenshotsDir, 'evidence_timeline_crud.png'), fullPage: true });

    // 9. Media Upload
    await page.goto('/owner/media');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(screenshotsDir, 'evidence_media_upload.png'), fullPage: true });

    // 10. Settings
    await page.goto('/owner/settings');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(screenshotsDir, 'evidence_settings.png'), fullPage: true });
  });
});
