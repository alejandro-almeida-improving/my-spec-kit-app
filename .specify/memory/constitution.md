# my-spec-kit-app Constitution

<!-- 
SYNC IMPACT REPORT: Version 1.0.0 (Initial Release)
- Version: Initial → 1.0.0
- Added Principles: Component Hygiene, Styling Foundation, Static Generation, Integration Testing, Next.js Coding Guidelines
- Added Sections: Technology Stack, Development Workflow
- Ratified: 2025-11-21
- Baseline governance established for static Next.js project with shadcn/Tailwind/Playwright stack
-->

## Core Principles

### I. Component Hygiene
Every React component MUST be functional, properly typed with TypeScript, and leverage shadcn/ui components as the primary building block. Components must accept props over direct state management for simple presentation logic; custom hooks are permitted for state and side effects. Avoid prop drilling—use composition or context when appropriate. Every component MUST have clear, single-responsibility behavior.

### II. Styling Foundation
All styles MUST be applied exclusively through Tailwind CSS utility classes. Do not use CSS modules, inline styles, or non-Tailwind conventions unless justified by technical constraint. Maintain consistency by using shadcn color tokens and spacing scale. Custom CSS is prohibited unless pre-approved in writing as a PR comment.

### III. Static Generation (NON-NEGOTIABLE)
The application MUST generate as a static site: use Next.js `generateStaticParams()` and `generateMetadata()` APIs where applicable. No dynamic server-side rendering except for static metadata. All pages must be pre-renderable and deployable as static HTML/CSS/JS artifacts. Route handlers and server actions are prohibited unless explicitly required for a documented, reviewable use case.

### IV. Integration Testing with Playwright
Playwright is the sole testing framework. Tests MUST be written after feature implementation is complete and working. Test coverage focuses on user-visible behavior: navigation, form interactions, content rendering. All new features MUST have corresponding Playwright test coverage before merge. Tests live in `tests/` with naming convention `[feature].spec.ts`.

### V. Next.js Coding Guidelines
Follow the [Next.js Best Practices](https://nextjs.org/docs/app/building-application/routing) strictly:
- Use App Router (no Pages Router).
- Keep server/client boundaries explicit (`"use client"` declarations required for client components).
- Leverage file-system routing; avoid manual route configuration.
- Use Next.js Image optimization and font APIs.
- Prefer async server components for data fetching; move client interactivity to leaf components.

## Technology Stack

The stack is fixed and non-negotiable:
- **Framework**: Next.js 16.x (App Router)
- **Language**: TypeScript (strict mode required)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS 4.x
- **Testing**: Playwright (browser-based E2E tests only)
- **Linting**: ESLint 9.x (configured in eslintrc)
- **Build**: Next.js native build system; no custom build steps

No additional UI frameworks, CSS-in-JS libraries, or state management tools are permitted without explicit amendment to this constitution.

## Development Workflow

1. **Feature Development**: Implement feature using Next.js guidelines, shadcn components, and Tailwind styling.
2. **Manual Testing**: Verify functionality locally via `npm run dev`.
3. **Playwright Testing**: Write tests in `tests/` after implementation is working.
4. **Linting**: Run `npm run lint` and fix all issues before commit.
5. **Build Verification**: Run `npm run build` to confirm static generation succeeds.
6. **No CI/CD**: All validation is manual; no automated pipelines required.

## Governance

This constitution is the single source of truth for development practices in my-spec-kit-app. All PRs and code reviews MUST verify compliance with these principles. Amendments require:
1. A new section or principle proposal with rationale.
2. Explicit version bump (MAJOR/MINOR/PATCH as appropriate).
3. Update to this document with new `[LAST_AMENDED_DATE]`.

Violations discovered post-merge MUST be addressed in follow-up PRs and flagged in sprint reviews.

**Version**: 1.0.0 | **Ratified**: 2025-11-21 | **Last Amended**: 2025-11-21
