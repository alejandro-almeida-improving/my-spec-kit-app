# Quickstart — TODO List (local)

This quickstart explains how to run the app locally and validate the core P1 flows (add, complete, delete) and persistence.

## Prerequisites
- Node.js 18+ (recommended)
- `npm` (bundled with Node) or `pnpm` if preferred

## Run locally
```bash
cd /Users/user/github-improving/my-spec-kit-app
npm install
npm run dev
```
Open http://localhost:3000 and use the UI to add tasks.

## Validate production build
```bash
npm run build
npm run start
```

## Run Playwright tests (after tests are added)
```bash
npm run test
```

## Manual validation checklist
- Add three tasks: verify they appear in the list.
- Toggle one task to completed: verify UI state and persisted value after reload.
- Delete a task: verify it is removed and persisted after reload.
- Refresh the page and confirm tasks persist (localStorage key `todo:tasks`).

## Notes on storage
- Inspect `localStorage` in the browser devtools and check key `todo:tasks` for a JSON array matching the schema in `data-model.md`.
