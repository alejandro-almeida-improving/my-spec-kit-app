# Component Interface Contracts

**Date**: 2025-11-21  
**Scope**: TypeScript interfaces for component props and hooks

---

## Hook: useTodos

**File Location**: `lib/hooks/useTodos.ts`  
**Purpose**: Encapsulate task state management, persistence, and operations

### Hook Signature

```typescript
/**
 * Custom hook for TODO list state management.
 * 
 * Handles:
 * - Loading tasks from localStorage on mount
 * - Persisting tasks to localStorage on change
 * - CRUD operations (add, toggle, delete tasks)
 * 
 * @returns Object with tasks array and mutation functions
 */
function useTodos(): UseTodosReturn
```

### Return Type

```typescript
interface UseTodosReturn {
  // State
  tasks: Task[];
  isLoading: boolean; // true while hydrating from localStorage
  
  // Mutations
  addTask: (title: string) => Task | null; // Returns created task or null if invalid
  toggleTask: (taskId: string) => Task | null; // Returns updated task or null if not found
  deleteTask: (taskId: string) => boolean; // Returns true if deleted, false if not found
}
```

### Implementation Pattern

```typescript
export function useTodos(): UseTodosReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('todos');
      const parsed = stored ? JSON.parse(stored) as Task[] : [];
      setTasks(parsed);
    } catch (error) {
      console.error('Failed to load tasks:', error);
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
        console.error('Failed to persist tasks:', error);
      }
    }
  }, [tasks, isLoading]);

  // Operations
  const addTask = (title: string): Task | null => {
    const trimmed = title.trim();
    if (trimmed.length === 0 || trimmed.length > 500) return null;

    const task: Task = {
      id: generateUUID(),
      title: trimmed,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, task]);
    return task;
  };

  const toggleTask = (taskId: string): Task | null => {
    let updated: Task | null = null;
    setTasks(prev => {
      const index = prev.findIndex(t => t.id === taskId);
      if (index === -1) return prev;
      
      const newTasks = [...prev];
      newTasks[index] = { ...newTasks[index], completed: !newTasks[index].completed };
      updated = newTasks[index];
      return newTasks;
    });
    return updated;
  };

  const deleteTask = (taskId: string): boolean => {
    let deleted = false;
    setTasks(prev => {
      const index = prev.findIndex(t => t.id === taskId);
      if (index === -1) return prev;
      
      deleted = true;
      return prev.filter((_, i) => i !== index);
    });
    return deleted;
  };

  return { tasks, isLoading, addTask, toggleTask, deleteTask };
}
```

---

## Component: TaskInput

**File Location**: `components/TaskInput.tsx`  
**Purpose**: Input field + Add button for task submission

### Props Contract

```typescript
interface TaskInputProps {
  onAddTask: (title: string) => void; // Called when Add button is clicked or Enter is pressed
  isDisabled?: boolean; // Disable input during submission (optional)
}
```

### Behavior

- Renders `<input type="text" />` and `<button>Add Task</button>`
- Input is cleared after submission
- Enter key submits form (trigger onAddTask)
- Whitespace input is rejected by parent hook (silent fail)
- shadcn/ui Button and Input components used
- Tailwind-only styling

### Example Usage

```typescript
<TaskInput 
  onAddTask={(title) => {
    const task = addTask(title);
    if (task) console.log('Added:', task);
  }}
/>
```

---

## Component: TaskList

**File Location**: `components/TaskList.tsx`  
**Purpose**: Container for rendering all tasks

### Props Contract

```typescript
interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}
```

### Behavior

- Renders `<TaskItem>` for each task in `tasks` array
- If `isLoading=true`, show loading skeleton (optional in MVP)
- If `tasks.length === 0`, show empty state (see EmptyState component)
- Tasks ordered by `createdAt` ascending (oldest first)
- Pass `onToggleTask` and `onDeleteTask` to each TaskItem

### Example Usage

```typescript
<TaskList
  tasks={tasks}
  isLoading={isLoading}
  onToggleTask={(id) => toggleTask(id)}
  onDeleteTask={(id) => deleteTask(id)}
/>
```

---

## Component: TaskItem

**File Location**: `components/TaskItem.tsx`  
**Purpose**: Individual task row with checkbox and delete button

### Props Contract

```typescript
interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void; // Called when checkbox is clicked
  onDelete: (taskId: string) => void; // Called when delete button is clicked
}
```

### Behavior

- Renders checkbox (shadcn/ui Checkbox component)
- Renders task title (with strikethrough if completed)
- Renders delete button (secondary variant, red icon)
- Checkbox checked state = `task.completed`
- Completed tasks: strikethrough + `opacity-50` styling
- Delete button shows on hover or always visible (design choice)
- Keyboard accessible: Tab to checkbox, Space to toggle, Tab to delete button

### Styling

```typescript
// Completed task styling
const textStyle = task.completed 
  ? 'line-through opacity-50' 
  : 'opacity-100';

// Delete button styling
<button className="text-red-600 hover:text-red-800">
  <TrashIcon />
</button>
```

### Example Usage

```typescript
<TaskItem
  task={task}
  onToggle={(id) => toggleTask(id)}
  onDelete={(id) => deleteTask(id)}
/>
```

---

## Component: EmptyState

**File Location**: `components/EmptyState.tsx`  
**Purpose**: Display when task list is empty

### Props Contract

```typescript
interface EmptyStateProps {
  // No props required; static message
}
```

### Behavior

- Shows: "No tasks yet. Add one above!"
- Centered, subtle styling (opacity-60 or lighter color)
- Rendered by TaskList when `tasks.length === 0` and not loading

### Example Usage

```typescript
{tasks.length === 0 && !isLoading && <EmptyState />}
```

---

## Component: TodoPage (Main Page)

**File Location**: `app/page.tsx`  
**Purpose**: Root component orchestrating all subcomponents

### Props Contract

```typescript
// Page component - no props (Next.js convention)
// Uses "use client" directive for interactivity
```

### Structure

```typescript
'use client';

import { useTodos } from '@/lib/hooks/useTodos';
import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';

export default function TodoPage() {
  const { tasks, isLoading, addTask, toggleTask, deleteTask } = useTodos();

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">My TODO List</h1>
      
      <TaskInput onAddTask={addTask} />
      
      <TaskList
        tasks={tasks}
        isLoading={isLoading}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
      />
    </div>
  );
}
```

### Behavior

- Loads `useTodos` hook on mount
- Passes state and mutations to child components
- Renders page title, input, and task list
- No additional logic; acts as orchestrator

---

## Type Definitions (Global)

**File Location**: `lib/types.ts`

```typescript
/**
 * Task entity representing a single TODO item.
 */
export interface Task {
  id: string; // UUID v4
  title: string; // 1-500 chars, trimmed
  completed: boolean; // Completion status
  createdAt: string; // ISO 8601 UTC timestamp
}

/**
 * Result of task operations (for future error handling).
 */
export interface TaskResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

---

## Summary

| Component/Hook | Props | Returns | Purpose |
|---|---|---|---|
| **useTodos** | — | { tasks, isLoading, addTask, toggleTask, deleteTask } | State management + persistence |
| **TaskInput** | { onAddTask, isDisabled? } | JSX | Input + button for adding tasks |
| **TaskList** | { tasks, isLoading, onToggleTask, onDeleteTask } | JSX | Container for task items |
| **TaskItem** | { task, onToggle, onDelete } | JSX | Individual task row |
| **EmptyState** | — | JSX | "No tasks" message |
| **TodoPage** | — | JSX | Main page orchestrator |

All components follow **shadcn/ui** conventions and use **Tailwind CSS** exclusively for styling.

