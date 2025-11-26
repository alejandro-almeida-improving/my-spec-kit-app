import { test, expect } from '@playwright/test';

test('layout adapts to mobile viewport', async ({ page }) => {
  // Set viewport to mobile
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');

  const hero = page.locator('section[aria-label="Hero"]');
  await expect(hero).toBeVisible();

  // Check if hero title is visible
  await expect(hero.getByRole('heading', { level: 1 })).toBeVisible();

  const contentRow = page.locator('section[aria-label="Content Row"]').first();
  await expect(contentRow).toBeVisible();
  
  // Check if row title is visible
  await expect(contentRow.getByRole('heading', { level: 2 })).toBeVisible();
});
