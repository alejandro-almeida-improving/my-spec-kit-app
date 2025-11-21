import { test, expect } from '@playwright/test';

test('home page displays the getting started text', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Verify that the page contains the expected text
  await expect(page.getByText('Todo List (MVP)')).toBeVisible();
});
