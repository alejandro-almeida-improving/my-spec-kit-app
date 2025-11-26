# Contracts: Netflix-Style Movie Catalog Page

**Feature**: 004-netflix-catalog-shadcn  
**Date**: 2025-11-26

## Overview

This feature is a static site with no API endpoints. The "contracts" define the data schema for the static JSON file that powers the catalog.

## Data Contract

### catalog-data.schema.json

JSON Schema defining the structure of `/public/data/movies.json`.

**File**: [catalog-data.schema.json](./catalog-data.schema.json)

#### Usage

Validate the movies.json file against the schema:

```bash
# Using ajv-cli
npx ajv validate -s specs/004-netflix-catalog-shadcn/contracts/catalog-data.schema.json -d public/data/movies.json
```

#### Key Constraints

| Constraint | Value | Rationale |
|------------|-------|-----------|
| Min categories | 6 | FR-007: Must display at least 6 category sections |
| Movies per category | 1-20 | Assumption: 5-8 typical, max 20 for flexibility |
| Badge values | "Recently Added", "Top 10", "New", null | FR-012: Badge display support |
| Image path pattern | `/images/movies/*.jpg` | Local images for optimization |

## Component Contracts

### Props Interfaces

These TypeScript interfaces define the component API contracts:

```typescript
// MovieCardProps
interface MovieCardProps {
  movie: Movie;
  priority?: boolean; // For above-fold image loading
}

// CategoryRowProps
interface CategoryRowProps {
  category: Category;
  index: number; // For lazy loading priority
}

// NavbarProps
interface NavbarProps {
  // No props - static component
}

// PageHeaderProps
interface PageHeaderProps {
  title: string;
  description: string;
}
```

## Accessibility Contract

Per SC-007 (Lighthouse accessibility ≥80), components must:

| Requirement | Implementation |
|-------------|----------------|
| Keyboard navigation | Shadcn Carousel provides arrow key support |
| Focus indicators | Tailwind `focus:ring-2` on interactive elements |
| Alt text | `next/image` requires `alt` prop |
| Semantic HTML | Use `<nav>`, `<main>`, `<section>`, `<h1>`-`<h3>` |
| Color contrast | White text on dark (#141414) exceeds 4.5:1 ratio |

## Visual Contract

Per VR-001 through VR-006:

| Element | Specification |
|---------|---------------|
| Background | `#141414` (near-black) |
| Primary text | `#FFFFFF` (white) |
| Secondary text | `#B3B3B3` (gray) |
| Accent button | `#E50914` (Netflix red) |
| Card radius | `rounded-md` (8px) |
| Card shadow | `shadow-lg` on hover |
| Arrow visibility | CSS hover reveal (desktop), always visible (touch) |
