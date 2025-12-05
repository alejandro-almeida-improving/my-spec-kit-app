/**
 * Validation Utilities for Developer Productivity Tools Suite
 * Feature: 001-dev-tools-suite
 */

import { ValidationResult } from './types';

/**
 * Base64 string validation
 */
export const validateBase64 = (input: string): ValidationResult => {
  if (!input.trim()) {
    return {
      isValid: false,
      validatedValue: null,
      errors: [{
        field: 'input',
        message: 'Input cannot be empty',
        code: 'EMPTY_REQUIRED'
      }]
    };
  }

  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
  
  if (!base64Regex.test(input)) {
    return {
      isValid: false,
      validatedValue: null,
      errors: [{
        field: 'input',
        message: 'Invalid Base64 string. Must contain only A-Z, a-z, 0-9, +, /, and optional = padding.',
        code: 'INVALID_BASE64_FORMAT'
      }]
    };
  }
  
  return {
    isValid: true,
    validatedValue: input,
    errors: []
  };
};

/**
 * Number base validation
 */
export const validateNumberBase = (
  input: string,
  config: { fromBase: number }
): ValidationResult => {
  if (!input.trim()) {
    return {
      isValid: false,
      validatedValue: null,
      errors: [{
        field: 'input',
        message: 'Input cannot be empty',
        code: 'EMPTY_REQUIRED'
      }]
    };
  }

  const patterns: Record<number, RegExp> = {
    2: /^[01]+$/,
    8: /^[0-7]+$/,
    10: /^[0-9]+$/,
    16: /^[0-9A-Fa-f]+$/
  };
  
  const pattern = patterns[config.fromBase];
  
  if (!pattern || !pattern.test(input)) {
    const baseName: Record<number, string> = {
      2: 'binary',
      8: 'octal',
      10: 'decimal',
      16: 'hexadecimal'
    };
    return {
      isValid: false,
      validatedValue: null,
      errors: [{
        field: 'input',
        message: `Invalid ${baseName[config.fromBase]} number. Only digits valid for base ${config.fromBase} are allowed.`,
        code: 'INVALID_FORMAT'
      }]
    };
  }
  
  return {
    isValid: true,
    validatedValue: input,
    errors: []
  };
};

/**
 * Timestamp validation (Unix timestamp to date)
 */
export const validateTimestamp = (input: string): ValidationResult => {
  if (!input.trim()) {
    return {
      isValid: false,
      validatedValue: null,
      errors: [{
        field: 'input',
        message: 'Input cannot be empty',
        code: 'EMPTY_REQUIRED'
      }]
    };
  }

  const timestamp = parseInt(input, 10);
  
  if (isNaN(timestamp)) {
    return {
      isValid: false,
      validatedValue: null,
      errors: [{
        field: 'input',
        message: 'Invalid timestamp. Must be a valid integer.',
        code: 'INVALID_FORMAT'
      }]
    };
  }
  
  // Check safe integer range
  if (timestamp < 0 || timestamp > Number.MAX_SAFE_INTEGER) {
    return {
      isValid: false,
      validatedValue: null,
      errors: [{
        field: 'input',
        message: 'Timestamp out of range. Must be between 0 and 9007199254740991.',
        code: 'OUT_OF_RANGE'
      }]
    };
  }
  
  return {
    isValid: true,
    validatedValue: input,
    errors: []
  };
};

/**
 * Date string validation (for timestamp conversion)
 */
export const validateDateString = (input: string): ValidationResult => {
  if (!input.trim()) {
    return {
      isValid: false,
      validatedValue: null,
      errors: [{
        field: 'input',
        message: 'Input cannot be empty',
        code: 'EMPTY_REQUIRED'
      }]
    };
  }

  const date = new Date(input);
  
  if (isNaN(date.getTime())) {
    return {
      isValid: false,
      validatedValue: null,
      errors: [{
        field: 'input',
        message: 'Invalid date format. Please enter a valid date string.',
        code: 'PARSE_ERROR'
      }]
    };
  }
  
  return {
    isValid: true,
    validatedValue: input,
    errors: []
  };
};

/**
 * Lorem Ipsum quantity validation
 */
export const validateLoremQuantity = (input: string): ValidationResult => {
  if (!input.trim()) {
    return {
      isValid: false,
      validatedValue: null,
      errors: [{
        field: 'input',
        message: 'Quantity cannot be empty',
        code: 'EMPTY_REQUIRED'
      }]
    };
  }

  const quantity = parseInt(input, 10);
  
  if (isNaN(quantity)) {
    return {
      isValid: false,
      validatedValue: null,
      errors: [{
        field: 'input',
        message: 'Quantity must be a valid number',
        code: 'INVALID_FORMAT'
      }]
    };
  }
  
  if (quantity < 1 || quantity > 10000) {
    return {
      isValid: false,
      validatedValue: null,
      errors: [{
        field: 'input',
        message: 'Quantity must be between 1 and 10,000',
        code: 'OUT_OF_RANGE'
      }]
    };
  }
  
  return {
    isValid: true,
    validatedValue: input,
    errors: []
  };
};

/**
 * Generic text validation (always passes)
 */
export const validateText = (input: string): ValidationResult => {
  return {
    isValid: true,
    validatedValue: input,
    errors: []
  };
};
