# Quickstart: Netflix-Style Movie Catalog

**Feature Branch**: `003-netflix-catalog-shadcn`  
**Date**: 2025-11-26

## Prerequisites

- Node.js 18+
- npm (included with Node.js)
- Git

## Setup

### 1. Install Dependencies

```bash
# Ensure you're on the feature branch
git checkout 003-netflix-catalog-shadcn

# Install project dependencies
npm install
```

### 2. Install Required Shadcn Components

```bash
# Install Carousel component
npx shadcn@latest add carousel

# Install Card component
npx shadcn@latest add card

# Install Badge component
npx shadcn@latest add badge
```

### 3. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the movie catalog.

---

## Project Structure

```
app/
├── layout.tsx           # Root layout with dark theme
├── page.tsx             # Movie catalog page
└── globals.css          # Netflix dark theme CSS variables

components/
├── ui/                  # Shadcn components (auto-generated)
│   ├── carousel.tsx
│   ├── card.tsx
│   └── badge.tsx
└── movie-catalog/       # Feature components
    ├── movie-card.tsx
    ├── category-row.tsx
    └── catalog-header.tsx

lib/
├── utils.ts             # cn() utility
└── data/
    ├── types.ts         # TypeScript interfaces
    └── movies.ts        # Static movie data
```

---

## Component Usage

### MovieCard

Displays a single movie thumbnail with title and badges.

```tsx
import { MovieCard } from '@/components/movie-catalog/movie-card';

<MovieCard
  movie={{
    id: "81507921",
    title: "Frankenstein",
    posterUrl: "/images/movies/frankenstein.jpg",
    badges: ["recentlyAdded", "top10"]
  }}
/>
```

### CategoryRow

Displays a horizontal carousel of movies.

```tsx
import { CategoryRow } from '@/components/movie-catalog/category-row';

<CategoryRow
  category={{
    id: "your-next-watch",
    name: "Your Next Watch",
    slug: "your-next-watch",
    movies: [/* array of Movie objects */]
  }}
/>
```

### CatalogHeader

Displays the page header.

```tsx
import { CatalogHeader } from '@/components/movie-catalog/catalog-header';

<CatalogHeader
  title="Movies"
  description="Movies move us like nothing else can..."
/>
```

---

## Dark Theme Configuration

Add these CSS variables to `app/globals.css`:

```css
:root {
  --netflix-black: #141414;
  --netflix-dark-gray: #181818;
  --netflix-medium-gray: #2f2f2f;
  --netflix-light-gray: #b3b3b3;
  --netflix-white: #ffffff;
  --netflix-red: #e50914;
  --netflix-green: #46d369;
}

body {
  background-color: var(--netflix-black);
  color: var(--netflix-white);
}
```

---

## Adding Movie Data

1. Open `lib/data/movies.ts`
2. Add new movies to existing categories or create new categories
3. Follow the TypeScript interfaces in `lib/data/types.ts`

Example:

```typescript
// lib/data/movies.ts
import { CatalogData } from './types';

export const catalogData: CatalogData = {
  title: "Movies",
  description: "Movies move us like nothing else can...",
  categories: [
    {
      id: "your-next-watch",
      name: "Your Next Watch",
      slug: "your-next-watch",
      movies: [
        {
          id: "81507921",
          title: "Frankenstein",
          posterUrl: "/images/movies/frankenstein.jpg",
          badges: ["recentlyAdded", "top10"]
        },
        // Add more movies...
      ]
    },
    // Add more categories...
  ]
};
```

---

## Running Tests

After implementation, run Playwright tests:

```bash
# Run all E2E tests
npx playwright test

# Run tests with UI
npx playwright test --ui

# Run specific test file
npx playwright test tests/movie-catalog.spec.ts
```

---

## Building for Production

```bash
# Build static export
npm run build

# Preview the build
npm run start
```

The static files will be generated in the `out/` directory.

---

## Troubleshooting

### Images Not Loading

1. Check that `next.config.ts` has `images.unoptimized: true` for static export
2. Verify image URLs are accessible
3. Check browser console for CORS errors

### Carousel Not Scrolling

1. Ensure Embla Carousel is installed (comes with Shadcn Carousel)
2. Check that `CarouselContent` has enough items to overflow
3. Verify carousel container has proper width constraints

### Dark Theme Not Applied

1. Check `globals.css` is imported in `layout.tsx`
2. Verify CSS variables are defined
3. Ensure `body` has background color set

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main movie catalog page |
| `components/movie-catalog/movie-card.tsx` | Individual movie card |
| `components/movie-catalog/category-row.tsx` | Carousel row for a category |
| `lib/data/movies.ts` | Static movie data |
| `lib/data/types.ts` | TypeScript interfaces |
| `specs/003-netflix-catalog-shadcn/contracts/components.ts` | Component contracts |
