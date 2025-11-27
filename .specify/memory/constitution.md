<!--
SYNC IMPACT REPORT
Version: 0.0.0 -> 1.0.0
Modified Principles:
- Added: I. Next.js Static Architecture
- Added: II. Modern UI Stack
- Added: III. Post-Implementation Testing
- Added: IV. Local-First Workflow (No CI)
- Added: V. Simplicity & YAGNI
Templates requiring updates:
- .specify/templates/tasks-template.md (⚠ pending - references TDD/Test-First)
Follow-up TODOs:
- Update tasks-template.md to remove "Write tests FIRST" instructions.
-->
# my-spec-kit-app Constitution

## Core Principles

### I. Next.js Static Architecture
The project is a static web application built with Next.js. It MUST follow Next.js coding guidelines and best practices for static exports. Dynamic server-side features that require a runtime server are prohibited unless explicitly authorized.

### II. Modern UI Stack
UI development MUST use Shadcn UI and Tailwind CSS. Consistency and adherence to the design system provided by these tools are mandatory. Custom CSS should be avoided in favor of Tailwind utility classes.

### III. Post-Implementation Testing
Testing is performed using Playwright ONLY. Tests are created *after* implementation is complete to verify functionality. Test-Driven Development (TDD) is explicitly NOT used.

### IV. Local-First Workflow (No CI)
Continuous Integration (CI) pipelines are NOT used. All verification, building, and testing MUST be performed locally by the developer before deployment or merging.

### V. Simplicity & YAGNI
We adhere to "You Aren't Gonna Need It". Implement only what is requested. Keep the architecture simple and focused on the static nature of the site.

## Technology Standards

*   **Framework**: Next.js (Static Export)
*   **Styling**: Tailwind CSS
*   **Components**: Shadcn UI
*   **Language**: TypeScript
*   **Testing**: Playwright

## Development Workflow

1.  **Implementation**: Develop the feature or page following Next.js and UI guidelines.
2.  **Verification**: Verify the functionality manually in the local environment.
3.  **Testing**: Write Playwright tests to cover the new functionality.
4.  **Final Check**: Ensure all tests pass locally before considering the task complete.

## Governance

This Constitution supersedes all other project documentation. Amendments require a version bump and a Sync Impact Report. Code reviews must verify compliance with the UI stack and testing strategy.

**Version**: 1.0.0 | **Ratified**: 2025-11-27 | **Last Amended**: 2025-11-27
