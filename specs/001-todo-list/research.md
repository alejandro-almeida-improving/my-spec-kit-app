# Phase 0 Research: TODO List MVP

**Date**: 2025-11-21  
**Focus**: Client-side state management, localStorage persistence, and shadcn/ui component selection for TODO application

## Research Topics Investigated

### 1. Client-Side State Management for React Apps

**Decision**: Use React `useState` and `useEffect` hooks with a custom `useTodos` hook  
**Rationale**: 
- Spec explicitly states "no backend required" and data persists only during session
- localStorage is simple and sufficient for MVP scope; no need for Redux, Zustand, or Context API complexity
- Custom hook provides encapsulation and reusability across components
- Constitution aligns with "functional components" and "custom hooks for state"

**Alternatives Considered**:
- Redux: Overkill for single-page TODO list; adds complexity without benefit for MVP
- Context API: Works but custom hook is simpler and more isolated for this feature
- Zustand: Modern but not required; adds external dependency unnecessarily
- Server state (Tanstack Query): Not applicable; no API layer

**Implementation Pattern**:
```typescript
// useTodos.ts
export function useTodos() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) setTasks(JSON.parse(saved));
  }, []);
  
  // Persist on change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasks));
  }, [tasks]);
  
  // Mutations return setTasks handlers
  return { tasks, addTask, toggleTask, deleteTask };
}
```

---

### 2. localStorage Strategies for MVP

**Decision**: Use simple JSON serialization; store entire task list under `todos` key  
**Rationale**:
- MVP scope doesn't require complex migration strategies
- Session-only persistence (spec: "no localStorage required unless needed for UX")
- JSON serialization is native, fast, and compatible with all modern browsers
- Small data volume (<100 tasks typical) fits comfortably in localStorage quota (5-10MB)

**Alternatives Considered**:
- IndexedDB: Unnecessarily complex for MVP; localStorage sufficient
- SessionStorage: Same as localStorage for this feature; persistent across page reloads preferred per UX
- SQLite WASM: Overkill; browser-based WASM adds complexity
- In-memory only: Poor UX; user loses tasks on page refresh

**Schema**:
```json
{
  "todos": [
    {
      "id": "uuid-v4",
      "title": "Buy groceries",
      "completed": false,
      "createdAt": "2025-11-21T10:30:00Z"
    }
  ]
}
```

**Edge Cases Handled**:
- Missing `todos` key on first load → initialize as `[]`
- Corrupted JSON → fallback to empty state (no error thrown)
- Old format migration → not needed for MVP v1

---

### 3. shadcn/ui Components for TODO App

**Decision**: Use `Button`, `Input`, `Checkbox`, and custom `Card` layouts  
**Rationale**:
- Constitution requires shadcn/ui exclusively; no competing UI libraries
- Tailwind-first design integrates seamlessly with application styling
- Components are headless and composable; minimal JavaScript overhead
- shadcn/ui provides accessibility features (ARIA, keyboard navigation)

**Component Breakdown**:

| Component | shadcn/ui | Purpose | Notes |
|-----------|-----------|---------|-------|
| Add Task Form | Input + Button | User enters task title and submits | Button has onClick handler; Input has onKeyPress for Enter |
| Task List | Custom composition | Display all tasks in order | Use CSS Grid/Flex via Tailwind |
| Task Item | Checkbox + Button | Toggle completion and delete | Checkbox uses shadcn/ui; delete button is secondary variant |
| Empty State | Typography + Icon | Show when no tasks exist | Simple div with Tailwind styling |

**Alternatives Considered**:
- Material-UI: Not allowed; constitution specifies shadcn/ui only
- Headless UI: Component library from Vercel; similar to shadcn but less opinionated
- Custom HTML: Possible but loses accessibility benefits and consistency

---

### 4. Tailwind CSS Styling Approach

**Decision**: Use Tailwind utility classes exclusively; no custom CSS modules  
**Rationale**:
- Constitution Principle II mandates Tailwind-only styling
- Tailwind 4.x provides excellent DX with JIT compilation
- shadcn/ui components ship with Tailwind-compatible class names
- Consistency with existing project setup

**Color Palette** (Tailwind defaults + shadcn extensions):
- Primary: `indigo-600` (actions, completed state)
- Text: `slate-900` (primary), `slate-500` (secondary)
- Background: `white` (light), `slate-50` (sections)
- Border: `slate-200` (dividers)
- Danger: `red-600` (delete buttons)

**Responsive Design**:
- Mobile-first breakpoints: `sm:`, `md:`, `lg:`
- Single-column on mobile; multi-column if complexity added later
- No fixed widths; use `max-w-2xl` container for content

---

### 5. Accessibility & Keyboard Navigation

**Decision**: Leverage shadcn/ui accessibility; add semantic HTML; test with Playwright  
**Rationale**:
- Constitution Principle IV requires Playwright testing focusing on user-visible behavior
- shadcn/ui components ship with WCAG 2.1 compliance
- Semantic HTML (form, button, input, label) improves screen reader support
- Keyboard navigation (Tab, Enter, Space) is foundation for accessibility

**Keyboard Interactions**:
- Tab: Navigate between input, Add button, checkboxes, delete buttons
- Enter: In input field, submits form (adds task)
- Space: Toggles checkbox state
- Click: All buttons clickable (Checkbox, Delete)

**Testing**:
- Playwright tests will verify keyboard navigation
- Tab order matches visual order
- Form submission works with Enter key
- All interactive elements are keyboard-accessible

---

### 6. Browser Compatibility & Static Generation

**Decision**: Next.js static generation with client-side hydration; support modern browsers (Chrome, Firefox, Safari, Edge)  
**Rationale**:
- Constitution Principle III mandates static generation
- localhost persists after hydration; doesn't block static build
- Modern browsers (2020+) support localStorage, ES2020 syntax, React 19
- No IE11 or legacy support needed for MVP

**Build Process**:
1. Next.js `next build` generates static HTML + JS bundles
2. Page loads as static HTML (no server rendering)
3. React hydration attaches event listeners and state
4. `useEffect` hook loads localStorage on mount
5. User interactions update state and persist to localStorage

---

### 7. Testing Strategy

**Decision**: E2E tests with Playwright focusing on user journeys (not unit tests)  
**Rationale**:
- Constitution Principle IV: "Playwright is the sole testing framework"
- Tests validate user-visible behavior: add task, see it appear, toggle, delete
- E2E tests are more valuable than unit tests for UI applications
- No API layer to test; all state is client-side

**Test Coverage**:
- P1 Story: Add task → appears in list (3 scenarios)
- P2 Story: Toggle completion → visual change (3 scenarios)
- P3 Story: Delete task → removal from list (3 scenarios)
- Edge cases: Empty input validation, rapid clicks, whitespace handling

**Test File**: `tests/todo.spec.ts`

---

## Unresolved Items: NONE

All technical decisions have been researched and aligned with constitution, spec, and project constraints. Proceeding to Phase 1 design.

---

## Summary of Decisions

| Topic | Decision | Why |
|-------|----------|-----|
| State Management | React hooks + custom `useTodos` | Simple, isolated, no external deps |
| Persistence | localStorage, full list JSON | MVP scope, session-only persistence |
| UI Components | shadcn/ui (Button, Input, Checkbox) | Constitution requirement, accessibility |
| Styling | Tailwind CSS utilities only | Constitution Principle II |
| Testing | Playwright E2E tests | Constitution Principle IV |
| Browser Support | Modern (2020+) | No legacy support needed |
| Build | Next.js static generation + hydration | Constitution Principle III |

