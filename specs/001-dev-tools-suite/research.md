# Research: Developer Productivity Tools Suite

**Feature**: 001-dev-tools-suite  
**Date**: December 5, 2025  
**Phase**: 0 - Outline & Research

## Research Questions

This document resolves all "NEEDS CLARIFICATION" items from Technical Context and investigates best practices for implementing the 8 developer tools as a static Next.js application with Shadcn UI.

---

## 1. Next.js Static Export Configuration

### Decision
Configure Next.js for static export with `output: 'export'` in `next.config.ts`. Use App Router with client-side state management via React hooks.

### Rationale
- **Static HTML Generation**: All 8 tool pages can be pre-rendered at build time since they have no dynamic server-side data requirements
- **Client-Side Operations**: All conversions (case transformation, UUID generation, Base64 encoding, etc.) execute in the browser using JavaScript/Web APIs
- **Performance**: Static files can be served from CDN with minimal latency
- **Deployment Simplicity**: Output is plain HTML/CSS/JS that can be hosted anywhere (GitHub Pages, Netlify, Vercel, S3, etc.)

### Implementation Details
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
  // Optional: specify output directory
  distDir: 'out',
};
```

### Limitations to Avoid
- No `getServerSideProps` or API routes (not supported in static export)
- No Image Optimization API (use `next/image` with `unoptimized: true` or regular `<img>`)
- No dynamic routes with `generateStaticParams` unless all paths are known at build time
- Client-side only data fetching and state management

### Best Practices
- Use `'use client'` directive for components with interactivity (useState, useEffect)
- Implement error boundaries for graceful client-side error handling
- Consider code splitting with dynamic imports for large conversion libraries
- Use `next export` command to generate static files

**References**: Next.js Static Exports documentation, Next.js 13+ App Router patterns

---

## 2. Shadcn UI Component Selection

### Decision
Use the following Shadcn UI components for building the 8 tools:
- **Input**: Single-line text inputs (URL encoder, timestamp input)
- **Textarea**: Multi-line text inputs (Case Converter, Base64, Lorem output)
- **Button**: Action triggers (Generate, Convert, Copy, Encode, Decode)
- **Card**: Tool containers with consistent styling
- **Select**: Dropdown selections (hash algorithms, case formats, number bases)
- **Tabs**: Multiple operation modes within a tool (Encode/Decode tabs)
- **Label**: Form field labels
- **Toast/Sonner**: Success/error notifications (optional, for copy feedback)

### Rationale
- **Consistency**: All components share the same design system (Tailwind CSS variables)
- **Accessibility**: Shadcn components are built with accessibility in mind (ARIA attributes, keyboard navigation)
- **Customization**: Components can be modified directly in the codebase (not npm dependencies)
- **Type Safety**: Full TypeScript support with proper type definitions
- **Low Bundle Size**: Only components actually used are included in the build

### Installation Commands
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add select
npx shadcn@latest add tabs
npx shadcn@latest add label
```

### Component Usage Patterns
```tsx
// Example: Base64 Converter with Tabs
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

<Tabs defaultValue="encode">
  <TabsList>
    <TabsTrigger value="encode">Encode</TabsTrigger>
    <TabsTrigger value="decode">Decode</TabsTrigger>
  </TabsList>
  <TabsContent value="encode">
    <Textarea placeholder="Enter text to encode..." />
    <Button>Encode to Base64</Button>
  </TabsContent>
</Tabs>
```

**References**: Shadcn UI documentation, component source code examples

---

## 3. Conversion Algorithms & Libraries

### Decision
Implement all conversions using native JavaScript/TypeScript and Web APIs. No external conversion libraries needed.

### Tool-by-Tool Analysis

#### 3.1 Case Converter
**Algorithm**: String manipulation with regex and character mapping
```typescript
const toLowerCase = (str: string) => str.toLowerCase();
const toUpperCase = (str: string) => str.toUpperCase();
const toTitleCase = (str: string) => 
  str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
const toCamelCase = (str: string) => 
  str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
```
**Rationale**: Native string methods are sufficient. No library needed.

#### 3.2 UUID Generator
**Algorithm**: Use `crypto.randomUUID()` Web API (RFC 4122 v4)
```typescript
const generateUUID = (): string => {
  return crypto.randomUUID(); // Supported in all modern browsers
};
```
**Rationale**: Native Web Crypto API provides standards-compliant UUIDs. No need for `uuid` npm package.

#### 3.3 Base64 Converter
**Algorithm**: Use `btoa()` and `atob()` native functions with UTF-8 handling
```typescript
const encodeBase64 = (str: string): string => {
  return btoa(unescape(encodeURIComponent(str))); // Handle UTF-8
};
const decodeBase64 = (str: string): string => {
  return decodeURIComponent(escape(atob(str))); // Handle UTF-8
};
```
**Rationale**: Native browser APIs handle Base64. UTF-8 encoding ensures special characters work correctly.

#### 3.4 URL Encoder
**Algorithm**: Use `encodeURIComponent()` and `decodeURIComponent()` native functions
```typescript
const encodeURL = (str: string): string => encodeURIComponent(str);
const decodeURL = (str: string): string => decodeURIComponent(str);
```
**Rationale**: Native URL encoding functions are standard and reliable.

#### 3.5 Timestamp Converter
**Algorithm**: JavaScript `Date` object and Unix timestamp conversion
```typescript
const toTimestamp = (date: Date): number => Math.floor(date.getTime() / 1000);
const toDate = (timestamp: number): Date => new Date(timestamp * 1000);
const formatISO = (date: Date): string => date.toISOString();
const formatUTC = (date: Date): string => date.toUTCString();
```
**Rationale**: Native Date API handles all timestamp conversions. UTC timezone is default for ISO strings.

#### 3.6 Hash Generator
**Algorithm**: Use Web Crypto API `SubtleCrypto.digest()`
```typescript
const generateHash = async (text: string, algorithm: 'SHA-1' | 'SHA-256' | 'SHA-512'): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};
```
**Note**: MD5 is NOT supported by Web Crypto API. Alternative:
- Use a lightweight MD5 library like `crypto-js` (16KB) OR
- Implement MD5 algorithm directly (200 lines) OR
- Skip MD5 and only support SHA algorithms

**Decision for MD5**: Include `crypto-js` library for MD5 support, as it's explicitly required in the spec and widely used for legacy compatibility checks.

#### 3.7 Lorem Generator
**Algorithm**: Build a corpus of Lorem Ipsum text and select random segments
```typescript
const LOREM_WORDS = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', ...]; // 100+ words
const generateWords = (count: number): string => {
  return Array.from({ length: count }, () => 
    LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]
  ).join(' ');
};
```
**Rationale**: Simple array of Lorem Ipsum words with random selection provides varied output. No library needed.

#### 3.8 Number Base Converter
**Algorithm**: Use JavaScript `parseInt()` and `toString()` with radix parameter
```typescript
const convertBase = (value: string, fromBase: number, toBase: number): string => {
  const decimal = parseInt(value, fromBase);
  return decimal.toString(toBase).toUpperCase();
};
// Bases: Binary (2), Octal (8), Decimal (10), Hexadecimal (16)
```
**Rationale**: Native JavaScript methods handle all common bases. Validation ensures input matches source base.

### Dependencies Summary
- **crypto-js**: Only external dependency needed (for MD5 hashing)
- All other conversions use native JavaScript/Web APIs

**References**: MDN Web Crypto API, JavaScript String methods, Base64 encoding best practices

---

## 4. Client-Side State Management

### Decision
Use React `useState` hooks for local component state. No global state management library needed (Redux, Zustand, Jotai, etc.).

### Rationale
- **Simplicity**: Each tool page is independent with no shared state between tools
- **Performance**: No unnecessary re-renders from global state updates
- **Bundle Size**: Avoid 10-50KB of state management library code
- **Maintainability**: Straightforward component-level state is easier to understand

### State Patterns per Tool
```typescript
// Example: Base64 Converter
const [input, setInput] = useState('');
const [output, setOutput] = useState('');
const [error, setError] = useState<string | null>(null);
const [mode, setMode] = useState<'encode' | 'decode'>('encode');

const handleConvert = () => {
  try {
    const result = mode === 'encode' ? encodeBase64(input) : decodeBase64(input);
    setOutput(result);
    setError(null);
  } catch (err) {
    setError('Invalid input for decoding');
    setOutput('');
  }
};
```

### Persistent Navigation State
Use React Context (if needed) or lift state to root layout for sidebar open/closed state on mobile. Desktop sidebar always visible.

**References**: React Hooks documentation, Next.js App Router client components

---

## 5. Clipboard API Integration

### Decision
Use modern `navigator.clipboard.writeText()` API with fallback for older browsers.

### Implementation
```typescript
const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true; // Success
  } catch (err) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  }
};
```

### User Feedback
Show toast notification or temporary button text change ("Copied!") for 2 seconds after successful copy.

**References**: Clipboard API documentation, accessibility considerations for clipboard operations

---

## 6. Input Validation & Error Handling

### Decision
Implement client-side validation with clear error messages for each tool.

### Validation Rules by Tool

| Tool | Validation |
|------|-----------|
| Case Converter | Allow any text input |
| UUID Generator | No input validation (generation only) |
| Base64 Converter | Decode: Check valid Base64 format (regex: `^[A-Za-z0-9+/]*={0,2}$`) |
| URL Encoder | Allow any text input |
| Timestamp | Validate number range (0 to 2^53-1), date string parsing |
| Hash Generator | Allow any text input (including empty string) |
| Lorem Generator | Validate positive integer for count |
| Number Base Converter | Validate input matches source base (binary: `^[01]+$`, hex: `^[0-9A-Fa-f]+$`) |

### Error Message Patterns
```typescript
// Clear, actionable error messages
"Invalid Base64 string. Must contain only A-Z, a-z, 0-9, +, /, and optional = padding."
"Invalid binary number. Binary numbers can only contain 0 and 1."
"Invalid timestamp. Must be a number between 0 and 9007199254740991."
```

**References**: HTML5 form validation, React error boundary patterns

---

## 7. Responsive Layout & Navigation

### Decision
Use Shadcn's responsive patterns with Tailwind breakpoints. Sidebar collapses to hamburger menu on mobile (<768px).

### Layout Structure
```tsx
// app/layout.tsx
<div className="flex min-h-screen">
  {/* Desktop: Always visible sidebar */}
  <aside className="hidden md:flex w-64 border-r">
    <Sidebar />
  </aside>
  
  {/* Mobile: Collapsible menu */}
  <Sheet>
    <SheetTrigger className="md:hidden">
      <Menu />
    </SheetTrigger>
    <SheetContent side="left">
      <Sidebar />
    </SheetContent>
  </Sheet>
  
  <main className="flex-1 p-6">
    {children}
  </main>
</div>
```

### Navigation Items
```typescript
const tools = [
  { name: 'Case Converter', href: '/case-converter', icon: Type },
  { name: 'UUID Generator', href: '/uuid-generator', icon: Key },
  { name: 'Base64 Converter', href: '/base64-converter', icon: Code },
  { name: 'URL Encoder', href: '/url-encoder', icon: Link },
  { name: 'Timestamp', href: '/timestamp', icon: Clock },
  { name: 'Hash Generator', href: '/hash-generator', icon: Lock },
  { name: 'Lorem Generator', href: '/lorem-generator', icon: FileText },
  { name: 'Number Base Converter', href: '/number-base-converter', icon: Binary },
];
```

**References**: Tailwind responsive design, Shadcn Sheet component for mobile menu

---

## 8. Performance Optimization

### Decision
Implement code splitting and lazy loading for non-critical components.

### Techniques
1. **Route-based splitting**: Next.js automatically splits by route
2. **Dynamic imports**: Lazy load heavy conversion functions
```typescript
const hashGenerator = dynamic(() => import('@/lib/conversions/hash-generator'), {
  loading: () => <p>Loading...</p>,
});
```
3. **Memoization**: Use `useMemo` for expensive calculations
4. **Debouncing**: Add 300ms debounce for real-time conversion as user types (optional UX enhancement)

### Bundle Size Targets
- Initial page load: <150KB JS (gzipped)
- Per-route chunk: <50KB JS (gzipped)
- Total app: <500KB JS (gzipped)

**References**: Next.js performance optimization, React.lazy, useMemo patterns

---

## 9. Accessibility Considerations

### Decision
Follow WCAG 2.1 AA standards using Shadcn's built-in accessibility features.

### Key Requirements
- **Keyboard Navigation**: All tools operable via Tab, Enter, and Arrow keys
- **Screen Readers**: Proper ARIA labels on all interactive elements
- **Focus Indicators**: Visible focus rings on all focusable elements
- **Error Announcements**: Use ARIA live regions for validation errors
- **Contrast Ratios**: Minimum 4.5:1 for normal text (Tailwind default themes comply)

### Implementation Examples
```tsx
<Label htmlFor="input-text">Enter text to convert</Label>
<Textarea 
  id="input-text"
  aria-describedby="input-help"
  aria-invalid={!!error}
/>
{error && (
  <p id="input-help" role="alert" className="text-red-500">
    {error}
  </p>
)}
```

**References**: WCAG 2.1 guidelines, Shadcn accessibility documentation

---

## 10. Testing Strategy with Playwright

### Decision
Write E2E tests post-implementation covering all acceptance scenarios from spec.

### Test Structure
```typescript
// tests/case-converter.spec.ts
test.describe('Case Converter', () => {
  test('converts to Title Case', async ({ page }) => {
    await page.goto('/case-converter');
    await page.fill('[data-testid="input"]', 'hello world');
    await page.selectOption('[data-testid="format"]', 'title');
    await page.click('[data-testid="convert"]');
    await expect(page.locator('[data-testid="output"]')).toHaveText('Hello World');
  });
  
  test('copies result to clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    // ... test clipboard functionality
  });
});
```

### Coverage Goals
- All 8 tools with 4+ scenarios each (from spec acceptance criteria)
- Edge cases: empty input, large input (1MB), invalid input
- Clipboard functionality
- Navigation between tools
- Mobile responsive behavior

**References**: Playwright documentation, testing-library best practices

---

## Summary of Decisions

| Area | Decision | Key Rationale |
|------|----------|---------------|
| **Static Export** | `output: 'export'` in next.config.ts | All operations are client-side |
| **UI Components** | Shadcn (Input, Textarea, Button, Card, Select, Tabs) | Consistent design system with accessibility |
| **Conversion Logic** | Native JS/Web APIs + crypto-js for MD5 | Minimal dependencies, standard implementations |
| **State Management** | React useState (no global state) | Tools are independent, no shared state needed |
| **Clipboard** | Navigator Clipboard API with fallback | Modern API with backward compatibility |
| **Validation** | Client-side with clear error messages | Immediate feedback, specific guidance |
| **Layout** | Responsive sidebar (desktop) / Sheet (mobile) | Persistent navigation with mobile adaptation |
| **Performance** | Route splitting + lazy loading | Target <150KB initial load |
| **Accessibility** | WCAG 2.1 AA via Shadcn defaults | Keyboard nav, screen readers, focus indicators |
| **Testing** | Playwright E2E post-implementation | Matches constitution principle III |

---

## Next Steps (Phase 1)

1. Generate `data-model.md` defining entities (Tool, ConversionOperation, UserInput)
2. Create TypeScript interfaces in `contracts/tool-interfaces.ts`
3. Document local development workflow in `quickstart.md`
4. Update agent context with Shadcn components and Next.js patterns

---

**Research Complete**: All technical unknowns resolved. Ready to proceed to Phase 1 (Design & Contracts).
