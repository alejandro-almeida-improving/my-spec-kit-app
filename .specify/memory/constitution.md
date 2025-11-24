<!--
Sync Impact Report
- Version change: N/A → 0.1.0
- Modified principles: Introduced "I. Static-First Next.js Delivery", "II. Composable Tailwind + Shadcn System", "III. Playwright Guarded Testing", "IV. Accessibility & Performance Baselines", "V. Local Quality & Manual Governance"
- Added sections: Technology Constraints; Workflow Expectations
- Removed sections: None
- Templates requiring updates: .specify/templates/plan-template.md ✅, .specify/templates/spec-template.md ✅, .specify/templates/tasks-template.md ✅, .specify/templates/checklist-template.md ✅
- Follow-up TODOs: None
-->

# Spec Kit App Constitution

## Core Principles

### I. Static-First Next.js Delivery
Every feature is conceived as a statically rendered surface whenever the Next.js App Router allows it. Server Components are the default; Client Components appear only when interactivity mandates them. Routes and layouts must declare their intent (e.g., `export const revalidate = 0` or `dynamicParams`) so that the stack can emit static assets, and any `getStaticProps`/`generateStaticParams` usage follows Next.js coding guidelines without bypassing the optimized static path.

### II. Composable Tailwind + Shadcn System
UI construction relies solely on the Tailwind theme plus Shadcn-provided primitives. Every page, section, and component shares the same design tokens (spacing, palette, typography) and extends the Shadcn config through Tailwind’s theming hooks. Styling outside Tailwind utilities is permitted only when extending the Shadcn component set through documented configuration files.

### III. Playwright Guarded Testing (NON-NEGOTIABLE)
End-to-end confidence comes exclusively through Playwright suites. Tests are written after the feature implementation is complete, then verified to fail before fixing (`Red → Green → Refactor`). Playwright scenarios must exercise the primary user journeys described in the spec and run locally; no alternative automation frameworks are introduced. Coverage stays focused on user-visible behaviors rather than internal implementation details.

### IV. Accessibility & Performance Baselines
Responsiveness, semantic markup, and keyboard/assistive-friendly interactions are non-negotiable. Each route must declare metadata for performance budgeting, minimize large bundles, and keep images optimized (use Next.js `next/image` when applicable). Color contrast, focus states, and motion preferences are reviewed during the testing phase, and regressions trigger a refactor rather than a bypass.

### V. Local Quality & Manual Governance
There is no CI: all verification runs (lint, type checks, Playwright) execute locally and are documented in the README. Teams must log manual steps taken for each change, including the commands run and their outcomes, to keep the traceability bar high. Prototypes, docs, and runbooks live next to the code so future contributors understand the static-first, Playwright-only workflow.

## Technology Constraints
- Next.js (App Router) with static generation defaults. Server Components and reusable layouts lead the architecture while client-only behaviors are localized to minimal React wrappers.
- Tailwind CSS and Shadcn UI are the only styling systems; no third-party CSS frameworks are permitted unless compatible with the shared token set.
- Playwright is the sole testing engine; scenarios must be introduced post-implementation and kept aligned with the primary user journeys.
- CI pipelines do not exist. Every change must document the verification commands that were executed locally, including linting, building, and Playwright validation.

## Workflow Expectations
- Implementation plans, specs, and tasks must document how they satisfy the core principles (static-first delivery, composable styling, Playwright gating, accessibility, and manual verification). See the Constitution Check section of the `/specify/templates/plan-template.md` for the exact checklist items.
- Specs describe independent, testable user stories with measurable acceptance criteria; the documentation must explicitly note that Playwright tests run after the UI is at feature parity.
- Tasks are grouped by story, include precise paths, and highlight the manual validation steps a contributor must perform for each deliverable.
- Every change requires a README or doc update summarizing how to run the application, run Playwright, and reproduce manual checks in lieu of CI.

## Governance
Constitution compliance is enforced via the planning, specification, and tasking templates. Amendments require a PR that updates this file, describes the proposed change, and includes a rationale with testers’ signoff. Major rewrites of principles trigger a MAJOR version bump; additions or expansions trigger MINOR; wording clarifications, typos, or restatements trigger PATCH. Reviews must verify that the plan and spec explicitly mention how the new work honors the constitution and that local Playwright runs succeeded.

**Version**: 0.1.0 | **Ratified**: 2025-11-24 | **Last Amended**: 2025-11-24
