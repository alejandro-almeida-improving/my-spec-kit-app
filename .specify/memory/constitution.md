<!--
================================================================================
SYNC IMPACT REPORT
================================================================================
Version change: N/A → 1.0.0 (initial ratification)
Modified principles: N/A (initial constitution)
Added sections:
  - Core Principles (5 principles)
  - Technology Stack
  - Development Workflow
  - Governance
Removed sections: N/A
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ (compatible - no changes needed)
  - .specify/templates/spec-template.md ✅ (compatible - no changes needed)
  - .specify/templates/tasks-template.md ✅ (compatible - tests-after approach noted)
Follow-up TODOs: None
================================================================================
-->

# My Spec Kit App Constitution

## Core Principles

### I. Next.js App Router First

All pages and layouts MUST use the Next.js App Router (`app/` directory) conventions.
- Server Components are the default; use `'use client'` directive only when client-side interactivity is required
- Follow Next.js file-based routing conventions: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
- Static generation (SSG) is preferred for all pages since this is a static website
- Use `next/image` for all images, `next/link` for internal navigation, `next/font` for typography

**Rationale**: App Router is the current Next.js standard, enabling better performance through Server Components and simplified data fetching patterns.

### II. Component Architecture with Shadcn/UI

UI components MUST follow Shadcn/UI patterns and Tailwind CSS conventions.
- Install Shadcn components via CLI (`npx shadcn@latest add <component>`) rather than copying manually
- Components live in `components/ui/` for Shadcn primitives and `components/` for custom compositions
- All styling MUST use Tailwind CSS utility classes; avoid custom CSS except in `globals.css` for CSS variables
- Use `cn()` utility from `lib/utils.ts` for conditional class merging
- Components MUST be accessible (ARIA attributes, keyboard navigation)

**Rationale**: Shadcn provides unstyled, accessible components that integrate seamlessly with Tailwind, enabling consistent design while maintaining full control over styling.

### III. Testing with Playwright (Post-Implementation)

End-to-end tests MUST be written using Playwright after feature implementation.
- Tests live in the `tests/` directory following `*.spec.ts` naming convention
- Each user story from the specification MUST have corresponding E2E test coverage
- Tests MUST verify user-visible behavior, not implementation details
- Run tests locally with `npx playwright test` before considering a feature complete
- Visual regression testing is optional but encouraged for UI-heavy features

**Rationale**: For a static website, E2E tests provide the highest confidence by testing real user interactions. Writing tests after implementation allows for faster initial development while still ensuring quality.

### IV. Static Export Optimization

All features MUST be compatible with static HTML export (`next build && next export` or `output: 'export'`).
- No server-side only features (API routes, server actions with mutations, dynamic server rendering)
- Data fetching MUST happen at build time or client-side
- Images MUST use static imports or external URLs with proper `next.config.ts` configuration
- All routes MUST be statically determinable at build time

**Rationale**: Static export enables deployment to any static hosting provider (Vercel, Netlify, GitHub Pages) with maximum performance and zero server costs.

### V. Simplicity and YAGNI

Start with the simplest solution that works; add complexity only when justified.
- No premature abstractions; extract components/utilities only when patterns repeat 3+ times
- Prefer composition over configuration
- Keep the dependency count minimal; every new package MUST justify its addition
- No state management libraries unless local component state proves insufficient
- No CI/CD pipelines; manual local testing and deployment is sufficient for this project

**Rationale**: A static website benefits from simplicity. Overengineering increases maintenance burden without proportional value.

## Technology Stack

The following technologies are mandated for this project:

| Category | Technology | Version/Notes |
|----------|------------|---------------|
| Framework | Next.js | App Router, static export |
| Language | TypeScript | Strict mode enabled |
| Styling | Tailwind CSS | With CSS variables in globals.css |
| Components | Shadcn/UI | Installed via CLI |
| Testing | Playwright | E2E tests only |
| Package Manager | npm | As per project setup |
| Node Version | 18+ | LTS recommended |

**Forbidden**:
- CSS-in-JS libraries (styled-components, emotion)
- Alternative testing frameworks (Jest, Vitest for unit tests)
- Server-side features (API routes, server actions, ISR)
- CI/CD configuration files

## Development Workflow

### Feature Development Process

1. **Specification**: Define user stories and acceptance criteria in spec document
2. **Implementation**: Build the feature following constitution principles
3. **Manual Testing**: Verify functionality in the browser during development
4. **Playwright Tests**: Write E2E tests covering all acceptance scenarios
5. **Test Execution**: Run `npx playwright test` and ensure all tests pass
6. **Commit**: Commit changes with descriptive message

### File Organization

```
app/                    # Next.js App Router pages and layouts
├── layout.tsx          # Root layout
├── page.tsx            # Home page
├── globals.css         # Global styles and CSS variables
└── [feature]/          # Feature-specific routes
    └── page.tsx

components/             # React components
├── ui/                 # Shadcn/UI primitives
└── [feature]/          # Feature-specific components

lib/                    # Utilities and helpers
└── utils.ts            # cn() and other utilities

tests/                  # Playwright E2E tests
└── *.spec.ts

public/                 # Static assets
```

### Commit Guidelines

- Use conventional commit format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`
- Keep commits atomic; one logical change per commit

## Governance

This constitution supersedes all conflicting practices. Amendments require:
1. Clear rationale for the change
2. Documentation of the amendment in this file
3. Version increment following semantic versioning

**Version Policy**:
- MAJOR: Principle removal or fundamental governance change
- MINOR: New principle added or existing principle materially expanded
- PATCH: Clarifications, typo fixes, non-semantic refinements

All development work MUST verify compliance with these principles before completion.

**Version**: 1.0.0 | **Ratified**: 2025-11-26 | **Last Amended**: 2025-11-26
