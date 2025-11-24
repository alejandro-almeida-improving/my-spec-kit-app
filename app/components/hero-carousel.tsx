"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "@/components/ui/button";
import { getFeaturedMovies } from "@/lib/movies";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function HeroCarousel() {
  const featured = useMemo(() => getFeaturedMovies(), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  const autoplay = prefersReducedMotion || isPaused ? false : { delay: 4500, disableOnInteraction: false };

  const activeMovie = featured[activeIndex] ?? featured[0];

  if (!featured.length) {
    return null;
  }

  return (
    <section className="relative mx-auto mb-16 w-full max-w-6xl px-6" aria-label="Featured hero carousel">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/60">
        <p className="text-[0.65rem]">Featured</p>
        <Button
          variant="ghost"
          size="sm"
          className="border border-white/20 text-xs font-semibold tracking-[0.4em]"
          onClick={() => setIsPaused((prev) => !prev)}
        >
          {isPaused ? "RESUME" : "PAUSE"}
        </Button>
      </div>
      <div className="hero rounded-3xl border border-white/10 bg-black/60 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, Keyboard]}
          navigation
          pagination={{ clickable: true }}
          autoplay={autoplay}
          loop
          keyboard={{ enabled: true }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="overflow-hidden rounded-[1.75rem]"
          aria-live="polite"
        >
          {featured.map((movie, index) => (
            <SwiperSlide key={movie.id}>
              <article className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] bg-zinc-900">
                <div className="absolute inset-0">
                  <Image
                    src={movie.image}
                    alt={movie.title}
                    fill
                    sizes="(min-width: 1024px) 100vw, 100vw"
                    priority={index === 0}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-black/20" />
                </div>
                <div className="relative z-10 flex h-full flex-col justify-end p-8">
                  <p className="text-xs uppercase tracking-[0.6em] text-white/60">Now streaming</p>
                  <h3 className="mt-2 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                    {movie.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80">
                    {movie.synopsis}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.4em] text-white/50">
                    {movie.tagline}
                  </p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <p className="sr-only" aria-live="polite">
        {activeMovie ? `Currently showing: ${activeMovie.title}. ${activeMovie.synopsis}` : "Hero carousel"}
      </p>
    </section>
  );
}