# Implementation Plan: Netflix-style Movie Catalog Page

**Branch**: `[001-netflix-catalog]` | **Date**: 2025-11-24 | **Spec**: `specs/001-netflix-catalog/spec.md`
**Input**: Feature specification from `/specs/001-netflix-catalog/spec.md`

## Summary
Build the Next.js App Router landing page that mirrors the supplied Netflix mockup by combining a Tailwind/Shadcn-themed header, a Swiper-powered hero slider, horizontal carousels for each movie category, accessible search/filter behavior, and a placeholder detail modal. The page remains static-first via data pulled from `data/movies.json` and hydrates only the client components that drive interactivity (hero carousel, overlays, search, modal). Desktop and tablet views will favor the dark streaming aesthetic while respecting reduced-motion preferences and keyboard focus outlines for Playwright coverage.

## Technical Context
**Language/Version**: TypeScript 5 + Next.js 16.0.3 (App Router, static-first, Server Components by default; `page.tsx` remains a Server Component while interactive pieces mark `use client`).
**Primary Dependencies**: Next.js 16, React 19, Tailwind CSS 4, Shadcn UI primitives (buttons/inputs/overlays), Swiper 12 for the hero and carousel slides, `lucide-react` icons, `next/image` for optimized posters.
**Storage**: Static JSON catalog in `data/movies.json` served directly by the App Router.
**Testing**: Playwright 1.56 (manual/local runs post-implementation via `npx playwright test --config=playwright.config.ts --grep "hero|carousel|search"`), plus ESLint (`npm run lint`) and build (`npm run build`).
**Target Platform**: Static web (desktop/tabbed browsers, Chrome/Safari/Edge) rendered by Next.js with hydration limited to necessary Client Components.
**Project Type**: Web application (Single-page guide built inside `app/`).
**Performance Goals**: 60 fps slide transitions, 4.5:1 contrast, images optimized with `next/image`, <200 ms reaction for hero controls, simplified animations when `prefers-reduced-motion` is set.
**Constraints**: No backend or API calls; all interactions limited to Tailwind/Shadcn tooling; Playwright-only testing with no CI; hero/category interactions must be keyboard/assistive friendly with focus-visible states; movie data filtered client-side without extra fetches.
**Scale/Scope**: One static Netflix-style catalog screen combining 3–5 featured hero picks plus four category carousels, search/filter, overlay actions, and footer.

## Constitution Check
- **Static-first delivery**: `app/page.tsx` stays a Server Component reading from `data/movies.json`. The hero slider, overlays, search input, and placeholder detail panel are wrapped in dedicated Client Components (`use client`) so we control Swiper lifecycle and DOM interaction without compromising the static payload. No runtime data fetching or incremental rendering is introduced; Next.js statically renders the page and hydration only adds interactivity. Reference: Next.js App Router static generation guidance.
- **Tailwind + Shadcn**: The dark theme is achieved through Tailwind utilities while reusing the shared design tokens; new UI modules reuse Shadcn primitives for the header actions, cards, buttons, and modal overlays. Styling stays in `app/(components)` with utilities extending the shared theme (e.g., `bg-zinc-950`, `text-zinc-50`, `shadow` tokens).
- **Playwright journeys**: Manual Playwright tests cover (1) hero navigation with arrow/dot controls and focus/keyboard, (2) carousel scrolling and card overlays revealing action buttons, (3) search input filtering DOM cards with a fallback message, and (4) placeholder detail view opened via keyboard/enter on “Watch details.” Tests run locally after implementation using `npm run lint`, `npm run build`, and `npx playwright test --config=playwright.config.ts --grep "hero|carousel|search"` to keep within the Playwright-only rule.
- **Accessibility/performance**: The UI enforces focus-visible rings, `aria-live` for slide indicator updates, `prefers-reduced-motion` toggles for Swiper transitions, and contrast checks (header/footer text at 4.5:1). Images use `next/image` for sizing/priority hints. These expectations are captured in `research.md` and revalidated via manual Playwright verification.
- **Manual verification docs**: `quickstart.md` and the root `README.md` will document the commands (`npm run lint`, `npm run build`, `npx playwright test --config=playwright.config.ts --grep "hero|carousel|search"`) and note that Playwright tests run only after the UI ships, in accordance with the constitution’s local governance clause.

## Project Structure

```text
app/
├── layout.tsx              # global dark theme and metadata abiding by App Router conventions
├── page.tsx                # Hero, carousels, search, footer wired to data/movies.json
├── components/
│   ├── hero-carousel.tsx   # Swiper hero (client) with arrows, dots, pause toggle, accessible labels
│   ├── carousel-row.tsx     # Horizontal Swiper rows for categories with hover overlays
│   ├── search-bar.tsx       # Client search input that filters client-side movie cards
│   └── detail-placeholder.tsx # Keyboard/mouse accessible modal overlay for placeholders
data/
├── movies.json             # Static catalog and category definitions consumed by app/page
lib/
├── movies.ts               # Helpers to shape data (featured list, categories, search results)
public/
├── images/movies/          # Movie posters referenced by Swiper slides
tests/
├── example.spec.ts         # Existing Playwright harness that will target hero/category/search flows
mockups/
├── netflix-movies.png      # Visual reference for spacing, palette, layout for designers
```

**Structure Decision**: We keep the default Next.js App Router layout (`app/`) and add reusable UI modules inside `app/components` so the hero, carousels, search, and detail overlay can be independently hydrated while the page skeleton remains a Server Component. `data/movies.json` serves as the single source of truth for featured and category groupings, and `lib/movies.ts` will contain transformation helpers (e.g., filter logic, category builders). `public/images/movies` already hosts the poster assets, so we continue referencing them with `next/image`. Playwright tests live under `tests/` as specified by the repository; they target the hero/carousel/search stories after the UI is delivered.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | --- | --- |# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

