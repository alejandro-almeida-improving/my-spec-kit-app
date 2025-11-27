# Research: Netflix-Style Movie Catalog Page

**Feature**: 004-netflix-catalog-shadcn  
**Date**: 2025-11-26  
**Status**: Complete

## Research Tasks

### 1. Shadcn Carousel Component Best Practices

**Task**: Research best practices for Shadcn carousel in Next.js App Router context

**Decision**: Use Shadcn Carousel component with Embla Carousel engine

**Rationale**:
- Shadcn Carousel is built on Embla Carousel, a lightweight performant library
- Supports accessibility out of the box (keyboard navigation, ARIA)
- Works with Server Components (carousel container) + Client Components (interactive controls)
- Provides `CarouselPrevious` and `CarouselNext` components for navigation arrows
- Supports `opts` prop for customization (loop, align, slidesToScroll)

**Alternatives Considered**:
- Custom scroll implementation: Rejected - requires more JS, less accessible
- Swiper.js: Rejected - heavier bundle, not integrated with Shadcn

### 2. Dark Theme Implementation in Tailwind CSS 4

**Task**: Research dark theme patterns for Netflix-style aesthetic

**Decision**: Use CSS custom properties in globals.css with dark color scheme

**Rationale**:
- Tailwind CSS 4 uses native CSS layers and custom properties
- Set background to `#141414` (Netflix dark) via CSS variable or direct utility
- Use `text-white` and `text-gray-*` for text hierarchy
- Button accent color `#E50914` (Netflix red) via custom utility or direct value

**Alternatives Considered**:
- Tailwind `dark:` variant: Rejected - page is always dark, no toggle needed
- CSS-in-JS: Rejected - violates constitution (Tailwind preferred)

### 3. Static Data Loading in Next.js App Router

**Task**: Research pattern for loading static JSON in Server Components

**Decision**: Direct JSON import in Server Component or fetch from `public/`

**Rationale**:
- Server Components can directly import JSON files
- Data is bundled at build time for static generation
- No client-side fetch needed, reduces JavaScript bundle
- Alternative: `fs.readFileSync` for public data at build time

**Alternatives Considered**:
- Client-side fetch with SWR/React Query: Rejected - unnecessary for static data
- API routes: Rejected - overkill for static catalog

### 4. Image Optimization Strategy

**Task**: Research `next/image` configuration for movie posters

**Decision**: Use `next/image` with local images from `public/images/movies/`

**Rationale**:
- Images already downloaded to `public/images/movies/`
- `next/image` provides automatic WebP/AVIF conversion
- Set explicit width/height for poster aspect ratio (~16:9 based on Netflix thumbnails)
- Use `loading="lazy"` for below-fold images (default behavior)

**Alternatives Considered**:
- External image URLs with `remotePatterns`: Possible but local is faster
- Unoptimized images: Rejected - violates constitution principle IV

### 5. Responsive Carousel Configuration

**Task**: Research responsive behavior for varying screen widths

**Decision**: Use Tailwind responsive classes for card sizing + Embla responsive slides

**Rationale**:
- Card width adjusts with breakpoint classes (`w-32 sm:w-40 md:w-48 lg:w-56`)
- Embla Carousel auto-calculates slides per view based on container width
- Use `basis-1/3 md:basis-1/4 lg:basis-1/5` for CarouselItem sizing
- Navigation arrows appear on hover (CSS) or always visible on touch

**Alternatives Considered**:
- Fixed number of slides per breakpoint: More complex, less fluid
- CSS scroll-snap: Less accessible, no navigation arrows

### 6. Component Architecture

**Task**: Determine component composition for feature

**Decision**: Feature components in `components/movie-catalog/`, Shadcn in `components/ui/`

**Rationale**:
- Separation of concerns: UI primitives vs feature logic
- Feature components compose Shadcn primitives
- Server Component hierarchy with Client islands for interactivity
- `"use client"` only on components requiring browser APIs (carousel navigation)

**Alternatives Considered**:
- All in single file: Rejected - harder to test and maintain
- Atomic design structure: Rejected - overkill for single feature

## Resolved Clarifications

All Technical Context items resolved. No outstanding questions.

## Data Requirements

### Movie Data Structure (existing)

Current `movies.json` structure confirmed:
- 2 categories with 6 movies each
- Movie fields: `title`, `imageUrl`, `slug`, `category`, `localImage`
- Need to expand to 6+ categories per FR-007

### Action Required

Expand `movies.json` to include additional categories:
- "New on Netflix"
- "Action Thriller Movies"
- "Award-Winning Movies"
- "Comedy Movies"
- "Action Movies"
- "Action & Adventure Movies"
- "Crowd Pleasers"
- "Family Movies"
- "Thriller Movies"
- "Blockbuster Movies"

## Dependencies to Install

```bash
npx shadcn@latest add carousel
npx shadcn@latest add card
npx shadcn@latest add button
```

## References

- [Shadcn Carousel Documentation](https://ui.shadcn.com/docs/components/carousel)
- [Embla Carousel API](https://www.embla-carousel.com/api/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
