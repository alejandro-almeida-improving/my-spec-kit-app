/**
 * E2E Tests for Hash Generator
 * Feature: 001-dev-tools-suite / User Story 6
 */

import { test, expect } from '@playwright/test';

test.describe('Hash Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/hash-generator');
  });

  test('should generate hashes for multiple algorithms', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Input Text' }).fill('Hello World');
    
    // MD5
    await page.getByRole('combobox', { name: 'Hash Algorithm' }).click();
    await page.getByRole('option', { name: /MD5/ }).click();
    await page.getByRole('button', { name: 'Generate Hash' }).click();
    let hash = await page.locator('code').textContent();
    expect(hash!.length).toBe(32);
    
    // SHA-256
    await page.getByRole('combobox', { name: 'Hash Algorithm' }).click();
    await page.getByRole('option', { name: /SHA-256/ }).click();
    await page.getByRole('button', { name: 'Generate Hash' }).click();
    hash = await page.locator('code').textContent();
    expect(hash!.length).toBe(64);
  });

  test('should generate hash for empty input', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Input Text' }).fill('');
    await page.getByRole('button', { name: 'Generate Hash' }).click();
    const hash = await page.locator('code').textContent();
    expect(hash).toBeTruthy();
    expect(hash!.length).toBeGreaterThan(0);
  });
});
