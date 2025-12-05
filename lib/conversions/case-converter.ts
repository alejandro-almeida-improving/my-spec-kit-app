/**
 * Case Converter Logic
 * Feature: 001-dev-tools-suite / User Story 1
 */

export type CaseFormat = 'lowercase' | 'uppercase' | 'titlecase' | 'camelcase';

/**
 * Convert text to lowercase
 */
export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

/**
 * Convert text to UPPERCASE
 */
export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

/**
 * Convert text to Title Case
 */
export function toTitleCase(text: string): string {
  return text.replace(/\w\S*/g, (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}

/**
 * Convert text to camelCase
 */
export function toCamelCase(text: string): string {
  // Remove leading/trailing whitespace and replace non-alphanumeric with spaces
  const normalized = text.trim().replace(/[^a-zA-Z0-9]+/g, ' ');
  
  // Split into words
  const words = normalized.split(' ').filter(word => word.length > 0);
  
  if (words.length === 0) return '';
  
  // First word lowercase, rest title case
  return words
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}

/**
 * Convert text based on selected format
 */
export function convertCase(text: string, format: CaseFormat): string {
  switch (format) {
    case 'lowercase':
      return toLowerCase(text);
    case 'uppercase':
      return toUpperCase(text);
    case 'titlecase':
      return toTitleCase(text);
    case 'camelcase':
      return toCamelCase(text);
    default:
      return text;
  }
}
