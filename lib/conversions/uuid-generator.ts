/**
 * UUID Generator Logic
 * Feature: 001-dev-tools-suite / User Story 2
 */

/**
 * Generate a single UUID v4 using the Web Crypto API
 */
export function generateUUID(): string {
  return crypto.randomUUID();
}

/**
 * Generate multiple UUIDs
 */
export function generateMultipleUUIDs(count: number): string[] {
  return Array.from({ length: count }, () => generateUUID());
}

/**
 * Validate UUID format (RFC 4122)
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}
