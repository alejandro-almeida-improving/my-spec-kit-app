<!--
================================================================================
SYNC IMPACT REPORT
================================================================================
Version Change: N/A → 1.0.0 (Initial ratification)

Added Principles:
  - I. Next.js & App Router First
  - II. Component Architecture (Shadcn + Tailwind)
  - III. Implementation-First Testing
  - IV. Static Site Optimization

Added Sections:
  - Technology Stack
  - Development Workflow
  - Governance

Modified Principles: None (initial version)
Removed Sections: None (initial version)

Templates Requiring Updates:
  - .specify/templates/plan-template.md ✅ (Compatible - no changes required)
  - .specify/templates/spec-template.md ✅ (Compatible - no changes required)
  - .specify/templates/tasks-template.md ✅ (Compatible - test-after pattern aligns)

Follow-up TODOs: None
================================================================================
-->

# My Spec Kit App Constitution

## Core Principles

### I. Next.js & App Router First

All routing, layouts, and page components MUST use the Next.js App Router paradigm.

- Pages MUST reside in the `app/` directory using file-based routing
- Layouts MUST use `layout.tsx` for shared UI and metadata
- Server Components are the DEFAULT; Client Components MUST be explicitly marked with `"use client"` only when interactivity is required
- Static generation (SSG) is PREFERRED; dynamic rendering MUST be justified
- Metadata MUST be defined using the Next.js Metadata API for SEO optimization
- Images MUST use `next/image` for automatic optimization
- Fonts MUST use `next/font` for performance optimization

**Rationale**: Next.js App Router provides the most performant patterns for static sites with built-in optimizations for Core Web Vitals.

### II. Component Architecture (Shadcn + Tailwind)

All UI components MUST follow the Shadcn/ui + Tailwind CSS design system.

- Shadcn components MUST be installed via CLI (`npx shadcn@latest add <component>`) into `components/ui/`
- Custom components MUST extend or compose Shadcn primitives when applicable
- Styling MUST use Tailwind CSS utility classes; custom CSS MUST be avoided unless absolutely necessary
- Component variants MUST use `class-variance-authority` (CVA) patterns
- Dark mode support MUST use Tailwind's `dark:` variant when applicable
- Responsive design MUST use Tailwind breakpoint prefixes (`sm:`, `md:`, `lg:`, `xl:`)
- `cn()` utility from `lib/utils.ts` MUST be used for conditional class merging

**Rationale**: Shadcn provides accessible, customizable primitives; Tailwind ensures consistent, maintainable styling with minimal CSS bundle size.

### III. Implementation-First Testing

Tests MUST be written AFTER implementation is complete, using Playwright exclusively.

- Unit tests and integration tests outside Playwright are NOT used in this project
- Playwright tests MUST cover critical user journeys defined in feature specifications
- Tests MUST be placed in the `tests/` directory at repository root
- Test files MUST follow the naming convention `*.spec.ts`
- Tests MUST validate acceptance scenarios from the feature specification
- Visual regression testing MAY be added for UI-critical flows
- Tests SHOULD run locally before PR submission; CI is NOT configured

**Rationale**: For a static site with clear user journeys, E2E testing provides the highest confidence with minimal overhead. Implementation-first allows rapid prototyping.

### IV. Static Site Optimization

The application MUST be optimized for static deployment and performance.

- Pages SHOULD be statically generated at build time whenever possible
- Client-side JavaScript MUST be minimized; prefer Server Components
- Bundle size MUST be monitored; unused dependencies MUST be removed
- Images MUST be optimized and use modern formats (WebP, AVIF) via `next/image`
- Lighthouse scores SHOULD target: Performance ≥90, Accessibility ≥90, Best Practices ≥90, SEO ≥90
- Third-party scripts MUST use `next/script` with appropriate loading strategies

**Rationale**: Static sites benefit from CDN edge caching and minimal JavaScript; optimization ensures fast load times globally.

## Technology Stack

**Framework**: Next.js (App Router)
**Language**: TypeScript (strict mode)
**UI Components**: Shadcn/ui
**Styling**: Tailwind CSS
**Testing**: Playwright (E2E only)
**Package Manager**: npm (or as configured in project)
**Linting**: ESLint with Next.js configuration
**Formatting**: Prettier (if configured)

### Directory Structure

```text
app/                    # Next.js App Router pages and layouts
├── layout.tsx          # Root layout
├── page.tsx            # Home page
├── globals.css         # Global styles and Tailwind imports
└── [feature]/          # Feature-specific routes

components/
├── ui/                 # Shadcn components (CLI-installed)
└── [feature]/          # Feature-specific components

lib/
└── utils.ts            # Utility functions (cn, etc.)

public/                 # Static assets

tests/                  # Playwright E2E tests
└── *.spec.ts

specs/                  # Feature specifications
└── [###-feature-name]/
```

## Development Workflow

### Feature Development Process

1. **Specification**: Create feature spec in `specs/[###-feature-name]/spec.md`
2. **Planning**: Generate implementation plan via `/speckit.plan`
3. **Tasks**: Generate task breakdown via `/speckit.tasks`
4. **Implementation**: Build feature following Next.js and component architecture principles
5. **Testing**: Write Playwright tests covering acceptance scenarios
6. **Review**: Verify Lighthouse scores and accessibility compliance

### Code Quality Gates

- TypeScript MUST compile without errors
- ESLint MUST pass without errors (warnings acceptable during development)
- Playwright tests MUST pass before feature completion
- Components MUST be accessible (keyboard navigation, ARIA labels)

## Governance

This constitution supersedes all other development practices for this project.

### Amendment Process

1. Propose change with rationale
2. Document impact on existing code and templates
3. Update constitution with version increment
4. Propagate changes to affected templates and documentation

### Versioning Policy

- **MAJOR**: Principle removal, incompatible workflow changes
- **MINOR**: New principle added, significant guidance expansion
- **PATCH**: Clarifications, typo fixes, non-breaking refinements

### Compliance

- All feature implementations MUST verify alignment with Core Principles
- Deviations MUST be documented with justification in the feature plan
- Complexity additions MUST be justified in the Complexity Tracking section of plans

**Version**: 1.0.0 | **Ratified**: 2025-11-26 | **Last Amended**: 2025-11-26
