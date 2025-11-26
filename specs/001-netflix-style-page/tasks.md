# Tasks: Netflix Style Page

**Input**: Design documents from `/specs/001-netflix-style-page/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Playwright tests included as per plan.md.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Install Shadcn UI components (carousel, card, button) in `components/ui/`
- [x] T002 [P] Install lucide-react dependency in `package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Define Movie and Category interfaces in `lib/data.ts`
- [x] T004 [P] Implement mock data generation in `lib/data.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Landing Page (Priority: P1) 🎯 MVP

**Goal**: Display a visually appealing landing page with a hero section and content categories.

**Independent Test**: Verify presence of hero section and at least one content row with mock data.

### Tests for User Story 1

- [x] T005 [P] [US1] Create Playwright test for landing page visibility in `tests/landing-page.spec.ts`

### Implementation for User Story 1

- [x] T006 [P] [US1] Create Hero component in `components/hero.tsx`
- [x] T007 [P] [US1] Create MovieCard component in `components/movie-card.tsx`
- [x] T008 [US1] Create ContentRow component structure in `components/content-row.tsx`
- [x] T009 [US1] Implement main page layout with Hero and Rows in `app/page.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Browse Content Carousels (Priority: P1)

**Goal**: Enable horizontal scrolling through lists of movies in each category.

**Independent Test**: Verify carousel navigation (next/prev) and hover effects.

### Tests for User Story 2

- [x] T010 [P] [US2] Create Playwright test for carousel interaction in `tests/carousel.spec.ts`

### Implementation for User Story 2

- [x] T011 [US2] Implement Shadcn Carousel logic in `components/content-row.tsx`
- [x] T012 [P] [US2] Add hover interactions and visual feedback to `components/movie-card.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Responsive Layout (Priority: P2)

**Goal**: Ensure the page looks good on both desktop and mobile devices.

**Independent Test**: Verify layout adjustments and carousel item counts on different viewports.

### Tests for User Story 3

- [x] T013 [P] [US3] Create Playwright test for responsive layout in `tests/responsive.spec.ts`

### Implementation for User Story 3

- [x] T014 [US3] Configure responsive breakpoints for Carousel in `components/content-row.tsx`
- [x] T015 [US3] Adjust Hero component styles for mobile in `components/hero.tsx`
- [x] T016 [US3] Adjust global header and layout for mobile in `app/page.tsx`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T017 [P] Verify accessibility (Lighthouse) and fix issues in `app/page.tsx`
- [x] T018 [P] Ensure consistent styling across all components in `components/`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Extends US1 components
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Refines US1/US2 components

### Parallel Opportunities

- Setup tasks T001 and T002 can run in parallel.
- Foundational tasks T003 and T004 can run in parallel.
- Once Foundational is done, US1, US2, and US3 implementation tasks can theoretically proceed in parallel, though US2 and US3 modify components created in US1.
- Tests (T005, T010, T013) can be written in parallel with implementation.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Complete Phase 3 (US1).
3. Validate US1.
4. Deploy MVP.

### Incremental Delivery

1. Complete Setup + Foundational.
2. Add US1 (View Page) -> Validate.
3. Add US2 (Carousel Interaction) -> Validate.
4. Add US3 (Responsive) -> Validate.
