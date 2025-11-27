import { CategoryRow } from "@/components/movie-catalog/category-row";
import { PageHeader } from "@/components/movie-catalog/page-header";
import catalogData from "@/public/data/movies.json";
import { CatalogData } from "@/types/movie";

export default function Home() {
  const data = catalogData as CatalogData;

  return (
    <main className="min-h-screen bg-netflix pb-16 pt-24">
      {/* Page Header */}
      <PageHeader
        title="Movies"
        description="Explore our collection of movies across all genres"
      />

      {/* Category Rows */}
      <div className="space-y-8">
        {data.categories.map((category) => (
          <CategoryRow key={category.slug} category={category} />
        ))}
      </div>
    </main>
  );
}
