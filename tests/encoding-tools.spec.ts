import { test, expect } from '@playwright/test';

test.describe('Base64 Converter', () => {
  test('encodes and decodes correctly', async ({ page }) => {
    await page.goto('/tools/base64-converter');
    
    // Encode
    await page.getByLabel('Input').fill('hello');
    await page.getByRole('button', { name: 'Encode to Base64' }).click();
    await expect(page.getByLabel('Output')).toHaveValue('aGVsbG8=');
    
    // Decode
    await page.getByRole('button', { name: 'Decode' }).click();
    await page.getByLabel('Input').fill('aGVsbG8=');
    await page.getByRole('button', { name: 'Decode from Base64' }).click();
    await expect(page.getByLabel('Output')).toHaveValue('hello');
  });
});

test.describe('URL Encoder', () => {
  test('encodes and decodes correctly', async ({ page }) => {
    await page.goto('/tools/url-encoder');
    
    // Encode
    await page.getByLabel('Input').fill('hello world');
    await page.getByRole('button', { name: 'Encode URL' }).click();
    await expect(page.getByLabel('Output')).toHaveValue('hello%20world');
    
    // Decode
    await page.getByRole('button', { name: 'Decode' }).click();
    await page.getByLabel('Input').fill('hello%20world');
    await page.getByRole('button', { name: 'Decode URL' }).click();
    await expect(page.getByLabel('Output')).toHaveValue('hello world');
  });
});
