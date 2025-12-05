/**
 * TypeScript Type Contracts for Developer Productivity Tools Suite
 * 
 * This file defines all interfaces, types, and enums used across the application.
 * These contracts ensure type safety and consistency between components.
 * 
 * Feature: 001-dev-tools-suite
 * Date: December 5, 2025
 */

import { LucideIcon } from 'lucide-react';

// ============================================================================
// ENUMERATIONS
// ============================================================================

/**
 * Categories for grouping tools in the navigation
 */
export type ToolCategory = 
  | 'text-processing'    // Case Converter
  | 'encoding'           // Base64, URL Encoder
  | 'generation'         // UUID, Hash, Lorem
  | 'conversion';        // Timestamp, Number Base

/**
 * Types of operations that can be performed
 */
export type OperationType = 
  | 'encode'             // Base64 encode, URL encode
  | 'decode'             // Base64 decode, URL decode
  | 'convert'            // Case conversion, Base conversion, Timestamp conversion
  | 'generate'           // UUID, Hash, Lorem generation
  | 'transform';         // Generic transformation

/**
 * Status states for conversion operations
 */
export type OperationStatus = 
  | 'idle'               // Initial state
  | 'processing'         // Operation in progress
  | 'success'            // Completed successfully
  | 'error';             // Failed with error

/**
 * Input type classifications for validation
 */
export type InputType = 
  | 'text'               // Plain text (any string)
  | 'number'             // Numeric input (integers/floats)
  | 'binary'             // Binary digits (0-1)
  | 'hexadecimal'        // Hex digits (0-9, A-F)
  | 'octal'              // Octal digits (0-7)
  | 'decimal'            // Decimal digits (0-9)
  | 'base64'             // Base64 encoded string
  | 'url';               // URL/URI string

/**
 * Clipboard operation status
 */
export type ClipboardStatus = 
  | 'pending'            // Copy initiated
  | 'success'            // Copied successfully
  | 'error';             // Copy failed

// ============================================================================
// CORE ENTITIES
// ============================================================================

/**
 * Represents a single developer tool in the suite
 */
export interface Tool {
  /** Unique identifier (kebab-case, matches route) */
  id: string;
  
  /** Display name for UI */
  name: string;
  
  /** Brief description of functionality */
  description: string;
  
  /** Tool category for organization */
  category: ToolCategory;
  
  /** Lucide icon component */
  icon: LucideIcon;
  
  /** Next.js route path */
  path: string;
  
  /** Priority for ordering (1=P1, 2=P2, 3=P3) */
  priority: number;
}

/**
 * Represents a single conversion/generation operation
 */
export interface ConversionOperation {
  /** Unique operation identifier (UUID v4) */
  operationId: string;
  
  /** Tool that performed this operation */
  toolId: string;
  
  /** Type of operation performed */
  operationType: OperationType;
  
  /** Raw user input */
  inputValue: string;
  
  /** Result of the operation */
  outputValue: string;
  
  /** Current operation status */
  status: OperationStatus;
  
  /** Error details if status is 'error' */
  errorMessage: string | null;
  
  /** Unix timestamp (milliseconds) */
  timestamp: number;
  
  /** Operation-specific metadata */
  metadata: Record<string, any>;
}

/**
 * Represents a validation error
 */
export interface ValidationError {
  /** Field name that failed validation */
  field: string;
  
  /** Human-readable error message */
  message: string;
  
  /** Machine-readable error code */
  code: string;
}

/**
 * Represents validated user input
 */
export interface UserInput {
  /** Unprocessed input from user */
  rawValue: string;
  
  /** Validated/processed input (null if invalid) */
  validatedValue: string | null;
  
  /** Whether input passes validation */
  isValid: boolean;
  
  /** Array of validation errors */
  errors: ValidationError[];
  
  /** Tool context for validation */
  toolId: string;
  
  /** Expected input format */
  inputType: InputType;
}

/**
 * Represents a clipboard copy operation
 */
export interface ClipboardAction {
  /** Text content to copy */
  content: string;
  
  /** Result status of copy operation */
  status: ClipboardStatus;
  
  /** When the copy was attempted */
  timestamp: number;
  
  /** Browser error if copy failed */
  errorMessage: string | null;
}

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Result of input validation
 */
export interface ValidationResult {
  /** Whether input is valid */
  isValid: boolean;
  
  /** Validated/processed value (null if invalid) */
  validatedValue: string | null;
  
  /** Array of validation errors */
  errors: ValidationError[];
}

/**
 * Validator function signature
 */
export type ValidatorFunction = (
  input: string,
  config?: Record<string, any>
) => ValidationResult;

// ============================================================================
// COMPONENT STATE
// ============================================================================

/**
 * State structure for tool page components
 */
export interface ToolPageState {
  /** Current user input state */
  input: UserInput;
  
  /** Current operation being performed */
  currentOperation: ConversionOperation | null;
  
  /** Whether operation is in progress */
  isProcessing: boolean;
  
  /** Last clipboard action */
  clipboardAction: ClipboardAction | null;
  
  /** Tool-specific configuration */
  config: Record<string, any>;
}

// ============================================================================
// TOOL-SPECIFIC CONFIGURATIONS
// ============================================================================

/**
 * Configuration for Case Converter
 */
export interface CaseConverterConfig {
  /** Target case format */
  format: 'lowercase' | 'uppercase' | 'titlecase' | 'camelcase';
}

/**
 * Configuration for Base64 Converter
 */
export interface Base64ConverterConfig {
  /** Operation mode */
  mode: 'encode' | 'decode';
}

/**
 * Configuration for URL Encoder
 */
export interface URLEncoderConfig {
  /** Operation mode */
  mode: 'encode' | 'decode';
}

/**
 * Configuration for Timestamp Converter
 */
export interface TimestampConfig {
  /** Conversion direction */
  mode: 'toTimestamp' | 'toDate';
  
  /** Display format for dates */
  displayFormat: 'iso' | 'utc' | 'relative';
}

/**
 * Configuration for Hash Generator
 */
export interface HashGeneratorConfig {
  /** Hash algorithm */
  algorithm: 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512';
}

/**
 * Configuration for Lorem Generator
 */
export interface LoremGeneratorConfig {
  /** Unit type for generation */
  unit: 'words' | 'sentences' | 'paragraphs';
  
  /** Quantity to generate */
  count: number;
}

/**
 * Configuration for Number Base Converter
 */
export interface NumberBaseConfig {
  /** Source number base */
  fromBase: 2 | 8 | 10 | 16;
  
  /** Target number base */
  toBase: 2 | 8 | 10 | 16;
}

// ============================================================================
// CONVERSION FUNCTIONS
// ============================================================================

/**
 * Generic conversion function signature
 */
export type ConversionFunction<TConfig = Record<string, any>> = (
  input: string,
  config: TConfig
) => string;

/**
 * Async conversion function signature (for hash generation)
 */
export type AsyncConversionFunction<TConfig = Record<string, any>> = (
  input: string,
  config: TConfig
) => Promise<string>;

// ============================================================================
// COMPONENT PROPS
// ============================================================================

/**
 * Props for Sidebar navigation component
 */
export interface SidebarProps {
  /** Current active tool path */
  currentPath: string;
  
  /** Array of all tools */
  tools: Tool[];
}

/**
 * Props for ToolLayout wrapper component
 */
export interface ToolLayoutProps {
  /** Tool metadata */
  tool: Tool;
  
  /** Child components */
  children: React.ReactNode;
}

/**
 * Props for conversion result display
 */
export interface ConversionResultProps {
  /** Operation result */
  operation: ConversionOperation | null;
  
  /** Callback when copy button clicked */
  onCopy: (content: string) => void;
  
  /** Clipboard action state */
  clipboardAction: ClipboardAction | null;
}

/**
 * Props for input validation display
 */
export interface ValidationDisplayProps {
  /** User input state */
  input: UserInput;
  
  /** Callback when input changes */
  onChange: (value: string) => void;
  
  /** Placeholder text */
  placeholder?: string;
  
  /** Whether to use textarea (multiline) */
  multiline?: boolean;
}

/**
 * Props for tool configuration controls
 */
export interface ToolConfigProps<TConfig> {
  /** Current configuration */
  config: TConfig;
  
  /** Callback when config changes */
  onChange: (config: TConfig) => void;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Tool registry mapping tool IDs to metadata
 */
export type ToolRegistry = Record<string, Tool>;

/**
 * Validator registry mapping tool IDs to validator functions
 */
export type ValidatorRegistry = Record<string, ValidatorFunction>;

/**
 * Conversion function registry mapping tool IDs to conversion functions
 */
export type ConversionRegistry = Record<
  string,
  ConversionFunction | AsyncConversionFunction
>;

/**
 * Error code constants
 */
export const ERROR_CODES = {
  INVALID_FORMAT: 'INVALID_FORMAT',
  OUT_OF_RANGE: 'OUT_OF_RANGE',
  EMPTY_REQUIRED: 'EMPTY_REQUIRED',
  PARSE_ERROR: 'PARSE_ERROR',
  INVALID_BASE64_FORMAT: 'INVALID_BASE64_FORMAT',
  INVALID_BASE_FORMAT: 'INVALID_BASE_FORMAT',
  INVALID_TIMESTAMP: 'INVALID_TIMESTAMP',
  CLIPBOARD_ERROR: 'CLIPBOARD_ERROR',
} as const;

/**
 * Error code type
 */
export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Maximum input size (1MB in characters)
 */
export const MAX_INPUT_SIZE = 1_000_000;

/**
 * Debounce delay for real-time conversion (milliseconds)
 */
export const DEBOUNCE_DELAY = 300;

/**
 * Clipboard success feedback duration (milliseconds)
 */
export const CLIPBOARD_FEEDBACK_DURATION = 2000;

/**
 * Valid number bases for conversion
 */
export const VALID_BASES = [2, 8, 10, 16] as const;

/**
 * Hash algorithm options
 */
export const HASH_ALGORITHMS = ['MD5', 'SHA-1', 'SHA-256', 'SHA-512'] as const;

/**
 * Case format options
 */
export const CASE_FORMATS = ['lowercase', 'uppercase', 'titlecase', 'camelcase'] as const;
