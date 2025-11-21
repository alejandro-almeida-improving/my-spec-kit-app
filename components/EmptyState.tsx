'use client';

/**
 * EmptyState component displayed when no tasks exist
 */
export function EmptyState() {
  return (
    <div className="text-center py-8 text-slate-500">
      No tasks yet. Add one above!
    </div>
  );
}
