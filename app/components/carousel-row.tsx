"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "@/components/ui/button";
import type { CategoryRow, Movie } from "@/lib/movies";

import "swiper/css";
import "swiper/css/navigation";

interface CarouselRowProps {
  category: CategoryRow;
  onWatchDetails?: (movie: Movie) => void;
  onAddToMyList?: (movie: Movie) => void;
}

export function CarouselRow({ category, onWatchDetails, onAddToMyList }: CarouselRowProps) {
  const visibleMovies = category.movies.slice(0, 6);

  if (!visibleMovies.length) {
    return null;
  }

  const handleAction = (event: MouseEvent<HTMLButtonElement>, movie: Movie, callback?: (movie: Movie) => void) => {
    event.preventDefault();
    callback?.(movie);
  };

  return (
    <section
      aria-label={`${category.name} carousel`}
      className="mx-auto w-full max-w-6xl space-y-4"
    >
      <div className="flex items-end justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.45em] text-white/70">{category.name}</h2>
        <p className="text-xs uppercase tracking-[0.35em] text-white/40">Browse</p>
      </div>
      <Swiper
        modules={[Navigation, Keyboard]}
        navigation
        keyboard={{ enabled: true }}
        slidesPerView={2.25}
        spaceBetween={14}
        breakpoints={{
          640: { slidesPerView: 3.25, spaceBetween: 16 },
          1024: { slidesPerView: 5.5, spaceBetween: 20 },
          1280: { slidesPerView: 6.5, spaceBetween: 24 },
        }}
        className="swiper-category"
      >
        {visibleMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <article className="group relative h-56 rounded-2xl border border-white/5 bg-zinc-900 shadow-[0_15px_40px_rgba(0,0,0,0.45)] focus-within:border-white/30" tabIndex={0}>
              <div className="relative h-full overflow-hidden rounded-2xl">
                <Image
                  src={movie.image}
                  alt={movie.title}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 40vw, 60vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/60 to-black/20" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                <div />
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white">{movie.title}</p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={(event) => handleAction(event, movie, onWatchDetails)}
                      className="text-[0.65rem] tracking-[0.4em]"
                    >
                      Watch details
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(event) => handleAction(event, movie, onAddToMyList)}
                      className="text-[0.65rem] tracking-[0.4em]"
                    >
                      Add to My List
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
