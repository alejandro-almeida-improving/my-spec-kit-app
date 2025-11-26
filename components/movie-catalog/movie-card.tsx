/**
 * MovieCard Component
 * Displays a single movie thumbnail with title and badges
 * 
 * @feature 003-netflix-catalog-shadcn
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Movie } from "@/lib/data/types";
import { MovieBadge } from "./movie-badge";

/** Placeholder image for failed image loads */
const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='169' viewBox='0 0 300 169'%3E%3Crect fill='%232f2f2f' width='300' height='169'/%3E%3Ctext fill='%23666' font-family='system-ui' font-size='14' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

interface MovieCardProps {
  /** Movie data to display */
  movie: Movie;
  /** Optional CSS class name */
  className?: string;
}

export function MovieCard({ movie, className }: MovieCardProps) {
  const [imgSrc, setImgSrc] = useState(movie.posterUrl);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(PLACEHOLDER_IMAGE);
    }
  };

  return (
    <div className={cn("group relative flex flex-col", className)}>
      {/* Poster Image - 16:9 aspect ratio */}
      <div className="relative aspect-video rounded-md overflow-hidden bg-[#2f2f2f]">
        <Image
          src={imgSrc}
          alt={movie.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
          unoptimized
        />
        
        {/* Badges */}
        {movie.badges && movie.badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {movie.badges.map((badge) => (
              <MovieBadge key={badge} type={badge} />
            ))}
          </div>
        )}
      </div>
      
      {/* Movie Title */}
      <h3 className="mt-2 text-sm text-white font-medium line-clamp-2">
        {movie.title}
      </h3>
    </div>
  );
}
