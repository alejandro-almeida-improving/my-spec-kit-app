# Research: TODO List feature decisions

## Decision: Storage
- Decision: Use `localStorage` under key `todo:tasks` to store a JSON array of Task objects.
- Rationale: MVP requirements specify client-side persistence only; `localStorage` is universally available, simple
  to implement and inspect during manual review and Playwright tests.
- Alternatives considered:
  - IndexedDB: better for large datasets and structured queries, but higher implementation complexity for MVP.
  - Backend persistence (API/server): provides cross-device sync but contradicts scope and constitution (static-first).

## Decision: UI toolkit & styling
- Decision: Use shadcn-style components and Tailwind CSS utilities for all UI elements.
- Rationale: Matches repository constitution and keeps styling consistent with existing app patterns.
- Alternatives considered:
  - Custom CSS modules: more work and inconsistent with repo conventions.

## Decision: Testing
- Decision: Use Playwright for E2E tests covering P1 flows; tests will be under `tests/` (e.g., `tests/todo.spec.ts`).
- Rationale: Constitution mandates Playwright for E2E/integration; tests can drive acceptance criteria directly.
- Alternatives considered:
  - Unit tests alone: insufficient for E2E behaviors and persistence checks required by acceptance tests.

## Decision: Data model
- Decision: Task object schema (documented in data-model.md):
  - `id` (string), `title` (string), `completed` (boolean), `createdAt` (ISO), `updatedAt` (ISO), `order` (number)
- Rationale: Fits requirements and is serializable to/from JSON for `localStorage`.
- Alternatives considered:
  - Simpler schema without timestamps: easier, but timestamps useful for sorting and potential future sync.

## Decision: Reordering & large lists
- Decision: Defer drag-and-drop reordering to P2; for large lists, recommend virtualization as future work.
- Rationale: Keeps MVP focused on P1 success criteria; avoids adding significant UI complexity.

## Summary
All open clarifications from the plan were resolved as client-side, static-first decisions consistent with the
project constitution. The next step is to author `data-model.md`, a `quickstart.md` describing local validation steps,
and create a minimal Playwright test under `tests/` that validates P1 flows.
