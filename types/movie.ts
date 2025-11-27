// types/movie.ts
// TypeScript interfaces for the movie catalog data model

export interface Movie {
  title: string;
  slug: string;
  imageUrl?: string;
  localImage: string;
  category: string;
  badge?: "Recently Added" | "Top 10" | "New" | null;
}

export interface Category {
  title: string;
  slug: string;
  movies: Movie[];
}

export interface CatalogData {
  categories: Category[];
}
