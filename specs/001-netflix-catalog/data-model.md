# Data Model: Netflix-style Catalog

All movie data is pre-rendered via `data/movies.json`. Additional helpers in `lib/movies.ts` will enrich the static catalog with the metadata needed for the hero, overlays, and placeholder detail view.

## Movie
- **Fields**:
  - `id` (number, required): Unique identifier used by carousels, Swiper keys, and search filtering.
  - `title` (string, required): Display name for cards, hero slides, and detail placeholders.
  - `image` (string, required): Path under `public/images/movies/movie-*.jpg`; rendered via `next/image` for responsive sizes.
  - `synopsis` (string, optional): Short description surfaced in the placeholder detail view and as the hero tagline/overlay text.
  - `tagline` (string, optional): Secondary text for hero slides to echo the mockup aesthetic.
  - `category` (string, required): Category label (e.g., Trending, Action) used to group the card into horizontal carousels. Derived from the `categories` section.
  - `featured` (boolean, implied): Determined by configuration in `lib/movies.ts` (the top 3–5 entries become hero slides).
  - `url` (string, optional): External reference that could be wired to the placeholder detail button for future navigation.
- **Validation rules**:
  - `title`, `image`, and `category` must be present; fallback placeholders render when `image` is missing (gradient + alt text). Image `alt` text is derived from the title.
  - `synopsis` defaults to the tagline if unspecified, ensuring the placeholder copy stays informative.
- **Relationships**:
  - Each movie belongs to one or more `Category` rows; the dataset uses `category` + the category definitions to map movie IDs into carousels. The hero picks are a subset flagged via `featured` or the first few entries in each genre.

## Category
- **Fields**:
  - `id` (number): Internal reference used during rendering.
  - `name` (string): Label shown above each carousel (Trending, New, Action, Comedy).
  - `movieIds` (number[]): List of `Movie.id` values in that row; used to order cards and guarantee at least six posters per requirement.
- **Validation rules**:
  - Every category must reference at least six movies; if the static JSON drops below six, the render logic supplements via the `featured` subset to avoid empty rows.
- **State transitions**:
  - Categories only change when the dataset updates; the UI adds overlay controls when the user hovers/touches a card, and the focused card receives a `tabindex` of `0` to keep edge-to-edge keyboard focus within the row.

## Interactions / UI State
- **Hero carousel**: Maintains an `activeIndex` (0–n) plus a `paused` flag controlled by the pause toggle. A `useEffect` keeps Swiper in manual mode when `prefers-reduced-motion` or `paused` is true.
- **Carousel rows**: Each row tracks horizontal scroll position but relies on Swiper’s internal state; new overlays become visible when the card receives pointer or keyboard focus (CSS classes applied via `isHover`/`isFocus`).
- **Search**: The client search component keeps a `query` and filters the DOM subset without remounting the hero. When no matches exist, a friendly message displays and the carousels remain scrollable so navigation isn’t blocked.
- **Placeholder detail**: The modal state stores the selected `movie` and toggles `isOpen`. Triggering `Watch details` from any row sets the modal to open and focuses the first button inside. Closing the modal returns focus to the originating card.
