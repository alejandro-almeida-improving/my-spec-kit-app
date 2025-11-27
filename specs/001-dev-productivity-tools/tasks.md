# Tasks: Developer Productivity Tools

**Feature**: Developer Productivity Tools
**Status**: Pending
**Spec**: [spec.md](./spec.md)

## Phase 1: Setup
*Project initialization and dependencies*

- [x] T001 Install dependencies: `date-fns`, `lorem-ipsum`
- [x] T002 Install Shadcn UI components: `sidebar`, `sonner`, `card`, `input`, `button`, `select`, `textarea`, `label`, `tabs`
- [x] T003 Create `lib/types.ts` with interfaces from `contracts/interfaces.ts`
- [x] T004 Create `lib/tools-config.ts` with tool definitions and metadata

## Phase 2: Foundational
*Blocking prerequisites for all user stories*

- [x] T005 Create `components/app-sidebar.tsx` with `Sidebar` structure
- [x] T006 Update `app/layout.tsx` to include `Toaster`
- [x] T007 Create `app/(dashboard)/layout.tsx` with `SidebarProvider` and `AppSidebar`
- [x] T008 Remove default `app/page.tsx` to avoid conflict with `(dashboard)/page.tsx`

## Phase 3: User Story 1 - App Navigation & Dashboard
*Goal: Central dashboard and navigation menu*
*Independent Test: Verify landing page lists all tools and navigation links work*

- [x] T009 [US1] Implement Sidebar navigation links in `components/app-sidebar.tsx`
- [x] T010 [US1] Create `app/(dashboard)/page.tsx` with grid of tool cards
- [x] T011 [US1] Create Playwright test for navigation in `tests/navigation.spec.ts`

## Phase 4: User Story 2 - Text Transformation Tools
*Goal: Convert text cases and generate placeholder text*
*Independent Test: Verify Case Converter and Lorem Generator pages*

- [x] T012 [P] [US2] Create `app/tools/case-converter/page.tsx`
- [x] T013 [P] [US2] Implement Case Converter logic (using `lib/utils.ts` if needed) and UI
- [x] T014 [P] [US2] Create `app/tools/lorem-generator/page.tsx`
- [x] T015 [P] [US2] Implement Lorem Generator logic (using `lorem-ipsum`) and UI
- [x] T016 [US2] Create Playwright test for text tools in `tests/text-tools.spec.ts`

## Phase 5: User Story 3 - Encoding & Decoding Tools
*Goal: Encode and decode Base64 strings and URLs*
*Independent Test: Verify Base64 and URL Encoder pages*

- [x] T017 [P] [US3] Create `app/tools/base64-converter/page.tsx`
- [x] T018 [P] [US3] Implement Base64 Converter logic and UI
- [x] T019 [P] [US3] Create `app/tools/url-encoder/page.tsx`
- [x] T020 [P] [US3] Implement URL Encoder logic and UI
- [x] T021 [US3] Create Playwright test for encoding tools in `tests/encoding-tools.spec.ts`

## Phase 6: User Story 4 - Identification & Security Tools
*Goal: Generate UUIDs and calculate hashes*
*Independent Test: Verify UUID Generator and Hash Generator pages*

- [x] T022 [P] [US4] Create `app/tools/uuid-generator/page.tsx`
- [x] T023 [P] [US4] Implement UUID Generator logic (using `crypto.randomUUID`) and UI
- [x] T024 [P] [US4] Create `app/tools/hash-generator/page.tsx`
- [x] T025 [P] [US4] Implement Hash Generator logic (using `crypto.subtle`) and UI
- [x] T026 [US4] Create Playwright test for security tools in `tests/security-tools.spec.ts`

## Phase 7: User Story 5 - Conversion Tools
*Goal: Convert timestamps and number bases*
*Independent Test: Verify Timestamp and Number Base Converter pages*

- [x] T027 [P] [US5] Create `app/tools/timestamp-converter/page.tsx`
- [x] T028 [P] [US5] Implement Timestamp Converter logic (using `date-fns`) and UI
- [x] T029 [P] [US5] Create `app/tools/number-base-converter/page.tsx`
- [x] T030 [P] [US5] Implement Number Base Converter logic and UI
- [x] T031 [US5] Create Playwright test for conversion tools in `tests/conversion-tools.spec.ts`

## Phase 8: Polish & Cross-Cutting Concerns
*Final polish and verification*

- [x] T032 Verify all Toast notifications for success/error states
- [x] T033 Check accessibility (tab order, labels) across all tools
- [x] T034 Run full test suite and verify all tests pass

## Dependencies

- **Phase 1 & 2** are prerequisites for all other phases.
- **Phase 3** (Navigation) is required for easy access to tools, but tools (Phases 4-7) can be developed independently if accessed via direct URL.
- **Phases 4, 5, 6, 7** are independent of each other and can be executed in parallel.

## Parallel Execution Examples

- **Team A** can work on **Phase 4 (Text Tools)** while **Team B** works on **Phase 5 (Encoding Tools)**.
- Within **Phase 4**, one developer can build **Case Converter** while another builds **Lorem Generator**.

## Implementation Strategy

1.  **MVP Scope**: Complete Phases 1, 2, and 3 to establish the shell.
2.  **Incremental Delivery**: Deliver one set of tools (one Phase) at a time.
3.  **Testing**: Write and run Playwright tests for each story as it is completed.
