# Implementation Plan: Netflix-Style Movie Catalog Page

**Branch**: `004-netflix-catalog-shadcn` | **Date**: 2025-11-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-netflix-catalog-shadcn/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Create a Netflix-style movie catalog page with dark theme, navigation bar, page header, and multiple category sections featuring horizontal carousels of movie cards. The implementation uses Shadcn UI components (Carousel, Card) with Tailwind CSS for styling, following Next.js App Router patterns with static data from JSON.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)  
**Primary Dependencies**: Next.js 16.0.3, React 19.2, Shadcn/ui, Tailwind CSS 4, Lucide React  
**Storage**: Static JSON (`public/data/movies.json`)  
**Testing**: Playwright (E2E only)  
**Target Platform**: Web (static site, all modern browsers)  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: Lighthouse Performance ≥90, Accessibility ≥90  
**Constraints**: Static generation preferred, minimal client-side JavaScript  
**Scale/Scope**: Single page with 6+ category sections, 5-8 movies per category

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Research Check (Phase 0)

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Next.js & App Router First | ✅ PASS | Page in `app/` directory, Server Components default, static data |
| II. Component Architecture (Shadcn + Tailwind) | ✅ PASS | Using Shadcn Carousel/Card, Tailwind utilities, `cn()` for classes |
| III. Implementation-First Testing | ✅ PASS | Playwright tests after implementation, in `tests/` directory |
| IV. Static Site Optimization | ✅ PASS | Static JSON data, minimal JS, `next/image` for optimization |

**Gate Result**: ✅ PASS - All principles satisfied

### Post-Design Check (Phase 1)

| Principle | Status | Verification |
|-----------|--------|--------------|
| I. Next.js & App Router First | ✅ PASS | - `app/page.tsx` for main route<br>- Server Components for data loading<br>- `"use client"` only on carousel navigation<br>- `next/image` for all poster images |
| II. Component Architecture (Shadcn + Tailwind) | ✅ PASS | - Shadcn Carousel, Card, Button installed via CLI<br>- Feature components compose Shadcn primitives<br>- All styling via Tailwind utilities<br>- `cn()` used for conditional classes |
| III. Implementation-First Testing | ✅ PASS | - Tests written after implementation complete<br>- Tests in `tests/movie-catalog.spec.ts`<br>- Tests cover acceptance scenarios from spec |
| IV. Static Site Optimization | ✅ PASS | - Static JSON data at build time<br>- Server Components minimize client JS<br>- `next/image` for WebP/AVIF<br>- Lighthouse targets: Performance ≥90, Accessibility ≥90 |

**Final Gate Result**: ✅ PASS - Design phase complete, ready for task generation

## Project Structure

### Documentation (this feature)

```text
specs/004-netflix-catalog-shadcn/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── layout.tsx           # Root layout with metadata
├── page.tsx             # Movie catalog page (main feature)
└── globals.css          # Global styles, Tailwind, dark theme

components/
├── ui/                  # Shadcn components (CLI-installed)
│   ├── button.tsx
│   ├── card.tsx
│   └── carousel.tsx
└── movie-catalog/       # Feature-specific components
    ├── navbar.tsx       # Navigation bar with logo and buttons
    ├── page-header.tsx  # "Movies" title and description
    ├── category-row.tsx # Category section with title and carousel
    └── movie-card.tsx   # Individual movie poster card

lib/
└── utils.ts             # cn() utility function

public/
├── data/
│   └── movies.json      # Static movie data
└── images/
    └── movies/          # Downloaded movie poster images

tests/
└── movie-catalog.spec.ts  # Playwright E2E tests
```

**Structure Decision**: Next.js App Router structure with feature components in `components/movie-catalog/`. Shadcn UI components installed to `components/ui/`. Static assets in `public/`.

## Complexity Tracking

> **No violations - all principles satisfied**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
