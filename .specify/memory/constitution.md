<!--
Sync Impact Report:
- Version change: [CONSTITUTION_VERSION] -> 1.0.0
- Modified principles: Defined all principles for the first time based on user requirements.
  - Principle 1: Next.js Static Export
  - Principle 2: UI Consistency (Shadcn + Tailwind)
  - Principle 3: Post-Implementation Testing (Playwright)
  - Principle 4: No CI Dependency
- Added sections: None
- Removed sections: None
- Templates requiring updates: ✅ None (Templates are generic enough to support these principles)
- Follow-up TODOs: None
-->

# my-spec-kit-app Constitution

## Core Principles

### I. Next.js Static Export
The application is a static web site built with Next.js.
- **MUST** use `output: 'export'` in `next.config.ts`.
- **MUST** avoid server-side features that require a Node.js runtime at request time (e.g., `getServerSideProps`, dynamic API routes without static generation).
- **SHOULD** use App Router and Server Components for build-time data fetching.
- **MUST** follow Next.js coding guidelines and best practices for static exports.

### II. UI Consistency (Shadcn + Tailwind)
The user interface relies strictly on Shadcn UI and Tailwind CSS.
- **MUST** use Shadcn UI components for interactive elements.
- **MUST** use Tailwind CSS utility classes for styling.
- **MUST NOT** create custom CSS files unless absolutely necessary for global styles or complex animations not coverable by Tailwind.
- **SHOULD** maintain visual consistency by reusing defined components and tokens.

### III. Post-Implementation Testing
Testing is performed exclusively with Playwright and only after feature implementation.
- **MUST** use Playwright for all testing (E2E).
- **MUST NOT** write tests before implementation (No TDD).
- **MUST** create tests only after the feature code is written and manually verified.
- **SHOULD** focus on critical user journeys and regression testing.

### IV. No CI Dependency
The project is designed to be developed and deployed without Continuous Integration infrastructure.
- **MUST NOT** rely on GitHub Actions or other CI providers for build, test, or deploy steps.
- **MUST** ensure all verification (linting, building, testing) can be run locally.
- **SHOULD** provide clear documentation for manual deployment processes.

## Governance

### Amendment Process
- Any changes to these principles require a version bump and a corresponding update to this Constitution.
- Proposed amendments must be verified against existing code and templates to ensure consistency.

### Compliance
- All new features and code changes **MUST** adhere to these principles.
- Code reviews (self or peer) **MUST** verify compliance before merging.

**Version**: 1.0.0 | **Ratified**: 2025-12-05 | **Last Amended**: 2025-12-05
