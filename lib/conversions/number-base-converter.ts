/**
 * Number Base Converter Logic
 * Feature: 001-dev-tools-suite / User Story 8
 */

export type NumberBase = 2 | 8 | 10 | 16;

/**
 * Convert number from one base to another
 */
export function convertBase(value: string, fromBase: NumberBase, toBase: NumberBase): string {
  // Parse the input value with the source base
  const decimal = parseInt(value, fromBase);
  
  if (isNaN(decimal)) {
    throw new Error('Invalid input for the selected base');
  }
  
  // Convert to target base
  let result = decimal.toString(toBase);
  
  // Uppercase for hexadecimal
  if (toBase === 16) {
    result = result.toUpperCase();
  }
  
  return result;
}

/**
 * Convert to all bases at once
 */
export function convertToAllBases(value: string, fromBase: NumberBase): {
  binary: string;
  octal: string;
  decimal: string;
  hexadecimal: string;
} {
  const decimal = parseInt(value, fromBase);
  
  if (isNaN(decimal)) {
    throw new Error('Invalid input for the selected base');
  }
  
  return {
    binary: decimal.toString(2),
    octal: decimal.toString(8),
    decimal: decimal.toString(10),
    hexadecimal: decimal.toString(16).toUpperCase()
  };
}

/**
 * Validate input for specific base
 */
export function isValidForBase(value: string, base: NumberBase): boolean {
  const patterns: Record<NumberBase, RegExp> = {
    2: /^[01]+$/,
    8: /^[0-7]+$/,
    10: /^[0-9]+$/,
    16: /^[0-9A-Fa-f]+$/
  };
  
  return patterns[base].test(value.trim());
}

/**
 * Get base name
 */
export function getBaseName(base: NumberBase): string {
  const names: Record<NumberBase, string> = {
    2: 'Binary',
    8: 'Octal',
    10: 'Decimal',
    16: 'Hexadecimal'
  };
  return names[base];
}

/**
 * Get base description
 */
export function getBaseDescription(base: NumberBase): string {
  const descriptions: Record<NumberBase, string> = {
    2: 'Base 2 (0-1)',
    8: 'Base 8 (0-7)',
    10: 'Base 10 (0-9)',
    16: 'Base 16 (0-9, A-F)'
  };
  return descriptions[base];
}
