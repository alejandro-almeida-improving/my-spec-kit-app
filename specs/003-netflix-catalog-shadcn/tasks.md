# Tasks: Netflix-Style Movie Catalog with Shadcn

**Input**: Design documents from `/specs/003-netflix-catalog-shadcn/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Not explicitly requested in feature specification - test tasks omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Based on plan.md, this is a Next.js App Router web application:
- `app/` - Next.js App Router pages and layouts
- `components/ui/` - Shadcn UI primitives
- `components/movie-catalog/` - Feature-specific components
- `lib/data/` - Static data and types
- `tests/` - Playwright E2E tests

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and Shadcn component installation

- [X] T001 Configure dark theme CSS variables in app/globals.css
- [X] T002 [P] Install Shadcn Carousel component via `npx shadcn@latest add carousel`
- [X] T003 [P] Install Shadcn Card component via `npx shadcn@latest add card`
- [X] T004 [P] Install Shadcn Badge component via `npx shadcn@latest add badge`
- [X] T005 Update next.config.ts for static export and image configuration

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data types and movie data that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Create TypeScript interfaces for Movie, Category, and CatalogData in lib/data/types.ts
- [X] T007 Create static movie catalog data with all 7 categories in lib/data/movies.ts
- [X] T008 Update app/layout.tsx with dark theme body styling

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Browse Movie Categories (Priority: P1) 🎯 MVP

**Goal**: Display movies organized by categories with page header

**Independent Test**: Load the page and verify movie categories display with movie thumbnails within each category section.

### Implementation for User Story 1

- [X] T009 [US1] Create CatalogHeader component in components/movie-catalog/catalog-header.tsx
- [X] T010 [US1] Create MovieCard component (basic version - poster + title only) in components/movie-catalog/movie-card.tsx
- [X] T011 [US1] Create CategoryHeader component in components/movie-catalog/category-header.tsx
- [X] T012 [US1] Create CategoryRow component (basic grid/list layout) in components/movie-catalog/category-row.tsx
- [X] T013 [US1] Implement main catalog page with all categories in app/page.tsx

**Checkpoint**: User Story 1 complete - Page displays header, categories, and movie thumbnails

---

## Phase 4: User Story 2 - Navigate Movies Using Carousel (Priority: P1)

**Goal**: Enable horizontal carousel navigation within each category

**Independent Test**: Click carousel navigation arrows and verify movie thumbnails scroll horizontally to reveal more content.

### Implementation for User Story 2

- [X] T014 [US2] Enhance CategoryRow to use Shadcn Carousel component in components/movie-catalog/category-row.tsx
- [X] T015 [US2] Configure carousel with align-start, no-loop, and responsive items-per-view in components/movie-catalog/category-row.tsx
- [X] T016 [US2] Style carousel Previous/Next buttons for Netflix-like appearance in components/movie-catalog/category-row.tsx

**Checkpoint**: User Story 2 complete - Carousels navigate horizontally with arrow controls

---

## Phase 5: User Story 3 - View Movie Thumbnails (Priority: P1)

**Goal**: Display consistent movie thumbnails with titles

**Independent Test**: Verify each movie card displays a poster image and movie title with consistent sizing.

### Implementation for User Story 3

- [X] T017 [US3] Enhance MovieCard with next/image for optimized poster images in components/movie-catalog/movie-card.tsx
- [X] T018 [US3] Add image error handling with placeholder fallback in components/movie-catalog/movie-card.tsx
- [X] T019 [US3] Ensure consistent aspect ratio (16:9) and sizing across all movie cards in components/movie-catalog/movie-card.tsx

**Checkpoint**: User Story 3 complete - Movie thumbnails display consistently with titles and images

---

## Phase 6: User Story 4 - Responsive Dark Theme Experience (Priority: P2)

**Goal**: Netflix-style dark theme with proper color contrast

**Independent Test**: Load the page and verify dark background with light text matching Netflix's color scheme.

### Implementation for User Story 4

- [X] T020 [US4] Apply Netflix color palette variables to all components in app/globals.css
- [X] T021 [US4] Style page background and text colors for WCAG AA compliance in app/globals.css
- [X] T022 [US4] Style category headers with white text and proper contrast in components/movie-catalog/category-header.tsx

**Checkpoint**: User Story 4 complete - Dark theme applied with Netflix-style appearance

---

## Phase 7: User Story 5 - Click on Category Headers (Priority: P2)

**Goal**: Clickable category headers with visual feedback

**Independent Test**: Click a category header link and verify navigation or visual interaction occurs.

### Implementation for User Story 5

- [X] T023 [US5] Add link wrapper to CategoryHeader component in components/movie-catalog/category-header.tsx
- [X] T024 [US5] Add hover styles (cursor, underline, color change) to category headers in components/movie-catalog/category-header.tsx

**Checkpoint**: User Story 5 complete - Category headers are clickable with hover feedback

---

## Phase 8: User Story 6 - Badge Indicators on Movies (Priority: P3)

**Goal**: Display Top 10 and Recently Added badges on relevant movies

**Independent Test**: Verify movies with special status display appropriate badge indicators.

### Implementation for User Story 6

- [X] T025 [US6] Create MovieBadge component with badge type styling in components/movie-catalog/movie-badge.tsx
- [X] T026 [US6] Integrate MovieBadge into MovieCard component in components/movie-catalog/movie-card.tsx
- [X] T027 [US6] Style Top 10 badge (red #e50914) and Recently Added badge (green #46d369) in components/movie-catalog/movie-badge.tsx

**Checkpoint**: User Story 6 complete - Badges display on relevant movie cards

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements and validation

- [X] T028 [P] Add responsive breakpoints for mobile/tablet/desktop viewports in components/movie-catalog/category-row.tsx
- [X] T029 [P] Add touch/swipe gesture support verification for mobile carousels
- [X] T030 Validate page against quickstart.md test scenarios
- [X] T031 Performance check - verify page load < 3 seconds, carousel navigation < 200ms

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-8)**: All depend on Foundational phase completion
- **Polish (Phase 9)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after US1 (needs CategoryRow to enhance)
- **User Story 3 (P1)**: Can start after US1 (needs MovieCard to enhance)
- **User Story 4 (P2)**: Can start after Foundational - Independent styling tasks
- **User Story 5 (P2)**: Can start after US1 (needs CategoryHeader to enhance)
- **User Story 6 (P3)**: Can start after US3 (needs MovieCard to add badges to)

### Parallel Opportunities

- **Phase 1**: T002, T003, T004 can run in parallel (different Shadcn component installs)
- **Phase 3+**: US2, US3, US4 can start in parallel once US1 creates base components
- **Phase 9**: T028, T029 can run in parallel

---

## Parallel Example: Setup Phase

```bash
# Launch all Shadcn installs together:
Task: "Install Shadcn Carousel component via npx shadcn@latest add carousel"
Task: "Install Shadcn Card component via npx shadcn@latest add card"
Task: "Install Shadcn Badge component via npx shadcn@latest add badge"
```

## Parallel Example: User Stories 2, 3, 4

```bash
# After User Story 1 completes, launch in parallel:
Task: "Enhance CategoryRow to use Shadcn Carousel component" (US2)
Task: "Enhance MovieCard with next/image for optimized poster images" (US3)
Task: "Apply Netflix color palette variables to all components" (US4)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (install Shadcn components, configure theme)
2. Complete Phase 2: Foundational (create types and movie data)
3. Complete Phase 3: User Story 1 (basic catalog with categories)
4. **STOP and VALIDATE**: Page displays categories with movie thumbnails
5. Deploy/demo if ready - this is a functional MVP

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Basic catalog display → Deploy/Demo (MVP!)
3. Add User Story 2 → Carousel navigation → Deploy/Demo
4. Add User Story 3 → Polished thumbnails → Deploy/Demo
5. Add User Story 4 → Dark theme polish → Deploy/Demo
6. Add User Story 5 → Clickable headers → Deploy/Demo
7. Add User Story 6 → Badge indicators → Deploy/Demo (Feature Complete!)

### Suggested MVP Scope

**MVP = Phase 1 + Phase 2 + Phase 3 (User Story 1)**

This delivers:
- Page header with "Movies" title
- 7 movie categories displayed
- Movie thumbnails with titles
- Basic dark theme

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Movie data includes 7+ categories with 15-20 movies each per data-model.md
