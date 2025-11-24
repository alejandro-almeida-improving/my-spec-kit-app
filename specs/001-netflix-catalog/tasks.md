---
description: "Task list for the Netflix-style Movie Catalog Page feature"
---

# Tasks: Netflix-style Movie Catalog Page

**Input**: Design docs from `specs/001-netflix-catalog/` (plan.md, spec.md, data-model.md, research.md, quickstart.md)
**Prerequisites**: Next.js 16 App Router, Tailwind CSS 4, Swiper 12, lucide-react, Tailwind PostCSS plugin already wired via package.json

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Lock dependencies, provisioning, and verification guidance before the UI work begins.

- [x] T001 Review and adjust dependencies in `package.json` so the bundle includes Next.js 16, React 19, Tailwind CSS 4, Swiper 12, `lucide-react`, and the Shadcn primitives required by the plan while keeping the static `package-lock.json` in sync.
- [x] T003 [P] Update `specs/001-netflix-catalog/quickstart.md` to include the documented Playwright commands (`npx playwright test --config=playwright.config.ts --grep "hero|carousel|search"`) and explain the manual verification steps required before shipping.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared layout, global styles, and data helpers that every user story depends on.

- [x] T004 Replace `app/layout.tsx` with a Netflix-inspired root layout that sets the dark metadata, imports the Geist fonts, and applies the dark `body` classes used across the new components.
- [x] T005 Refresh `app/globals.css` so the global styles expose the dark theme tokens, reduced-motion rules, focus-visible outlines, and Tailwind layers that the hero, carousels, search, and modal components will rely on.
- [x] T006 [P] Create `app/components/header.tsx` containing the fictitious logo, condensed nav links (Home/Movies/Series/My List), and a placeholder slot for the search input that Story 3 will populate.
- [x] T007 [P] Create `app/components/footer.tsx` with Help/Terms/Privacy links, social icons, and a faux copyright notice while keeping 4.5:1 contrast.
- [x] T008 Implement `lib/movies.ts` with the `Movie` and `Category` types plus helper exports such as `getFeaturedMovies`, `getCategoryRows`, and `mapMoviesById` that read `data/movies.json` and surface the data needed by every interactive component.
- [x] T009 [P] Expand and normalize `data/movies.json` so there are dedicated Trending, New, Action, and Comedy categories with at least six movies each, hero `featured` flags (3–5 items), poster paths under `public/images/movies`, and fallback metadata for missing synopsis/tagline values.

---

## Phase 3: User Story 1 - Hero Discovery (Priority: P1) 🎯 MVP

**Goal**: Build the hero slider so visitors can manually navigate featured films with arrows, dots, and keyboard controls while preserving the static-first ethos.
**Independent Test**: Use `tests/hero.spec.ts` to tab into the slider, operate the navigation buttons or keyboard arrows, and verify the active indicator follows the current slide before running Playwright locally.

### Tests for User Story 1
- [x] T010 Create `tests/hero.spec.ts` to automate the Playwright hero journey described in the spec, run it with `npx playwright test --config=playwright.config.ts --grep "hero"`, and capture the acceptance criteria around arrows, dots, and focus.

### Implementation for User Story 1
- [x] T011 [P] [US1] Build `app/components/hero-carousel.tsx` as a `use client` component that consumes `getFeaturedMovies` from `lib/movies.ts`, renders Swiper slides with poster/title/tagline, exposes arrow/dot controls, pause toggle, `aria-live` slide announcement, and obeys `prefers-reduced-motion` plus keyboard focus outlines.
- [x] T012 [US1] Import `Header` and `HeroCarousel` into `app/page.tsx`, wrap them in the new `main` hero container, and ensure the page still renders server-side while wiring focus-visible contours around the hero controls.

---

## Phase 4: User Story 2 - Browse Category Carousels (Priority: P2)

**Goal**: Render horizontally scrollable category rows that reveal overlay actions on hover/focus and keep keyboard navigation within each row.
**Independent Test**: Use `tests/carousel.spec.ts` to scroll a row via wheel/keyboard, hover cards to reveal the overlay, and activate the “Watch details”/“Add to My List” buttons per the acceptance criteria.

### Tests for User Story 2
- [ ] T013 Create `tests/carousel.spec.ts` that walks through a carousel row, scrolls via wheel or keyboard, ensures overlays appear, and runs with `npx playwright test --config=playwright.config.ts --grep "carousel"` to prove compliance.

### Implementation for User Story 2
- [ ] T014 [P] [US2] Implement `app/components/carousel-row.tsx` as a client component powered by Swiper that renders each category title, enforces six cards per row, shows poster cards with the movie name, and overlays “Watch details”/“Add to My List” actions on hover/focus.
- [ ] T015 [US2] Update `app/page.tsx` to render all category rows using the new `CarouselRow` component, pass the proper movie collections, and keep the layout accessible by maintaining focus order inside each section.

---

## Phase 5: User Story 3 - Search and Placeholder Details (Priority: P3)

**Goal**: Add the accessible search/filter input plus the placeholder detail modal so visitors can discover titles and open the “Detail under construction” screen via keyboard or mouse.
**Independent Test**: Use `tests/search.spec.ts` to type a partial title, press Enter to confirm the remaining cards stay visible, and activate the “Watch details” button to surface the placeholder modal with the specified copy.

### Tests for User Story 3
- [ ] T016 Create `tests/search.spec.ts` that runs `npx playwright test --config=playwright.config.ts --grep "search"`, types a query, confirms filtering happens immediately, and opens the placeholder modal to assert the copy and focus behavior.

### Implementation for User Story 3
- [ ] T017 [P] [US3] Build `app/components/search-bar.tsx` as a client component with an accessible input, `aria-label`, `Enter` handling, and an emitted query string that the page can use to filter movie cards without server calls.
- [ ] T018 [P] [US3] Implement `app/components/detail-placeholder.tsx` as a client modal overlay that surfaces the movie title, synopsis, and a “Detail under construction” note while returning focus to the triggering card on close.
- [ ] T019 [US3] Wire the search bar and modal into `app/page.tsx`, keep the filtered movie list in sync with the category rows, and trigger `DetailPlaceholder` whenever a card’s “Watch details” control activates (keyboard and pointer flows).

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Wrap up documentation, tests, and manual verification across every story.

- [ ] T020 [P] Update `README.md` with the static-first narrative, the manual lint/build/playwright commands, and references to the Netflix aesthetic so future reviewers know how to verify without CI.
- [ ] T021 [P] Replace `tests/example.spec.ts` with a smoke check that confirms the reimagined landing page’s hero/carousel/search sections render, keeping the starter test aligned with the current UI.

---

## Dependencies & Execution Order

### Phase Dependencies
- Phase 1 (Setup) runs first and unlocks all subsequent work.
- Phase 2 (Foundational) depends on the setup phase and must finish before any story begins.
- Phase 3+ (User Stories 1, 2, 3) can start after the foundational phase; the stories themselves are independent but should be prioritized by their declared priority (P1 → P2 → P3).
- Phase N (Polish) depends on finishing the chosen stories so the docs/tests reflect the delivered UI.

### User Story Dependencies
- **US1 (Hero Discovery)**: Starts after Foundation; no dependencies on US2/US3.
- **US2 (Category Carousels)**: Starts after Foundation; can overlap with US1 work but may reference the hero layout.
- **US3 (Search & Placeholder)**: Starts after Foundation; reuses data helpers and carousel cards but remains independently testable.

### User Story Completion Graph
- US1 → US2 → US3 (reflects the recommended priority order), though each story is independently deployable once the shared foundation is ready.

## Parallel Execution Examples
- **US1**: Writing `tests/hero.spec.ts` (T010) and building `hero-carousel.tsx` (T011) can run in parallel once the data helpers exist, and the Playwright run can execute after the component is in place.
- **US2**: The carousel component (T014) and the Playwright carousel spec (T013) can be implemented and run in parallel with the hero story because they target different files, while the `app/page.tsx` wiring (T015) waits for the component to be ready.
- **US3**: The search bar and modal components (T017/T018) are two separate files and can be developed simultaneously before wiring them into `app/page.tsx` (T019); running `tests/search.spec.ts` (T016) happens once the components exist.

## Implementation Strategy
- **MVP First**: Deliver Phase 1 & 2 plus User Story 1 (hero) first, verify via `tests/hero.spec.ts`, then pause to confirm the hero experience independently before adding more stories.
- **Incremental Delivery**: After the MVP hero story is working, tackle US2 then US3 in priority order, running the corresponding Playwright spec for each story and verifying the shared foundation before moving on.
- **Parallel Paths**: Multiple developers can work on hero, carousel, and search components concurrently after the foundational phase because each story touches different components and tests.