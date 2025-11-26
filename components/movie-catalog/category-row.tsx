/**
 * CategoryRow Component
 * Displays a horizontal carousel of movies for a single category
 * 
 * @feature 003-netflix-catalog-shadcn
 */

"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/lib/data/types";
import { CategoryHeader } from "./category-header";
import { MovieCard } from "./movie-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface CategoryRowProps {
  /** Category data to display */
  category: Category;
  /** Optional CSS class name */
  className?: string;
}

export function CategoryRow({ category, className }: CategoryRowProps) {
  return (
    <section className={cn("mb-8 md:mb-12", className)}>
      <div className="px-4 md:px-12">
        <CategoryHeader name={category.name} linkUrl={category.linkUrl} />
      </div>
      
      {/* Movie Carousel */}
      <div className="relative px-4 md:px-12">
        <Carousel
          opts={{
            align: "start",
            loop: false,
            skipSnaps: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {category.movies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              >
                <MovieCard movie={movie} />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Netflix-style navigation buttons */}
          <CarouselPrevious 
            className="left-0 md:-left-4 h-full rounded-none rounded-r-sm w-10 md:w-12 bg-black/50 hover:bg-black/80 border-0 opacity-0 hover:opacity-100 transition-opacity disabled:opacity-0"
          />
          <CarouselNext 
            className="right-0 md:-right-4 h-full rounded-none rounded-l-sm w-10 md:w-12 bg-black/50 hover:bg-black/80 border-0 opacity-0 hover:opacity-100 transition-opacity disabled:opacity-0"
          />
        </Carousel>
      </div>
    </section>
  );
}
