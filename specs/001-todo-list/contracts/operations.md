# TODO List API Contracts

**Date**: 2025-11-21  
**Note**: These are client-side operation contracts (not REST/HTTP APIs). All operations are in-memory + localStorage, no server involved.

---

## Operation 1: Add Task

**Operation ID**: `addTask`  
**User Story**: P1 - Add and Display Tasks  
**Acceptance Scenario**: "When user types 'Buy groceries' and clicks Add button, task appears in list"

### Request Contract

```typescript
/**
 * Request to add a new task to the list.
 * 
 * Called when user submits the Add Task form.
 */
interface AddTaskRequest {
  title: string; // User-provided task title (may contain leading/trailing whitespace)
}
```

### Response Contract

```typescript
/**
 * Response after task is added.
 * 
 * Success: Task is added to list and persisted to localStorage.
 * Failure: If title is empty/invalid, operation is rejected silently.
 */
interface AddTaskResponse {
  success: boolean; // true if task was created; false if validation failed
  task?: Task; // Created task (only present if success=true)
  error?: string; // Error message (only present if success=false; not shown to user in MVP)
}
```

### Validation Logic

```
1. Trim whitespace from title
2. Check length > 0 after trim
   ├─ If false → return { success: false, error: "Title cannot be empty" }
   └─ If true → proceed
3. Check length <= 500
   ├─ If false → return { success: false, error: "Title must be 500 characters or less" }
   └─ If true → proceed
4. Generate UUID for task.id
5. Create task: { id, title: trimmed, completed: false, createdAt: now }
6. Add to tasks array
7. Persist to localStorage
8. Return { success: true, task }
```

### Side Effects

- **State Change**: `tasks` array length increases by 1
- **Storage Change**: localStorage['todos'] is updated with new task
- **UI Update**: TaskList re-renders; new task appears at bottom of list
- **Scroll**: (Optional) Scroll to new task or maintain scroll position

### Example

**Input**:
```typescript
const request: AddTaskRequest = { title: "  Buy groceries  " };
```

**Processing**:
```typescript
const trimmed = "Buy groceries"; // after trim
const isValid = trimmed.length > 0 && trimmed.length <= 500; // true
```

**Output**:
```typescript
const response: AddTaskResponse = {
  success: true,
  task: {
    id: "550e8400-e29b-41d4-a716-446655440000",
    title: "Buy groceries",
    completed: false,
    createdAt: "2025-11-21T10:30:45.123Z"
  }
};
```

---

## Operation 2: Toggle Task Completion

**Operation ID**: `toggleTask`  
**User Story**: P2 - Toggle Task Completion  
**Acceptance Scenario**: "When user clicks checkbox, task is visually marked as complete (strikethrough, opacity reduced)"

### Request Contract

```typescript
/**
 * Request to toggle a task's completion status.
 * 
 * Called when user clicks the checkbox next to a task.
 */
interface ToggleTaskRequest {
  taskId: string; // UUID of task to toggle
}
```

### Response Contract

```typescript
/**
 * Response after task completion is toggled.
 * 
 * Success: Task.completed flips from false to true or vice versa.
 * Failure: If task does not exist, operation is rejected.
 */
interface ToggleTaskResponse {
  success: boolean; // true if task was toggled; false if task not found
  task?: Task; // Updated task (only present if success=true)
  error?: string; // Error message (optional; logged but not shown to user)
}
```

### Validation Logic

```
1. Find task in tasks array by id
   ├─ If not found → return { success: false, error: "Task not found" }
   └─ If found → proceed
2. Flip completed: task.completed = !task.completed
3. Persist to localStorage
4. Return { success: true, task: updated }
```

### Side Effects

- **State Change**: Task.completed flips; no other fields modified
- **Storage Change**: localStorage['todos'] is updated
- **UI Update**: Task styling changes
  - If completed=true: strikethrough text, reduced opacity (e.g., opacity-50)
  - If completed=false: normal text, full opacity
- **Visual Feedback**: Immediate (< 100ms perceived latency)

### Example

**Input**:
```typescript
const request: ToggleTaskRequest = { taskId: "550e8400-e29b-41d4-a716-446655440000" };
// Task before: { id, title, completed: false, createdAt }
```

**Processing**:
```typescript
const task = tasks.find(t => t.id === "550e8400-e29b-41d4-a716-446655440000");
task.completed = !task.completed; // false → true
```

**Output**:
```typescript
const response: ToggleTaskResponse = {
  success: true,
  task: {
    id: "550e8400-e29b-41d4-a716-446655440000",
    title: "Buy groceries",
    completed: true, // flipped from false
    createdAt: "2025-11-21T10:30:45.123Z"
  }
};
```

---

## Operation 3: Delete Task

**Operation ID**: `deleteTask`  
**User Story**: P3 - Delete Tasks  
**Acceptance Scenario**: "When user clicks delete button next to task, task is immediately removed from list"

### Request Contract

```typescript
/**
 * Request to delete a task from the list.
 * 
 * Called when user clicks the delete/trash button next to a task.
 */
interface DeleteTaskRequest {
  taskId: string; // UUID of task to delete
}
```

### Response Contract

```typescript
/**
 * Response after task is deleted.
 * 
 * Success: Task is permanently removed from list and localStorage.
 * Failure: If task does not exist, operation is rejected.
 */
interface DeleteTaskResponse {
  success: boolean; // true if task was deleted; false if task not found
  deletedTaskId?: string; // ID of deleted task (only present if success=true)
  error?: string; // Error message (optional; logged but not shown to user)
}
```

### Validation Logic

```
1. Find task in tasks array by id
   ├─ If not found → return { success: false, error: "Task not found" }
   └─ If found → proceed
2. Remove task from array (splice)
3. Persist to localStorage
4. Return { success: true, deletedTaskId: id }
```

### Side Effects

- **State Change**: Task is removed from array; all other tasks remain in place
- **Storage Change**: localStorage['todos'] is updated
- **UI Update**: Task disappears from list
- **Empty State**: If no tasks remain, empty state message appears (FR-008)
- **Order**: Other tasks' order is preserved

### Example

**Input**:
```typescript
const request: DeleteTaskRequest = { taskId: "550e8400-e29b-41d4-a716-446655440000" };
// tasks.length before: 2
```

**Processing**:
```typescript
const index = tasks.findIndex(t => t.id === "550e8400-e29b-41d4-a716-446655440000");
tasks.splice(index, 1); // remove at index
```

**Output**:
```typescript
const response: DeleteTaskResponse = {
  success: true,
  deletedTaskId: "550e8400-e29b-41d4-a716-446655440000"
};
// tasks.length after: 1
```

---

## Operation 4: List Tasks (Implicit)

**Operation ID**: `getTasks`  
**User Story**: P1 - Add and Display Tasks  
**Acceptance Scenario**: "Page displays all added tasks in order"

### Request Contract

```typescript
/**
 * Request to retrieve all tasks (implicit on component mount).
 * 
 * Not explicitly called by user; triggered on app load.
 */
interface GetTasksRequest {
  // No parameters; returns all tasks
}
```

### Response Contract

```typescript
/**
 * Response containing all tasks in order.
 * 
 * Tasks are sorted by createdAt ascending (oldest first).
 */
interface GetTasksResponse {
  tasks: Task[]; // Array of all tasks, ordered by createdAt
  isEmpty: boolean; // true if tasks.length === 0
}
```

### Validation Logic

```
1. Load from localStorage['todos']
   ├─ If missing/invalid → initialize as []
   └─ If valid → parse JSON
2. Sort by createdAt ascending
3. Return { tasks, isEmpty: tasks.length === 0 }
```

### Side Effects

- **State Change**: Populates initial `tasks` array from localStorage
- **UI Update**: TaskList renders all tasks; empty state shown if no tasks
- **Timing**: Runs once on component mount (useEffect dependency)

### Example

**Input**:
```typescript
const request: GetTasksRequest = {};
```

**Processing**:
```typescript
const stored = localStorage.getItem('todos');
const parsed = stored ? JSON.parse(stored) as Task[] : [];
const sorted = parsed.sort((a, b) => 
  new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
);
```

**Output**:
```typescript
const response: GetTasksResponse = {
  tasks: [
    { id: "...", title: "Buy groceries", completed: false, createdAt: "2025-11-21T10:30:45.123Z" },
    { id: "...", title: "Call dentist", completed: true, createdAt: "2025-11-21T11:15:22.456Z" }
  ],
  isEmpty: false
};
```

---

## Error Handling Contract

### Errors Not Shown to User (Logged Only)

| Error | Code | Reason | Recovery |
|-------|------|--------|----------|
| Task not found | TASK_NOT_FOUND | Race condition or concurrent delete | Silently fail; UI will re-render |
| Invalid UUID format | INVALID_UUID | Data corruption | Reject operation |
| localStorage quota exceeded | QUOTA_EXCEEDED | Too much data | Log warning; data not persisted but UI updates |
| Corrupted JSON in localStorage | PARSE_ERROR | Browser/extension interference | Reinitialize to empty list |

### User-Facing Errors (MVP Scope)

**None**. All errors are silent failures in MVP. Error messages are logged to console for debugging.

---

## Summary

| Operation | Trigger | Input | Output | Side Effects |
|-----------|---------|-------|--------|--------------|
| **addTask** | User clicks Add button | title: string | Task \| error | State + localStorage updated; UI re-renders |
| **toggleTask** | User clicks checkbox | taskId: string | Task \| error | Task.completed flipped; styling updated |
| **deleteTask** | User clicks delete button | taskId: string | success \| error | Task removed; empty state may appear |
| **getTasks** | Component mount | — | tasks: Task[] | Initial state hydrated from localStorage |

All operations are **synchronous** and **immediate** (no loading states needed).

