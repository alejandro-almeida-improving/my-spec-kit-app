# Data Model: Netflix-Style Movie Catalog

**Feature Branch**: `003-netflix-catalog-shadcn`  
**Date**: 2025-11-26

## Overview

This document defines the data entities and their relationships for the Netflix-style movie catalog feature. All data is stored as static TypeScript constants for static export compatibility.

---

## Entities

### Movie

Represents a single movie item displayed in the catalog.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier (Netflix title ID) |
| title | string | Yes | Display name of the movie |
| posterUrl | string | Yes | URL to the movie poster image |
| netflixUrl | string | No | Link to the movie on Netflix (for reference) |
| badges | Badge[] | No | Array of badge types to display |

### Badge

Represents a visual indicator on a movie card.

| Value | Display Text | Color |
|-------|--------------|-------|
| `"top10"` | "Top 10" | Red (#e50914) |
| `"recentlyAdded"` | "Recently Added" | Green (#46d369) |

### Category

Represents a grouping of movies displayed as a horizontal carousel row.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier for the category |
| name | string | Yes | Display name shown as section header |
| slug | string | Yes | URL-friendly identifier |
| linkUrl | string | No | Optional URL for category header link |
| movies | Movie[] | Yes | Array of movies in this category |

---

## TypeScript Interfaces

```typescript
// lib/data/types.ts

export type BadgeType = 'top10' | 'recentlyAdded';

export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  netflixUrl?: string;
  badges?: BadgeType[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  linkUrl?: string;
  movies: Movie[];
}

export interface CatalogData {
  title: string;
  description: string;
  categories: Category[];
}
```

---

## Sample Data Structure

```typescript
// lib/data/movies.ts

export const catalogData: CatalogData = {
  title: "Movies",
  description: "Movies move us like nothing else can, whether they're scary, funny, dramatic, romantic or anywhere in-between. So many titles, so much to experience.",
  categories: [
    {
      id: "your-next-watch",
      name: "Your Next Watch",
      slug: "your-next-watch",
      linkUrl: "https://www.netflix.com/mx-en/browse/genre/448",
      movies: [
        {
          id: "81507921",
          title: "Frankenstein",
          posterUrl: "/images/movies/frankenstein.jpg",
          netflixUrl: "https://www.netflix.com/mx-en/title/81507921",
          badges: ["recentlyAdded", "top10"]
        },
        {
          id: "81616256",
          title: "A Man Called Otto",
          posterUrl: "/images/movies/a-man-called-otto.jpg",
          netflixUrl: "https://www.netflix.com/mx-en/title/81616256",
          badges: ["recentlyAdded", "top10"]
        },
        // ... more movies
      ]
    },
    // ... more categories
  ]
};
```

---

## Netflix Data Extracted (Nov 26, 2025)

### Category: Your Next Watch
| Title | Netflix ID | Badges |
|-------|------------|--------|
| Frankenstein | 81507921 | Recently Added, Top 10 |
| A Man Called Otto | 81616256 | Recently Added, Top 10 |
| KPop Demon Hunters | 81498621 | Top 10 |
| Counterattack | 81936018 | - |
| 65 | 81520516 | - |
| The Secret Life of Pets 2 | 81044813 | - |
| Fast X | 81649988 | - |
| Sonic the Hedgehog 3 | 81902147 | - |
| Champagne Problems | 81628146 | - |
| Gladiator II | 81902148 | - |
| Shrek | 60020686 | - |
| Caramelo | 81702623 | - |
| The Little Things | 81267316 | - |
| Godzilla x Kong: The New Empire | 81767887 | - |
| The Mask | 70027007 | - |
| A Cinderella Christmas Ball | 82095784 | - |
| 13 Hours: The Secret Soldiers of Benghazi | 80067930 | - |
| John Wick: Chapter 4 | 81489835 | - |
| Sing | 80117526 | - |
| Now You See Me | 70243464 | - |

### Category: Suspenseful Movies
| Title | Netflix ID |
|-------|------------|
| The Little Things | 81267316 |
| Now You See Me | 70243464 |
| Godzilla x Kong: The New Empire | 81767887 |
| Plane | 81625291 |
| The Elixir | 81624009 |
| The Mother | 80210920 |
| A Time to Kill | 1049750 |
| My Name Is Vendetta | 81458368 |
| Man on Fire | 60034560 |
| Officer Black Belt | 81702144 |
| iHostage | 81709663 |
| Army of Thieves | 81185548 |
| The Gray Man | 81160697 |
| The Missing | 60031276 |
| Triple Frontier | 80192187 |
| Viking Wolf | 81338873 |
| Safe House | 70208104 |
| Spider-Man: No Way Home | 81465707 |
| World War Z | 70262639 |
| The Killer | 80234448 |

### Category: New on Netflix
| Title | Netflix ID |
|-------|------------|
| A Man Called Otto | 81616256 |
| Champagne Problems | 81628146 |
| The Last Kiss | 60031392 |
| Jingle Bell Heist | 81928353 |
| 65 | 81520516 |
| Train Dreams | 82020378 |
| The Follies | 81750640 |
| Frankenstein | 81507921 |
| Caramelo | 81702623 |
| Sonic the Hedgehog 3 | 81902147 |
| Godzilla x Kong: The New Empire | 81767887 |
| Furiosa: A Mad Max Saga | 81610642 |
| Fast X | 81649988 |
| In Your Dreams | 80992977 |
| Love Untangled | 81785333 |

### Category: Action Thriller Movies
| Title | Netflix ID |
|-------|------------|
| Fast X | 81649988 |
| 13 Hours: The Secret Soldiers of Benghazi | 80067930 |
| Land of Bad | 81747468 |
| John Wick: Chapter 4 | 81489835 |
| The Shadow Strays | 81624008 |
| 6 Underground | 81001887 |
| Infinite | 81198938 |
| Plane | 81625291 |
| My Name Is Vendetta | 81458368 |
| The Mother | 80210920 |
| Officer Black Belt | 81702144 |
| Blacklight | 81516127 |
| The Expendables 4 | 81674656 |
| Havoc | 81330790 |
| Man on Fire | 60034560 |
| Extraction 2 | 81098494 |
| The Gray Man | 81160697 |
| Kill Bill: Vol. 1 | 60031236 |

### Category: Award-Winning Movies
| Title | Netflix ID |
|-------|------------|
| Shrek | 60020686 |
| Gladiator II | 81902148 |
| El infierno | 70241340 |
| The Hangover | 70113002 |
| Una película de huevos | 70204787 |
| Coach Carter | 70019004 |
| A Time to Kill | 1049750 |
| Dead Poets Society | 426589 |
| Just Mercy | 80207506 |
| Rango | 70137742 |
| All Quiet on the Western Front | 81260280 |
| The Irishman | 80175798 |
| Like Water for Chocolate | 701346 |
| Happy Feet | 70043941 |
| GoodFellas | 70002022 |
| Interstellar | 70305903 |
| Mad Max: Fury Road | 80025919 |
| Society of the Snow | 81268316 |
| Get Out | 80149258 |

### Category: Comedy Movies
| Title | Netflix ID |
|-------|------------|
| Sonic the Hedgehog 3 | 81902147 |
| The Mask | 70027007 |
| Caramelo | 81702623 |
| Blended | 70298250 |
| Shrek Forever After | 70117295 |
| Sing | 80117526 |
| No Manches Frida | 80102059 |
| Happy Gilmore 2 | 81696722 |
| That Christmas | 81309564 |
| Hotel Transylvania 3: Summer Vacation | 80233925 |
| Going in Style | 80089006 |
| The Hangover | 70113002 |
| Minions | 80033394 |
| Megamind | 70120612 |
| Despicable Me 3 | 80166314 |
| Red Notice | 81161626 |
| Scary Movie | 60000870 |

### Category: Action & Adventure Movies
| Title | Netflix ID |
|-------|------------|
| Hidden Strike | 81322579 |
| K.O. | 81745661 |
| Furiosa: A Mad Max Saga | 81610642 |
| Blacklight | 81516127 |
| Infinite | 81198938 |
| The Expendables 4 | 81674656 |
| Uncharted | 81199140 |
| Troy | 60034571 |
| Plane | 81625291 |
| Man on Fire | 60034560 |
| Red Notice | 81161626 |
| Spider-Man: No Way Home | 81465707 |
| World War Z | 70262639 |
| Damsel | 80991090 |
| Pacific Rim | 70267241 |
| Kong: Skull Island | 80139562 |
| Rampage | 80216309 |
| The Old Guard 2 | 81328881 |

---

## Validation Rules

### Movie Validation
- `id`: Non-empty string
- `title`: Non-empty string, max 100 characters
- `posterUrl`: Valid URL or relative path starting with `/`
- `badges`: Array of valid BadgeType values only

### Category Validation
- `id`: Non-empty string, unique across all categories
- `name`: Non-empty string, max 50 characters
- `slug`: URL-safe string (lowercase, hyphens only)
- `movies`: Non-empty array with at least 1 movie

---

## State Transitions

N/A - This feature uses static data with no state mutations.

---

## Data File Location

```
lib/
└── data/
    ├── types.ts      # TypeScript interfaces
    └── movies.ts     # Static movie catalog data
```
