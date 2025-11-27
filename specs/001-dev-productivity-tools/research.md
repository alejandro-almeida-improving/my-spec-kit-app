# Research Findings

## 1. Shadcn UI Components

### Sidebar
- **Status**: Confirmed. The `sidebar` component is available in the `@shadcn` registry.
- **Add Command**: `npx shadcn@latest add sidebar`
- **Dependencies**: 
  - `@radix-ui/react-slot`
  - `class-variance-authority`
  - `lucide-react`

### Toast
- **Status**: Confirmed. The `sonner` component is the recommended toast implementation in the registry.
- **Add Command**: `npx shadcn@latest add sonner`
- **Dependencies**: 
  - `sonner`
  - `next-themes` (for theme support)

## 2. Client-side Libraries

### Hashing
- **Decision**: **Web Crypto API (`crypto.subtle`)**
- **Rationale**: It is a native browser API, offering superior performance and zero bundle size overhead compared to external libraries. It is widely supported in modern browsers.
- **Alternatives Considered**: `crypto-js`. While popular and synchronous, it adds unnecessary bundle size (~40kb minified) and is slower than the native implementation.

### UUID
- **Decision**: **`crypto.randomUUID()`**
- **Rationale**: Native browser support (available in secure contexts) is sufficient for modern applications. It generates v4 UUIDs efficiently without external dependencies.
- **Alternatives Considered**: `uuid` package. Necessary only if supporting legacy browsers (IE11) or if v1/v3/v5 UUIDs are specifically required.

### Lorem Ipsum
- **Decision**: **`lorem-ipsum`**
- **Rationale**: A lightweight, flexible library for generating placeholder text. It allows for generating paragraphs, sentences, and words with various configurations.
- **Alternatives Considered**: `faker` (too large/heavy for just text), writing a simple custom function (less flexible).

### Date Formatting
- **Decision**: **`date-fns`**
- **Rationale**: While `Intl.DateTimeFormat` is excellent for formatting, a "Date Converter" tool likely requires parsing various input formats and performing manipulations (e.g., adding time, calculating differences). `date-fns` is modular and tree-shakeable, keeping the bundle size low while offering robust functionality.
- **Alternatives Considered**: `Intl.DateTimeFormat` (formatting only, hard to parse arbitrary strings), `moment.js` (deprecated, too large), `dayjs` (good alternative, but `date-fns` functional style fits well with modern React).

## 3. Project Structure

### Recommendation
**Structure**: `app/tools/[tool]/page.tsx`

**Rationale**:
- **Routing**: Leverages Next.js App Router's file-system based routing automatically.
- **Metadata**: Allows easy definition of unique metadata (title, description) for each tool page for SEO.
- **Scalability**: Keeps tool-specific logic encapsulated. Shared components can live in `components/tools/` or `components/ui/`.

**Proposed Hierarchy**:
```
app/
  tools/
    layout.tsx      # Shared layout for tools (sidebar, etc.)
    [tool]/
      page.tsx      # Entry point for specific tool (e.g., /tools/uuid)
components/
  tools/
    uuid-generator/ # specific components for the tool
      index.tsx
    hash-generator/
      index.tsx
```
