# Developer Quickstart Guide

**Feature**: Developer Productivity Tools Suite (001-dev-tools-suite)  
**Last Updated**: December 5, 2025

This guide helps developers get the Developer Productivity Tools Suite running locally, understand the architecture, and begin contributing to the project.

---

## Prerequisites

Ensure you have the following installed:

- **Node.js**: Version 20.x or later ([Download](https://nodejs.org/))
- **npm**: Version 10.x or later (comes with Node.js)
- **Git**: For version control ([Download](https://git-scm.com/))
- **Code Editor**: VS Code recommended ([Download](https://code.visualstudio.com/))

---

## Quick Start (5 Minutes)

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd my-spec-kit-app

# Checkout the feature branch
git checkout 001-dev-tools-suite

# Install dependencies
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the home page with navigation to all 8 tools.

### 3. Verify Tools Work

Navigate to each tool and test basic functionality:
- `/case-converter` - Convert text between cases
- `/uuid-generator` - Generate UUIDs
- `/base64-converter` - Encode/decode Base64
- `/url-encoder` - Encode/decode URLs
- `/timestamp` - Convert timestamps
- `/hash-generator` - Generate hashes
- `/lorem-generator` - Generate Lorem Ipsum
- `/number-base-converter` - Convert number bases

---

## Project Structure

```
my-spec-kit-app/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with sidebar
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Global styles
│   ├── case-converter/           # Tool pages (8 total)
│   │   └── page.tsx
│   ├── uuid-generator/
│   │   └── page.tsx
│   └── ...                       # (6 more tool routes)
│
├── components/                   # React components
│   ├── ui/                       # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   └── tabs.tsx
│   ├── sidebar.tsx               # Navigation sidebar
│   └── tool-layout.tsx           # Shared tool page wrapper
│
├── lib/                          # Utilities and logic
│   ├── utils.ts                  # Tailwind merge helper
│   └── conversions/              # Conversion functions
│       ├── case-converter.ts
│       ├── uuid-generator.ts
│       ├── base64-converter.ts
│       ├── url-encoder.ts
│       ├── timestamp.ts
│       ├── hash-generator.ts
│       ├── lorem-generator.ts
│       └── number-base-converter.ts
│
├── tests/                        # Playwright E2E tests
│   ├── case-converter.spec.ts
│   ├── uuid-generator.spec.ts
│   └── ...                       # (6 more test files)
│
├── specs/                        # Feature documentation
│   └── 001-dev-tools-suite/
│       ├── spec.md               # Feature specification
│       ├── plan.md               # Implementation plan
│       ├── research.md           # Technical research
│       ├── data-model.md         # Entity definitions
│       ├── quickstart.md         # This file
│       └── contracts/            # TypeScript interfaces
│           └── tool-interfaces.ts
│
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── playwright.config.ts          # Playwright test config
├── tsconfig.json                 # TypeScript config
└── components.json               # Shadcn UI config
```

---

## Available Scripts

### Development

```bash
# Start development server with hot reload
npm run dev

# Runs on http://localhost:3000
# Changes to files automatically refresh the browser
```

### Building

```bash
# Build static export for production
npm run build

# Output: ./out directory
# Contains static HTML/CSS/JS files ready for deployment
```

### Testing

```bash
# Run all Playwright E2E tests
npm test

# Run tests in headed mode (see browser)
npm test -- --headed

# Run specific test file
npm test tests/case-converter.spec.ts

# Run tests in debug mode
npm test -- --debug
```

### Linting

```bash
# Run ESLint
npm run lint

# Auto-fix linting issues
npm run lint -- --fix
```

### Deployment (Static Export)

```bash
# 1. Build the static export
npm run build

# 2. Test the production build locally
npx serve out

# 3. Deploy the 'out' directory to your hosting provider
# Examples: Netlify, Vercel, GitHub Pages, AWS S3, etc.
```

---

## Architecture Overview

### Next.js App Router (Static Export)

- **Static Generation**: All pages are pre-rendered at build time
- **No Server Runtime**: Application runs entirely in the browser
- **Client Components**: All tool pages use `'use client'` directive for interactivity

### Component Architecture

```
┌─────────────────────────────────────┐
│  app/layout.tsx (Root Layout)       │
│  ┌───────────┐  ┌─────────────────┐ │
│  │ Sidebar   │  │ Tool Page       │ │
│  │           │  │ ┌─────────────┐ │ │
│  │ - Case    │  │ │ Tool Layout │ │ │
│  │ - UUID    │  │ │             │ │ │
│  │ - Base64  │  │ │ ┌─────────┐ │ │ │
│  │ - URL     │  │ │ │ Input   │ │ │ │
│  │ - Time    │  │ │ │ Config  │ │ │ │
│  │ - Hash    │  │ │ │ Convert │ │ │ │
│  │ - Lorem   │  │ │ │ Output  │ │ │ │
│  │ - Base#   │  │ │ └─────────┘ │ │ │
│  └───────────┘  │ └─────────────┘ │ │
│                 └─────────────────┘ │
└─────────────────────────────────────┘
```

### State Management

Each tool page maintains its own state using React `useState`:

```typescript
const [input, setInput] = useState('');
const [output, setOutput] = useState('');
const [error, setError] = useState<string | null>(null);
const [config, setConfig] = useState<ToolConfig>({ /* defaults */ });
```

No global state management library is used (Redux, Zustand, etc.) because:
- Tools are independent (no shared state)
- Reduces bundle size
- Simplifies maintenance

### Conversion Logic

All conversions happen in `lib/conversions/`:

```typescript
// lib/conversions/base64-converter.ts
export const encodeBase64 = (input: string): string => {
  return btoa(unescape(encodeURIComponent(input)));
};

export const decodeBase64 = (input: string): string => {
  try {
    return decodeURIComponent(escape(atob(input)));
  } catch (error) {
    throw new Error('Invalid Base64 string');
  }
};
```

These functions are:
- **Pure**: Same input always produces same output
- **Testable**: Easy to unit test in isolation
- **Reusable**: Can be imported anywhere in the app

---

## Adding a New Tool (Tutorial)

Let's walk through adding a hypothetical "JSON Formatter" tool.

### Step 1: Create the Route

```bash
mkdir -p app/json-formatter
touch app/json-formatter/page.tsx
```

### Step 2: Create the Page Component

```tsx
// app/json-formatter/page.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { formatJSON } from '@/lib/conversions/json-formatter';

export default function JSONFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    try {
      const formatted = formatJSON(input);
      setOutput(formatted);
      setError(null);
    } catch (err) {
      setError('Invalid JSON');
      setOutput('');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">JSON Formatter</h1>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste JSON here..."
          className="mb-4"
        />
        <Button onClick={handleFormat}>Format JSON</Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {output && (
          <Textarea
            value={output}
            readOnly
            className="mt-4"
          />
        )}
      </Card>
    </div>
  );
}
```

### Step 3: Create the Conversion Function

```typescript
// lib/conversions/json-formatter.ts
export const formatJSON = (input: string): string => {
  const parsed = JSON.parse(input); // Throws if invalid JSON
  return JSON.stringify(parsed, null, 2); // Pretty-print with 2-space indent
};
```

### Step 4: Add to Navigation

```tsx
// components/sidebar.tsx (update tools array)
const tools = [
  // ... existing tools
  {
    name: 'JSON Formatter',
    href: '/json-formatter',
    icon: Braces, // Import from lucide-react
  },
];
```

### Step 5: Add Playwright Test

```typescript
// tests/json-formatter.spec.ts
import { test, expect } from '@playwright/test';

test.describe('JSON Formatter', () => {
  test('formats valid JSON', async ({ page }) => {
    await page.goto('/json-formatter');
    await page.fill('textarea[placeholder*="JSON"]', '{"name":"John","age":30}');
    await page.click('button:has-text("Format JSON")');
    
    const output = await page.locator('textarea[readonly]').inputValue();
    expect(output).toContain('{\n  "name": "John",\n  "age": 30\n}');
  });
});
```

### Step 6: Test and Deploy

```bash
# Test in development
npm run dev

# Run the E2E test
npm test tests/json-formatter.spec.ts

# Build for production
npm run build
```

---

## Shadcn UI Components

This project uses [Shadcn UI](https://ui.shadcn.com/) components. They are:

- **Not npm packages**: Copied directly into `components/ui/`
- **Customizable**: Edit the component files directly
- **Type-safe**: Full TypeScript support
- **Accessible**: Built with accessibility in mind

### Adding New Shadcn Components

```bash
# Install a new component (e.g., Dialog)
npx shadcn@latest add dialog

# This copies the component to components/ui/dialog.tsx
# You can then customize it as needed
```

### Commonly Used Components

| Component | Use Case | Import |
|-----------|----------|--------|
| Button | Action triggers | `@/components/ui/button` |
| Card | Content containers | `@/components/ui/card` |
| Input | Single-line text | `@/components/ui/input` |
| Textarea | Multi-line text | `@/components/ui/textarea` |
| Select | Dropdown menus | `@/components/ui/select` |
| Tabs | Multiple views | `@/components/ui/tabs` |
| Label | Form labels | `@/components/ui/label` |

---

## Testing Guide

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test tests/case-converter.spec.ts

# Run in headed mode (see browser)
npm test -- --headed

# Run in debug mode
npm test -- --debug

# Run in UI mode (interactive)
npx playwright test --ui
```

### Writing Tests

Follow the pattern in existing test files:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Tool Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tool-path');
  });

  test('should convert input correctly', async ({ page }) => {
    // Arrange
    await page.fill('[data-testid="input"]', 'test input');
    
    // Act
    await page.click('[data-testid="convert-button"]');
    
    // Assert
    await expect(page.locator('[data-testid="output"]')).toHaveText('expected output');
  });

  test('should handle invalid input', async ({ page }) => {
    await page.fill('[data-testid="input"]', 'invalid');
    await page.click('[data-testid="convert-button"]');
    
    await expect(page.locator('[role="alert"]')).toBeVisible();
  });
});
```

### Test Coverage Requirements

Per the feature spec, each tool should have tests for:
1. ✅ All acceptance scenarios (4+ per tool from spec.md)
2. ✅ Edge cases (empty input, large input, invalid input)
3. ✅ Clipboard functionality
4. ✅ Error handling

---

## Troubleshooting

### Build Errors

**Error**: `Error: Page /tool-name is missing "export default" or "export async function generateStaticParams()"`

**Solution**: Ensure your page component exports a default function:
```tsx
export default function ToolPage() { /* ... */ }
```

---

**Error**: `Error: Image Optimization using the default loader is not compatible with next export`

**Solution**: Use `unoptimized` prop on `<Image>` components or use regular `<img>` tags:
```tsx
<Image src="/logo.png" alt="Logo" unoptimized />
```

---

### Development Server Issues

**Issue**: Changes not reflecting in browser

**Solution**:
1. Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
2. Clear Next.js cache: `rm -rf .next`
3. Restart dev server

---

### Test Failures

**Issue**: Tests failing with timeout errors

**Solution**: Increase timeout in `playwright.config.ts`:
```typescript
export default defineConfig({
  use: {
    actionTimeout: 10000, // Increase from 5000 to 10000
  },
});
```

---

### Clipboard Issues

**Issue**: Clipboard API not working in tests

**Solution**: Grant clipboard permissions:
```typescript
test('copies to clipboard', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  // ... rest of test
});
```

---

## Contributing Workflow

### 1. Pick a Tool to Implement

Check `specs/001-dev-tools-suite/tasks.md` (generated by `/speckit.tasks` command) for available tasks.

### 2. Create a Feature Branch

```bash
git checkout -b feature/implement-case-converter
```

### 3. Implement the Tool

Follow the "Adding a New Tool" tutorial above.

### 4. Test Manually

```bash
npm run dev
# Test all scenarios from spec.md
```

### 5. Write Playwright Tests

```bash
# Create test file
touch tests/case-converter.spec.ts

# Write tests covering all acceptance scenarios
# Run tests
npm test tests/case-converter.spec.ts
```

### 6. Lint and Build

```bash
npm run lint
npm run build
```

### 7. Commit and Push

```bash
git add .
git commit -m "feat: implement case converter tool"
git push origin feature/implement-case-converter
```

### 8. Create Pull Request

Open a PR against the `001-dev-tools-suite` branch with:
- Description of what was implemented
- Screenshots/GIFs of the tool in action
- Test results

---

## Deployment

### Option 1: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# The 'out' directory is automatically detected
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=out
```

### Option 3: GitHub Pages

```bash
# 1. Build
npm run build

# 2. Push to gh-pages branch
npm i -g gh-pages
gh-pages -d out
```

### Option 4: AWS S3 + CloudFront

```bash
# 1. Build
npm run build

# 2. Upload to S3
aws s3 sync out/ s3://your-bucket-name --delete

# 3. Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

---

## Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Shadcn UI Components**: https://ui.shadcn.com/
- **Playwright Testing**: https://playwright.dev/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/

---

## Need Help?

- Check existing test files for examples
- Review `specs/001-dev-tools-suite/research.md` for technical decisions
- Look at `specs/001-dev-tools-suite/data-model.md` for entity definitions
- Reference `specs/001-dev-tools-suite/contracts/tool-interfaces.ts` for TypeScript types

---

**Happy Coding!** 🚀
