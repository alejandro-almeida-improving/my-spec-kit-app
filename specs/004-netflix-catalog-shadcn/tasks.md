# Tasks: Netflix-Style Movie Catalog Page

**Input**: Design documents from `/specs/004-netflix-catalog-shadcn/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Playwright E2E tests after implementation (per constitution principle III)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

Based on plan.md structure:
- Pages: `app/`
- Components: `components/movie-catalog/` (feature), `components/ui/` (Shadcn)
- Types: `types/`
- Tests: `tests/`
- Static data: `public/data/`

---

## Phase 1: Setup

**Purpose**: Install dependencies and create base structure

- [X] T001 Install Shadcn Button component via `npx shadcn@latest add button`
- [X] T002 [P] Install Shadcn Card component via `npx shadcn@latest add card`
- [X] T003 [P] Install Shadcn Carousel component via `npx shadcn@latest add carousel`
- [X] T004 Create TypeScript interfaces in `types/movie.ts` (Movie, Category, CatalogData)
- [X] T005 [P] Update `app/globals.css` with dark theme colors (#141414 background, Netflix red #E50914)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core components and data that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Expand `public/data/movies.json` to include 6+ categories with 5-8 movies each (per FR-007)
- [X] T007 Create MovieCard component in `components/movie-catalog/movie-card.tsx` with poster image, title, optional badge
- [X] T008 Update `app/layout.tsx` with dark theme body classes and metadata

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Browse Movie Categories (Priority: P1) 🎯 MVP

**Goal**: Display movies organized by categories in horizontal carousels

**Independent Test**: Load page and verify multiple category sections appear with horizontally scrollable movie cards

### Implementation for User Story 1

- [X] T009 [US1] Create CategoryRow component in `components/movie-catalog/category-row.tsx` with category title and Shadcn Carousel
- [X] T010 [US1] Configure carousel to display movie cards with responsive sizing (`basis-1/3 md:basis-1/4 lg:basis-1/5`)
- [X] T011 [US1] Implement main catalog page in `app/page.tsx` that loads JSON data and renders CategoryRow for each category
- [X] T012 [US1] Add responsive card sizing with Tailwind breakpoint classes

**Checkpoint**: User Story 1 complete - page displays all category carousels with movie cards

---

## Phase 4: User Story 2 - Navigate Carousels (Priority: P1)

**Goal**: Arrow button navigation for carousels

**Independent Test**: Click "Next" arrow on any carousel and verify it scrolls to reveal more movies

### Implementation for User Story 2

- [X] T013 [US2] Add CarouselPrevious and CarouselNext buttons to CategoryRow in `components/movie-catalog/category-row.tsx`
- [X] T014 [US2] Style navigation arrows with Netflix aesthetic (visible on hover, positioned at edges)
- [X] T015 [US2] Configure carousel behavior: disable Previous at start, disable Next at end

**Checkpoint**: User Story 2 complete - all carousels have working navigation arrows

---

## Phase 5: User Story 3 - View Page Header (Priority: P2)

**Goal**: Display prominent page header with title and description

**Independent Test**: Load page and verify "Movies" heading and descriptive text appear at top

### Implementation for User Story 3

- [X] T016 [P] [US3] Create PageHeader component in `components/movie-catalog/page-header.tsx` with title and description props
- [X] T017 [US3] Integrate PageHeader into `app/page.tsx` with "Movies" title and descriptive subtitle

**Checkpoint**: User Story 3 complete - page header displays correctly

---

## Phase 6: User Story 4 - Access Navigation Bar (Priority: P2)

**Goal**: Display navigation bar with logo and action buttons

**Independent Test**: Verify logo and navigation links appear at top of page

### Implementation for User Story 4

- [X] T018 [P] [US4] Create Navbar component in `components/movie-catalog/navbar.tsx` with logo/brand name
- [X] T019 [US4] Add "Join Now" button (red #E50914) and "Sign In" link to Navbar
- [X] T020 [US4] Integrate Navbar into `app/layout.tsx` with fixed positioning at top

**Checkpoint**: User Story 4 complete - navigation bar is visible and styled correctly

---

## Phase 7: User Story 5 - Click on Movie Cards (Priority: P2)

**Goal**: Visual feedback on movie card hover (no click action per clarification)

**Independent Test**: Hover over movie card and verify scale/opacity effect

### Implementation for User Story 5

- [X] T021 [US5] Add hover states to MovieCard in `components/movie-catalog/movie-card.tsx` (scale, shadow, transition)
- [X] T022 [US5] Ensure hover effects work correctly within carousel context

**Checkpoint**: User Story 5 complete - movie cards have polished hover interactions

---

## Phase 8: User Story 6 - View Category Links (Priority: P3)

**Goal**: Category titles as clickable links

**Independent Test**: Click category title and verify navigation or link styling

### Implementation for User Story 6

- [X] T023 [US6] Update CategoryRow in `components/movie-catalog/category-row.tsx` to render title as Next.js Link
- [X] T024 [US6] Style category title links with hover underline effect (white text, underline on hover)

**Checkpoint**: User Story 6 complete - category titles are styled as clickable links

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements and testing

- [X] T025 [P] Add "Recently Added" badge display logic to MovieCard (per FR-012)
- [X] T026 [P] Verify responsive layout from 320px to 2560px (per SC-003)
- [X] T027 Run Lighthouse accessibility audit and fix issues to achieve score ≥80 (per SC-007)
- [X] T028 Write Playwright E2E tests in `tests/movie-catalog.spec.ts` covering acceptance scenarios
- [X] T029 Run quickstart.md validation - verify all setup steps work correctly
- [X] T030 Final visual review against Netflix catalog page aesthetic (per SC-006)

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1: Setup ──────────────────────────────────────────────────┐
                                                                  │
Phase 2: Foundational ───────────────────────────────────────────┼─► BLOCKS all user stories
                                                                  │
                    ┌─────────────────────────────────────────────┘
                    │
                    ▼
        ┌───────────────────────────────────────────────────────┐
        │  User Stories (can proceed in priority order or       │
        │  in parallel if team capacity allows)                 │
        │                                                       │
        │  Phase 3: US1 Browse Categories (P1) ──► MVP!         │
        │  Phase 4: US2 Navigate Carousels (P1)                 │
        │  Phase 5: US3 Page Header (P2)                        │
        │  Phase 6: US4 Navigation Bar (P2)                     │
        │  Phase 7: US5 Movie Card Hover (P2)                   │
        │  Phase 8: US6 Category Links (P3)                     │
        └───────────────────────────────────────────────────────┘
                    │
                    ▼
        Phase 9: Polish & Cross-Cutting ─────────────────────────►
```

### User Story Independence

| Story | Can Start After | Independent Test |
|-------|-----------------|------------------|
| US1 (P1) | Phase 2 | Page shows categories with scrollable carousels |
| US2 (P1) | Phase 2 (or after US1 for integrated arrows) | Arrow buttons scroll carousels |
| US3 (P2) | Phase 2 | Page header displays correctly |
| US4 (P2) | Phase 2 | Navbar visible at top |
| US5 (P2) | Phase 2 | Hover effects on cards |
| US6 (P3) | Phase 2 | Category titles are links |

### Parallel Opportunities

**Phase 1 (Setup):**
```bash
# Can run in parallel:
T002: Install Card component
T003: Install Carousel component
T005: Update globals.css dark theme
```

**Phase 3-8 (User Stories with [P] marker):**
```bash
# After Foundational phase, these can run in parallel:
T016: PageHeader component (US3)
T018: Navbar component (US4)
```

**Phase 9 (Polish):**
```bash
# Can run in parallel:
T025: Badge display logic
T026: Responsive verification
```

---

## Implementation Strategy

### MVP First (User Stories 1-2)

1. Complete Phase 1: Setup (install Shadcn components)
2. Complete Phase 2: Foundational (data, MovieCard, layout)
3. Complete Phase 3: User Story 1 - Browse Categories
4. Complete Phase 4: User Story 2 - Navigate Carousels
5. **STOP and VALIDATE**: Test carousels work correctly
6. Demo MVP: Page displays movies in scrollable carousels

### Full Feature Delivery

After MVP validation:
1. Phase 5: US3 - Page Header
2. Phase 6: US4 - Navigation Bar
3. Phase 7: US5 - Hover Effects
4. Phase 8: US6 - Category Links
5. Phase 9: Polish & Testing

---

## Notes

- All components use Shadcn primitives + Tailwind utilities per constitution
- Server Components by default; `"use client"` only on carousel navigation
- `next/image` for all poster images with lazy loading
- Static JSON data loaded at build time
- Tests written after implementation (per constitution principle III)
- Commit after each task or logical group
