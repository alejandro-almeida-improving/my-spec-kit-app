import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-4 md:px-8 lg:px-12",
        "bg-linear-to-b from-black/80 via-black/40 to-transparent",
        className
      )}
    >
      {/* Logo / Brand */}
      <Link href="/" className="flex items-center">
        <span className="text-2xl font-bold tracking-tight text-netflix-red md:text-3xl">
          NETFLIX
        </span>
      </Link>

      {/* Navigation Actions */}
      <div className="flex items-center gap-4">
        <Link
          href="/signin"
          className="text-sm font-medium text-netflix-primary transition-colors hover:text-netflix-secondary"
        >
          Sign In
        </Link>
        <Button
          asChild
          className="bg-netflix-red text-white hover:bg-netflix-red/90 hover:bg-netflix-red-dark"
        >
          <Link href="/signup">Join Now</Link>
        </Button>
      </div>
    </nav>
  );
}
