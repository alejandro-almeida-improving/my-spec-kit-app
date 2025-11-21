import { test, expect } from '@playwright/test';

test('home page displays the TODO app', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Verify that the page contains the TODO app title
  await expect(page.getByText('My TODO List')).toBeVisible();
  
  // Verify empty state is shown initially
  await expect(page.getByText('No tasks yet')).toBeVisible();
  
  // Verify input field exists
  await expect(page.locator('input[data-testid="task-input"]')).toBeVisible();
  
  // Verify add button exists
  await expect(page.locator('button[data-testid="add-button"]')).toBeVisible();
});
