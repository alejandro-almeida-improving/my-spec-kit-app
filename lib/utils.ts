import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Copy text to clipboard using the Clipboard API
 */
export async function copyToClipboard(text: string): Promise<{ success: boolean; error?: string }> {
  try {
    await navigator.clipboard.writeText(text);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to copy to clipboard';
    return { success: false, error: errorMessage };
  }
}

