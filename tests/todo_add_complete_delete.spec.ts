import { test, expect } from '@playwright/test';

test('add, complete, delete flows (US1)', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Add three tasks
  await page.fill('input[aria-label="Task title"]', 'First task');
  await page.click('button:has-text("Add")');
  await page.fill('input[aria-label="Task title"]', 'Second task');
  await page.click('button:has-text("Add")');
  await page.fill('input[aria-label="Task title"]', 'Third task');
  await page.click('button:has-text("Add")');

  // Verify three items
  const items = await page.locator('ul li');
  await expect(items).toHaveCount(3);

  // Mark second as completed
  await page.locator('ul li').nth(1).locator('input[type="checkbox"]').check();
  await expect(page.locator('ul li').nth(1)).toHaveText(/Second task/);

  // Delete first
  await page.locator('ul li').first().locator('button:has-text("Delete")').click();
  await expect(page.locator('ul li')).toHaveCount(2);
});
