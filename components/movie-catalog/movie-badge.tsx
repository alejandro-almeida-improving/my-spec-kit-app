/**
 * MovieBadge Component
 * Displays a badge indicator (Top 10, Recently Added) on a movie card
 * 
 * @feature 003-netflix-catalog-shadcn
 */

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BadgeType } from "@/lib/data/types";

/** Badge display configuration */
const BADGE_CONFIG: Record<BadgeType, { label: string; className: string }> = {
  top10: {
    label: 'Top 10',
    className: 'bg-[#e50914] hover:bg-[#e50914] text-white border-none',
  },
  recentlyAdded: {
    label: 'Recently Added',
    className: 'bg-[#46d369] hover:bg-[#46d369] text-white border-none',
  },
};

interface MovieBadgeProps {
  /** Type of badge to display */
  type: BadgeType;
  /** Optional CSS class name */
  className?: string;
}

export function MovieBadge({ type, className }: MovieBadgeProps) {
  const config = BADGE_CONFIG[type];
  
  return (
    <Badge 
      className={cn(
        "text-xs font-semibold px-2 py-0.5 rounded-sm",
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  );
}
