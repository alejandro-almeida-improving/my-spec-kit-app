# Data Model: Developer Productivity Tools Suite

**Feature**: 001-dev-tools-suite  
**Date**: December 5, 2025  
**Phase**: 1 - Design & Contracts

## Overview

This document defines the core entities, their properties, relationships, and state transitions for the Developer Productivity Tools Suite. Since all operations are client-side and stateless, the data model focuses on runtime state management and type definitions rather than persistent storage.

---

## Entity Definitions

### 1. Tool

Represents metadata and configuration for each of the 8 developer productivity tools.

**Properties**:
- `id`: `string` - Unique identifier (kebab-case, matches route: "case-converter", "uuid-generator", etc.)
- `name`: `string` - Display name ("Case Converter", "UUID Generator", etc.)
- `description`: `string` - Brief explanation of tool functionality
- `category`: `ToolCategory` - Grouping for organization ("text-processing" | "encoding" | "generation" | "conversion")
- `icon`: `LucideIcon` - Icon component from lucide-react
- `path`: `string` - Next.js route path ("/case-converter", "/uuid-generator", etc.)
- `priority`: `number` - User story priority (P1=1, P2=2, P3=3) for navigation ordering

**Relationships**:
- One Tool has zero or many ConversionOperations (one-to-many, runtime only)
- Tool defines validation rules via associated validator function

**Example**:
```typescript
{
  id: "base64-converter",
  name: "Base64 Converter",
  description: "Encode and decode Base64 strings",
  category: "encoding",
  icon: Code,
  path: "/base64-converter",
  priority: 1
}
```

**Validation Rules**:
- `id` must be unique across all tools
- `path` must start with "/" and match Next.js route structure
- `name` must be non-empty string
- `priority` must be 1, 2, or 3

---

### 2. ConversionOperation

Represents a single conversion, generation, or transformation action performed by a tool.

**Properties**:
- `operationId`: `string` - Unique identifier (UUID v4, generated client-side)
- `toolId`: `string` - Reference to the Tool that performed this operation
- `operationType`: `OperationType` - Type of action ("encode" | "decode" | "convert" | "generate" | "transform")
- `inputValue`: `string` - Raw user input (may be empty for generation operations)
- `outputValue`: `string` - Result of the operation
- `status`: `OperationStatus` - Current state ("idle" | "processing" | "success" | "error")
- `errorMessage`: `string | null` - Error details if status is "error"
- `timestamp`: `number` - Unix timestamp (milliseconds) when operation was performed
- `metadata`: `Record<string, any>` - Operation-specific data (e.g., selected hash algorithm, target case format)

**State Transitions**:
```
idle → processing → success
     ↓
     └─→ error
```

**Example**:
```typescript
{
  operationId: "550e8400-e29b-41d4-a716-446655440000",
  toolId: "hash-generator",
  operationType: "generate",
  inputValue: "password123",
  outputValue: "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f",
  status: "success",
  errorMessage: null,
  timestamp: 1701792000000,
  metadata: {
    algorithm: "SHA-256"
  }
}
```

**Validation Rules**:
- `operationId` must be a valid UUID v4
- `toolId` must reference an existing Tool
- `status` transitions must follow defined state machine
- `errorMessage` is required when status is "error", null otherwise
- `timestamp` must be a positive integer

**Lifecycle**:
1. User initiates action (clicks button, changes input)
2. Operation created with status "idle"
3. Validation runs → if invalid, transition to "error"
4. If valid, transition to "processing"
5. Conversion function executes
6. On success: set outputValue, transition to "success"
7. On error: set errorMessage, transition to "error"

---

### 3. UserInput

Represents validated user input with associated constraints and error states.

**Properties**:
- `rawValue`: `string` - Unprocessed input string from user
- `validatedValue`: `string | null` - Processed input after validation (null if invalid)
- `isValid`: `boolean` - Whether input passes validation rules
- `errors`: `ValidationError[]` - Array of validation errors (empty if valid)
- `toolId`: `string` - Reference to Tool for context-specific validation
- `inputType`: `InputType` - Expected format ("text" | "number" | "binary" | "hexadecimal" | "base64" | "url")

**Nested Type: ValidationError**:
```typescript
{
  field: string;        // "input" or specific field name
  message: string;      // Human-readable error description
  code: string;         // Machine-readable error code ("INVALID_FORMAT", "OUT_OF_RANGE", etc.)
}
```

**Example**:
```typescript
{
  rawValue: "12345XYZ",
  validatedValue: null,
  isValid: false,
  errors: [
    {
      field: "input",
      message: "Invalid binary number. Binary numbers can only contain 0 and 1.",
      code: "INVALID_BINARY_FORMAT"
    }
  ],
  toolId: "number-base-converter",
  inputType: "binary"
}
```

**Validation Rules by Tool**:

| Tool | Input Type | Validation Logic |
|------|-----------|------------------|
| Case Converter | text | No validation (all strings accepted) |
| UUID Generator | N/A | No input required |
| Base64 Converter (encode) | text | No validation |
| Base64 Converter (decode) | base64 | Regex: `^[A-Za-z0-9+/]*={0,2}$` |
| URL Encoder | text/url | No validation (both operations accept any string) |
| Timestamp (to date) | number | Range: 0 to 2^53-1 (JavaScript safe integer limit) |
| Timestamp (to timestamp) | text | Parse as Date, check `isNaN(date.getTime())` |
| Hash Generator | text | No validation (empty string allowed) |
| Lorem Generator | number | Must be positive integer (1 to 10,000) |
| Number Base Converter | binary/hex/octal/decimal | Regex per base, e.g., binary: `^[01]+$` |

**Error Codes**:
- `INVALID_FORMAT`: Input doesn't match expected pattern
- `OUT_OF_RANGE`: Numeric input outside valid range
- `EMPTY_REQUIRED`: Field is required but empty
- `PARSE_ERROR`: Unable to parse input as expected type

---

### 4. ClipboardAction

Represents a copy-to-clipboard operation with success/failure feedback.

**Properties**:
- `content`: `string` - Text content to copy
- `status`: `ClipboardStatus` - Result of copy operation ("pending" | "success" | "error")
- `timestamp`: `number` - When the copy was attempted
- `errorMessage`: `string | null` - Browser error if copy failed

**State Transitions**:
```
pending → success
        ↓
        └─→ error
```

**Example**:
```typescript
{
  content: "550e8400-e29b-41d4-a716-446655440000",
  status: "success",
  timestamp: 1701792000000,
  errorMessage: null
}
```

**Validation Rules**:
- `content` must be non-empty string
- `status` must follow state transition rules
- `errorMessage` is required when status is "error"

---

## Enumerations

### ToolCategory
```typescript
type ToolCategory = 
  | "text-processing"    // Case Converter
  | "encoding"           // Base64, URL Encoder
  | "generation"         // UUID, Hash, Lorem
  | "conversion";        // Timestamp, Number Base
```

### OperationType
```typescript
type OperationType = 
  | "encode"             // Base64 encode, URL encode
  | "decode"             // Base64 decode, URL decode
  | "convert"            // Case conversion, Base conversion, Timestamp conversion
  | "generate"           // UUID, Hash, Lorem generation
  | "transform";         // Generic transformation
```

### OperationStatus
```typescript
type OperationStatus = 
  | "idle"               // Initial state
  | "processing"         // Operation in progress
  | "success"            // Completed successfully
  | "error";             // Failed with error
```

### InputType
```typescript
type InputType = 
  | "text"               // Plain text (any string)
  | "number"             // Numeric input (integers/floats)
  | "binary"             // Binary digits (0-1)
  | "hexadecimal"        // Hex digits (0-9, A-F)
  | "octal"              // Octal digits (0-7)
  | "decimal"            // Decimal digits (0-9)
  | "base64"             // Base64 encoded string
  | "url";               // URL/URI string
```

### ClipboardStatus
```typescript
type ClipboardStatus = 
  | "pending"            // Copy initiated
  | "success"            // Copied successfully
  | "error";             // Copy failed
```

---

## Relationships

```
Tool (1) ──< (0..*) ConversionOperation
  │
  └─────> ValidationRules (implicit via toolId)

UserInput (*) ──> (1) Tool (via toolId reference)

ConversionOperation (1) ──> (1) UserInput (implicit: inputValue comes from UserInput.validatedValue)

ClipboardAction (1) ──> (1) ConversionOperation.outputValue (content to copy)
```

**Key Points**:
- No persistent storage: All entities exist only in component state during runtime
- No relationships are persisted: Each page load starts with fresh state
- Tool metadata is static (defined in code, not user-modifiable)
- Operations are ephemeral: Not saved between sessions

---

## Component State Structure

Each tool page component maintains the following state shape:

```typescript
interface ToolPageState {
  // Input management
  input: UserInput;
  
  // Operation tracking
  currentOperation: ConversionOperation | null;
  
  // UI state
  isProcessing: boolean;
  
  // Clipboard feedback
  clipboardAction: ClipboardAction | null;
  
  // Tool-specific configuration
  config: Record<string, any>; // e.g., { algorithm: "SHA-256", format: "uppercase" }
}
```

**Example (Hash Generator state)**:
```typescript
{
  input: {
    rawValue: "password123",
    validatedValue: "password123",
    isValid: true,
    errors: [],
    toolId: "hash-generator",
    inputType: "text"
  },
  currentOperation: {
    operationId: "abc123",
    toolId: "hash-generator",
    operationType: "generate",
    inputValue: "password123",
    outputValue: "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f",
    status: "success",
    errorMessage: null,
    timestamp: 1701792000000,
    metadata: { algorithm: "SHA-256" }
  },
  isProcessing: false,
  clipboardAction: null,
  config: {
    algorithm: "SHA-256"
  }
}
```

---

## Validation Functions

Each tool implements a validator function conforming to this signature:

```typescript
type ValidatorFunction = (
  input: string,
  config?: Record<string, any>
) => ValidationResult;

interface ValidationResult {
  isValid: boolean;
  validatedValue: string | null;
  errors: ValidationError[];
}
```

**Implementation Examples**:

```typescript
// Base64 Decoder Validator
export const validateBase64 = (input: string): ValidationResult => {
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
  
  if (!base64Regex.test(input)) {
    return {
      isValid: false,
      validatedValue: null,
      errors: [{
        field: "input",
        message: "Invalid Base64 string. Must contain only A-Z, a-z, 0-9, +, /, and optional = padding.",
        code: "INVALID_BASE64_FORMAT"
      }]
    };
  }
  
  return {
    isValid: true,
    validatedValue: input,
    errors: []
  };
};

// Number Base Validator
export const validateNumberBase = (
  input: string,
  config: { fromBase: number }
): ValidationResult => {
  const patterns: Record<number, RegExp> = {
    2: /^[01]+$/,
    8: /^[0-7]+$/,
    10: /^[0-9]+$/,
    16: /^[0-9A-Fa-f]+$/
  };
  
  const pattern = patterns[config.fromBase];
  
  if (!pattern.test(input)) {
    const baseName = { 2: "binary", 8: "octal", 10: "decimal", 16: "hexadecimal" }[config.fromBase];
    return {
      isValid: false,
      validatedValue: null,
      errors: [{
        field: "input",
        message: `Invalid ${baseName} number. Only digits valid for base ${config.fromBase} are allowed.`,
        code: "INVALID_BASE_FORMAT"
      }]
    };
  }
  
  return {
    isValid: true,
    validatedValue: input.toUpperCase(),
    errors: []
  };
};
```

---

## Edge Cases & Error Handling

### Empty Input
- **Case Converter**: Display placeholder text, disable convert button
- **UUID Generator**: No input needed, always generates
- **Base64/URL Encoder**: Empty string is valid (produces empty result)
- **Timestamp**: Show current time by default
- **Hash Generator**: Empty string is valid (produces hash of empty string)
- **Lorem Generator**: Default to 3 paragraphs if no count specified
- **Number Base Converter**: Disable convert button until valid input

### Large Input (>1MB)
- Display warning: "Large input detected. Processing may take a few seconds."
- Use `setTimeout` to yield control back to browser (prevent UI freeze)
- Consider streaming processing for very large inputs (future enhancement)

### Invalid Input
- Show inline error message below input field
- Highlight input field with red border
- Disable action button until input is valid
- Clear output area

### Clipboard Errors
- If `navigator.clipboard` not available: Show "Copy to clipboard not supported" message
- If permission denied: Show "Please grant clipboard permission" with instructions
- If copy fails: Fallback to `document.execCommand('copy')` method

---

## Summary

The data model is optimized for client-side, stateless operation with:
- **4 core entities**: Tool, ConversionOperation, UserInput, ClipboardAction
- **5 enumerations**: ToolCategory, OperationType, OperationStatus, InputType, ClipboardStatus
- **Type-safe validation**: Each tool has a dedicated validator function
- **Clear state management**: Component state follows consistent pattern across all tools
- **Error handling**: Comprehensive validation with user-friendly error messages

All entities are ephemeral (runtime only) with no persistence layer, aligning with the static export architecture defined in the constitution and research phase.

---

**Next Step**: Define TypeScript interfaces in `contracts/tool-interfaces.ts`.
