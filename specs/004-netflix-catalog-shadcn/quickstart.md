# Quickstart: Netflix-Style Movie Catalog Page

**Feature**: 004-netflix-catalog-shadcn  
**Date**: 2025-11-26

## Prerequisites

- Node.js 18+ installed
- npm (comes with Node.js)
- Git

## Setup

### 1. Clone and Install

```bash
# Navigate to project
cd /Users/user/github-improving/my-spec-kit-app

# Ensure on feature branch
git checkout 004-netflix-catalog-shadcn

# Install dependencies
npm install
```

### 2. Install Shadcn Components

```bash
# Install required Shadcn UI components
npx shadcn@latest add carousel
npx shadcn@latest add card
npx shadcn@latest add button
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the movie catalog.

## Project Structure

```
my-spec-kit-app/
├── app/
│   ├── layout.tsx       # Root layout with dark theme
│   ├── page.tsx         # Movie catalog page
│   └── globals.css      # Dark theme styles
├── components/
│   ├── ui/              # Shadcn components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── carousel.tsx
│   └── movie-catalog/   # Feature components
│       ├── navbar.tsx
│       ├── page-header.tsx
│       ├── category-row.tsx
│       └── movie-card.tsx
├── lib/
│   └── utils.ts         # cn() utility
├── public/
│   ├── data/
│   │   └── movies.json  # Movie catalog data
│   └── images/
│       └── movies/      # Movie poster images
└── tests/
    └── movie-catalog.spec.ts
```

## Key Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Playwright E2E tests |

## Development Workflow

1. **Components**: Build components in `components/movie-catalog/`
2. **Styling**: Use Tailwind utilities, dark theme colors
3. **Data**: Modify `public/data/movies.json` for content changes
4. **Testing**: Write tests in `tests/movie-catalog.spec.ts`

## Color Palette

| Color | Value | Usage |
|-------|-------|-------|
| Background | `#141414` | Page background |
| Text Primary | `#FFFFFF` | Headings, titles |
| Text Secondary | `#B3B3B3` | Descriptions |
| Accent (Red) | `#E50914` | Buttons, highlights |
| Card Background | `#181818` | Movie cards |

## Testing

```bash
# Run all tests
npm run test

# Run with UI
npx playwright test --ui

# Run specific test file
npx playwright test tests/movie-catalog.spec.ts
```

## Troubleshooting

### Images not loading
- Verify images exist in `public/images/movies/`
- Check `localImage` paths in `movies.json` start with `/images/movies/`

### Carousel not scrolling
- Ensure Shadcn carousel is installed: `npx shadcn@latest add carousel`
- Verify `"use client"` directive on carousel component

### Dark theme not applying
- Check `globals.css` has dark background styles
- Verify no conflicting Tailwind classes

## References

- [Feature Specification](./spec.md)
- [Implementation Plan](./plan.md)
- [Data Model](./data-model.md)
- [Shadcn UI Docs](https://ui.shadcn.com)
- [Next.js App Router](https://nextjs.org/docs/app)
