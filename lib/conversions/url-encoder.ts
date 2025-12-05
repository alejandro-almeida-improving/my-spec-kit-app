/**
 * URL Encoder Logic
 * Feature: 001-dev-tools-suite / User Story 4
 */

/**
 * Encode text for use in URLs
 */
export function encodeURL(text: string): string {
  return encodeURIComponent(text);
}

/**
 * Decode URL-encoded text
 */
export function decodeURL(encodedText: string): string {
  try {
    return decodeURIComponent(encodedText);
  } catch (error) {
    throw new Error('Invalid URL-encoded string');
  }
}

/**
 * Encode entire URL (preserves structure)
 */
export function encodeFullURL(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.href;
  } catch {
    // If not a valid URL, just encode as component
    return encodeURIComponent(url);
  }
}
