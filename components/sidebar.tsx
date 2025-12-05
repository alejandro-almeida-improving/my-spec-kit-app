'use client';

/**
 * Sidebar Navigation Component
 * Feature: 001-dev-tools-suite
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TOOLS } from '@/lib/tools-config';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-card h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold">Dev Tools Suite</h1>
        <p className="text-sm text-muted-foreground mt-1">
          8 productivity tools for developers
        </p>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isActive = pathname === tool.path;
            
            return (
              <li key={tool.id}>
                <Link
                  href={tool.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    isActive && 'bg-accent text-accent-foreground font-medium'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{tool.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t text-xs text-muted-foreground">
        <p>© 2025 Dev Tools Suite</p>
      </div>
    </aside>
  );
}
