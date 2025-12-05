/**
 * E2E Tests for UUID Generator
 * Feature: 001-dev-tools-suite / User Story 2
 */

import { test, expect } from '@playwright/test';

test.describe('UUID Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uuid-generator');
  });

  test('should generate valid UUIDs', async ({ page }) => {
    await page.getByRole('spinbutton', { name: 'Number of UUIDs' }).fill('5');
    await page.getByRole('button', { name: 'Generate UUIDs' }).click();
    
    await expect(page.locator('text=Generated UUIDs')).toBeVisible();
    // Verificar que se generaron los UUIDs contando los elementos
    const uuidsContainer = page.locator('text=Generated UUIDs').locator('..').locator('..').locator('div').nth(1);
    const uuidElements = uuidsContainer.locator('> div');
    const count = await uuidElements.count();
    expect(count).toBe(5);
    
    // Verificar que al menos uno tiene formato UUID v4
    const firstUuid = await uuidElements.first().textContent();
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(firstUuid!.trim()).toMatch(uuidRegex);
  });

  test('should copy UUID to clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    
    await page.getByRole('spinbutton', { name: 'Number of UUIDs' }).fill('1');
    await page.getByRole('button', { name: 'Generate UUID' }).click();
    
    await page.getByRole('button', { name: 'Copy' }).click();
    await expect(page.getByRole('button', { name: 'Copied' })).toBeVisible();
  });
});
