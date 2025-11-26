/**
 * CatalogHeader Component
 * Displays the page header with title and description
 * 
 * @feature 003-netflix-catalog-shadcn
 */

import { cn } from "@/lib/utils";

interface CatalogHeaderProps {
  /** Main title text */
  title: string;
  /** Description/subtitle text */
  description: string;
  /** Optional CSS class name */
  className?: string;
}

export function CatalogHeader({ title, description, className }: CatalogHeaderProps) {
  return (
    <header className={cn("px-4 md:px-12 pt-8 pb-6", className)}>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
        {title}
      </h1>
      <p className="text-base md:text-lg text-[#b3b3b3] max-w-3xl">
        {description}
      </p>
    </header>
  );
}
