import { test, expect } from '@playwright/test';

test('dashboard displays all tools', async ({ page }) => {
  await page.goto('/');
  
  // Check title
  await expect(page.getByRole('heading', { name: 'Developer Productivity Tools' })).toBeVisible();
  
  // Check if all tools are present
  // We look for the card titles specifically
  await expect(page.locator('.grid').getByText('Case Converter')).toBeVisible();
  await expect(page.locator('.grid').getByText('Lorem Ipsum Generator')).toBeVisible();
  await expect(page.locator('.grid').getByText('Base64 Converter')).toBeVisible();
  await expect(page.locator('.grid').getByText('URL Encoder')).toBeVisible();
  await expect(page.locator('.grid').getByText('UUID Generator')).toBeVisible();
  await expect(page.locator('.grid').getByText('Hash Generator')).toBeVisible();
  await expect(page.locator('.grid').getByText('Timestamp Converter')).toBeVisible();
  await expect(page.locator('.grid').getByText('Number Base Converter')).toBeVisible();
});

test('sidebar navigation works', async ({ page }) => {
  await page.goto('/');
  
  // Click on a tool in the sidebar
  // We target the sidebar specifically
  await page.locator('[data-sidebar="content"]').getByRole('link', { name: 'UUID Generator' }).click();
  
  // Verify URL
  await expect(page).toHaveURL(/.*\/tools\/uuid-generator/);
});
