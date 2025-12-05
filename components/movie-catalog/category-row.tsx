"use client";

import { Category } from "@/types/movie";
import { MovieCard } from "@/components/movie-catalog/movie-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryRowProps {
  category: Category;
  className?: string;
}

export function CategoryRow({ category, className }: CategoryRowProps) {
  return (
    <section className={cn("relative py-4", className)}>
      {/* Category Title as Link */}
      <Link
        href={`/genre/${category.slug}`}
        className="group mb-2 inline-flex items-center gap-2 px-4 md:px-8 lg:px-12"
      >
        <h2 className="text-lg font-semibold text-netflix-primary underline-offset-4 group-hover:underline md:text-xl lg:text-2xl">
          {category.title}
        </h2>
        <span className="text-netflix-secondary opacity-0 transition-opacity group-hover:opacity-100">
          Explore All &rarr;
        </span>
      </Link>

      {/* Movie Carousel */}
      <div className="relative px-4 md:px-8 lg:px-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-3">
            {category.movies.map((movie, index) => (
              <CarouselItem
                key={`${movie.slug}-${index}`}
                className="basis-1/3 pl-2 md:basis-1/4 md:pl-3 lg:basis-1/5 xl:basis-[18%] 2xl:basis-[15%]"
              >
                <MovieCard movie={movie} />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation Arrows - Netflix style positioning */}
          <CarouselPrevious 
            className="left-0 h-full w-10 rounded-none border-0 bg-black/50 opacity-0 transition-opacity hover:bg-black/80 hover:opacity-100 disabled:opacity-0 md:w-12"
            variant="ghost"
          />
          <CarouselNext 
            className="right-0 h-full w-10 rounded-none border-0 bg-black/50 opacity-0 transition-opacity hover:bg-black/80 hover:opacity-100 disabled:opacity-0 md:w-12"
            variant="ghost"
          />
        </Carousel>
      </div>
    </section>
  );
}
