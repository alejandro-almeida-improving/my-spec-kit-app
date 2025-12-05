/**
 * E2E Tests for URL Encoder
 * Feature: 001-dev-tools-suite / User Story 4
 */

import { test, expect } from '@playwright/test';

test.describe('URL Encoder', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/url-encoder');
  });

  test('should encode and decode URL text', async ({ page }) => {
    const originalText = 'Hello World & Co. = 100%';
    
    // Encode
    await page.getByRole('tab', { name: 'Encode' }).click();
    await page.getByRole('textbox', { name: 'Text to Encode' }).fill(originalText);
    await page.getByRole('button', { name: 'Encode for URL' }).click();
    const encoded = await page.getByRole('textbox').nth(1).inputValue();
    expect(encoded).toContain('%20');
    expect(encoded).toContain('%26');
    
    // Decode
    await page.getByRole('tab', { name: 'Decode' }).click();
    await page.getByRole('textbox', { name: 'URL-Encoded Text to Decode' }).fill(encoded);
    await page.getByRole('button', { name: 'Decode from URL' }).click();
    const decoded = await page.getByRole('textbox').nth(1).inputValue();
    expect(decoded).toBe(originalText);
  });

  test('should show error for empty input', async ({ page }) => {
    await page.getByRole('tab', { name: 'Encode' }).click();
    await page.getByRole('textbox', { name: 'Text to Encode' }).fill('');
    await page.getByRole('button', { name: 'Encode for URL' }).click();
    await expect(page.locator('text=cannot be empty')).toBeVisible();
  });
});
