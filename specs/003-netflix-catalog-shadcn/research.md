# Research: Netflix-Style Movie Catalog with Shadcn

**Feature Branch**: `003-netflix-catalog-shadcn`  
**Date**: 2025-11-26

## Overview

This document consolidates research findings for implementing a Netflix-style movie catalog page using Shadcn/UI components in Next.js with App Router.

---

## 1. Shadcn Carousel Implementation

### Decision
Use the Shadcn Carousel component built on top of Embla Carousel for horizontal movie navigation.

### Rationale
- **Official Shadcn component**: Follows constitution principle II (Shadcn/UI patterns)
- **Embla Carousel**: Battle-tested, performant, and accessible carousel library
- **Customizable**: Unstyled base allows Netflix-like appearance with Tailwind CSS
- **Touch support**: Built-in swipe gestures for mobile devices

### Alternatives Considered
| Alternative | Rejected Because |
|-------------|------------------|
| Custom scroll implementation | More complex, reinventing the wheel, accessibility concerns |
| Swiper.js | Additional dependency not in Shadcn ecosystem |
| Pure CSS scroll-snap | Limited control over navigation arrows and state |

### Implementation Pattern
```typescript
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Netflix-style category row
<Carousel opts={{ align: "start", loop: false }}>
  <CarouselContent className="-ml-2 md:-ml-4">
    {movies.map((movie) => (
      <CarouselItem key={movie.id} className="pl-2 md:pl-4 basis-1/4 md:basis-1/6">
        <MovieCard movie={movie} />
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### Key Configuration Options
- `align: "start"` - Items align to start like Netflix
- `loop: false` - No infinite scroll (matches Netflix behavior)
- `dragFree: true` - Optional: smooth drag behavior
- Responsive `basis-*` classes for different viewport sizes

---

## 2. Netflix UI Design Patterns

### Decision
Implement dark theme with specific Netflix color palette and layout patterns.

### Rationale
- Matches user expectations for "Netflix-style" interface
- Dark background optimizes movie poster visibility
- High contrast ensures WCAG AA compliance

### Design Specifications

#### Color Palette
```css
:root {
  --netflix-black: #141414;
  --netflix-dark-gray: #181818;
  --netflix-medium-gray: #2f2f2f;
  --netflix-light-gray: #b3b3b3;
  --netflix-white: #ffffff;
  --netflix-red: #e50914;
}
```

#### Layout Patterns
- **Page header**: Large title "Movies" with descriptive subtitle
- **Category rows**: Full-width sections with category title + carousel
- **Movie cards**: 16:9 or similar aspect ratio thumbnails
- **Spacing**: Consistent gaps between categories (40-60px)
- **Category headers**: Clickable, hover underline effect

#### Badge Patterns
- "Top 10" badge: Red background (#e50914), positioned top-right
- "Recently Added" badge: Green background, positioned bottom overlay

### Alternatives Considered
| Alternative | Rejected Because |
|-------------|------------------|
| Light theme option | Out of scope, spec requires dark theme only |
| Custom scrollbar styling | Over-engineering for MVP |
| Animated hover effects | P3 priority, can add later |

---

## 3. Image Handling for Static Export

### Decision
Use external Netflix image URLs with `next/image` configured for remote patterns.

### Rationale
- Constitution principle IV requires static export compatibility
- External images work with `next/image` optimization when configured
- No need to download/store images locally

### Implementation

#### next.config.ts Configuration
```typescript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.nflximg.net',
      },
      {
        protocol: 'https',
        hostname: 'occ-0-*.nflximg.net',
      },
    ],
  },
}
```

#### Fallback Strategy
```typescript
// Handle image load errors gracefully
<Image
  src={movie.posterUrl}
  alt={movie.title}
  onError={(e) => {
    e.currentTarget.src = '/images/placeholder-movie.png'
  }}
  className="object-cover"
/>
```

### Image Sources Research
Netflix uses CDN URLs like:
- `https://occ-0-1190-1186.1.nflxso.net/...` (poster images)
- Images are dynamically generated with size parameters

**Note**: For production, consider using placeholder images or TMDB API as Netflix images may not be publicly accessible without authentication.

### Alternatives Considered
| Alternative | Rejected Because |
|-------------|------------------|
| Download images locally | Storage concerns, copyright issues |
| TMDB API integration | Additional complexity, API key management |
| Placeholder images only | Doesn't meet spec requirement for "actual movie data" |

---

## 4. Movie Data Structure

### Decision
Store movie data as TypeScript constants in `lib/data/movies.ts`.

### Rationale
- Static data enables static export (constitution principle IV)
- TypeScript provides type safety
- Easy to update and maintain
- No runtime API calls

### Data Extracted from Netflix (Nov 26, 2025)

Categories identified:
1. **Your Next Watch** (40+ movies)
2. **Suspenseful Movies** (40+ movies)
3. **New on Netflix** (40+ movies)
4. **Action Thriller Movies** (40+ movies)
5. **Award-Winning Movies** (40+ movies)
6. **Comedy Movies** (40+ movies)
7. **Action & Adventure Movies** (40+ movies)
8. **Crowd Pleasers** (40+ movies)
9. **Action Movies** (40+ movies)
10. **Thriller Movies** (40+ movies)
11. **Supernatural Horror Movies** (40+ movies)
12. **Spanish-Language Comedy Movies** (40+ movies)
13. **Blockbuster Movies** (40+ movies)
14. **Family Movies** (40+ movies)
15. **Movies Based on Real Life** (40+ movies)
16. **Romantic Movies** (40+ movies)
17. **Family Sci-Fi & Fantasy Movies** (40+ movies)

### Sample Movies with Badges
| Movie | Badges |
|-------|--------|
| Frankenstein | Recently Added, Top 10 |
| A Man Called Otto | Recently Added, Top 10 |
| KPop Demon Hunters | Top 10 |
| The Little Things | Recently Added |

---

## 5. Responsive Design Strategy

### Decision
Mobile-first approach with breakpoint-based carousel item counts.

### Rationale
- Follows modern responsive design best practices
- Matches Netflix's responsive behavior
- Uses Tailwind's built-in breakpoint system

### Breakpoint Configuration
```typescript
// Carousel item basis classes
const itemBasis = {
  mobile: 'basis-1/2',      // 2 items visible
  sm: 'sm:basis-1/3',       // 3 items visible
  md: 'md:basis-1/4',       // 4 items visible
  lg: 'lg:basis-1/5',       // 5 items visible
  xl: 'xl:basis-1/6',       // 6 items visible
}
```

### Touch Interactions
- Swipe gestures enabled via Embla Carousel
- Touch-friendly navigation arrows (larger hit area on mobile)
- No hover states on touch devices

---

## 6. Accessibility Considerations

### Decision
Implement WCAG AA compliant dark theme with proper ARIA attributes.

### Rationale
- Constitution requires accessible components
- Dark theme needs careful contrast management
- Carousel needs keyboard navigation

### Implementation Requirements
- Contrast ratio ≥ 4.5:1 for text
- Keyboard navigation for carousel (arrow keys)
- Focus indicators visible on dark background
- Proper `aria-label` for navigation buttons
- Movie titles announced to screen readers

### Shadcn Carousel Accessibility
The Shadcn Carousel provides:
- `aria-roledescription="carousel"` on container
- `aria-roledescription="slide"` on items
- Keyboard navigation built-in
- Focus management

---

## Summary of Decisions

| Topic | Decision | Key Rationale |
|-------|----------|---------------|
| Carousel | Shadcn Carousel (Embla) | Official component, accessible, customizable |
| Theme | Netflix dark palette | User expectation, spec requirement |
| Images | External URLs + fallback | Static export compatible |
| Data | TypeScript constants | Type-safe, static export |
| Responsive | Mobile-first, Tailwind | Modern best practice |
| A11y | WCAG AA, Shadcn defaults | Constitution requirement |
