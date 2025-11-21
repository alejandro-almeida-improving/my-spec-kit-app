
# Implementation Plan: TODO List feature (single-page TODO)

**Branch**: `001-todo-list` | **Date**: 2025-11-21 | **Spec**: `/specs/001-todo-list/spec.md`
**Input**: Feature specification from `/specs/001-todo-list/spec.md`

## Summary

Deliver a single-page TODO list as a static Next.js experience. The UI will live at `/` and implement P1 flows
(add, complete, delete) with client-side persistence using `localStorage`. Implementation will use the existing
Next.js app directory (`app/`), shadcn component patterns and Tailwind CSS for styling. Playwright tests for P1
flows will be added under `tests/` and executed via `npm run test`.

## Technical Context

**Language/Version**: TypeScript / Node.js (Next.js 16.x, React 19.x)  
**Primary Dependencies**: `next`, `react`, `react-dom`, `tailwindcss`, shadcn component patterns (project uses
  shadcn-style components already; add any small feature-specific components as needed).  
**Storage**: Client-side `localStorage` under key `todo:tasks` (JSON array of Task objects).  
**Testing**: Playwright (`@playwright/test`) for E2E/integration tests located under `tests/`. Run with `npm run test`.  
**Target Platform**: Static Next.js site (SSG/Static-first). Feature is purely client-side so no server API is required.  
**Project Type**: Web single-page feature inside existing Next.js app.  
**Performance Goals**: Responsive UI with instant adds/removes for lists up to ~1000 items; virtualization or pagination
  recommended if large lists are required (documented as future work).  
**Constraints**: Must follow the repository constitution (Next.js static-first, shadcn + Tailwind, Playwright tests).  
**Scale/Scope**: Single-page UX for local persistence (no backend). Designed for single-user local storage usage.

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

This plan conforms to the repository constitution in the following ways:

- **Framework alignment**: Implementation targets a static Next.js page at `/` using the existing `app/` directory.
  Validate locally with `npm run dev` and `npm run build` (see commands below).  
- **UI alignment**: UI will use shadcn component patterns and Tailwind CSS utilities already part of the repo.
  Any custom styling will be justified in `plan.md` and limited to component-level additions.  
- **Testing**: Playwright will be used for P1 tests and tests will live under `tests/` (e.g., `tests/todo.spec.ts`).
  Run tests with `npm run test`.  
- **CI**: No CI required per constitution. Local validation steps for reviewers are documented below.

Local validation commands (run from repository root):

```bash
npm install
npm run dev        # develop locally
npm run build      # validate production build (Next.js)
npm run test       # run Playwright E2E tests (after tests added)
```

Files & paths to review produced by this plan:

- UI source: `app/page.tsx` (or new `app/(todo)/page.tsx` if feature namespaced)  
- Persistence schema: documented in `/specs/001-todo-list/quickstart.md` and `research.md`  
- Tests: `tests/todo.spec.ts` (Playwright)  

## Project Structure (decision)

This feature will live inside the existing Next.js project (Option: Single project / Web application). The relevant
areas are:

```text
app/                 # Next.js app directory (UI components + pages)
public/              # static assets
specs/001-todo-list/ # feature docs (plan.md, research.md, data-model.md, quickstart.md, contracts/)
tests/               # Playwright tests (integration / E2E)
```

**Structure Decision**: Use the existing Next.js app structure and add feature components under `app/components/todo`.

## Complexity Tracking

No constitution violations identified. All gates are satisfied by implementing a client-only, static Next.js page
using shadcn + Tailwind and Playwright for tests.

```
