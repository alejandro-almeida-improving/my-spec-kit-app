import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Navigate to the app first
  await page.goto('http://localhost:3000');
  
  // Clear localStorage after navigation
  await page.evaluate(() => {
    try {
      localStorage.clear();
    } catch {
      // localStorage may not be available in some contexts
    }
  });
  
  // Reload to apply cleared localStorage
  await page.reload();
});

test.describe('User Story 1: Add and Display Tasks (P1)', () => {
  test('should add a task and display it in the list', async ({ page }) => {
    // Type in the input field
    await page.fill('input[data-testid="task-input"]', 'Buy groceries');

    // Click the Add button
    await page.click('button[data-testid="add-button"]');

    // Verify task appears with correct text
    const taskTitle = page.locator('span[data-testid^="task-title-"]');
    await expect(taskTitle).toContainText('Buy groceries');

    // Verify input is cleared
    const input = page.locator('input[data-testid="task-input"]');
    await expect(input).toHaveValue('');
  });

  test('should add multiple tasks in order', async ({ page }) => {
    // Add first task
    await page.fill('input[data-testid="task-input"]', 'Buy groceries');
    await page.click('button[data-testid="add-button"]');

    // Add second task
    await page.fill('input[data-testid="task-input"]', 'Call dentist');
    await page.click('button[data-testid="add-button"]');

    // Verify both tasks appear in order
    const taskTitles = page.locator('span[data-testid^="task-title-"]');
    await expect(taskTitles).toHaveCount(2);

    const firstTask = taskTitles.first();
    const secondTask = taskTitles.nth(1);

    await expect(firstTask).toContainText('Buy groceries');
    await expect(secondTask).toContainText('Call dentist');
  });

  test('should not add empty task', async ({ page }) => {
    // Click Add without typing
    await page.click('button[data-testid="add-button"]');

    // Verify no task was added
    const taskTitles = page.locator('span[data-testid^="task-title-"]');
    await expect(taskTitles).toHaveCount(0);

    // Verify empty state is visible
    await expect(page.getByText('No tasks yet')).toBeVisible();
  });

  test('should display empty state when no tasks', async ({ page }) => {
    // Page should display empty state on load
    await expect(page.getByText('No tasks yet')).toBeVisible();
  });

  test('should support keyboard submission (Enter key)', async ({ page }) => {
    // Type task title
    await page.fill('input[data-testid="task-input"]', 'Write documentation');

    // Press Enter key
    await page.press('input[data-testid="task-input"]', 'Enter');

    // Verify task appears
    const taskTitle = page.locator('span[data-testid^="task-title-"]');
    await expect(taskTitle).toContainText('Write documentation');

    // Verify input is cleared
    const input = page.locator('input[data-testid="task-input"]');
    await expect(input).toHaveValue('');
  });

  test('should ignore whitespace-only input', async ({ page }) => {
    // Type only whitespace
    await page.fill('input[data-testid="task-input"]', '   ');

    // Click Add
    await page.click('button[data-testid="add-button"]');

    // Verify no task was added
    const taskTitles = page.locator('span[data-testid^="task-title-"]');
    await expect(taskTitles).toHaveCount(0);

    // Verify empty state is still visible
    await expect(page.getByText('No tasks yet')).toBeVisible();
  });
});

test.describe('User Story 2: Toggle Task Completion (P2)', () => {
  test('should toggle task completion', async ({ page }) => {
    // Add task
    await page.fill('input[data-testid="task-input"]', 'Buy groceries');
    await page.click('button[data-testid="add-button"]');

    // Wait for task to appear
    await page.waitForSelector('span[data-testid^="task-title-"]');

    // Get the checkbox by role
    const checkbox = page.getByRole('checkbox').first();
    await checkbox.waitFor({ state: 'visible' });

    // Click to complete
    await checkbox.click();

    // Verify strikethrough and opacity classes are applied
    const taskTitle = page.locator('span[data-testid^="task-title-"]').first();
    await expect(taskTitle).toHaveClass(/line-through/);
    await expect(taskTitle).toHaveClass(/opacity-50/);

    // Click again to uncomplete
    await checkbox.click();

    // Verify classes are removed
    await expect(taskTitle).not.toHaveClass(/line-through/);
    await expect(taskTitle).not.toHaveClass(/opacity-50/);
  });

  test('should distinguish completed and incomplete tasks visually', async ({ page }) => {
    // Add two tasks
    await page.fill('input[data-testid="task-input"]', 'Task 1');
    await page.click('button[data-testid="add-button"]');

    await page.fill('input[data-testid="task-input"]', 'Task 2');
    await page.click('button[data-testid="add-button"]');

    // Wait for both tasks to appear
    await page.waitForFunction(() => {
      const taskTitles = document.querySelectorAll('span[data-testid^="task-title-"]');
      return taskTitles.length === 2;
    });

    // Complete first task by role
    const checkboxes = page.getByRole('checkbox');
    await checkboxes.first().click();

    // Verify first task has strikethrough
    const firstTitle = page.locator('span[data-testid^="task-title-"]').first();
    await expect(firstTitle).toHaveClass(/line-through/);

    // Verify second task does not have strikethrough
    const secondTitle = page.locator('span[data-testid^="task-title-"]').nth(1);
    await expect(secondTitle).not.toHaveClass(/line-through/);
  });

  test('should persist completion state across page reload', async ({ page }) => {
    // Add task
    await page.fill('input[data-testid="task-input"]', 'Buy groceries');
    await page.click('button[data-testid="add-button"]');

    // Wait for task to appear
    await page.waitForSelector('span[data-testid^="task-title-"]');

    // Toggle complete by role
    const checkbox = page.getByRole('checkbox').first();
    await checkbox.click();

    // Verify completed
    let taskTitle = page.locator('span[data-testid^="task-title-"]').first();
    await expect(taskTitle).toHaveClass(/line-through/);

    // Reload page
    await page.reload();

    // Wait for page to load
    await page.waitForSelector('span[data-testid^="task-title-"]');

    // Verify task still marked complete
    taskTitle = page.locator('span[data-testid^="task-title-"]').first();
    await expect(taskTitle).toHaveClass(/line-through/);
  });
});

test.describe('User Story 3: Delete Tasks (P3)', () => {
  test('should delete a task from the list', async ({ page }) => {
    // Add task
    await page.fill('input[data-testid="task-input"]', 'Buy groceries');
    await page.click('button[data-testid="add-button"]');

    // Verify task is visible
    let taskTitles = page.locator('span[data-testid^="task-title-"]');
    await expect(taskTitles).toHaveCount(1);

    // Click delete button
    await page.click('button[data-testid^="delete-button-"]');

    // Verify task is removed
    taskTitles = page.locator('span[data-testid^="task-title-"]');
    await expect(taskTitles).toHaveCount(0);

    // Verify empty state appears
    await expect(page.locator('text=No tasks yet')).toBeVisible();
  });

  test('should delete only the selected task', async ({ page }) => {
    // Add two tasks
    await page.fill('input[data-testid="task-input"]', 'Task 1');
    await page.click('button[data-testid="add-button"]');

    await page.fill('input[data-testid="task-input"]', 'Task 2');
    await page.click('button[data-testid="add-button"]');

    // Verify both tasks exist
    let taskTitles = page.locator('span[data-testid^="task-title-"]');
    await expect(taskTitles).toHaveCount(2);

    // Delete first task
    const deleteButtons = page.locator('button[data-testid^="delete-button-"]');
    await deleteButtons.first().click();

    // Verify only second task remains
    taskTitles = page.locator('span[data-testid^="task-title-"]');
    await expect(taskTitles).toHaveCount(1);
    await expect(taskTitles.first()).toContainText('Task 2');
  });

  test('should show empty state when all tasks are deleted', async ({ page }) => {
    // Add one task
    await page.fill('input[data-testid="task-input"]', 'Single task');
    await page.click('button[data-testid="add-button"]');

    // Delete it
    await page.click('button[data-testid^="delete-button-"]');

    // Verify empty state appears
    await expect(page.locator('text=No tasks yet')).toBeVisible();
  });
});

test.describe('Edge Cases', () => {
  test('should handle whitespace-only input', async ({ page }) => {
    // Type "   " and click Add
    await page.fill('input[data-testid="task-input"]', '   ');
    await page.click('button[data-testid="add-button"]');

    // Verify no task created
    const taskTitles = page.locator('span[data-testid^="task-title-"]');
    await expect(taskTitles).toHaveCount(0);
  });

  test('should persist tasks across page reload', async ({ page }) => {
    // Add task
    await page.fill('input[data-testid="task-input"]', 'Persistent task');
    await page.click('button[data-testid="add-button"]');

    // Reload page
    await page.reload();

    // Verify task still exists
    const taskTitle = page.locator('span[data-testid^="task-title-"]');
    await expect(taskTitle).toContainText('Persistent task');
  });

  test('should support keyboard navigation (Enter to submit)', async ({ page }) => {
    // Type task title
    await page.fill('input[data-testid="task-input"]', 'Keyboard task');

    // Press Enter key
    await page.press('input[data-testid="task-input"]', 'Enter');

    // Verify task added
    const taskTitle = page.locator('span[data-testid^="task-title-"]');
    await expect(taskTitle).toContainText('Keyboard task');
  });

  test('should handle rapid clicks gracefully', async ({ page }) => {
    // Type task
    await page.fill('input[data-testid="task-input"]', 'Rapid click task');

    // Click button multiple times rapidly
    const button = page.locator('button[data-testid="add-button"]');
    await button.click();
    await button.click();
    await button.click();

    // Only one task should be created (first click adds, input is empty after)
    const taskTitles = page.locator('span[data-testid^="task-title-"]');
    const count = await taskTitles.count();
    expect(count).toBeLessThanOrEqual(1);
  });

  test('should handle long task titles (500 char limit)', async ({ page }) => {
    // Create a 500 character task
    const longTitle = 'a'.repeat(500);
    await page.fill('input[data-testid="task-input"]', longTitle);
    await page.click('button[data-testid="add-button"]');

    // Verify task was created
    let taskTitles = page.locator('span[data-testid^="task-title-"]');
    await expect(taskTitles).toHaveCount(1);

    // Try to add a 501 character task
    const tooLongTitle = 'a'.repeat(501);
    await page.fill('input[data-testid="task-input"]', tooLongTitle);
    await page.click('button[data-testid="add-button"]');

    // Verify no second task was created (rejected)
    taskTitles = page.locator('span[data-testid^="task-title-"]');
    await expect(taskTitles).toHaveCount(1);
  });
});
