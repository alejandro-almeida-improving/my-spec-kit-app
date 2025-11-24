# Research Log: Netflix-style Movie Catalog

## Carousel and Slider Library
- Decision: Ship Swiper 12 for both the hero slider and the horizontal category rows so we get keyboard controls, pagination bullets, and smooth manual transitions with minimal additional code.
- Rationale: Swiper already handles looping, navigation buttons, accessibility props (aria-live, focus), and `prefers-reduced-motion` hooks, which keeps the carousel focused on the UI without rebuilding custom slider logic. It also satisfies the user request to explicitly use Swiper for showing the movies.
- Alternatives considered: Building a custom slider from scratch (more time, accessibility risk) or using another slider library (would have required additional dependencies that duplicate Swiper's feature set). Swiper was preferred because it already exists in the dependency list and meets the access/motion requirements.

## Client-side Search Filtering
- Decision: Filter the in-memory movie dataset inside a client search component that updates the DOM on Enter and keeps the existing carousels rendered on the page.
- Rationale: The spec mandates static-first behavior, so no server round-trips should be made. Filtering within the DOM preserves those constraints while letting Playwright verify the keyboard-driven flows quickly.
- Alternatives considered: Precomputing filtered results on the server (violates static-first because every query would need a fetch) or building a dedicated API route (unnecessary backend surface). The client-side filter keeps the UI responsive and compliant with the constitution.

## Detail Placeholder Modal
- Decision: Provide a keyboard/mouse accessible modal component that reuses the static movie metadata (title, synopsis) and surfaces a “Detail under construction” message when a “Watch details” control activates.
- Rationale: This satisfies FR-004 without building a new route while keeping the page static and focusing on a placeholder experience, as required.
- Alternatives considered: Redirecting to a route stub (adds routing work and might break the static-first promise) or showing inline details (less cinematic). A modal keeps the user flow in place and stays within the existing page.

## Accessibility and Motion Handling
- Decision: Honor `prefers-reduced-motion` by disabling Swiper autoplay/fade transitions and ensuring focus-visible outlines are always present, plus using Next.js `Image` for optimized posters to meet performance targets.
- Rationale: The constitution mandates performance/accessibility baselines. Respecting motion preferences while optimizing images aligns with those goals and supports smooth keyboard/Playwright testing.
- Alternatives considered: Ignoring reduced motion (fails accessibility), using animation libraries for transitions (risked performance/regression). The chosen approach keeps the UI compliant with manual verification expectations.
