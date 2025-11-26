/**
 * Component Contracts for Netflix-Style Movie Catalog
 * 
 * This file defines the TypeScript interfaces for all components
 * in the movie catalog feature.
 * 
 * @feature 003-netflix-catalog-shadcn
 * @date 2025-11-26
 */

// =============================================================================
// DATA TYPES
// =============================================================================

/**
 * Badge types that can be displayed on movie cards
 */
export type BadgeType = 'top10' | 'recentlyAdded';

/**
 * Badge display configuration
 */
export const BADGE_CONFIG: Record<BadgeType, { label: string; className: string }> = {
  top10: {
    label: 'Top 10',
    className: 'bg-[#e50914] text-white',
  },
  recentlyAdded: {
    label: 'Recently Added',
    className: 'bg-[#46d369] text-white',
  },
};

/**
 * Represents a single movie in the catalog
 */
export interface Movie {
  /** Unique identifier (Netflix title ID) */
  id: string;
  /** Display title of the movie */
  title: string;
  /** URL to the movie poster image */
  posterUrl: string;
  /** Optional link to Netflix page */
  netflixUrl?: string;
  /** Optional badges to display on the card */
  badges?: BadgeType[];
}

/**
 * Represents a category/row of movies
 */
export interface Category {
  /** Unique identifier */
  id: string;
  /** Display name for the category header */
  name: string;
  /** URL-friendly slug */
  slug: string;
  /** Optional link for the category header */
  linkUrl?: string;
  /** Movies in this category */
  movies: Movie[];
}

/**
 * Complete catalog data structure
 */
export interface CatalogData {
  /** Page title */
  title: string;
  /** Page description/subtitle */
  description: string;
  /** List of movie categories */
  categories: Category[];
}

// =============================================================================
// COMPONENT PROPS
// =============================================================================

/**
 * Props for the MovieCard component
 * Displays a single movie thumbnail with title and optional badges
 */
export interface MovieCardProps {
  /** Movie data to display */
  movie: Movie;
  /** Optional CSS class name */
  className?: string;
  /** Optional aspect ratio for the image (default: 16/9) */
  aspectRatio?: number;
  /** Called when image fails to load */
  onImageError?: () => void;
}

/**
 * Props for the CategoryRow component
 * Displays a horizontal carousel of movies for a single category
 */
export interface CategoryRowProps {
  /** Category data to display */
  category: Category;
  /** Optional CSS class name */
  className?: string;
  /** Number of items visible per viewport (responsive) */
  itemsPerView?: {
    mobile?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

/**
 * Props for the CatalogHeader component
 * Displays the page header with title and description
 */
export interface CatalogHeaderProps {
  /** Main title text */
  title: string;
  /** Description/subtitle text */
  description: string;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Props for the MovieCatalog component (main page component)
 * Displays the complete movie catalog with all categories
 */
export interface MovieCatalogProps {
  /** Complete catalog data */
  data: CatalogData;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Props for the CategoryHeader component
 * Displays a clickable category title with optional link
 */
export interface CategoryHeaderProps {
  /** Category name to display */
  name: string;
  /** Optional URL to link to */
  linkUrl?: string;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Props for the MovieBadge component
 * Displays a badge indicator on a movie card
 */
export interface MovieBadgeProps {
  /** Type of badge to display */
  type: BadgeType;
  /** Optional CSS class name */
  className?: string;
}

// =============================================================================
// COMPONENT INTERFACES (for composition)
// =============================================================================

/**
 * Expected structure for Carousel navigation state
 * Used to conditionally show/hide Previous/Next buttons
 */
export interface CarouselNavigationState {
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

/**
 * Image load error handler signature
 */
export type ImageErrorHandler = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => void;

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Default number of items per viewport size
 */
export const DEFAULT_ITEMS_PER_VIEW = {
  mobile: 2,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 6,
} as const;

/**
 * Default aspect ratio for movie posters
 */
export const DEFAULT_POSTER_ASPECT_RATIO = 16 / 9;

/**
 * Placeholder image path for failed image loads
 */
export const PLACEHOLDER_IMAGE = '/images/placeholder-movie.png';

/**
 * Netflix-style color palette
 */
export const NETFLIX_COLORS = {
  black: '#141414',
  darkGray: '#181818',
  mediumGray: '#2f2f2f',
  lightGray: '#b3b3b3',
  white: '#ffffff',
  red: '#e50914',
  green: '#46d369',
} as const;
