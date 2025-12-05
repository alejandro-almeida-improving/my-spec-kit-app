/**
 * E2E Tests for Case Converter
 * Feature: 001-dev-tools-suite / User Story 1
 */

import { test, expect } from '@playwright/test';

test.describe('Case Converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/case-converter');
  });

  test('should convert text between different cases', async ({ page }) => {
    const input = 'Hello World TEST 123';
    await page.getByRole('textbox', { name: 'Input Text' }).fill(input);
    
    // Test lowercase
    await page.getByRole('combobox', { name: 'Target Format' }).click();
    await page.getByRole('option', { name: 'lowercase' }).click();
    await page.getByRole('button', { name: 'Convert' }).click();
    let output = await page.getByRole('textbox').nth(1).inputValue();
    expect(output).toBe('hello world test 123');
    
    // Test UPPERCASE
    await page.getByRole('combobox', { name: 'Target Format' }).click();
    await page.getByRole('option', { name: 'UPPERCASE' }).click();
    await page.getByRole('button', { name: 'Convert' }).click();
    output = await page.getByRole('textbox').nth(1).inputValue();
    expect(output).toBe('HELLO WORLD TEST 123');
  });

  test('should copy output to clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    
    await page.getByRole('textbox', { name: 'Input Text' }).fill('test text');
    await page.getByRole('combobox', { name: 'Target Format' }).click();
    await page.getByRole('option', { name: 'UPPERCASE' }).click();
    await page.getByRole('button', { name: 'Convert' }).click();
    
    await page.getByRole('button', { name: 'Copy' }).click();
    await expect(page.getByRole('button', { name: 'Copied' })).toBeVisible();
  });
});
