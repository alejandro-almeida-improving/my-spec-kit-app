# Data Model: Netflix-Style Movie Catalog Page

**Feature**: 004-netflix-catalog-shadcn  
**Date**: 2025-11-26  
**Status**: Complete

## Entities

### Movie

Represents a single movie in the catalog.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | ✅ | Display title of the movie |
| `slug` | `string` | ✅ | URL-friendly identifier |
| `imageUrl` | `string` | ❌ | Original remote image URL (fallback) |
| `localImage` | `string` | ✅ | Local path in `/public/images/movies/` |
| `category` | `string` | ✅ | Category name this movie belongs to |
| `badge` | `string \| null` | ❌ | Optional badge ("Recently Added", "Top 10") |

**Validation Rules**:
- `title` must be non-empty string
- `slug` must be lowercase, hyphen-separated, no special characters
- `localImage` must start with `/images/movies/`
- `badge` if present, must be one of: "Recently Added", "Top 10", "New"

### Category

Represents a movie category/genre section.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | ✅ | Display title of the category |
| `slug` | `string` | ✅ | URL-friendly identifier for category page |
| `movies` | `Movie[]` | ✅ | Array of movies in this category |

**Validation Rules**:
- `title` must be non-empty string
- `slug` must be lowercase, hyphen-separated
- `movies` array must contain 1-20 movies

### CatalogData

Root data structure for the catalog.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `categories` | `Category[]` | ✅ | Array of category sections |

**Validation Rules**:
- `categories` must contain at least 6 items (per FR-007)
- Each category should have 5-8 movies (per assumptions)

## TypeScript Interfaces

```typescript
// types/movie.ts

export interface Movie {
  title: string;
  slug: string;
  imageUrl?: string;
  localImage: string;
  category: string;
  badge?: "Recently Added" | "Top 10" | "New" | null;
}

export interface Category {
  title: string;
  slug: string;
  movies: Movie[];
}

export interface CatalogData {
  categories: Category[];
}
```

## Relationships

```
CatalogData
    │
    └── categories: Category[] (1:N)
            │
            └── movies: Movie[] (1:N)
```

- One `CatalogData` contains multiple `Category` objects
- One `Category` contains multiple `Movie` objects
- A `Movie` belongs to one `Category` (denormalized in current structure)

## State Transitions

N/A - This is a static catalog with no state mutations. Data is loaded once at build time.

## Data Source

**File**: `/public/data/movies.json`

**Load Pattern**: 
```typescript
// In Server Component
import catalogData from '@/public/data/movies.json';
// or
const catalogData = await import('@/public/data/movies.json');
```

## Sample Data

```json
{
  "categories": [
    {
      "title": "Your Next Watch",
      "slug": "your-next-watch",
      "movies": [
        {
          "title": "Frankenstein",
          "slug": "frankenstein",
          "imageUrl": "https://...",
          "localImage": "/images/movies/frankenstein.jpg",
          "category": "Your Next Watch",
          "badge": null
        }
      ]
    }
  ]
}
```

## Data Expansion Requirements

Current state: 2 categories, 12 movies total
Required state: 6+ categories, ~40-48 movies total

Categories to add:
1. "New on Netflix" (with "Recently Added" badges)
2. "Action Thriller Movies"
3. "Award-Winning Movies"
4. "Comedy Movies"
5. "Action Movies" or "Action & Adventure Movies"
6. Additional categories as available

**Note**: Movie images may be reused across categories since Netflix shows the same movie in multiple relevant categories.
