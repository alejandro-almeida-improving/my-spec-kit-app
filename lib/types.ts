/**
 * Core data types for the TODO List application
 */

/**
 * Task represents a single TODO list item.
 *
 * @example
 * const task: Task = {
 *   id: "550e8400-e29b-41d4-a716-446655440000",
 *   title: "Buy groceries",
 *   completed: false,
 *   createdAt: "2025-11-21T10:30:45.123Z"
 * };
 */
export interface Task {
  id: string; // UUID v4
  title: string; // 1-500 chars, trimmed, non-empty
  completed: boolean; // true = marked done, false = pending
  createdAt: string; // ISO 8601 UTC timestamp
}

/**
 * Return type for the useTodos custom hook
 */
export interface UseTodosReturn {
  tasks: Task[];
  isLoading: boolean;
  addTask: (title: string) => Task | null;
  toggleTask: (taskId: string) => Task | null;
  deleteTask: (taskId: string) => boolean;
}
