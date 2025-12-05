/**
 * Error Handling Utilities for Developer Productivity Tools Suite
 * Feature: 001-dev-tools-suite
 */

import { ValidationError } from './types';

/**
 * Create a validation error object
 */
export function createValidationError(
  field: string,
  message: string,
  code: string
): ValidationError {
  return { field, message, code };
}

/**
 * Format validation errors for display
 */
export function formatValidationErrors(errors: ValidationError[]): string {
  return errors.map(error => error.message).join('. ');
}

/**
 * Create a generic error message
 */
export function createErrorMessage(operation: string, details?: string): string {
  const baseMessage = `Failed to ${operation}`;
  return details ? `${baseMessage}: ${details}` : baseMessage;
}

/**
 * Error codes for consistent error handling
 */
export const ERROR_CODES = {
  INVALID_FORMAT: 'INVALID_FORMAT',
  OUT_OF_RANGE: 'OUT_OF_RANGE',
  EMPTY_REQUIRED: 'EMPTY_REQUIRED',
  PARSE_ERROR: 'PARSE_ERROR',
  CONVERSION_FAILED: 'CONVERSION_FAILED',
  CLIPBOARD_FAILED: 'CLIPBOARD_FAILED',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
} as const;

/**
 * Get user-friendly error message for error code
 */
export function getErrorMessage(code: string, context?: string): string {
  const messages: Record<string, string> = {
    [ERROR_CODES.INVALID_FORMAT]: 'Invalid input format',
    [ERROR_CODES.OUT_OF_RANGE]: 'Value is out of acceptable range',
    [ERROR_CODES.EMPTY_REQUIRED]: 'This field is required',
    [ERROR_CODES.PARSE_ERROR]: 'Unable to parse input',
    [ERROR_CODES.CONVERSION_FAILED]: 'Conversion operation failed',
    [ERROR_CODES.CLIPBOARD_FAILED]: 'Failed to copy to clipboard',
    [ERROR_CODES.UNKNOWN_ERROR]: 'An unexpected error occurred'
  };
  
  const baseMessage = messages[code] || messages[ERROR_CODES.UNKNOWN_ERROR];
  return context ? `${baseMessage}: ${context}` : baseMessage;
}
