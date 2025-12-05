/**
 * E2E Tests for Lorem Generator
 * Feature: 001-dev-tools-suite / User Story 7
 */

import { test, expect } from '@playwright/test';

test.describe('Lorem Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/lorem-generator');
  });

  test('should generate lorem text in all modes', async ({ page }) => {
    // Words
    await page.getByRole('spinbutton', { name: 'Quantity' }).fill('10');
    await page.getByRole('combobox', { name: 'Unit Type' }).click();
    await page.getByRole('option', { name: 'Words (1-10,000)' }).click();
    await page.getByRole('button', { name: 'Generate Lorem Ipsum' }).click();
    await expect(page.locator('text=Generated 10 words')).toBeVisible();
    
    // Sentences
    await page.getByRole('spinbutton', { name: 'Quantity' }).fill('3');
    await page.getByRole('combobox', { name: 'Unit Type' }).click();
    await page.getByRole('option', { name: 'Sentences (1-1,000)' }).click();
    await page.getByRole('button', { name: 'Generate Lorem Ipsum' }).click();
    await expect(page.locator('text=Generated 3 sentences')).toBeVisible();
  });

  test('should show error for invalid quantity', async ({ page }) => {
    await page.getByRole('spinbutton', { name: 'Quantity' }).fill('0');
    await page.getByRole('button', { name: 'Generate Lorem' }).click();
    await expect(page.locator('.border-destructive')).toBeVisible();
  });
});
