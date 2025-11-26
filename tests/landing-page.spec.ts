import { test, expect } from '@playwright/test';

test('landing page displays hero and content rows', async ({ page }) => {
  await page.goto('/');

  // Check for Hero section
  // We'll use a specific test id or aria-label to identify the hero section
  const hero = page.locator('section[aria-label="Hero"]');
  await expect(hero).toBeVisible();
  
  // Check for Hero content
  await expect(hero.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(hero.getByRole('button', { name: /play/i })).toBeVisible();
  await expect(hero.getByRole('button', { name: /more info/i })).toBeVisible();

  // Check for at least one content row
  const contentRow = page.locator('section[aria-label="Content Row"]').first();
  await expect(contentRow).toBeVisible();
  
  // Check for row title
  await expect(contentRow.getByRole('heading', { level: 2 })).toBeVisible();
  
  // Check for movie cards in the row
  // We expect at least one movie card to be present
  const movieCard = contentRow.locator('article').first();
  await expect(movieCard).toBeVisible();
});
