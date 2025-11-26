# Implementation Plan: Netflix-Style Movie Catalog with Shadcn

**Branch**: `003-netflix-catalog-shadcn` | **Date**: 2025-11-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-netflix-catalog-shadcn/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a Netflix-style movie catalog page using Next.js App Router with Shadcn Carousel components. The page displays movies organized into horizontal carousels grouped by category (Your Next Watch, Suspenseful Movies, New on Netflix, Action Thriller Movies, Award-Winning Movies, Comedy Movies, Action & Adventure Movies, etc.) with a dark theme matching Netflix's visual design. Movie data extracted from Netflix includes real movie titles and poster images.

## Technical Context

**Language/Version**: TypeScript (strict mode) with Next.js 15+ App Router  
**Primary Dependencies**: Shadcn/UI (Carousel, Card, Badge), Tailwind CSS, next/image  
**Storage**: N/A (Static data - movies stored as JSON/TypeScript constants)  
**Testing**: Playwright (E2E tests for carousel navigation and visual rendering)  
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge), static HTML export  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: Page load < 3 seconds, carousel navigation < 200ms response  
**Constraints**: Static export compatible (no server-side features), WCAG AA contrast compliance  
**Scale/Scope**: 7+ movie categories, 40+ movies per category, single page

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Next.js App Router First | ✅ PASS | Using `app/` directory, Server Components, `next/image`, static generation |
| II. Shadcn/UI Components | ✅ PASS | Using Shadcn Carousel, Card, Badge components via CLI |
| III. Playwright Testing | ✅ PASS | E2E tests in `tests/` directory after implementation |
| IV. Static Export | ✅ PASS | No server-side features, static movie data, external image URLs |
| V. Simplicity (YAGNI) | ✅ PASS | Single page, no state management, no API routes |

**Gate Status**: ✅ ALL GATES PASSED - Proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/003-netflix-catalog-shadcn/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── components.ts    # TypeScript interfaces for components
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── layout.tsx           # Root layout with dark theme configuration
├── page.tsx             # Movie catalog page (main implementation)
├── globals.css          # Global styles with Netflix dark theme variables
└── movies/              # (Optional) Future route for movie details

components/
├── ui/                  # Shadcn/UI primitives (Carousel, Card, Badge)
│   ├── carousel.tsx     # Shadcn Carousel component
│   ├── card.tsx         # Shadcn Card component
│   └── badge.tsx        # Shadcn Badge component
└── movie-catalog/       # Feature-specific components
    ├── movie-card.tsx   # Individual movie thumbnail with title and badges
    ├── category-row.tsx # Horizontal carousel for a single category
    └── catalog-header.tsx # Page header with title and description

lib/
├── utils.ts             # cn() utility for Tailwind class merging
└── data/
    └── movies.ts        # Static movie data (titles, images, categories)

tests/
└── movie-catalog.spec.ts # Playwright E2E tests for catalog functionality

public/
└── images/              # (Optional) Local fallback images
```

**Structure Decision**: Next.js App Router web application structure following constitution principles. Components organized by Shadcn primitives (`components/ui/`) and feature-specific compositions (`components/movie-catalog/`). Movie data stored as TypeScript constants in `lib/data/` for static export compatibility.

## Complexity Tracking

> **No violations detected - project follows simplicity principle**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
