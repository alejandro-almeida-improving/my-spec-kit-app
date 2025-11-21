
---
description: "Generated tasks for TODO List feature"
---

# Tasks: TODO List

**Input**: Design documents from `/specs/001-todo-list/`  
**Prerequisites**: `plan.md`, `spec.md` (required), `research.md`, `data-model.md`, `contracts/`  

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 [P] Create feature component directory at `app/components/todo/`
- [ ] T002 [P] Create component scaffold `app/components/todo/TodoForm.tsx`
- [ ] T003 [P] Create component scaffold `app/components/todo/TodoItem.tsx`
- [ ] T004 [P] Create component scaffold `app/components/todo/TodoList.tsx`
- [ ] T005 [P] Create Playwright test scaffold `tests/todo.spec.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types and utility modules that all stories depend on. These MUST be completed before story work.

- [ ] T006 [P] Create Task type definition in `app/components/todo/types.ts`
- [ ] T007 [P] Create localStorage helper stub in `app/lib/todoStorage.ts` (read/write API for key `todo:tasks`)
- [ ] T008 [P] Add UUID helper in `app/lib/uuid.ts` (used for client-generated `id` values)

---

## Phase 3: User Story 1 - Add & Manage Tasks (Priority: P1) 🎯 MVP

**Goal**: Allow users to add tasks, mark them completed, and delete them from the single-page UI. Implementation may
use in-memory state for this story; persistence is handled in User Story 3 (P3).

**Independent Test**: Playwright E2E that opens the page, adds three tasks, marks the second completed, deletes the first,
and asserts the final list state (no persistence required for US1 test).

### Implementation Tasks

- [ ] T009 [US1] Implement add-task logic in `app/components/todo/TodoForm.tsx` (in-memory state; validate non-empty title)
- [ ] T010 [US1] Implement task item UI and handlers in `app/components/todo/TodoItem.tsx` (toggle complete, delete)
- [ ] T011 [US1] Implement list container and in-memory state management in `app/components/todo/TodoList.tsx`
- [ ] T012 [US1] Integrate `TodoList` into main page at `app/page.tsx`
- [ ] T013 [US1] Add Playwright E2E test for US1 at `tests/todo_add_complete_delete.spec.ts` (covers add, complete, delete flows)
- [ ] T014 [US1] Add UI validation message for empty task input in `app/components/todo/TodoForm.tsx` (satisfies FR-004)

---

## Phase 4: User Story 2 - Edit & Reorder Tasks (Priority: P2)

**Goal**: Allow users to edit task text and optionally reorder tasks via drag-and-drop.

**Independent Test**: Playwright test that edits a task's text and verifies the updated text appears. If reorder is implemented,
add a test that performs drag-and-drop and verifies order change.

### Implementation Tasks

- [ ] T015 [P] [US2] Add edit UI for a task in `app/components/todo/TodoItem.tsx` (inline edit or edit modal)
- [ ] T016 [US2] Implement optional drag-and-drop reorder in `app/components/todo/TodoList.tsx` (consider `react-beautiful-dnd` or similar; update `package.json` if adding a dependency)
- [ ] T017 [US2] Add Playwright test for editing at `tests/todo_edit.spec.ts`
- [ ] T018 [US2] If reorder implemented, add Playwright test `tests/todo_reorder.spec.ts`

---

## Phase 5: User Story 3 - Persistence (Priority: P3)

**Goal**: Persist tasks across page reloads using `localStorage` under the key `todo:tasks` (JSON array following `data-model.md`).

**Independent Test**: Playwright test that adds tasks, reloads the page, and asserts tasks and their states persist.

### Implementation Tasks

- [ ] T019 [US3] Implement `readTasks()` and `writeTasks()` in `app/lib/todoStorage.ts` to read/write `todo:tasks` from `localStorage`
- [ ] T020 [US3] Wire persistence to `app/components/todo/TodoList.tsx` so initial load reads from storage and all mutations persist
- [ ] T021 [US3] Add Playwright persistence test at `tests/todo_persistence.spec.ts` (add tasks, reload, assert)
- [ ] T022 [US3] Implement migration/normalization on load to apply default fields for legacy data in `app/lib/todoStorage.ts`

---

## Final Phase: Polish & Cross-Cutting Concerns

- [ ] T023 [P] Update `specs/001-todo-list/quickstart.md` with exact validation and Playwright run commands
- [ ] T024 [P] Improve accessibility (keyboard focus, aria labels) in `app/components/todo/*`
- [ ] T025 [P] Add storage-write debounce in `app/lib/todoStorage.ts` or call sites to avoid excessive `localStorage` writes
- [ ] T026 [P] Add optional unit tests for helper functions in `tests/unit/` (e.g., `tests/unit/todoStorage.spec.ts`)
- [ ] T027 [P] Confirm and extend stored JSON schema in `specs/001-todo-list/data-model.md`

---

## Dependencies & Execution Order

- **Phase 1 (Setup)**: can run immediately; tasks marked `[P]` can be executed in parallel.  
- **Phase 2 (Foundational)**: must complete before user stories (T006–T008 → block user stories).  
- **User Stories**: proceed in priority order but can be worked on in parallel after foundational completion.  
- **Polish**: after user stories complete.

### Story Completion Order (suggested)

1. User Story 1 (P1) — MVP
2. User Story 2 (P2)
3. User Story 3 (P3)

## Parallel Execution Examples

- Implementation files for a story can be created in parallel: e.g., `TodoForm.tsx`, `TodoItem.tsx`, and `TodoList.tsx` (T002–T004)
- Tests for a story can be written in parallel with implementation tasks if a developer opts for TDD: e.g., T013 and T011

## Implementation Strategy

- MVP First: Complete Setup (Phase 1) and Foundational (Phase 2).  
- Implement User Story 1 fully (in-memory behavior), validate with E2E (T013).  
- Add persistence (User Story 3) to persist state across reloads and add persistence test (T021).  
- Add UX improvements (User Story 2) and polish.

---

## Task Counts & Summary

- Total tasks: 27  
- Tasks per story:  
  - Setup: 5  
  - Foundational: 3  
  - US1 (P1): 6  
  - US2 (P2): 4  
  - US3 (P3): 4  
  - Final/Polish: 5  

## Format Validation

All tasks follow the required checklist format: each entry begins with `- [ ]`, a Task ID `T###`, optional `[P]` for parallelizable tasks, and story labels `[US#]` for user-story-specific tasks. Each description includes an exact file path where implementation or test work will occur.

---

_Generated by speckit.tasks workflow on branch `001-todo-list`_
