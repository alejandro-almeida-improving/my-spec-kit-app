/**
 * E2E Tests for Timestamp Converter
 * Feature: 001-dev-tools-suite / User Story 5
 */

import { test, expect } from '@playwright/test';

test.describe('Timestamp Converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/timestamp');
  });

  test('should convert timestamp to date and back', async ({ page }) => {
    // Timestamp to Date
    await page.getByRole('tab', { name: 'Timestamp → Date' }).click();
    await page.getByRole('textbox', { name: 'Unix Timestamp' }).fill('1701792000');
    await page.getByRole('button', { name: 'Convert to Date' }).click();
    await expect(page.locator('text=ISO 8601')).toBeVisible();
    
    // Date to Timestamp
    await page.getByRole('tab', { name: 'Date → Timestamp' }).click();
    await page.getByRole('textbox', { name: 'Date String' }).fill('2025-12-05');
    await page.getByRole('button', { name: 'Convert to Timestamp' }).click();
    await expect(page.locator('text=ISO 8601')).toBeVisible();
    await expect(page.locator('text=UTC String')).toBeVisible();
  });

  test('should use current time button', async ({ page }) => {
    await page.getByRole('button', { name: 'Use Current Time' }).click();
    const input = await page.getByRole('textbox', { name: 'Unix Timestamp' }).inputValue();
    expect(input).toBeTruthy();
    expect(parseInt(input)).toBeGreaterThan(1700000000);
  });
});
