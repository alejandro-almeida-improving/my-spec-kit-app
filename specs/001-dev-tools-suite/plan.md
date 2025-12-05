# Implementation Plan: Developer Productivity Tools Suite

**Branch**: `001-dev-tools-suite` | **Date**: December 5, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-dev-tools-suite/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a static Next.js web application providing 8 developer productivity tools (Case Converter, UUID Generator, Base64 Converter, URL Encoder, Timestamp Converter, Hash Generator, Lorem Generator, Number Base Converter). Each tool has a dedicated page accessible via persistent sidebar navigation. All conversions and generations happen client-side using Shadcn UI components and Tailwind CSS styling.

## Technical Context

**Language/Version**: TypeScript 5.x with React 19.2.0 and Next.js 16.0.3  
**Primary Dependencies**: Shadcn UI (class-variance-authority, clsx, tailwind-merge), Lucide React icons, Web Crypto API (for hash generation)  
**Storage**: N/A (all operations are client-side, stateless)  
**Testing**: Playwright (E2E tests only, written post-implementation)  
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge) via static HTML/CSS/JS export  
**Project Type**: Web application (single frontend, no backend)  
**Performance Goals**: <2 seconds for any conversion/generation with inputs up to 1MB, <3 seconds initial page load  
**Constraints**: Must work as static export (no server-side runtime), all processing client-side, <200KB initial JS bundle per route  
**Scale/Scope**: 8 tool pages, persistent navigation sidebar, copy-to-clipboard functionality, responsive design (320px+ width)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Next.js Static Export ✅ PASS
- **Requirement**: Must use `output: 'export'` in `next.config.ts`
- **Assessment**: All 8 tools perform client-side operations only (text transformations, UUID generation, hash calculation). No server-side features required. Will add `output: 'export'` to next.config.ts.
- **Compliance**: FULL - Feature design is inherently compatible with static export.

### II. UI Consistency (Shadcn + Tailwind) ✅ PASS
- **Requirement**: Must use Shadcn UI components and Tailwind CSS exclusively
- **Assessment**: User explicitly requested "Usaremos los componentes de shadcn para construir la app". Will use Shadcn components (Input, Button, Card, Tabs, Select, Textarea) and Tailwind utilities for all UI.
- **Compliance**: FULL - User requirement aligns perfectly with constitution principle.

### III. Post-Implementation Testing ✅ PASS
- **Requirement**: Playwright testing only, written after implementation
- **Assessment**: Playwright is already configured. Tests will be written after each tool is implemented and manually verified.
- **Compliance**: FULL - Testing approach follows constitution exactly.

### IV. No CI Dependency ✅ PASS
- **Requirement**: All verification must run locally
- **Assessment**: Static export can be built with `npm run build`, tests run with `npm test`, linting with `npm run lint`. No CI required.
- **Compliance**: FULL - Local development workflow sufficient.

**GATE STATUS**: ✅ **PASSED** - All constitution principles are satisfied. Proceeding to Phase 0.

---

### Post-Design Re-evaluation (After Phase 1)

**Date**: December 5, 2025

All design decisions continue to comply with constitution principles:

#### I. Next.js Static Export ✅ CONFIRMED
- **Design Review**: All conversion logic documented in `lib/conversions/` uses native JavaScript/Web APIs or crypto-js library
- **No Server Dependencies**: Zero server-side features (no API routes, no getServerSideProps, no dynamic routes requiring server)
- **Static Routes**: 8 tool pages + home page, all statically exportable
- **Status**: COMPLIANT - Design fully supports static export

#### II. UI Consistency (Shadcn + Tailwind) ✅ CONFIRMED
- **Component Usage**: Research document specifies exactly which Shadcn components to use (Button, Card, Input, Textarea, Select, Tabs, Label)
- **No Custom CSS**: All styling via Tailwind utility classes (documented in quickstart.md)
- **Consistent Patterns**: All tools follow same component structure (ToolLayout wrapper, validation display, conversion result)
- **Status**: COMPLIANT - 100% Shadcn + Tailwind, no custom CSS files

#### III. Post-Implementation Testing ✅ CONFIRMED
- **Test Strategy**: Quickstart.md documents E2E test structure with Playwright covering all acceptance scenarios
- **No TDD**: Tests are to be written post-implementation per workflow in quickstart.md
- **Coverage Plan**: Each tool requires 4+ scenarios from spec.md acceptance criteria
- **Status**: COMPLIANT - Testing workflow follows constitution principle exactly

#### IV. No CI Dependency ✅ CONFIRMED
- **Local Verification**: All scripts (dev, build, test, lint) run locally via npm
- **Deployment**: Quickstart.md documents manual deployment to multiple platforms (Vercel, Netlify, GitHub Pages, AWS S3)
- **No GitHub Actions**: No CI configuration files in project
- **Status**: COMPLIANT - Fully local development and verification

**FINAL GATE STATUS**: ✅ **PASSED** - Post-design review confirms all constitution principles remain satisfied.

## Project Structure

### Documentation (this feature)

```text
specs/001-dev-tools-suite/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── tool-interfaces.ts
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── layout.tsx           # Root layout with persistent sidebar navigation
├── page.tsx             # Home/landing page
├── globals.css          # Global Tailwind styles
├── case-converter/
│   └── page.tsx         # Case Converter tool page
├── uuid-generator/
│   └── page.tsx         # UUID Generator tool page
├── base64-converter/
│   └── page.tsx         # Base64 Converter tool page
├── url-encoder/
│   └── page.tsx         # URL Encoder tool page
├── timestamp/
│   └── page.tsx         # Timestamp Converter tool page
├── hash-generator/
│   └── page.tsx         # Hash Generator tool page
├── lorem-generator/
│   └── page.tsx         # Lorem Generator tool page
└── number-base-converter/
    └── page.tsx         # Number Base Converter tool page

components/
├── ui/                  # Shadcn UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   ├── select.tsx
│   └── tabs.tsx
├── sidebar.tsx          # Persistent navigation sidebar
└── tool-layout.tsx      # Shared layout wrapper for tool pages

lib/
├── utils.ts             # Tailwind merge utilities (existing)
└── conversions/         # Conversion logic modules
    ├── case-converter.ts
    ├── uuid-generator.ts
    ├── base64-converter.ts
    ├── url-encoder.ts
    ├── timestamp.ts
    ├── hash-generator.ts
    ├── lorem-generator.ts
    └── number-base-converter.ts

tests/
├── case-converter.spec.ts
├── uuid-generator.spec.ts
├── base64-converter.spec.ts
├── url-encoder.spec.ts
├── timestamp.spec.ts
├── hash-generator.spec.ts
├── lorem-generator.spec.ts
└── number-base-converter.spec.ts
```

**Structure Decision**: Using Next.js App Router (Option 2: Web application) with route-based organization. Each tool gets its own app route (`/case-converter`, `/uuid-generator`, etc.) for clean URLs and code splitting. Shared navigation component in root layout ensures persistent sidebar. Conversion logic separated into `lib/conversions/` for testability and reusability. Shadcn UI components in `components/ui/` following established patterns.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations detected. All constitution principles are satisfied by the feature design.
