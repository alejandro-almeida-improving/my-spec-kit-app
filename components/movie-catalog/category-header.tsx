/**
 * CategoryHeader Component
 * Displays a clickable category title with hover styles
 * 
 * @feature 003-netflix-catalog-shadcn
 */

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface CategoryHeaderProps {
  /** Category name to display */
  name: string;
  /** Optional URL to link to */
  linkUrl?: string;
  /** Optional CSS class name */
  className?: string;
}

export function CategoryHeader({ name, linkUrl, className }: CategoryHeaderProps) {
  const content = (
    <span className="inline-flex items-center gap-1 group/header">
      <span>{name}</span>
      <ChevronRight className="w-5 h-5 opacity-0 -translate-x-2 transition-all duration-200 group-hover/header:opacity-100 group-hover/header:translate-x-0" />
    </span>
  );

  if (linkUrl) {
    return (
      <h2 className={cn("text-xl md:text-2xl font-bold text-white mb-3", className)}>
        <Link 
          href={linkUrl}
          className="hover:text-[#b3b3b3] transition-colors cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </Link>
      </h2>
    );
  }

  return (
    <h2 className={cn("text-xl md:text-2xl font-bold text-white mb-3", className)}>
      {content}
    </h2>
  );
}
