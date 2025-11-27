import { test, expect } from '@playwright/test';

test.describe('Case Converter', () => {
  test('converts text correctly', async ({ page }) => {
    await page.goto('/tools/case-converter');
    
    await page.getByLabel('Input Text').fill('hello world');
    
    // Check uppercase
    await expect(page.getByText('HELLO WORLD', { exact: true })).toBeVisible();
    
    // Check camelCase
    await expect(page.getByText('helloWorld', { exact: true })).toBeVisible();
    
    // Check snake_case
    await expect(page.getByText('hello_world', { exact: true })).toBeVisible();
  });
});

test.describe('Lorem Generator', () => {
  test('generates text', async ({ page }) => {
    await page.goto('/tools/lorem-generator');
    
    // Initial generation should happen
    await expect(page.getByLabel('Result')).toBeVisible();
    const result = page.getByLabel('Result');
    await expect(result).not.toBeEmpty();
    
    // Change count and generate
    await page.getByLabel('Count').fill('5');
    await page.getByRole('button', { name: 'Generate' }).click();
    
    // Verify content changed (hard to verify exact content, but length should be substantial)
    const text = await result.inputValue();
    expect(text?.length).toBeGreaterThan(100);
  });
});
