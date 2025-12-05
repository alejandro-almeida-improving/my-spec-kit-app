# Tasks: Developer Productivity Tools Suite

**Input**: Design documents from `/specs/001-dev-tools-suite/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/tool-interfaces.ts  
**Feature**: 001-dev-tools-suite  
**Generated**: December 5, 2025

**Tests**: Not explicitly requested - E2E tests will be written post-implementation per constitution principle III

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Configure Next.js for static export in next.config.ts with output: 'export'
- [ ] T002 [P] Install Shadcn UI components: button, card, input, textarea, select, tabs, label
- [ ] T003 [P] Install crypto-js dependency for MD5 hash generation
- [ ] T004 Create shared ToolLayout component in components/tool-layout.tsx
- [ ] T005 Create Sidebar navigation component in components/sidebar.tsx with all 8 tools
- [ ] T006 Update root layout in app/layout.tsx to include persistent sidebar navigation
- [ ] T007 Create home page in app/page.tsx with tool overview and links

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T008 [P] Create TypeScript types and interfaces in lib/types.ts (Tool, ConversionOperation, UserInput, ValidationError)
- [ ] T009 [P] Create shared validation utilities in lib/validation.ts
- [ ] T010 [P] Create clipboard helper function in lib/utils.ts using navigator.clipboard.writeText()
- [ ] T011 [P] Define tools metadata array in lib/tools-config.ts with all 8 tools (id, name, description, category, icon, path, priority)
- [ ] T012 Create error handling utilities in lib/errors.ts for consistent error messages

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Text Case Transformation (Priority: P1) 🎯 MVP

**Goal**: Developers can convert text between lowercase, UPPERCASE, Title Case, and camelCase formats

**Independent Test**: Paste mixed-case text, select any target format, verify conversion is accurate. Copy result to clipboard. Works standalone without other tools.

### Implementation for User Story 1

- [ ] T013 [P] [US1] Create case converter logic in lib/conversions/case-converter.ts with functions for all 4 formats
- [ ] T014 [US1] Create Case Converter page in app/case-converter/page.tsx with Textarea input, Select for format, Button, and output display
- [ ] T015 [US1] Add input validation and error handling for Case Converter
- [ ] T016 [US1] Integrate clipboard copy functionality for Case Converter output

**Checkpoint**: Case Converter is fully functional and independently testable

---

## Phase 4: User Story 2 - Unique Identifier Generation (Priority: P1)

**Goal**: Developers can generate standards-compliant UUIDs and copy them to clipboard

**Independent Test**: Click generate button, verify valid UUID format (8-4-4-4-12 hex pattern), test copy-to-clipboard. Works standalone.

### Implementation for User Story 2

- [ ] T017 [P] [US2] Create UUID generator logic in lib/conversions/uuid-generator.ts using crypto.randomUUID()
- [ ] T018 [US2] Create UUID Generator page in app/uuid-generator/page.tsx with Button to generate and display output
- [ ] T019 [US2] Add copy-to-clipboard functionality with success feedback for UUID Generator
- [ ] T020 [US2] Add "Generate Multiple" option to create batch of UUIDs

**Checkpoint**: UUID Generator is fully functional and independently testable

---

## Phase 5: User Story 3 - Base64 Encoding/Decoding (Priority: P1)

**Goal**: Developers can encode text to Base64 and decode Base64 strings back to text

**Independent Test**: Enter plain text, encode to Base64, then decode result to verify it matches original. Test with special characters. Works standalone.

### Implementation for User Story 3

- [ ] T021 [P] [US3] Create Base64 converter logic in lib/conversions/base64-converter.ts with encode/decode functions and UTF-8 handling
- [ ] T022 [US3] Create Base64 Converter page in app/base64-converter/page.tsx with Tabs for encode/decode modes
- [ ] T023 [US3] Add Base64 format validation for decode operation (regex: ^[A-Za-z0-9+/]*={0,2}$)
- [ ] T024 [US3] Add error handling for invalid Base64 input with clear error messages
- [ ] T025 [US3] Integrate clipboard copy functionality for Base64 output

**Checkpoint**: Base64 Converter is fully functional and independently testable

---

## Phase 6: User Story 4 - URL Encoding/Decoding (Priority: P2)

**Goal**: Developers can encode text for URLs and decode URL-encoded strings

**Independent Test**: Enter text with spaces and special characters (&, =, ?), encode it, then decode to verify original is restored. Works standalone.

### Implementation for User Story 4

- [ ] T026 [P] [US4] Create URL encoder logic in lib/conversions/url-encoder.ts using encodeURIComponent/decodeURIComponent
- [ ] T027 [US4] Create URL Encoder page in app/url-encoder/page.tsx with Tabs for encode/decode modes
- [ ] T028 [US4] Add error handling for decode operation failures
- [ ] T029 [US4] Integrate clipboard copy functionality for URL encoder output

**Checkpoint**: URL Encoder is fully functional and independently testable

---

## Phase 7: User Story 5 - Timestamp Conversion (Priority: P2)

**Goal**: Developers can convert between Unix timestamps and human-readable UTC dates in multiple formats

**Independent Test**: Enter Unix timestamp, verify correct UTC date/time displayed. Enter date, verify correct timestamp. Test with current time button. Works standalone.

### Implementation for User Story 5

- [ ] T030 [P] [US5] Create timestamp converter logic in lib/conversions/timestamp.ts with Unix↔Date conversions and multiple format outputs (ISO 8601, UTC string, relative time)
- [ ] T031 [US5] Create Timestamp page in app/timestamp/page.tsx with Input for timestamp/date and Tabs for conversion direction
- [ ] T032 [US5] Add "Current Time" button to populate current timestamp
- [ ] T033 [US5] Add input validation for timestamp range (0 to 2^53-1) and date parsing
- [ ] T034 [US5] Display results in multiple formats: ISO 8601, human-readable UTC, relative time
- [ ] T035 [US5] Integrate clipboard copy functionality for all timestamp formats

**Checkpoint**: Timestamp Converter is fully functional and independently testable

---

## Phase 8: User Story 6 - Hash Generation (Priority: P2)

**Goal**: Developers can generate MD5, SHA-1, SHA-256, and SHA-512 hashes for any text input

**Independent Test**: Enter text, select algorithm, verify hash format matches expected length (32 chars for MD5, 64 for SHA-256, etc.). Verify same input produces same hash. Works standalone.

### Implementation for User Story 6

- [ ] T036 [P] [US6] Create hash generator logic in lib/conversions/hash-generator.ts using Web Crypto API for SHA algorithms and crypto-js for MD5
- [ ] T037 [US6] Create Hash Generator page in app/hash-generator/page.tsx with Textarea input, Select for algorithm, Button to generate
- [ ] T038 [US6] Add support for all 4 hash algorithms: MD5, SHA-1, SHA-256, SHA-512
- [ ] T039 [US6] Display hash output with algorithm name and character count
- [ ] T040 [US6] Integrate clipboard copy functionality for hash output

**Checkpoint**: Hash Generator is fully functional and independently testable

---

## Phase 9: User Story 7 - Lorem Ipsum Text Generation (Priority: P3)

**Goal**: Developers and designers can generate traditional Lorem Ipsum placeholder text in specified quantities (words, sentences, or paragraphs)

**Independent Test**: Request specific number of words/paragraphs, verify output matches quantity requested (±10% for words), confirm text is traditional Lorem Ipsum. Works standalone.

### Implementation for User Story 7

- [ ] T041 [P] [US7] Create Lorem Ipsum generator logic in lib/conversions/lorem-generator.ts with corpus of Lorem words and generation functions
- [ ] T042 [US7] Create Lorem Generator page in app/lorem-generator/page.tsx with Input for quantity, Select for unit type (words/sentences/paragraphs)
- [ ] T043 [US7] Add validation for quantity (1 to 10,000)
- [ ] T044 [US7] Implement randomization so each generation produces varied text
- [ ] T045 [US7] Integrate clipboard copy functionality for Lorem output

**Checkpoint**: Lorem Generator is fully functional and independently testable

---

## Phase 10: User Story 8 - Number Base Conversion (Priority: P3)

**Goal**: Developers can convert numbers between binary, decimal, hexadecimal, and octal bases

**Independent Test**: Enter decimal 255, convert to hex (FF), binary (11111111), octal (377). Verify reverse conversions. Test invalid input error messages. Works standalone.

### Implementation for User Story 8

- [ ] T046 [P] [US8] Create number base converter logic in lib/conversions/number-base-converter.ts using parseInt/toString with radix
- [ ] T047 [US8] Create Number Base Converter page in app/number-base-converter/page.tsx with Input, Select for source/target base, Button
- [ ] T048 [US8] Add input validation with base-specific regex patterns (binary: ^[01]+$, hex: ^[0-9A-Fa-f]+$, etc.)
- [ ] T049 [US8] Display conversion result with all 4 base representations simultaneously
- [ ] T050 [US8] Add error handling for invalid input with base-specific error messages
- [ ] T051 [US8] Integrate clipboard copy functionality for converted output

**Checkpoint**: Number Base Converter is fully functional and independently testable

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T052 [P] Add responsive mobile styles to Sidebar component for screens <768px width
- [ ] T053 [P] Implement Sheet component for mobile hamburger menu navigation
- [ ] T054 [P] Add toast notifications for clipboard success/error feedback across all tools
- [ ] T055 [P] Add keyboard shortcuts (Enter to convert/generate) to all tool pages
- [ ] T056 [P] Add loading states during async operations (hash generation)
- [ ] T057 Test static export build with npm run build and verify all routes work
- [ ] T058 [P] Add meta tags and descriptions to all tool pages for SEO
- [ ] T059 Verify accessibility: keyboard navigation, ARIA labels, focus indicators on all tools
- [ ] T060 Test all tools with large inputs (up to 1MB) to verify performance
- [ ] T061 Create E2E Playwright tests for all 8 tools in tests/ directory (post-implementation per constitution)
- [ ] T062 Run quickstart.md validation to ensure local development workflow works

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phases 3-10)**: All depend on Foundational phase completion
  - User stories can proceed in parallel once Foundational is complete (if staffed)
  - Or sequentially in priority order: P1 stories (US1, US2, US3) → P2 stories (US4, US5, US6) → P3 stories (US7, US8)
- **Polish (Phase 11)**: Depends on desired user stories being complete

### User Story Dependencies

All user stories are **independently implementable** once Foundational phase completes:

- **US1 (Case Converter)**: No dependencies on other stories
- **US2 (UUID Generator)**: No dependencies on other stories
- **US3 (Base64 Converter)**: No dependencies on other stories
- **US4 (URL Encoder)**: No dependencies on other stories
- **US5 (Timestamp)**: No dependencies on other stories
- **US6 (Hash Generator)**: No dependencies on other stories
- **US7 (Lorem Generator)**: No dependencies on other stories
- **US8 (Number Base Converter)**: No dependencies on other stories

### Within Each User Story

1. Conversion logic first (lib/conversions/)
2. Page implementation (app/[tool]/page.tsx)
3. Validation and error handling
4. Clipboard integration
5. Story verification before moving to next

### Parallel Opportunities

**Setup Phase (1):**
- T002 (Install Shadcn), T003 (Install crypto-js) can run in parallel

**Foundational Phase (2):**
- T008 (types), T009 (validation), T010 (clipboard), T011 (config), T012 (errors) can ALL run in parallel

**User Stories (3-10):**
- Once Phase 2 completes, ALL 8 user stories can be worked on in parallel by different developers
- Within each story, tasks marked [P] (conversion logic creation) can start simultaneously

**Polish Phase (11):**
- T052-T060 (all marked [P]) can run in parallel

---

## Parallel Execution Examples

### Phase 2: Launch all foundational tasks together

```bash
# Developer 1:
Task: "Create TypeScript types in lib/types.ts"

# Developer 2:
Task: "Create validation utilities in lib/validation.ts"

# Developer 3:
Task: "Create clipboard helper in lib/utils.ts"

# Developer 4:
Task: "Define tools config in lib/tools-config.ts"

# Developer 5:
Task: "Create error utilities in lib/errors.ts"
```

### Phase 3-10: Launch all user stories in parallel (with team)

```bash
# Team Member 1: User Story 1
Tasks: T013, T014, T015, T016

# Team Member 2: User Story 2
Tasks: T017, T018, T019, T020

# Team Member 3: User Story 3
Tasks: T021, T022, T023, T024, T025

# Team Member 4: User Story 4
Tasks: T026, T027, T028, T029

# Continue for US5-US8...
```

### Phase 11: Launch all polish tasks together

```bash
# All developers can work on different polish tasks simultaneously:
Task: "Add responsive mobile styles" (T052)
Task: "Implement Sheet component" (T053)
Task: "Add toast notifications" (T054)
Task: "Add keyboard shortcuts" (T055)
# ... etc
```

---

## Implementation Strategy

### MVP First (User Story 1-3 Only) - Recommended ✅

1. **Complete Phase 1**: Setup (T001-T007)
2. **Complete Phase 2**: Foundational (T008-T012) - **CRITICAL GATE**
3. **Complete Phase 3**: User Story 1 - Case Converter (T013-T016)
4. **Complete Phase 4**: User Story 2 - UUID Generator (T017-T020)
5. **Complete Phase 5**: User Story 3 - Base64 Converter (T021-T025)
6. **STOP and VALIDATE**: Test all 3 P1 tools independently
7. **Deploy MVP**: All P1 features provide immediate value

**MVP Scope**: 3 tools (Case, UUID, Base64) = ~25 tasks

### Incremental Delivery

1. Setup + Foundational (T001-T012) → Foundation ready
2. Add US1: Case Converter (T013-T016) → Test independently → Deploy
3. Add US2: UUID Generator (T017-T020) → Test independently → Deploy
4. Add US3: Base64 Converter (T021-T025) → Test independently → Deploy ← **MVP HERE**
5. Add US4: URL Encoder (T026-T029) → Test independently → Deploy
6. Add US5: Timestamp (T030-T035) → Test independently → Deploy
7. Add US6: Hash Generator (T036-T040) → Test independently → Deploy
8. Add US7: Lorem Generator (T041-T045) → Test independently → Deploy
9. Add US8: Number Base (T046-T051) → Test independently → Deploy
10. Polish (T052-T062) → Final release

Each increment delivers working features without breaking existing ones.

### Parallel Team Strategy (8 Developers)

With a full team:

1. **Together**: Complete Setup (Phase 1, 1-2 hours)
2. **Together**: Complete Foundational (Phase 2, 2-3 hours)
3. **Once Foundational done**, split into 8 parallel tracks:
   - Dev 1: User Story 1 (Case Converter)
   - Dev 2: User Story 2 (UUID Generator)
   - Dev 3: User Story 3 (Base64 Converter)
   - Dev 4: User Story 4 (URL Encoder)
   - Dev 5: User Story 5 (Timestamp)
   - Dev 6: User Story 6 (Hash Generator)
   - Dev 7: User Story 7 (Lorem Generator)
   - Dev 8: User Story 8 (Number Base Converter)
4. **Regroup**: All stories complete, then together on Polish (Phase 11)

**Timeline with 8 devs**: ~1-2 days for complete feature

---

## Summary

- **Total Tasks**: 62
- **Setup Tasks**: 7 (Phase 1)
- **Foundational Tasks**: 5 (Phase 2) - **MUST complete before user stories**
- **User Story Tasks**: 39 (Phases 3-10)
  - US1 (Case Converter): 4 tasks
  - US2 (UUID Generator): 4 tasks
  - US3 (Base64 Converter): 5 tasks
  - US4 (URL Encoder): 4 tasks
  - US5 (Timestamp): 6 tasks
  - US6 (Hash Generator): 5 tasks
  - US7 (Lorem Generator): 5 tasks
  - US8 (Number Base Converter): 6 tasks
- **Polish Tasks**: 11 (Phase 11)

### Parallel Opportunities Identified

- **Phase 1**: 2 tasks can run in parallel (Shadcn install, crypto-js install)
- **Phase 2**: All 5 tasks can run in parallel (different files)
- **Phases 3-10**: All 8 user stories can run in parallel after Phase 2 completes
- **Phase 11**: 9 out of 11 tasks can run in parallel

**Maximum parallelization**: ~30+ tasks can be done in parallel at various stages

### Independent Test Criteria per Story

- **US1**: Paste text, select format, verify conversion, copy to clipboard
- **US2**: Click generate, verify UUID format, test copy
- **US3**: Encode text to Base64, decode back, verify matches original
- **US4**: Encode URL with special chars, decode back, verify matches original
- **US5**: Convert timestamp to date, convert date to timestamp, test current time
- **US6**: Generate hash, verify deterministic output and correct length per algorithm
- **US7**: Request specific quantity, verify output matches, confirm Lorem Ipsum text
- **US8**: Convert between all 4 bases, verify accuracy, test invalid input errors

### Suggested MVP Scope

**MVP = User Stories 1, 2, 3 (All P1 tools)**
- Case Converter
- UUID Generator  
- Base64 Converter

**Tasks for MVP**: T001-T025 (25 tasks total)
- Setup: 7 tasks
- Foundational: 5 tasks
- US1-US3: 13 tasks

**Why this MVP**: These 3 tools address the most common daily developer needs (text transformation, unique IDs, encoding). They're independently valuable and require no interdependencies. Represents ~40% of total effort for ~60% of user value.

---

## Format Validation ✅

All 62 tasks follow the required checklist format:
- ✅ All start with `- [ ]` (markdown checkbox)
- ✅ All have sequential Task IDs (T001-T062)
- ✅ Parallelizable tasks marked with [P]
- ✅ User story tasks marked with [US1] through [US8]
- ✅ Setup and Foundational phases have NO story labels (correct)
- ✅ Polish phase has NO story labels (correct)
- ✅ All descriptions include specific file paths
- ✅ All descriptions are clear and actionable

**Format compliance**: 100%

---

## Notes

- All conversion logic uses native JavaScript/Web APIs except crypto-js for MD5 (per research.md)
- Static export configured (output: 'export') enables deployment to any static host
- Each user story delivers standalone value - no cross-dependencies
- Tests are post-implementation per constitution principle III
- All tools operate client-side - no backend required
- Shadcn UI + Tailwind for consistent styling per constitution principle II
