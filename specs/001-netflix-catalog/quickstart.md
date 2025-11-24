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
   - Hero spec: tab into slider, use arrow buttons/dots, ensure indicators track the active slide.
   - Carousel spec: scroll a row via keyboard or wheel, hover cards to reveal "Watch details" and "Add to My List," then activate both via keyboard.
   - Search spec: type a partial title, hit Enter, confirm only matching cards stay visible, and pressing Enter on "Watch details" opens the placeholder modal with the detail text.
5. **Manual checks**
   - Confirm focus outlines stay within each component and color contrast is at least 4.5:1.
   - Verify the placeholder detail panel mentions "Detail under construction."
