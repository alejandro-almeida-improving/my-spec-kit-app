/**
 * E2E Tests for Number Base Converter
 * Feature: 001-dev-tools-suite / User Story 8
 */

import { test, expect } from '@playwright/test';

test.describe('Number Base Converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/number-base-converter');
  });

  test('should convert numbers between all bases', async ({ page }) => {
    // Binary to others
    await page.getByRole('combobox', { name: 'Source Base' }).click();
    await page.getByRole('option', { name: 'Binary' }).click();
    await page.getByRole('textbox', { name: 'Number' }).fill('11111111');
    await page.getByRole('button', { name: 'Convert' }).click();
    
    const outputs = await page.locator('.font-mono').allTextContents();
    expect(outputs).toContain('11111111'); // Binary
    expect(outputs).toContain('377'); // Octal
    expect(outputs).toContain('255'); // Decimal
    expect(outputs.some(o => o.toUpperCase() === 'FF')).toBe(true); // Hex
  });

  test('should show error for invalid input', async ({ page }) => {
    await page.getByRole('combobox', { name: 'Source Base' }).click();
    await page.getByRole('option', { name: 'Binary' }).click();
    await page.getByRole('textbox', { name: 'Number' }).fill('XYZ');
    await page.getByRole('button', { name: 'Convert' }).click();
    await expect(page.locator('.border-destructive')).toBeVisible();
  });
});
