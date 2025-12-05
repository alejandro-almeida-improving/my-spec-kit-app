/**
 * TypeScript Types and Interfaces for Developer Productivity Tools Suite
 * Feature: 001-dev-tools-suite
 */

import { LucideIcon } from 'lucide-react';

// ============================================================================
// ENUMERATIONS
// ============================================================================

export type ToolCategory = 
  | 'text-processing'
  | 'encoding'
  | 'generation'
  | 'conversion';

export type OperationType = 
  | 'encode'
  | 'decode'
  | 'convert'
  | 'generate'
  | 'transform';

export type OperationStatus = 
  | 'idle'
  | 'processing'
  | 'success'
  | 'error';

export type InputType = 
  | 'text'
  | 'number'
  | 'binary'
  | 'hexadecimal'
  | 'octal'
  | 'decimal'
  | 'base64'
  | 'url';

export type ClipboardStatus = 
  | 'pending'
  | 'success'
  | 'error';

// ============================================================================
// CORE ENTITIES
// ============================================================================

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: LucideIcon;
  path: string;
  priority: number;
}

export interface ConversionOperation {
  operationId: string;
  toolId: string;
  operationType: OperationType;
  inputValue: string;
  outputValue: string;
  status: OperationStatus;
  errorMessage: string | null;
  timestamp: number;
  metadata: Record<string, unknown>;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface UserInput {
  rawValue: string;
  validatedValue: string | null;
  isValid: boolean;
  errors: ValidationError[];
  toolId: string;
  inputType: InputType;
}

export interface ClipboardAction {
  content: string;
  status: ClipboardStatus;
  timestamp: number;
  errorMessage: string | null;
}

// ============================================================================
// VALIDATION
// ============================================================================

export interface ValidationResult {
  isValid: boolean;
  validatedValue: string | null;
  errors: ValidationError[];
}

export type ValidatorFunction = (
  input: string,
  config?: Record<string, unknown>
) => ValidationResult;

// ============================================================================
// COMPONENT STATE
// ============================================================================

export interface ToolPageState {
  input: UserInput;
  currentOperation: ConversionOperation | null;
  isProcessing: boolean;
  clipboardAction: ClipboardAction | null;
  config: Record<string, unknown>;
}
