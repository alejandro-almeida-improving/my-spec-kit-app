# Data Model: TODO List

## Entities

### Task
- **id**: string (client-generated UUID) — unique identifier for the task
- **title**: string (required) — non-empty text, max recommended length 1024 chars
- **completed**: boolean (default: false)
- **createdAt**: string (ISO 8601 timestamp) — set on create
- **updatedAt**: string (ISO 8601 timestamp) — updated on modify
- **order**: number (optional) — integer index for ordering; defaults to append at end

## Validation Rules
- `title` MUST be a non-empty string trimmed of whitespace. Attempts to create a task with an empty title MUST be blocked by the UI with a validation message.
- `id` MUST be unique within the stored array.
- `completed` MUST be boolean.
- `createdAt` and `updatedAt` MUST be valid ISO 8601 timestamps.
- `order` when present MUST be an integer; if omitted, tasks append to the end (highest order).

## Persistence Schema (localStorage)
- Key: `todo:tasks`
- Value: JSON array of Task objects matching the schema above.
- Migration: on load, if data exists but misses fields (e.g., no `createdAt`), the client will normalize by filling missing timestamps and ensuring unique ids.

## State Transitions
- Create: new Task with `completed=false`, `createdAt=now`, `updatedAt=now`, `order=last+1`.
- Update (toggle completed or edit title): set `updatedAt=now` and persist updated task.
- Delete: remove the task by `id` and re-persist array (optionally reindex `order` values).

## Notes
- Reordering (P2): if implemented, update `order` field for affected tasks and persist.
- For very large lists, prefer virtualization and avoid full-array operations on every render; batch writes to `localStorage` (debounce) when appropriate.
