import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <header className={cn("px-4 pb-8 md:px-8 lg:px-12", className)}>
      <h1 className="text-3xl font-bold text-netflix-primary md:text-4xl lg:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-netflix-secondary md:text-lg">
          {description}
        </p>
      )}
    </header>
  );
}
