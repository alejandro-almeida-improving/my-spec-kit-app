import moviesCatalog from "@/data/movies.json";

export type Movie = {
  id: number;
  title: string;
  image: string;
  category: string;
  tagline?: string;
  synopsis?: string;
  featured?: boolean;
  url?: string;
};

export type Category = {
  id: number;
  name: string;
  movieIds: number[];
};

export type CategoryRow = {
  id: number;
  name: string;
  movies: Movie[];
};

type RawCategory = Category;

type RawMovie = Movie;

const rawMovies: RawMovie[] = moviesCatalog.movies;
const categories: RawCategory[] = moviesCatalog.categories;

const normalizedMovies = rawMovies.map((movie) => ({
  ...movie,
  synopsis: movie.synopsis ?? movie.tagline ?? "Cinematic thrills coming soon.",
  tagline: movie.tagline ?? movie.synopsis ?? "Coming soon",
}));

const movieMap = Object.fromEntries(
  normalizedMovies.map((movie) => [movie.id, movie])
) as Record<number, Movie>;

export function getFeaturedMovies(limit = 5): Movie[] {
  const featured = normalizedMovies.filter((movie) => movie.featured);
  if (featured.length >= 3) {
    return featured.slice(0, limit);
  }

  return normalizedMovies.slice(0, limit);
}

export function getCategoryRows(): CategoryRow[] {
  return categories.map((category) => ({
    ...category,
    movies: category.movieIds
      .map((movieId) => movieMap[movieId])
      .filter((movie): movie is Movie => Boolean(movie))
      .slice(0, 8),
  }));
}

export function mapMoviesById(): Record<number, Movie> {
  return movieMap;
}