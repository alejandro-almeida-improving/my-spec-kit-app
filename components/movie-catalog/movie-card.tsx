import Image from "next/image";
import { Movie } from "@/types/movie";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

export function MovieCard({ movie, className }: MovieCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-md bg-netflix-card transition-all duration-300 ease-out",
        "hover:scale-105 hover:z-10 hover:shadow-xl hover:shadow-black/50",
        className
      )}
    >
      {/* Movie Poster Image */}
      <div className="relative aspect-video w-full">
        <Image
          src={movie.localImage}
          alt={movie.title}
          fill
          sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
          className="object-cover"
        />
        
        {/* Badge */}
        {movie.badge && (
          <div className="absolute top-2 left-2 z-10">
            <span
              className={cn(
                "rounded px-2 py-1 text-xs font-semibold uppercase tracking-wide",
                movie.badge === "Top 10"
                  ? "bg-netflix-red text-white"
                  : "bg-white/90 text-black"
              )}
            >
              {movie.badge}
            </span>
          </div>
        )}
      </div>

      {/* Title Overlay - visible on hover */}
      <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="w-full p-3 text-sm font-medium text-netflix-primary line-clamp-2">
          {movie.title}
        </h3>
      </div>
    </div>
  );
}
