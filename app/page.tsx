import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { HeroCarousel } from "./components/hero-carousel";
import { CarouselRow } from "./components/carousel-row";
import { getCategoryRows } from "@/lib/movies";

export default function Home() {
  const categoryRows = getCategoryRows();

  return (
    <div className="flex min-h-screen flex-col bg-[#050505] text-white">
      <Header />
      <main className="flex-1 space-y-12 px-6 py-12">
        <HeroCarousel />
        <section className="space-y-12">
          {categoryRows.map((categoryRow) => (
            <CarouselRow key={categoryRow.id} category={categoryRow} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
