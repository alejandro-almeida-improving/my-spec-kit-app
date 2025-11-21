# Implementation Plan: TODO List MVP

**Branch**: `001-todo-list` | **Date**: 2025-11-21 | **Spec**: `/specs/001-todo-list/spec.md`
**Input**: Feature specification from `/specs/001-todo-list/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build an attractive, single-page MVP TODO list application using Next.js 16, TypeScript, shadcn/ui components, and Tailwind CSS. Users can add, toggle completion, and delete tasks. Data persists in localStorage during the session. All interactions are client-side with no backend required. Three prioritized user stories (P1: Add/Display, P2: Toggle Completion, P3: Delete) form the MVP scope.

## Technical Context

**Language/Version**: TypeScript 5.x (Next.js 16.x with strict mode)  
**Primary Dependencies**: Next.js 16.x (App Router), shadcn/ui, Tailwind CSS 4.x, React 19.x  
**Storage**: localStorage (browser-based, session persistence only)  
**Testing**: Playwright (E2E browser testing)  
**Target Platform**: Web (Browser - Chrome, Firefox, Safari)  
**Project Type**: Single web application (frontend-only SPA within static Next.js)  
**Performance Goals**: Instant feedback on interactions (<100ms perceived latency), smooth task addition/deletion/toggles  
**Constraints**: No server-side state, no backend required, static generation compatible, client-side state only  
**Scale/Scope**: Single page, unlimited task count (practical limit ~1000 tasks before DOM performance degrades), 3 core features

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Principle I - Component Hygiene**: ✅ COMPLIANT
- All components will be functional, TypeScript-typed, and leverage shadcn/ui exclusively
- Simple state management via React hooks (useState, useEffect) 
- No prop drilling; composition used where needed

**Principle II - Styling Foundation**: ✅ COMPLIANT
- All styles via Tailwind CSS utility classes exclusively
- No CSS modules, inline styles, or non-Tailwind conventions
- shadcn/ui components provide consistent theming

**Principle III - Static Generation**: ✅ COMPLIANT
- Single page application can be pre-rendered as static HTML
- Client-side hydration enables interactivity after initial load
- localStorage reads after hydration (not blocking static generation)
- No dynamic server rendering or route handlers required

**Principle IV - Integration Testing**: ✅ COMPLIANT
- All user stories will have Playwright test coverage
- Tests focus on user-visible behavior (add task, toggle, delete)
- Tests live in `tests/` with naming convention `todo.spec.ts`

**Principle V - Next.js Coding Guidelines**: ✅ COMPLIANT
- App Router used throughout
- Client components marked with `"use client"` where interactivity needed
- File-system routing respected
- No manual route configuration or Pages Router

**GATE RESULT**: ✅ PASS - No violations. Proceed to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/001-todo-list/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (client-side state patterns, localStorage strategies)
├── data-model.md        # Phase 1 output (Task entity, validation)
├── quickstart.md        # Phase 1 output (component hierarchy, setup)
├── contracts/           # Phase 1 output (client-side operation contracts)
├── spec.md              # Feature specification (source of truth)
├── checklists/
│   └── requirements.md  # Acceptance criteria checklist
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── layout.tsx           # Root layout with Provider setup
├── page.tsx             # Single TODO page (main feature surface)
└── globals.css          # Global Tailwind + CSS resets

lib/
├── utils.ts             # Tailwind cn() helper
└── hooks/
    └── useTodos.ts      # Custom hook for task state + localStorage

components/
├── TaskInput.tsx        # Input field + Add button
├── TaskList.tsx         # Task list container
├── TaskItem.tsx         # Individual task with checkbox + delete
└── EmptyState.tsx       # Empty state message

tests/
├── todo.spec.ts         # E2E tests: add, toggle, delete tasks
└── example.spec.ts      # Keep existing example test

public/                  # Static assets (if needed)
```

**Structure Decision**: Single web application with App Router. All task state managed client-side via `useTodos` hook backed by localStorage. Components follow shadcn/ui patterns. Tests verify user-visible behavior in Playwright.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**NO VIOLATIONS** - Project aligns perfectly with constitution. No complex justifications required. localStorage is the prescribed pattern for session-only persistence; no backend complexity introduced.

---

## Final Constitution Check (Post-Phase 1 Design)

*GATE: Must re-validate after design is complete to confirm all artifacts comply.*

### Phase 1 Deliverables Reviewed

- ✅ `research.md`: All technical decisions documented with rationale
- ✅ `data-model.md`: Task entity, validation rules, state transitions defined
- ✅ `contracts/operations.md`: Client-side operation contracts (addTask, toggleTask, deleteTask, getTasks)
- ✅ `contracts/components.md`: Component interfaces, props contracts, hook signatures
- ✅ `quickstart.md`: Step-by-step implementation guide with code examples

### Constitution Compliance Post-Design

**Principle I - Component Hygiene**: ✅ COMPLIANT
- **Evidence**: 
  - Component contracts specify functional components (TaskInput, TaskItem, TaskList, EmptyState)
  - All components typed with TypeScript (TaskInputProps, TaskItemProps, etc.)
  - shadcn/ui components used exclusively (Button, Input, Checkbox)
  - Custom hook (useTodos) encapsulates state; no prop drilling
  - Single responsibility per component (input handling, rendering, deletion logic)

**Principle II - Styling Foundation**: ✅ COMPLIANT
- **Evidence**:
  - Quickstart code shows Tailwind utility classes only (`flex`, `gap-2`, `mb-6`, `line-through`, `opacity-50`, etc.)
  - No CSS modules, inline styles, or custom CSS
  - shadcn/ui Button and Input components provide Tailwind-compatible styling
  - Color palette uses Tailwind tokens (`slate-900`, `slate-600`, `red-600`, etc.)

**Principle III - Static Generation**: ✅ COMPLIANT
- **Evidence**:
  - `useTodos` hook runs `useEffect` *after* component hydration
  - localStorage read/write happens client-side only, after static page loads
  - No server components with side effects or dynamic route handlers
  - App can be pre-rendered as static HTML; interactivity added via client-side React

**Principle IV - Integration Testing**: ✅ COMPLIANT
- **Evidence**:
  - `quickstart.md` includes complete Playwright test suite (`todo.spec.ts`)
  - Tests cover all 3 user stories (P1, P2, P3) with acceptance scenarios
  - Tests validate user-visible behavior (task creation, checkbox toggle, deletion)
  - 9+ test cases for edge cases (whitespace, persistence, keyboard navigation)
  - Tests use `data-testid` attributes for element selection (best practice)

**Principle V - Next.js Coding Guidelines**: ✅ COMPLIANT
- **Evidence**:
  - All components marked with `"use client"` directive
  - App Router (file-system routing): `app/page.tsx` is index route
  - No Pages Router used
  - No manual route configuration
  - `layout.tsx` structure followed for root layout setup
  - Next.js conventions respected throughout (file naming, component structure)

### Overall Compliance

**GATE RESULT**: ✅ **PASS** - All Phase 1 artifacts are Constitution-compliant.

No violations discovered during design review. Project is ready for implementation phase.
