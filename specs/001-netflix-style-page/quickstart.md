# Quickstart: Netflix Style Page

## Prerequisites

- Node.js 18+
- npm / yarn / pnpm

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   # Install Shadcn components
   npx shadcn@latest add carousel card button
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Access the Page**:
   - Navigate to `http://localhost:3000` (or the specific route if implemented on a subpage, e.g., `/netflix`).

## Testing

1. **Run End-to-End Tests**:
   ```bash
   npx playwright test
   ```

## Project Structure

- `app/page.tsx`: Main entry point (or new route).
- `components/ui/`: Shadcn components.
- `lib/data.ts`: Mock data source.
