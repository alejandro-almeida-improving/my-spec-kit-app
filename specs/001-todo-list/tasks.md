# Implementation Tasks: TODO List MVP

**Feature**: TODO List MVP  
**Branch**: `001-todo-list`  
**Date Generated**: 2025-11-21  
**Spec**: `/specs/001-todo-list/spec.md`  
**Total Tasks**: 18  

---

## Executive Summary

This document contains all implementation tasks for the TODO List MVP, organized by phase and user story. The MVP builds a single-page React application using Next.js 16, TypeScript, shadcn/ui components, and Tailwind CSS. Tasks are sequenced for optimal parallelization while respecting dependencies.

### Task Counts by Phase

| Phase | Title | Task Count | Stories Covered |
|-------|-------|-----------|-----------------|
| Phase 1 | Setup & Project Initialization | 2 | — |
| Phase 2 | Foundational Infrastructure | 3 | — |
| Phase 3 | User Story 1: Add & Display Tasks (P1) | 4 | US1 |
| Phase 4 | User Story 2: Toggle Task Completion (P2) | 3 | US2 |
| Phase 5 | User Story 3: Delete Tasks (P3) | 3 | US3 |
| Phase 6 | Integration & Cross-Cutting Concerns | 3 | — |

**MVP Scope**: All 3 user stories (P1, P2, P3) form the complete MVP. Recommend starting with P1 for initial viability.

---

## Dependency Graph

```
Phase 1: Setup
  ↓
Phase 2: Foundational Infrastructure
  ├→ Phase 3: US1 (Add & Display) [can start in parallel]
  ├→ Phase 4: US2 (Toggle) [depends on US1]
  └→ Phase 5: US3 (Delete) [depends on US1]
      ↓
Phase 6: Integration & Tests
```

### Recommended Execution Order

**MVP Phase 1** (complete P1 for minimal viable product):
1. Phase 1 (Setup) → 5 min
2. Phase 2 (Foundational) → 10 min
3. Phase 3 (US1: Add & Display) → 30 min
4. **Deliverable**: Users can add tasks and see them displayed

**MVP Phase 2** (add P2 completion tracking):
5. Phase 4 (US2: Toggle) → 20 min
6. **Deliverable**: Users can mark tasks complete/incomplete

**MVP Phase 3** (add P3 deletion):
7. Phase 5 (US3: Delete) → 15 min
8. **Deliverable**: Users can delete tasks

**Polish & Launch** (validation & deployment):
9. Phase 6 (Integration & Tests) → 30 min
10. **Deliverable**: Fully tested, production-ready TODO app

### Parallelization Opportunities

**After Phase 2, you can work in parallel**:
- Developer A: Implements US1 components (TaskInput, TaskList, EmptyState)
- Developer B: Begins writing US1 tests
- After US1 completes:
  - Developer A: Moves to US2 (toggle styling)
  - Developer B: Continues test writing

---

## Phase 1: Setup & Project Initialization

**Goal**: Initialize project structure and type definitions.  
**Estimated Duration**: 5 minutes  
**Independent Test Criteria**: 
- `lib/types.ts` exists with Task interface exported
- TypeScript compilation succeeds with no errors
- `lib/` directory is properly created

---

- [ ] T001 [P] Create type definitions in `lib/types.ts` with Task and UseTodosReturn interfaces

**Acceptance Criteria**:
- ✅ File exists at `lib/types.ts`
- ✅ Exports `Task` interface with fields: id, title, completed, createdAt
- ✅ Exports `UseTodosReturn` interface with hook signature
- ✅ All fields properly typed (id: string, title: string, completed: boolean, createdAt: string)
- ✅ `npm run type-check` succeeds with no errors

**Reference**: `specs/001-todo-list/data-model.md` (Core Entity: Task), `specs/001-todo-list/quickstart.md` (Step 1)

---

- [ ] T002 [P] Create `lib/` directory structure with subdirectories (`lib/hooks/`, `lib/utils.ts` already exists)

**Acceptance Criteria**:
- ✅ Directories created: `lib/hooks/`
- ✅ Verify existing `lib/utils.ts` has `cn()` helper for Tailwind classes
- ✅ Verify `lib/` structure matches expected layout

**Reference**: `specs/001-todo-list/plan.md` (Project Structure)

---

## Phase 2: Foundational Infrastructure

**Goal**: Implement core state management and utility hooks.  
**Estimated Duration**: 10 minutes  
**Independent Test Criteria**:
- Custom `useTodos` hook initializes with empty task array
- localStorage integration loads/persists tasks correctly
- UUID generation produces unique identifiers
- Task operations (add/toggle/delete) work in isolation

---

- [ ] T003 [P] Implement `useTodos` custom hook in `lib/hooks/useTodos.ts` with add/toggle/delete operations

**Acceptance Criteria**:
- ✅ File created at `lib/hooks/useTodos.ts` with `'use client'` directive
- ✅ Exports `useTodos()` function returning `UseTodosReturn`
- ✅ Hook manages task state with useState
- ✅ `useEffect` loads tasks from localStorage on mount
- ✅ `useEffect` persists tasks to localStorage on change
- ✅ `addTask(title)` validates title (non-empty, ≤500 chars), creates Task with UUID, returns Task or null
- ✅ `toggleTask(taskId)` flips completed flag, returns updated Task or null
- ✅ `deleteTask(taskId)` removes task from array, returns boolean
- ✅ UUID v4 generated correctly (using uuid library or custom implementation)
- ✅ Tasks sorted by createdAt ascending (oldest first)
- ✅ No TypeScript errors

**Reference**: `specs/001-todo-list/contracts/components.md` (Hook: useTodos), `specs/001-todo-list/quickstart.md` (Step 2)

---

- [ ] T004 [P] Create base components directory structure for UI components

**Acceptance Criteria**:
- ✅ Directory created: `components/ui/` (for shadcn/ui components)
- ✅ Directory created: `components/` (for app components)
- ✅ Verify shadcn/ui Button and Input components are available (check `components/ui/button.tsx`, `components/ui/input.tsx`)
- ✅ Verify Checkbox component is available (check `components/ui/checkbox.tsx`)

**Reference**: `specs/001-todo-list/plan.md` (Project Structure)

---

- [ ] T005 [P] Verify Tailwind CSS and shadcn/ui are properly configured

**Acceptance Criteria**:
- ✅ `tailwind.config.ts` exists and includes shadcn/ui configuration
- ✅ `globals.css` imports Tailwind directives (@tailwind)
- ✅ `components.json` exists with shadcn registry configuration
- ✅ Verify build works: `npm run build` succeeds
- ✅ No styling conflicts or missing imports

**Reference**: `specs/001-todo-list/research.md` (Tailwind CSS Styling Approach)

---

## Phase 3: User Story 1 - Add and Display Tasks (P1)

**User Story Goal**: Users can add tasks and immediately see them in a list.  
**Estimated Duration**: 30 minutes  
**Independent Test Criteria**:
- Users can type a task title into the input field
- Clicking "Add Task" button creates a new task
- Task appears in list below input field
- Input field is cleared after submission
- Empty state displays when no tasks exist
- Multiple tasks display in creation order (oldest first)
- Empty/whitespace-only input is rejected silently

---

### 3.1 Core Components

- [ ] T006 [P] Implement `components/TaskInput.tsx` component for task entry form

**Acceptance Criteria**:
- ✅ File created at `components/TaskInput.tsx` with `'use client'` directive
- ✅ Accepts props: `onAddTask(title: string)`, `isDisabled?: boolean`
- ✅ Renders Input field from shadcn/ui with placeholder "Add a new task..."
- ✅ Renders Button from shadcn/ui labeled "Add Task"
- ✅ Input field has `data-testid="task-input"` for testing
- ✅ Button has `data-testid="add-button"` for testing
- ✅ Form submission clears input field
- ✅ Enter key triggers form submission (onAddTask)
- ✅ Uses Tailwind classes for layout: `flex gap-2 mb-6`, `flex-1`
- ✅ No inline styles or CSS modules

**Reference**: `specs/001-todo-list/contracts/components.md` (Component: TaskInput), `specs/001-todo-list/quickstart.md` (Step 3)

---

- [ ] T007 [P] Implement `components/EmptyState.tsx` component for empty task list message

**Acceptance Criteria**:
- ✅ File created at `components/EmptyState.tsx` with `'use client'` directive
- ✅ Exports default component with no required props
- ✅ Displays message: "No tasks yet. Add one above!"
- ✅ Centered, subtle styling using Tailwind: `text-center py-8 text-slate-500`
- ✅ No inline styles

**Reference**: `specs/001-todo-list/contracts/components.md` (Component: EmptyState), `specs/001-todo-list/quickstart.md` (Step 5)

---

- [ ] T008 [P] Implement `components/TaskList.tsx` component for rendering tasks

**Acceptance Criteria**:
- ✅ File created at `components/TaskList.tsx` with `'use client'` directive
- ✅ Accepts props: `tasks: Task[]`, `isLoading: boolean`, `onToggleTask: (taskId) => void`, `onDeleteTask: (taskId) => void`
- ✅ Renders EmptyState when tasks.length === 0 and !isLoading
- ✅ Renders loading message when isLoading === true
- ✅ Maps over tasks array and renders TaskItem for each (will implement T009)
- ✅ Uses Tailwind spacing: `space-y-2`
- ✅ Passes callbacks to TaskItem components
- ✅ No inline styles

**Reference**: `specs/001-todo-list/contracts/components.md` (Component: TaskList), `specs/001-todo-list/quickstart.md` (Step 6)

---

- [ ] T009 [P] [US1] Implement `components/TaskItem.tsx` component for individual tasks

**Acceptance Criteria**:
- ✅ File created at `components/TaskItem.tsx` with `'use client'` directive
- ✅ Accepts props: `task: Task`, `onToggle: (taskId) => void`, `onDelete: (taskId) => void`
- ✅ Renders task title as text content with `data-testid="task-title-{taskId}"`
- ✅ Renders checkbox from shadcn/ui Checkbox with `data-testid="checkbox-{taskId}"`
- ✅ Checkbox `checked` state reflects task.completed
- ✅ Layout uses Tailwind: `flex items-center gap-3 p-3 border border-slate-200 rounded-lg`
- ✅ No inline styles or CSS modules
- ✅ Note: Delete button implemented in T012 (Phase 5)
- ✅ Note: Toggle functionality implemented in T011 (Phase 4)

**Reference**: `specs/001-todo-list/contracts/components.md` (Component: TaskItem), `specs/001-todo-list/quickstart.md` (Step 4)

---

### 3.2 Page Integration

- [ ] T010 [US1] Update `app/page.tsx` to integrate all P1 components and hook

**Acceptance Criteria**:
- ✅ File updated: `app/page.tsx` includes `'use client'` directive
- ✅ Imports and calls `useTodos()` hook
- ✅ Destructures: tasks, isLoading, addTask, toggleTask, deleteTask
- ✅ Renders TaskInput with `onAddTask={addTask}` callback
- ✅ Renders TaskList with tasks, isLoading, callbacks
- ✅ Page has header: "My TODO List"
- ✅ Page has subtitle: "Stay organized and never forget a task"
- ✅ Layout uses Tailwind: `min-h-screen bg-white`, `container max-w-2xl mx-auto py-12 px-4`
- ✅ No inline styles
- ✅ `npm run build` succeeds (static generation compatible)

**Reference**: `specs/001-todo-list/contracts/components.md` (Component: TodoPage), `specs/001-todo-list/quickstart.md` (Step 7)

---

### 3.3 User Story 1 Acceptance Testing

- [ ] T011 [US1] Create Playwright E2E tests for User Story 1 (Add and Display Tasks)

**Acceptance Criteria**:
- ✅ File created: `tests/todo.spec.ts` (or updated if exists)
- ✅ Test suite: `User Story 1: Add and Display Tasks (P1)`
- ✅ Test 1: "should add a task and display it in the list"
  - Type "Buy groceries" in input
  - Click Add button
  - Verify task appears with correct text
  - Verify input is cleared
- ✅ Test 2: "should add multiple tasks in order"
  - Add "Buy groceries", then "Call dentist"
  - Verify both appear in order (oldest first)
- ✅ Test 3: "should not add empty task"
  - Click Add without typing
  - Verify no task added
- ✅ Test 4: "should display empty state when no tasks"
  - Load page with cleared localStorage
  - Verify "No tasks yet" message visible
- ✅ All tests use `data-testid` attributes for element selection
- ✅ `beforeEach` clears localStorage before each test
- ✅ Tests pass: `npm run test -- todo.spec.ts`

**Reference**: `specs/001-todo-list/spec.md` (User Story 1 Acceptance Scenarios), `specs/001-todo-list/quickstart.md` (Step 8 - first test group)

---

## Phase 4: User Story 2 - Toggle Task Completion (P2)

**User Story Goal**: Users can mark tasks complete/incomplete with visual feedback.  
**Estimated Duration**: 20 minutes  
**Independent Test Criteria**:
- Clicking checkbox toggles task completion state
- Completed tasks display with strikethrough text
- Completed tasks display with reduced opacity (opacity-50)
- Multiple tasks can have mixed completion states
- Completion state persists after page reload

---

### 4.1 Toggle Functionality & Styling

- [ ] T012 [P] [US2] Add toggle handler and completion styling to `components/TaskItem.tsx`

**Acceptance Criteria**:
- ✅ File updated: `components/TaskItem.tsx`
- ✅ Checkbox `onCheckedChange` calls `onToggle(task.id)`
- ✅ Task title conditionally styled based on task.completed:
  - If completed: Tailwind classes `line-through opacity-50 text-slate-500`
  - If incomplete: `text-slate-900`
- ✅ Completed tasks show strikethrough text (FR-006)
- ✅ Completed tasks show reduced opacity (FR-006)
- ✅ Toggle works immediately (< 100ms perceived latency)
- ✅ No inline styles (use Tailwind classes)
- ✅ Checkbox has ARIA label for accessibility

**Reference**: `specs/001-todo-list/contracts/components.md` (TaskItem updated), `specs/001-todo-list/data-model.md` (State Transitions)

---

- [ ] T013 [P] [US2] Update `app/page.tsx` page.tsx to pass `toggleTask` callback to TaskList

**Acceptance Criteria**:
- ✅ File updated: `app/page.tsx`
- ✅ Verify `toggleTask` callback is passed to `<TaskList onToggleTask={toggleTask} />`
- ✅ Verify TaskList passes callback to TaskItem
- ✅ Toggle works end-to-end from checkbox click
- ✅ Completion state persists in localStorage

**Reference**: `specs/001-todo-list/contracts/components.md` (Component integration)

---

### 4.2 User Story 2 Acceptance Testing

- [ ] T014 [US2] Create Playwright E2E tests for User Story 2 (Toggle Task Completion)

**Acceptance Criteria**:
- ✅ File updated: `tests/todo.spec.ts`
- ✅ Test suite: `User Story 2: Toggle Task Completion (P2)`
- ✅ Test 1: "should toggle task completion"
  - Add task "Buy groceries"
  - Click checkbox
  - Verify task has classes: `line-through`, `opacity-50`
  - Click checkbox again
  - Verify classes removed
- ✅ Test 2: "should distinguish completed and incomplete tasks visually"
  - Add two tasks
  - Complete first task
  - Verify first has strikethrough, second doesn't
- ✅ Test 3: "should persist completion state across page reload"
  - Add task, toggle complete, reload page
  - Verify task still marked complete
- ✅ All tests use `data-testid` attributes
- ✅ Tests pass: `npm run test -- todo.spec.ts`

**Reference**: `specs/001-todo-list/spec.md` (User Story 2 Acceptance Scenarios), `specs/001-todo-list/quickstart.md` (Step 8 - second test group)

---

## Phase 5: User Story 3 - Delete Tasks (P3)

**User Story Goal**: Users can remove tasks from the list.  
**Estimated Duration**: 15 minutes  
**Independent Test Criteria**:
- Clicking delete button removes task from list
- Other tasks remain unchanged
- Empty state appears when last task deleted
- Deletion persists after page reload

---

### 5.1 Delete Functionality & Button

- [ ] T015 [P] [US3] Add delete button and handler to `components/TaskItem.tsx`

**Acceptance Criteria**:
- ✅ File updated: `components/TaskItem.tsx`
- ✅ Renders Button from shadcn/ui with variant="ghost" size="sm"
- ✅ Button contains Trash2 icon from lucide-react
- ✅ Button has `data-testid="delete-button-{taskId}"` for testing
- ✅ Button styling: `text-red-600 hover:text-red-800 hover:bg-red-50`
- ✅ Button `onClick` calls `onDelete(task.id)`
- ✅ Button has ARIA label: `Delete "{task.title}"`
- ✅ No inline styles (use Tailwind classes)
- ✅ Delete works immediately

**Reference**: `specs/001-todo-list/contracts/components.md` (TaskItem - delete button), `specs/001-todo-list/quickstart.md` (Step 4 - delete button section)

---

- [ ] T016 [P] [US3] Update `app/page.tsx` to pass `deleteTask` callback to TaskList

**Acceptance Criteria**:
- ✅ File updated: `app/page.tsx`
- ✅ Verify `deleteTask` callback is passed to `<TaskList onDeleteTask={deleteTask} />`
- ✅ Verify TaskList passes callback to TaskItem
- ✅ Delete works end-to-end from button click
- ✅ Deleted task removed from localStorage
- ✅ Empty state appears when last task deleted

**Reference**: `specs/001-todo-list/contracts/components.md` (Component integration)

---

### 5.2 User Story 3 Acceptance Testing

- [ ] T017 [US3] Create Playwright E2E tests for User Story 3 (Delete Tasks)

**Acceptance Criteria**:
- ✅ File updated: `tests/todo.spec.ts`
- ✅ Test suite: `User Story 3: Delete Tasks (P3)`
- ✅ Test 1: "should delete a task from the list"
  - Add task "Buy groceries"
  - Click delete button
  - Verify task no longer visible
- ✅ Test 2: "should delete only the selected task"
  - Add "Task 1" and "Task 2"
  - Delete first task
  - Verify only "Task 2" remains
  - Verify order preserved
- ✅ Test 3: "should show empty state when all tasks are deleted"
  - Add one task, delete it
  - Verify empty state message appears
- ✅ Tests pass: `npm run test -- todo.spec.ts`

**Reference**: `specs/001-todo-list/spec.md` (User Story 3 Acceptance Scenarios), `specs/001-todo-list/quickstart.md` (Step 8 - third test group)

---

## Phase 6: Integration & Cross-Cutting Concerns

**Goal**: Complete end-to-end validation, edge case testing, and production readiness.  
**Estimated Duration**: 30 minutes  
**Independent Test Criteria**:
- All E2E tests pass (user stories 1-3)
- Edge cases handled (whitespace, keyboard, persistence)
- TypeScript compilation succeeds with no errors
- Production build succeeds
- All code follows Constitution principles

---

- [ ] T018 [P] Create comprehensive Playwright E2E tests for edge cases and cross-story scenarios

**Acceptance Criteria**:
- ✅ File updated: `tests/todo.spec.ts`
- ✅ Test suite: `Edge Cases`
- ✅ Test 1: "should handle whitespace-only input"
  - Type "   " and click Add
  - Verify no task created
- ✅ Test 2: "should persist tasks across page reload"
  - Add task, reload page
  - Verify task still exists
- ✅ Test 3: "should support keyboard navigation (Enter to submit)"
  - Type task title, press Enter key
  - Verify task added (no button click needed)
- ✅ Test 4: "should handle rapid clicks gracefully"
  - Click Add button multiple times
  - Verify only one task per submission
- ✅ Test 5: "should handle long task titles"
  - Add task with 500 characters
  - Verify task created
  - Add task with 501 characters
  - Verify task rejected
- ✅ All 18+ tests pass: `npm run test -- todo.spec.ts`

**Reference**: `specs/001-todo-list/spec.md` (Edge Cases section), `specs/001-todo-list/quickstart.md` (Step 8 - edge cases)

---

- [ ] T019 [P] Verify TypeScript compilation, linting, and code quality

**Acceptance Criteria**:
- ✅ TypeScript check passes: `npm run type-check` (no errors)
- ✅ Linting passes: `npm run lint` (no errors)
- ✅ No TypeScript `any` types without justification
- ✅ All imports are correctly resolved
- ✅ Component prop types match interface contracts
- ✅ Hook return types match UseTodosReturn interface
- ✅ All required fields present: Task interface, component props

**Reference**: `specs/001-todo-list/plan.md` (Constitution Check - Principle I)

---

- [ ] T020 [P] Verify production build and static generation

**Acceptance Criteria**:
- ✅ Production build succeeds: `npm run build`
- ✅ No warnings or errors in build output
- ✅ Static generation works (HTML pre-rendered)
- ✅ Page marked with `'use client'` directive correctly
- ✅ Hydration works: localStorage loads after client-side mount
- ✅ No server-side code in components
- ✅ `.next/static/` directory contains pre-rendered page
- ✅ Bundle size is reasonable (< 500KB total JS for MVP)

**Reference**: `specs/001-todo-list/plan.md` (Constitution Check - Principle III)

---

## Test Summary

**Total Test Coverage**: 18+ Playwright E2E tests

| Test Group | Count | User Stories | Purpose |
|-----------|-------|--------------|---------|
| User Story 1 (P1) | 4 | Add & Display | Validate task creation and listing |
| User Story 2 (P2) | 3 | Toggle | Validate completion toggle and styling |
| User Story 3 (P3) | 3 | Delete | Validate task deletion |
| Edge Cases | 5+ | All | Validate edge cases and persistence |
| **Total** | **18+** | **All** | **Complete coverage** |

**Test Execution**:
```bash
npm run test -- todo.spec.ts        # Run all TODO tests
npm run test -- todo.spec.ts -g "User Story 1"  # Run specific group
npm run test                        # Run all tests
```

---

## Completion Checklist

**Phase 1 Setup**: 
- [ ] Type definitions created
- [ ] Directory structure established

**Phase 2 Foundational**:
- [ ] useTodos hook implemented
- [ ] localStorage integration working
- [ ] Component directories ready

**Phase 3 User Story 1**:
- [ ] TaskInput component complete
- [ ] EmptyState component complete
- [ ] TaskList component complete
- [ ] TaskItem component (base) complete
- [ ] Page integration complete
- [ ] P1 tests pass (4 tests)

**Phase 4 User Story 2**:
- [ ] TaskItem toggle functionality added
- [ ] Toggle styling (strikethrough, opacity) applied
- [ ] Page integration updated
- [ ] P2 tests pass (3 tests)

**Phase 5 User Story 3**:
- [ ] TaskItem delete button added
- [ ] Delete functionality integrated
- [ ] Page integration updated
- [ ] P3 tests pass (3 tests)

**Phase 6 Integration**:
- [ ] Edge case tests pass (5+ tests)
- [ ] TypeScript compilation clean
- [ ] Linting passes
- [ ] Production build succeeds
- [ ] All 18+ tests passing

---

## Implementation Notes

### Key Decisions Explained

1. **Custom Hook Pattern** (`useTodos`): Encapsulates all state management and localStorage logic, simplifying component code and enabling reuse. See `specs/001-todo-list/research.md` (Decision #1).

2. **localStorage Persistence**: Simple JSON serialization sufficient for MVP; no database or complex migration needed. See `specs/001-todo-list/research.md` (Decision #2).

3. **shadcn/ui Components**: All UI built with shadcn/ui (Button, Input, Checkbox) for consistency and accessibility. See `specs/001-todo-list/research.md` (Decision #3).

4. **Tailwind-Only Styling**: No CSS modules or inline styles; all styling via Tailwind utilities per Constitution Principle II. See `specs/001-todo-list/research.md` (Decision #4).

5. **Playwright E2E Testing**: Focus on user-visible behavior rather than unit tests; validates entire workflows. See `specs/001-todo-list/research.md` (Decision #7).

### Common Issues & Solutions

| Issue | Solution | Task |
|-------|----------|------|
| `localStorage is undefined` | Wrap in `useEffect` to run after client hydration | T003 |
| Components don't update on state change | Use `useState` and `setTasks` correctly | T003 |
| Styling not applying | Verify Tailwind config includes component files | T005 |
| Tests fail to find elements | Use `data-testid` attributes consistently | T006-T017 |
| Checkbox doesn't toggle | Ensure `onCheckedChange` handler is wired | T012 |
| Delete button doesn't appear | Verify Button import and TaskItem rendered complete | T015 |

---

## References

- **Feature Specification**: `specs/001-todo-list/spec.md`
- **Implementation Plan**: `specs/001-todo-list/plan.md`
- **Data Model**: `specs/001-todo-list/data-model.md`
- **Operation Contracts**: `specs/001-todo-list/contracts/operations.md`
- **Component Contracts**: `specs/001-todo-list/contracts/components.md`
- **Research Findings**: `specs/001-todo-list/research.md`
- **Quick Reference**: `specs/001-todo-list/quickstart.md`

---

**Status**: Ready for implementation  
**Last Updated**: 2025-11-21  
**Generated by**: /speckit.tasks workflow
