<!--
Sync Impact Report:
- Version change: 0.0.0 -> 1.0.0 (Initial Ratification)
- Modified principles: Defined Principles I-IV based on project requirements.
- Added sections: None.
- Removed sections: None.
- Templates requiring updates:
  - .specify/templates/tasks-template.md (✅ updated to reflect Post-Implementation Testing)
- Follow-up TODOs: None.
-->
# my-spec-kit-app Constitution

## Core Principles

### I. Next.js Static Web Guidelines
Use Next.js for static site generation. Follow Next.js coding guidelines (App Router, Server Components where possible). Ensure the application is optimized for static export.

### II. UI Consistency
Use Shadcn UI components and Tailwind CSS for styling. Ensure consistent design system usage across all pages and components. Avoid custom CSS where Tailwind utilities suffice.

### III. Post-Implementation Testing
Use Playwright for all testing. Tests are created *after* implementation. No Unit Tests (Jest/Vitest) unless strictly necessary. Focus on end-to-end user flows.

### IV. Local Development Focus
Continuous Integration (CI) is not used. All checks, builds, and tests must be run locally before commitment. Developers are responsible for ensuring code quality and stability on their local machines.

## Governance

All PRs/reviews must verify compliance with Next.js and Tailwind best practices. Testing is done via Playwright after feature completion.

**Version**: 1.0.0 | **Ratified**: 2025-11-26 | **Last Amended**: 2025-11-26
