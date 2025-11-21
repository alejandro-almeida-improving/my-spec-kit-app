<!--
Sync Impact Report

- Version change: N/A (template) → 1.0.0
- Modified principles: placeholders → (1) Frontend-First (Next.js Static), (2) UI Toolkit (shadcn + Tailwind), (3) Testing (Playwright only), (4) No-CI Manual Release, (5) Simplicity & Accessibility
- Added sections: Technology Constraints, Development Workflow
- Removed sections: none (placeholders replaced)
- Templates requiring updates: /specify/templates/plan-template.md ✅ updated
										  /specify/templates/spec-template.md ✅ updated
										  /specify/templates/tasks-template.md ✅ updated
										  /specify/templates/commands/*.md ⚠ pending (directory missing)
- Follow-up TODOs: RATIFICATION_DATE deferred (TODO(RATIFICATION_DATE))
-->

# My Spec Kit App Constitution

## Core Principles

### 1. Frontend-First (Next.js Static)
The project MUST be implemented as a static/frontend-focused Next.js application. Development MUST follow the
official Next.js coding guidelines for performance, routing, and data fetching. Build output SHOULD target a static
export (SSG) or ISR patterns that preserve a static-first deployment model. Rationale: a static-first site keeps
operations simple and aligns with the project's requirement to be a static website.

### 2. UI Toolkit: shadcn + Tailwind CSS
All UI components and design tokens MUST use `shadcn` component patterns and Tailwind CSS utility classes. Custom
styles are allowed only when justified and documented. Rationale: consistency in components and styling reduces
maintenance and improves accessibility and theming.

### 3. Testing: Playwright Only (E2E / Integration)
All automated end-to-end and integration tests MUST use Playwright and be located under `tests/` with a working
`playwright.config.ts`. Tests for P1 user journeys MUST exist before a release or public tag is created. Unit tests are
optional but, if present, SHOULD be clearly separated from Playwright tests. Rationale: uniform test tooling simplifies
local validation and avoids fragmentation; Playwright is the approved tool for this project.

### 4. No CI by Default — Manual Release Process
Continuous Integration is intentionally NOT required for this project at present. Pull requests and releases are
validated locally by maintainers: run the build, run Playwright tests, and perform a manual review. If CI is later
introduced, it MUST implement the same gates and follow the Governance versioning policy below. Rationale: the
project is small and prefers manual/maintainer-controlled releases for now.

### 5. Simplicity, Performance & Accessibility
Design and implementation MUST favor simplicity. Features MUST be justified against user value (YAGNI). Pages MUST
pass basic accessibility (a11y) checks and aim for good Lighthouse scores. Rationale: static sites benefit most from
high performance and accessible design.

## Technology Constraints

The project is constrained to the following technology decisions (non-negotiable unless constitution amended):

- Framework: Next.js (static export / SSG-first)
- UI: `shadcn` components + Tailwind CSS
- Testing: Playwright for automated E2E/integration tests
- No CI required (manual test + release flow)

Developers MUST document any deviation in the feature's `plan.md` and justify it during review.

## Development Workflow

- Branching: feature branches from `main` (or the repository default) named `feature/<short-name>`.
- Pull Requests: A PR MUST include a description, change summary, and local validation steps (build + Playwright run).
- Testing: Playwright tests for the affected user journeys MUST be added prior to merging features that affect
  production behavior.
- Releases: Tagging a release requires a maintainer approval and the presence of the required Playwright tests.

## Governance

Amendments to this constitution follow the process below:

1. Propose change: open a pull request modifying `.specify/memory/constitution.md` with rationale and migration steps.
2. Discussion: allow at least 72 hours for review and comments from maintainers/contributors.
3. Ratification: a majority approval from repository maintainers (or the repository owner when no maintainer team
	exists) is required to merge.
4. Versioning: update `CONSTITUTION_VERSION` using semantic versioning. Bump rules:
	- MAJOR: Removes or redefines existing principles in a backward-incompatible way.
	- MINOR: Adds a new principle or materially expands guidance.
	- PATCH: Non-semantic clarifications, typo fixes, or wording changes.

Compliance: Every `plan.md` generated from `.specify/templates/plan-template.md` MUST include a "Constitution Check"
that documents how the plan satisfies the applicable principles.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): original adoption date unknown | **Last Amended**: 2025-11-21
