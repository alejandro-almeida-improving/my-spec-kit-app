/**
 * Timestamp Converter Logic
 * Feature: 001-dev-tools-suite / User Story 5
 */

/**
 * Convert Unix timestamp (seconds) to Date object
 */
export function timestampToDate(timestamp: number): Date {
  // Handle both seconds and milliseconds
  const ms = timestamp < 10000000000 ? timestamp * 1000 : timestamp;
  return new Date(ms);
}

/**
 * Convert Date to Unix timestamp (seconds)
 */
export function dateToTimestamp(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

/**
 * Get current timestamp
 */
export function getCurrentTimestamp(): number {
  return Math.floor(Date.now() / 1000);
}

/**
 * Format date as ISO 8601
 */
export function formatISO(date: Date): string {
  return date.toISOString();
}

/**
 * Format date as UTC string
 */
export function formatUTC(date: Date): string {
  return date.toUTCString();
}

/**
 * Format date as locale string
 */
export function formatLocale(date: Date): string {
  return date.toLocaleString();
}

/**
 * Calculate relative time (e.g., "2 hours ago", "in 3 days")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  const isFuture = diffMs < 0;
  const absDiff = Math.abs(diffSec);
  const absMin = Math.abs(diffMin);
  const absHour = Math.abs(diffHour);
  const absDay = Math.abs(diffDay);
  const absMonth = Math.abs(diffMonth);
  const absYear = Math.abs(diffYear);

  if (absDiff < 60) {
    return isFuture ? `in ${absDiff} seconds` : `${absDiff} seconds ago`;
  } else if (absMin < 60) {
    return isFuture ? `in ${absMin} minutes` : `${absMin} minutes ago`;
  } else if (absHour < 24) {
    return isFuture ? `in ${absHour} hours` : `${absHour} hours ago`;
  } else if (absDay < 30) {
    return isFuture ? `in ${absDay} days` : `${absDay} days ago`;
  } else if (absMonth < 12) {
    return isFuture ? `in ${absMonth} months` : `${absMonth} months ago`;
  } else {
    return isFuture ? `in ${absYear} years` : `${absYear} years ago`;
  }
}

/**
 * Parse date string to Date object
 */
export function parseDate(dateString: string): Date {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string');
  }
  return date;
}
