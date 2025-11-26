# Data Model: Netflix Style Page

## Entities

### Movie
Represents a single content item to be displayed in the carousel.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `id` | `string` | Unique identifier | UUID or unique string |
| `title` | `string` | Movie title | Required, max 100 chars |
| `description` | `string` | Short synopsis | Optional, max 500 chars |
| `image` | `string` | URL to poster image | Required, valid URL |
| `genre` | `string[]` | List of genres | Optional |
| `year` | `number` | Release year | Optional, 1900-Current |
| `rating` | `string` | Maturity rating (e.g., TV-MA) | Optional |

### Category (Row)
Represents a horizontal section of content.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `id` | `string` | Unique identifier | UUID or unique string |
| `title` | `string` | Section title (e.g., "Trending") | Required |
| `movies` | `Movie[]` | List of movies in this category | Required, min 1 item |

## State Management

- **Client-Side State**:
    - Carousel position (handled by Shadcn Carousel).
    - Hover state on cards (CSS/Tailwind).

## Mock Data Structure

```typescript
interface Movie {
  id: string;
  title: string;
  image: string;
  // ... other fields
}

interface Category {
  id: string;
  title: string;
  movies: Movie[];
}

const DATA: Category[] = [
  // ...
];
```
