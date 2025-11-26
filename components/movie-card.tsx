import { Movie } from "@/lib/data";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="group relative aspect-video cursor-pointer overflow-hidden rounded-md transition-transform duration-300 hover:scale-105 hover:z-10">
      <img
        src={movie.image}
        alt={movie.title}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
        <h3 className="text-center font-semibold text-white p-2">{movie.title}</h3>
      </div>
    </article>
  );
}
