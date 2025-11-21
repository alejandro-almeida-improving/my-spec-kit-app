# Phase 1 Design: Data Model

**Date**: 2025-11-21  
**Feature**: TODO List MVP  
**Input**: `spec.md` Acceptance Scenarios and Requirements

---

## Core Entity: Task

### Definition

A **Task** represents a single TODO item with metadata for identification, display, and state tracking.

### Fields

| Field | Type | Required | Validation | Default | Notes |
|-------|------|----------|-----------|---------|-------|
| `id` | `string` (UUID v4) | Yes | UUID format, unique per instance | Generated on creation | Unique identifier; used as React key |
| `title` | `string` | Yes | 1-500 characters after trim; non-empty | — | User-provided task text; whitespace trimmed |
| `completed` | `boolean` | Yes | true or false | `false` | Completion status; controls visual styling |
| `createdAt` | `string` (ISO 8601) | Yes | Valid ISO 8601 datetime | Current timestamp | When task was added; used for ordering (oldest first) |

### TypeScript Definition

```typescript
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
```

---

## Validation Rules

### Input Validation (on Add Task)

**Rule V-001: Title is Required**
- Precondition: User submits "Add Task" form
- Validation: `title.trim().length > 0`
- Failure: Reject submission; no error alert (silent fail per spec edge case testing)
- Success: Trim whitespace; proceed to V-002

**Rule V-002: Title Length Bounds**
- Precondition: Title has passed V-001 (non-empty)
- Validation: `1 <= title.length <= 500`
- Failure: Reject if > 500 characters (truncate or show warning)
- Success: Title is valid; proceed to creation

**Rule V-003: UUID Uniqueness**
- Precondition: Task is being created
- Validation: Generate `uuid()` and verify not in current task list
- Failure: Regenerate UUID (collision extremely rare; retry once)
- Success: UUID is unique; store task

**Rule V-004: Timestamp Validity**
- Precondition: Task is being created
- Validation: `new Date().toISOString()` produces valid ISO 8601 string
- Failure: Default to current time (should not occur in modern browsers)
- Success: Timestamp recorded

---

## State Transitions

### Task Lifecycle

```
CREATE (user submits form)
  ├─ id: UUID generated
  ├─ title: user input (trimmed)
  ├─ completed: false (default)
  └─ createdAt: now (ISO 8601)
    ↓
DISPLAY (rendered in list)
  ├─ If completed=false: normal styling
  └─ If completed=true: strikethrough, dimmed
    ↓
TOGGLE (user clicks checkbox)
  ├─ completed: false → true (mark done)
  └─ completed: true → false (mark pending)
    ↓
DELETE (user clicks delete button)
  └─ Task removed from list
    ↓
END
```

### Completion State Machine

```
State: PENDING (completed=false)
  ├─ Trigger: User clicks checkbox
  └─ → COMPLETED
    
State: COMPLETED (completed=true)
  ├─ Trigger: User clicks checkbox
  └─ → PENDING
```

**No transitions from/to deleted state in data model** (deletion is immediate removal from list, not a state transition).

---

## Collections & Relationships

### Task List (Collection)

- **Scope**: All tasks for the current session
- **Storage**: In-memory array + localStorage persistence
- **Ordering**: Insertion order (oldest first; newest last)
- **Access**: `tasks: Task[]` in React state
- **Relationships**: No foreign keys; Task is root entity

```typescript
interface TaskListState {
  tasks: Task[]; // Array of all tasks, ordered by createdAt ascending
  isLoading: boolean; // localStorage hydration status
  error?: string; // Persistence errors (optional)
}
```

---

## Constraints & Business Rules

### BR-001: No Duplicate Titles
- **Rule**: Task titles need not be unique
- **Rationale**: User may have multiple tasks with similar names (e.g., "Call John" on different days)
- **Implementation**: No uniqueness validation; allow duplicates

### BR-002: Immutable Creation Timestamp
- **Rule**: `createdAt` cannot be modified after task creation
- **Rationale**: Accurate ordering and audit trail
- **Implementation**: Read-only field in React components; backend N/A

### BR-003: Ordered Display
- **Rule**: Tasks displayed in order of `createdAt` ascending (oldest first)
- **Rationale**: Spec requirement FR-004
- **Implementation**: Sort by `createdAt` before rendering

### BR-004: Single-User Session
- **Rule**: Data is scoped to current browser session; no multi-device sync
- **Rationale**: Spec states "no backend"; localStorage is per-device
- **Implementation**: Each browser tab/session has independent task list

### BR-005: Soft Deletion Not Supported
- **Rule**: Deleted tasks are permanently removed (no trash/undo)
- **Rationale**: MVP scope; feature can be added in future if needed
- **Implementation**: Direct removal from array; no soft-delete flag

---

## Derived State & Computed Properties

### Computed: Empty State

```typescript
const isEmpty = tasks.length === 0;
// Display: "No tasks yet. Add one above!" (FR-008)
```

### Computed: Completion Summary (for future use)

```typescript
const completedCount = tasks.filter(t => t.completed).length;
const totalCount = tasks.length;
const percentComplete = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
```

---

## localStorage Schema

### Key: `todos`

**Format**: JSON string containing array of Task objects

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Buy groceries",
    "completed": false,
    "createdAt": "2025-11-21T10:30:45.123Z"
  },
  {
    "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "title": "Call dentist",
    "completed": true,
    "createdAt": "2025-11-21T11:15:22.456Z"
  }
]
```

### Serialization/Deserialization

**Write**:
```typescript
localStorage.setItem('todos', JSON.stringify(tasks));
```

**Read**:
```typescript
const stored = localStorage.getItem('todos');
const tasks = stored ? JSON.parse(stored) as Task[] : [];
```

### Error Handling

- **Missing key**: Initialize as `[]` (empty list)
- **Invalid JSON**: Log warning; initialize as `[]`
- **Quota exceeded**: Log error; retry on next user action (graceful degradation)

---

## Validation Examples

### Example 1: Add "Buy groceries"

**Input**: User types "Buy groceries" and clicks "Add Task"

**Validation Flow**:
1. V-001: `" Buy groceries ".trim().length > 0` ✅
2. V-002: `15 characters` ✅
3. V-003: UUID unique ✅
4. V-004: `new Date().toISOString()` ✅

**Result**:
```typescript
{
  id: "550e8400-e29b-41d4-a716-446655440000",
  title: "Buy groceries", // trimmed
  completed: false,
  createdAt: "2025-11-21T10:30:45.123Z"
}
```

### Example 2: Add Empty String

**Input**: User clicks "Add Task" without typing anything

**Validation Flow**:
1. V-001: `"  ".trim().length > 0` ❌ FAIL

**Result**: No task created; field remains empty; no error message (silent fail)

### Example 3: Add 500+ Characters

**Input**: User pastes 501-character text and submits

**Validation Flow**:
1. V-001: `"...long text...".trim().length > 0` ✅
2. V-002: `501 characters > 500` ❌ FAIL

**Result**: Submission rejected; optionally show error "Task title must be 500 characters or less"

---

## Summary

| Aspect | Detail |
|--------|--------|
| **Root Entity** | Task (id, title, completed, createdAt) |
| **Collection** | tasks: Task[] (ordered by createdAt) |
| **Storage** | localStorage (key: 'todos') |
| **Validation** | Title non-empty + trim, UUID unique, bounds (1-500 chars) |
| **Transitions** | PENDING ↔ COMPLETED (toggle); DELETE (removal) |
| **Ordering** | Ascending by createdAt (oldest first) |
| **Constraints** | Single-user session, no soft-delete, immutable timestamps |

