# Quickstart & Manual Verification

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the dev server** (see the layout change live against `mockups/netflix-movies.png`):
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 in a modern browser and verify the hero slider, carousels, search input, and placeholder overlay match the dark Netflix aesthetic.
3. **Lint & build (static-first verification)**
   ```bash
   npm run lint
   npm run build
   ```
4. **Playwright manual scenarios (after the UI is complete)**
   ```bash
   npx playwright test --config=playwright.config.ts --grep "hero|carousel|search"
   ```
   - **Hero journey**: Tab into the slider, operate next/previous arrows or dots, and confirm the aria-live indicator matches the active slide while pause and motion preferences are honored.
   - **Carousel navigation**: Scroll a row via keyboard or wheel, hover cards to expose the overlay actions, then activate "Watch details" and "Add to My List" with both keyboard and pointer inputs.
   - **Search & placeholder**: Type a partial title, press Enter to confirm the remaining cards stay visible, then trigger "Watch details" to open the placeholder modal and verify the copy and focus return.
5. **Manual checks**
   - Confirm focus outlines remain visible inside the hero controls, carousel cards, search bar, and modal regardless of input method, and maintain at least 4.5:1 contrast.
   - Verify the placeholder detail panel clearly states "Detail under construction" and that closing it returns focus to the originating card.
