/**
 * Data types for Netflix-Style Movie Catalog
 * 
 * @feature 003-netflix-catalog-shadcn
 */

/**
 * Badge types that can be displayed on movie cards
 */
export type BadgeType = 'top10' | 'recentlyAdded';

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
