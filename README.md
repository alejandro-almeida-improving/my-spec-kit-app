This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Development Guidelines

### Static-First Next.js
This project targets a static Next.js delivery. Prefer Server Components, declare metadata such as `export const revalidate`/`dynamicParams` when deviating from default static rendering, and keep client-only logic isolated to the minimal set of components that truly need interactivity. Follow the App Router best practices for layouts, caching, and data fetching to keep the site pre-renderable.

### Tailwind + Shadcn Styling
All UI work extends the existing Tailwind configuration and the Shadcn component set. Avoid introducing other CSS frameworks; use the shared theme tokens for spacing, typography, and color so the catalog appearance remains cohesive. When custom components are necessary, wrap or extend the Shadcn primitives so they remain consistent.

### Testing & Manual Verification
Playwright is the sole automation harness. Create Playwright suites after the UI implementation is feature-complete, cover the primary user journeys, and execute the tests locally (e.g., `npx playwright test`). Because there is no CI, every change should also document the manual lint/build/test commands that were run so reviewers can see how the work was validated.

### Manual Verification Log
Record your local verification results below or in a linked doc so the “no CI” policy is traceable. Replace the placeholder rows with real dates and outcomes.

| Date | Command | Result | Notes |
| --- | --- | --- | --- |
| 2025-11-24 | `npm run lint` | ✅ | Explain what passed or if there were warnings |
| 2025-11-24 | `npm run build` | ✅ | |
| 2025-11-24 | `npx playwright test` | ✅ | |

