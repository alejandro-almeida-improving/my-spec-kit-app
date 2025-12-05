/**
 * E2E Tests for Base64 Converter
 * Feature: 001-dev-tools-suite / User Story 3
 */

import { test, expect } from '@playwright/test';

test.describe('Base64 Converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/base64-converter');
  });

  test('should encode and decode text', async ({ page }) => {
    // Encode
    await page.getByRole('tab', { name: 'Encode' }).click();
    await page.getByRole('textbox', { name: 'Text to Encode' }).fill('Hello World');
    await page.getByRole('button', { name: 'Encode to Base64' }).click();
    let output = await page.getByRole('textbox').nth(1).inputValue();
    expect(output).toBe('SGVsbG8gV29ybGQ=');
    
    // Decode
    await page.getByRole('tab', { name: 'Decode' }).click();
    await page.getByRole('textbox', { name: 'Base64 to Decode' }).fill('SGVsbG8gV29ybGQ=');
    await page.getByRole('button', { name: 'Decode from Base64' }).click();
    output = await page.getByRole('textbox').nth(1).inputValue();
    expect(output).toBe('Hello World');
  });

  test('should handle UTF-8 characters', async ({ page }) => {
    const input = 'Hello 世界 🌍';
    await page.getByRole('tab', { name: 'Encode' }).click();
    await page.getByRole('textbox', { name: 'Text to Encode' }).fill(input);
    await page.getByRole('button', { name: 'Encode to Base64' }).click();
    const encoded = await page.getByRole('textbox').nth(1).inputValue();
    
    await page.getByRole('tab', { name: 'Decode' }).click();
    await page.getByRole('textbox', { name: 'Base64 to Decode' }).fill(encoded);
    await page.getByRole('button', { name: 'Decode from Base64' }).click();
    const decoded = await page.getByRole('textbox').nth(1).inputValue();
    expect(decoded).toBe(input);
  });

  test('should show error for invalid Base64', async ({ page }) => {
    await page.getByRole('tab', { name: 'Decode' }).click();
    await page.getByRole('textbox', { name: 'Base64 to Decode' }).fill('Invalid!@#$%');
    await page.getByRole('button', { name: 'Decode from Base64' }).click();
    await expect(page.locator('text=Invalid Base64')).toBeVisible();
  });
});
