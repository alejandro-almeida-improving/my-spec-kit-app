# Feature Specification: TODO List (Single-Page)

**Feature Branch**: `001-todo-list`
**Created**: 2025-11-21
**Status**: Draft
**Input**: "Build a simple single-page TODO list centered on a single page."

**Testing Framework**: Playwright (E2E / integration). Tests will be added after implementation and placed under `tests/`.
Refer to the project constitution (`.specify/memory/constitution.md`) for repository-level tech decisions (Next.js static, shadcn + Tailwind, Playwright for testing).

## User Scenarios & Testing (mandatory)

### User Story 1 — Add & Manage Tasks (Priority: P1)

As a user on the main page, I want to add tasks, mark tasks as completed, and delete tasks so I can manage my to-do list from a single page.

Why this priority: Delivers the core value of the app — task management — and provides the minimum viable experience.

Independent test: A Playwright E2E that opens the page, adds three tasks, marks the second as completed, deletes the first, and asserts the final list state.

Acceptance scenarios:
1. Given the page is open with an empty list, when the user types "Buy milk" and clicks Add, then the task appears in the list with status "pending".
2. Given a pending task, when the user toggles the completed checkbox, then the task shows as completed visually and the state updates.
3. Given multiple tasks, when the user deletes a task, then the task is removed and the list re-renders without errors.

---

### User Story 2 — Edit & Reorder Tasks (Priority: P2)

As a user I want to edit a task's text and optionally reorder tasks via drag-and-drop to prioritize work.

Why this priority: Improves UX; not required for MVP but desirable for a polished experience.

Independent test: Playwright tests that edit a task text and, if implemented, verify reorder via drag-and-drop.

Acceptance scenarios:
1. Given an existing task, when the user edits the text and saves, then the list displays the updated text.

---

### User Story 3 — Persistence (Priority: P3)

As a user I want my tasks to persist across page reloads so I don't lose my list.

Why this priority: Important for usability. For the MVP this will be implemented client-side without a backend.

Independent test: A Playwright test that adds tasks, reloads the page, and verifies tasks and their states persist.

Acceptance scenarios:
1. Given created tasks, when the user reloads the page, then the previously created tasks are visible with the correct states.

---

### Edge cases

- Prevent adding empty tasks; show validation message.  
- Large list behavior (e.g., 1000+ tasks): support graceful degradation via virtualization/pagination.  
- localStorage unavailable or full: show clear error and provide export/import fallback.

## Requirements (mandatory)

### Functional Requirements

- FR-001: The main page MUST allow creating a task with a text title.  
- FR-002: Tasks MUST be markable as completed and deletable via the UI.  
- FR-003: Tasks MUST be displayed in an ordered list; default ordering is oldest-first (append to end).  
- FR-004: The application MUST prevent creation of empty tasks and surface validation messages.  
- FR-005: The application MUST persist tasks across page reloads using `localStorage` (MVP). No backend will be used in this phase.

### Key entities

- Task: represents a to-do item with attributes:
  - `id` (string): client-generated unique identifier
  - `title` (string): task text
  - `completed` (boolean): completion state
  - `createdAt` (ISO timestamp)
  - `updatedAt` (ISO timestamp)
  - `order` (number): optional position index for ordering

## Success criteria (mandatory)

- SC-001: A user can create and see a new task on screen within 5 seconds of opening the page (measurable with Playwright).  
- SC-002: P1 flows (add, complete, delete) pass in >=95% of automated local Playwright runs.  
- SC-003: After reload, >=98% of tasks persist with correct states when `localStorage` is functioning.  
- SC-004: Primary actions are keyboard accessible and the UI meets basic a11y checks (contrast and focus order).

## Assumptions

- This feature will live inside the existing repository as a static Next.js single-page experience.  
- UI will follow the project constitution: use shadcn components and Tailwind CSS for styling.  
- Playwright will be used for E2E/integration tests; tests will be added after implementation.  
- No CI required for now; validation happens locally per the constitution.

## Implementation notes (for reviewers)

- Keep the UI focused on a single route (`/`) for the MVP.  
- Persistence: store tasks in `localStorage` under a single key (e.g., `todo:tasks`) as a JSON array of Task objects. Document the schema and migration approach if future server sync is added.

## Next steps

1. Implement the UI MVP using Next.js, shadcn components, and Tailwind CSS.  
2. Add client-side `localStorage` persistence and document the stored JSON schema.  
3. Create Playwright tests for P1 and persistence (P3).  
