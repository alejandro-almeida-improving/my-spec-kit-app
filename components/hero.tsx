import { Movie } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";

interface HeroProps {
  movie: Movie;
}

export function Hero({ movie }: HeroProps) {
  return (
    <section aria-label="Hero" className="relative h-[80vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={movie.image}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col justify-center px-4 md:px-16">
        <h1 className="text-4xl font-bold text-white md:text-6xl lg:text-7xl max-w-2xl drop-shadow-lg">
          {movie.title}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-gray-200 md:text-xl drop-shadow-md line-clamp-3">
          {movie.description}
        </p>
        <div className="mt-8 flex gap-4">
          <Button size="lg" className="gap-2 bg-white text-black hover:bg-white/90">
            <Play className="h-5 w-5 fill-black" /> Play
          </Button>
          <Button size="lg" variant="secondary" className="gap-2 bg-gray-500/70 text-white hover:bg-gray-500/50">
            <Info className="h-5 w-5" /> More Info
          </Button>
        </div>
      </div>
    </section>
  );
}
