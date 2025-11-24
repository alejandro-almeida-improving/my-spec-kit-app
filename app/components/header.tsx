"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import type { ReactNode } from "react";

const navLinks = ["Home", "Movies", "Series", "My List"];

interface HeaderProps {
  searchSlot?: ReactNode;
}

export function Header({ searchSlot }: HeaderProps) {
  return (
    <header className="z-20 border-b border-white/10 bg-black/60 px-6 py-4 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
        <div className="flex items-center gap-12 text-xs uppercase tracking-[0.3em] text-white/70">
          <span className="text-2xl font-semibold tracking-[0.4em] text-white">Nebula</span>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                className="rounded-full px-2 py-1 text-[0.65rem] font-semibold tracking-[0.35em] text-white/60 transition hover:text-white"
                href="#"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex min-w-[180px] flex-1 items-center justify-end gap-3 md:min-w-[260px]">
          <div className="flex-1">
            {searchSlot ?? (
              <div className="hidden h-10 rounded-full border border-white/10 bg-white/5 px-3 text-[0.65rem] uppercase tracking-[0.35em] text-white/50 md:flex md:items-center">
                Search (coming soon)
              </div>
            )}
          </div>
          <Button variant="ghost" size="icon" className="hidden border border-transparent md:inline-flex">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="hidden px-4 md:inline-flex">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}