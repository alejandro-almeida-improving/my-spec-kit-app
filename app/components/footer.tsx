"use client";

import { Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/80 px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1 text-xs uppercase tracking-[0.4em] text-white/60 md:text-left">
          <span className="text-sm font-semibold text-white">Nebula</span>
          <span>Experience curated streams and immersive carousels.</span>
        </div>
        <div className="flex items-center justify-center gap-6">
          {[
            { label: "Help", href: "#" },
            { label: "Terms", href: "#" },
            { label: "Privacy", href: "#" },
          ].map((link) => (
            <a
              key={link.label}
              className="uppercase tracking-[0.3em] text-white/60 transition hover:text-white"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 text-white/60">
          {[
            { Icon: Twitter, label: "Twitter" },
            { Icon: Instagram, label: "Instagram" },
            { Icon: Youtube, label: "YouTube" },
          ].map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              className="rounded-full border border-white/10 p-2 transition hover:border-white/50 hover:text-white"
              aria-label={label}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <p className="mt-6 text-center text-xs uppercase tracking-[0.4em] text-white/40">
        &copy; {new Date().getFullYear()} Nebula Studios · curated for streaming lovers.
      </p>
    </footer>
  );
}