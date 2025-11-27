import { test, expect } from '@playwright/test';

test.describe('UUID Generator', () => {
  test('generates valid UUID', async ({ page }) => {
    await page.goto('/tools/uuid-generator');
    
    const input = page.getByLabel('Generated UUID (v4)');
    await expect(input).toBeVisible();
    
    // Wait for value to be populated
    await expect(input).toHaveValue(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    const uuid = await input.inputValue();
    
    // Generate new
    await page.getByRole('button', { name: 'Generate New UUID' }).click();
    await expect(input).not.toHaveValue(uuid);
    await expect(input).toHaveValue(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });
});

test.describe('Hash Generator', () => {
  test('calculates hashes', async ({ page }) => {
    await page.goto('/tools/hash-generator');
    
    await page.getByLabel('Input Text').fill('hello');
    
    // SHA-256 of 'hello' is 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
    // Note: The order of inputs depends on the map order in the component.
    // SHA-256 is the second one (index 1) in the list ["SHA-1", "SHA-256", "SHA-384", "SHA-512"]
    // But there is also the main input text area.
    // So inputs are: [UUID input (if on that page? no), Textarea (not input), SHA-1 input, SHA-256 input...]
    // Textarea is not an input tag.
    // So inputs are the readOnly ones.
    // SHA-1 is index 0. SHA-256 is index 1.
    
    // Let's be more specific with locator
    const sha256Input = page.locator('div').filter({ hasText: /^SHA-256$/ }).getByRole('textbox');
    await expect(sha256Input).toHaveValue('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
  });
});
