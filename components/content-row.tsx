import { Category } from "@/lib/data";
import { MovieCard } from "@/components/movie-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ContentRowProps {
  category: Category;
}

export function ContentRow({ category }: ContentRowProps) {
  return (
    <section aria-label="Content Row" className="py-8 px-4 md:px-16 space-y-4">
      <h2 className="text-2xl font-semibold text-white">{category.title}</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full group"
      >
        <CarouselContent className="-ml-4">
          {category.movies.map((movie) => (
            <CarouselItem key={movie.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" />
        <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" />
      </Carousel>
    </section>
  );
}
