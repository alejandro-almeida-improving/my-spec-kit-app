# Data Model: Developer Productivity Tools

**Feature**: Developer Productivity Tools
**Date**: November 27, 2025

## Entities

### Tool
Represents a productivity tool available in the application.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier (slug) for the tool (e.g., 'uuid-generator'). |
| `name` | `string` | Display name of the tool. |
| `description` | `string` | Short description of what the tool does. |
| `icon` | `LucideIcon` | Icon component to display in navigation. |
| `path` | `string` | Route path (e.g., '/tools/uuid-generator'). |
| `category` | `string` | Category (e.g., 'Converters', 'Generators'). |

### ToolState (Generic)
Represents the state of a specific tool.

| Field | Type | Description |
|-------|------|-------------|
| `input` | `string` | The user input value. |
| `output` | `string` | The result of the operation. |
| `error` | `string?` | Error message if operation failed. |
| `isLoading` | `boolean` | Whether the operation is in progress. |

### GeneratorConfig (Generic)
Configuration options for generator tools.

| Field | Type | Description |
|-------|------|-------------|
| `length` | `number?` | Length of generated content (e.g., for Lorem). |
| `type` | `string?` | Type of generation (e.g., 'paragraphs', 'words'). |
| `algorithm` | `string?` | Algorithm to use (e.g., 'SHA-256'). |

## Validation Rules

- **Input**:
  - `Number Base Converter`: Must be valid characters for the source base (e.g., 0-1 for Binary).
  - `Timestamp`: Must be a valid number (Unix timestamp).
- **Output**:
  - `UUID`: Must be a valid UUID v4 string.
  - `Base64`: Must be a valid Base64 string.

## State Management
- State is local to each tool page (using `useState`).
- No global state required for tool data.
- Sidebar state (collapsed/expanded) managed by `SidebarProvider`.
