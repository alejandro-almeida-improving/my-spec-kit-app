/**
 * Movie Catalog Page
 * Main page displaying Netflix-style movie catalog
 * 
 * @feature 003-netflix-catalog-shadcn
 */

import { CatalogHeader } from "@/components/movie-catalog/catalog-header";
import { CategoryRow } from "@/components/movie-catalog/category-row";
import { catalogData } from "@/lib/data/movies";

export default function Home() {
  return (
    <main className="min-h-screen pb-16">
      {/* Page Header */}
      <CatalogHeader 
        title={catalogData.title} 
        description={catalogData.description} 
      />
      
      {/* Category Rows */}
      <div className="flex flex-col">
        {catalogData.categories.map((category) => (
          <CategoryRow key={category.id} category={category} />
        ))}
      </div>
    </main>
  );
}
