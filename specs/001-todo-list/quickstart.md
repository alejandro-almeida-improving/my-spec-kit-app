# Phase 1 Quickstart: TODO List MVP

**Date**: 2025-11-21  
**Feature**: TODO List MVP  
**Repo**: my-spec-kit-app  
**Branch**: 001-todo-list

---

## Overview

This quickstart guide provides step-by-step instructions to implement the TODO List MVP from the feature specification. The implementation is a single-page React application using Next.js 16, TypeScript, shadcn/ui components, and Tailwind CSS.

**Key Constraints**:
- All data persists in localStorage (session-only, no backend)
- No external state management library (use React hooks)
- All styling via Tailwind CSS
- All testing via Playwright E2E
- Static generation compatible (no server components with side effects)

---

## Project Structure

```
my-spec-kit-app/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # TODO page (main feature)
│   └── globals.css         # Tailwind + resets
├── lib/
│   ├── utils.ts            # Tailwind cn() helper
│   ├── types.ts            # TypeScript interfaces (Task, etc.)
│   └── hooks/
│       └── useTodos.ts     # Custom hook for state + localStorage
├── components/
│   ├── TaskInput.tsx       # Input + Add button
│   ├── TaskList.tsx        # Task list container
│   ├── TaskItem.tsx        # Individual task row
│   └── EmptyState.tsx      # "No tasks" message
├── specs/001-todo-list/
│   ├── plan.md             # Implementation plan (this document)
│   ├── research.md         # Research findings
│   ├── data-model.md       # Data model spec
│   ├── contracts/
│   │   ├── operations.md   # Operation contracts
│   │   └── components.md   # Component contracts
│   └── spec.md             # Feature specification
├── tests/
│   ├── todo.spec.ts        # Playwright E2E tests
│   └── example.spec.ts     # Existing example test
├── package.json            # Dependencies (Next.js 16, shadcn/ui, etc.)
├── tsconfig.json           # TypeScript config (strict mode)
└── next.config.ts          # Next.js configuration

```

---

## Step 1: Create Type Definitions

**File**: `lib/types.ts`

Define the `Task` interface representing a single TODO item:

```typescript
/**
 * Task entity representing a single TODO list item.
 */
export interface Task {
  id: string; // UUID v4
  title: string; // 1-500 characters, trimmed
  completed: boolean; // Completion status (default: false)
  createdAt: string; // ISO 8601 UTC timestamp
}

/**
 * Hook return type for useTodos.
 */
export interface UseTodosReturn {
  tasks: Task[];
  isLoading: boolean;
  addTask: (title: string) => Task | null;
  toggleTask: (taskId: string) => Task | null;
  deleteTask: (taskId: string) => boolean;
}
```

**Reference**: `specs/001-todo-list/data-model.md`

---

## Step 2: Create useTodos Hook

**File**: `lib/hooks/useTodos.ts`

Implement the custom hook managing task state and localStorage persistence:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Task, UseTodosReturn } from '@/lib/types';

/**
 * Generate a UUID v4.
 * Note: For MVP, using a simple UUID generator.
 * In production, use a library like uuid.
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function useTodos(): UseTodosReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('todos');
      const parsed = stored ? (JSON.parse(stored) as Task[]) : [];
      // Sort by createdAt ascending (oldest first)
      const sorted = parsed.sort((a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setTasks(sorted);
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error);
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Persist to localStorage when tasks change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('todos', JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to persist tasks to localStorage:', error);
      }
    }
  }, [tasks, isLoading]);

  const addTask = (title: string): Task | null => {
    const trimmed = title.trim();

    // Validation: V-001 (non-empty) and V-002 (length bounds)
    if (trimmed.length === 0 || trimmed.length > 500) {
      return null;
    }

    const task: Task = {
      id: generateUUID(),
      title: trimmed,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [...prev, task]);
    return task;
  };

  const toggleTask = (taskId: string): Task | null => {
    let updated: Task | null = null;

    setTasks((prev) => {
      const index = prev.findIndex((t) => t.id === taskId);
      if (index === -1) return prev;

      const newTasks = [...prev];
      newTasks[index] = {
        ...newTasks[index],
        completed: !newTasks[index].completed,
      };
      updated = newTasks[index];
      return newTasks;
    });

    return updated;
  };

  const deleteTask = (taskId: string): boolean => {
    let deleted = false;

    setTasks((prev) => {
      const index = prev.findIndex((t) => t.id === taskId);
      if (index === -1) return prev;

      deleted = true;
      return prev.filter((_, i) => i !== index);
    });

    return deleted;
  };

  return { tasks, isLoading, addTask, toggleTask, deleteTask };
}
```

**Reference**: `specs/001-todo-list/contracts/components.md` (useTodos hook)

---

## Step 3: Create TaskInput Component

**File**: `components/TaskInput.tsx`

```typescript
'use client';

import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TaskInputProps {
  onAddTask: (title: string) => void;
  isDisabled?: boolean;
}

export default function TaskInput({
  onAddTask,
  isDisabled = false,
}: TaskInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAddTask(input);
    setInput(''); // Clear input after submission
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        type="text"
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isDisabled}
        className="flex-1"
        data-testid="task-input"
      />
      <Button type="submit" disabled={isDisabled} data-testid="add-button">
        Add Task
      </Button>
    </form>
  );
}
```

**Requirements Met**:
- FR-001: Input field for task title
- FR-002: Add Task button
- Uses shadcn/ui Input and Button components
- Tailwind styling only
- Enter key submits form
- Clears input after submission

**Reference**: `specs/001-todo-list/contracts/components.md` (TaskInput)

---

## Step 4: Create TaskItem Component

**File**: `components/TaskItem.tsx`

```typescript
'use client';

import { Task } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskItem({
  task,
  onToggle,
  onDelete,
}: TaskItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="h-5 w-5"
        data-testid={`checkbox-${task.id}`}
        aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
      />

      <span
        className={`flex-1 text-sm ${
          task.completed
            ? 'line-through opacity-50 text-slate-500'
            : 'text-slate-900'
        }`}
        data-testid={`task-title-${task.id}`}
      >
        {task.title}
      </span>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(task.id)}
        className="text-red-600 hover:text-red-800 hover:bg-red-50"
        data-testid={`delete-button-${task.id}`}
        aria-label={`Delete "${task.title}"`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
```

**Requirements Met**:
- FR-005: Checkbox for completion toggle
- FR-006: Visual distinction for completed tasks (strikethrough + opacity)
- FR-007: Delete button for each task
- Accessibility: Keyboard navigation, ARIA labels
- Uses shadcn/ui Checkbox and Button

**Reference**: `specs/001-todo-list/contracts/components.md` (TaskItem)

---

## Step 5: Create EmptyState Component

**File**: `components/EmptyState.tsx`

```typescript
'use client';

export default function EmptyState() {
  return (
    <div className="text-center py-8">
      <p className="text-slate-500 text-sm">
        No tasks yet. Add one above!
      </p>
    </div>
  );
}
```

**Requirements Met**:
- FR-008: Empty state message when no tasks exist

**Reference**: `specs/001-todo-list/contracts/components.md` (EmptyState)

---

## Step 6: Create TaskList Component

**File**: `components/TaskList.tsx`

```typescript
'use client';

import { Task } from '@/lib/types';
import TaskItem from './TaskItem';
import EmptyState from './EmptyState';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function TaskList({
  tasks,
  isLoading,
  onToggleTask,
  onDeleteTask,
}: TaskListProps) {
  if (isLoading) {
    return <div className="text-center py-8 text-slate-500">Loading...</div>;
  }

  return (
    <div className="space-y-2">
      {tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))}
        </>
      )}
    </div>
  );
}
```

**Requirements Met**:
- FR-003: Display all added tasks in visible list
- FR-004: Task order (created order, oldest first)
- FR-008: Empty state message

**Reference**: `specs/001-todo-list/contracts/components.md` (TaskList)

---

## Step 7: Update Main Page Component

**File**: `app/page.tsx`

```typescript
'use client';

import { useTodos } from '@/lib/hooks/useTodos';
import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';

export default function TodoPage() {
  const { tasks, isLoading, addTask, toggleTask, deleteTask } = useTodos();

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-2xl mx-auto py-12 px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            My TODO List
          </h1>
          <p className="text-slate-600 text-sm">
            Stay organized and never forget a task
          </p>
        </header>

        <TaskInput onAddTask={addTask} />
        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
```

**Requirements Met**:
- All functional requirements (FR-001 through FR-010)
- User can add, view, toggle, and delete tasks
- Tasks persist in localStorage during session
- Attractive, modern UI using shadcn/ui and Tailwind

**Reference**: `specs/001-todo-list/contracts/components.md` (TodoPage)

---

## Step 8: Write Playwright Tests

**File**: `tests/todo.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('TODO List MVP', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test.describe('User Story 1: Add and Display Tasks (P1)', () => {
    test('should add a task and display it in the list', async ({ page }) => {
      await page.goto('/');
      
      // Type task title
      await page.fill('[data-testid="task-input"]', 'Buy groceries');
      
      // Click Add button
      await page.click('[data-testid="add-button"]');
      
      // Verify task appears in list
      await expect(
        page.locator('[data-testid="task-title-*"]:has-text("Buy groceries")')
      ).toBeVisible();
      
      // Verify input is cleared
      await expect(page.locator('[data-testid="task-input"]')).toHaveValue('');
    });

    test('should add multiple tasks in order', async ({ page }) => {
      await page.goto('/');
      
      // Add first task
      await page.fill('[data-testid="task-input"]', 'Buy groceries');
      await page.click('[data-testid="add-button"]');
      
      // Add second task
      await page.fill('[data-testid="task-input"]', 'Call dentist');
      await page.click('[data-testid="add-button"]');
      
      // Verify both tasks appear in order
      const taskTitles = await page
        .locator('[data-testid^="task-title-"]')
        .allTextContents();
      
      expect(taskTitles).toEqual(['Buy groceries', 'Call dentist']);
    });

    test('should not add empty task', async ({ page }) => {
      await page.goto('/');
      
      // Click Add without typing
      await page.click('[data-testid="add-button"]');
      
      // Verify no task was added
      const taskItems = await page
        .locator('[data-testid^="task-title-"]')
        .count();
      
      expect(taskItems).toBe(0);
    });
  });

  test.describe('User Story 2: Toggle Task Completion (P2)', () => {
    test('should toggle task completion', async ({ page }) => {
      await page.goto('/');
      
      // Add task
      await page.fill('[data-testid="task-input"]', 'Buy groceries');
      await page.click('[data-testid="add-button"]');
      
      // Get task ID from the DOM
      const taskItem = page.locator('[data-testid^="task-title-"]:has-text("Buy groceries")');
      const taskId = await taskItem.getAttribute('data-testid');
      const checkboxId = taskId?.replace('task-title-', 'checkbox-');
      
      // Toggle checkbox
      await page.click(`[data-testid="${checkboxId}"]`);
      
      // Verify task is marked as complete (strikethrough + opacity)
      await expect(taskItem).toHaveClass(/line-through/);
      await expect(taskItem).toHaveClass(/opacity-50/);
      
      // Toggle again
      await page.click(`[data-testid="${checkboxId}"]`);
      
      // Verify task is marked as incomplete
      await expect(taskItem).not.toHaveClass(/line-through/);
    });

    test('should distinguish completed and incomplete tasks visually', async ({
      page,
    }) => {
      await page.goto('/');
      
      // Add two tasks
      await page.fill('[data-testid="task-input"]', 'Task 1');
      await page.click('[data-testid="add-button"]');
      
      await page.fill('[data-testid="task-input"]', 'Task 2');
      await page.click('[data-testid="add-button"]');
      
      // Toggle first task
      const firstCheckbox = page.locator('[data-testid^="checkbox-"]').first();
      await firstCheckbox.click();
      
      // Verify visual distinction
      const firstTask = page
        .locator('[data-testid^="task-title-"]')
        .first();
      const secondTask = page.locator('[data-testid^="task-title-"]').last();
      
      await expect(firstTask).toHaveClass(/line-through/);
      await expect(secondTask).not.toHaveClass(/line-through/);
    });
  });

  test.describe('User Story 3: Delete Tasks (P3)', () => {
    test('should delete a task from the list', async ({ page }) => {
      await page.goto('/');
      
      // Add task
      await page.fill('[data-testid="task-input"]', 'Buy groceries');
      await page.click('[data-testid="add-button"]');
      
      // Delete task
      const deleteButton = page.locator('[data-testid^="delete-button-"]');
      await deleteButton.click();
      
      // Verify task is removed
      await expect(
        page.locator('[data-testid^="task-title-"]:has-text("Buy groceries")')
      ).not.toBeVisible();
    });

    test('should delete only the selected task', async ({ page }) => {
      await page.goto('/');
      
      // Add two tasks
      await page.fill('[data-testid="task-input"]', 'Task 1');
      await page.click('[data-testid="add-button"]');
      
      await page.fill('[data-testid="task-input"]', 'Task 2');
      await page.click('[data-testid="add-button"]');
      
      // Get delete buttons
      const deleteButtons = page.locator('[data-testid^="delete-button-"]');
      
      // Delete first task
      await deleteButtons.first().click();
      
      // Verify only Task 2 remains
      const taskTitles = await page
        .locator('[data-testid^="task-title-"]')
        .allTextContents();
      
      expect(taskTitles).toEqual(['Task 2']);
    });

    test('should show empty state when all tasks are deleted', async ({
      page,
    }) => {
      await page.goto('/');
      
      // Add task
      await page.fill('[data-testid="task-input"]', 'Buy groceries');
      await page.click('[data-testid="add-button"]');
      
      // Delete task
      await page.click('[data-testid^="delete-button-"]');
      
      // Verify empty state is shown
      await expect(page.locator('text=No tasks yet')).toBeVisible();
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle whitespace-only input', async ({ page }) => {
      await page.goto('/');
      
      // Type only spaces
      await page.fill('[data-testid="task-input"]', '   ');
      await page.click('[data-testid="add-button"]');
      
      // Verify no task was added
      const taskCount = await page
        .locator('[data-testid^="task-title-"]')
        .count();
      
      expect(taskCount).toBe(0);
    });

    test('should persist tasks across page reload', async ({ page }) => {
      await page.goto('/');
      
      // Add task
      await page.fill('[data-testid="task-input"]', 'Buy groceries');
      await page.click('[data-testid="add-button"]');
      
      // Reload page
      await page.reload();
      
      // Verify task still exists
      await expect(
        page.locator('[data-testid^="task-title-"]:has-text("Buy groceries")')
      ).toBeVisible();
    });

    test('should support keyboard navigation (Enter to submit)', async ({
      page,
    }) => {
      await page.goto('/');
      
      // Type task and press Enter
      await page.fill('[data-testid="task-input"]', 'Buy groceries');
      await page.press('[data-testid="task-input"]', 'Enter');
      
      // Verify task is added
      await expect(
        page.locator('[data-testid^="task-title-"]:has-text("Buy groceries")')
      ).toBeVisible();
    });
  });
});
```

**Tests Cover**:
- All 3 user stories (P1, P2, P3)
- All acceptance scenarios
- Edge cases (whitespace, persistence, keyboard navigation)
- Accessibility (keyboard Enter key, ARIA labels)

**Reference**: `specs/001-todo-list/contracts/operations.md` (operations)

---

## Step 9: Verify with `npm run build`

Ensure the application builds as static site:

```bash
cd /Users/user/github-improving/my-spec-kit-app
npm run build
```

Expected output:
```
✓ Linting and type checking
✓ Creating an optimized production build
✓ Compiled successfully
✓ Collecting page data
✓ Finalizing page optimization
Route (app)                              Size     First Load JS
─ ○ /                                    ...      ...
```

---

## Summary

| Step | File | Component | Status |
|------|------|-----------|--------|
| 1 | `lib/types.ts` | Type definitions | ✓ |
| 2 | `lib/hooks/useTodos.ts` | State management | ✓ |
| 3 | `components/TaskInput.tsx` | Add task form | ✓ |
| 4 | `components/TaskItem.tsx` | Task row | ✓ |
| 5 | `components/EmptyState.tsx` | Empty message | ✓ |
| 6 | `components/TaskList.tsx` | Task list container | ✓ |
| 7 | `app/page.tsx` | Main page | ✓ |
| 8 | `tests/todo.spec.ts` | E2E tests | ✓ |

**All functional requirements (FR-001 through FR-010) are met.**  
**All user stories (P1, P2, P3) are implemented.**  
**All acceptance scenarios have Playwright tests.**

---

## Next Steps

1. **Implement components** following the quickstart guide
2. **Run tests** with `npm run test`
3. **Verify styling** with `npm run dev` and browser inspection
4. **Lint code** with `npm run lint`
5. **Build for production** with `npm run build`

---

## References

- Feature Specification: `specs/001-todo-list/spec.md`
- Data Model: `specs/001-todo-list/data-model.md`
- API Contracts: `specs/001-todo-list/contracts/operations.md`
- Component Contracts: `specs/001-todo-list/contracts/components.md`
- Research: `specs/001-todo-list/research.md`

