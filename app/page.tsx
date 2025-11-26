import { getCategories, getFeaturedMovie } from "@/lib/data";
import { Hero } from "@/components/hero";
import { ContentRow } from "@/components/content-row";

export default function Home() {
  const featuredMovie = getFeaturedMovie();
  const categories = getCategories();

  return (
    <main className="min-h-screen bg-background pb-16 overflow-x-hidden">
      <Hero movie={featuredMovie} />
      <div className="relative z-10 -mt-32 space-y-8">
        {categories.map((category) => (
          <ContentRow key={category.id} category={category} />
        ))}
      </div>
    </main>
  );
}
