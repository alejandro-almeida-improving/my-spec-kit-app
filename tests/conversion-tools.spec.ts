import { test, expect } from '@playwright/test';

test.describe('Timestamp Converter', () => {
  test('converts timestamp to date', async ({ page }) => {
    await page.goto('/tools/timestamp-converter');
    
    // Set timestamp to 1609459200 (2021-01-01 00:00:00 UTC)
    // Note: Local time might vary, but we check if it produces a valid date string
    await page.getByLabel('Unix Timestamp (seconds)').fill('1609459200');
    
    const humanDate = page.locator('.text-xl.font-mono');
    await expect(humanDate).not.toHaveText('Invalid Date');
    // Check for year 2020 or 2021 to account for timezone differences
    const text = await humanDate.textContent();
    expect(text).toMatch(/2020|2021/);
  });
});

test.describe('Number Base Converter', () => {
  test('converts between bases', async ({ page }) => {
    await page.goto('/tools/number-base-converter');
    
    // Decimal to others
    await page.getByLabel('Decimal (Base 10)').fill('255');
    await expect(page.getByLabel('Hexadecimal (Base 16)')).toHaveValue('FF');
    await expect(page.getByLabel('Binary (Base 2)')).toHaveValue('11111111');
    await expect(page.getByLabel('Octal (Base 8)')).toHaveValue('377');
    
    // Hex to others
    await page.getByLabel('Hexadecimal (Base 16)').fill('A');
    await expect(page.getByLabel('Decimal (Base 10)')).toHaveValue('10');
    await expect(page.getByLabel('Binary (Base 2)')).toHaveValue('1010');
  });
});
