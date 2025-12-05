/**
 * Tools Configuration for Developer Productivity Tools Suite
 * Feature: 001-dev-tools-suite
 */

import { Tool } from './types';
import {
  Type,
  Key,
  Code,
  Link,
  Clock,
  Hash,
  FileText,
  Binary
} from 'lucide-react';

/**
 * Metadata for all 8 developer tools
 * Ordered by priority (P1, P2, P3)
 */
export const TOOLS: Tool[] = [
  // P1 Tools
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text between lowercase, UPPERCASE, Title Case, and camelCase',
    category: 'text-processing',
    icon: Type,
    path: '/case-converter',
    priority: 1
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate standards-compliant UUIDs (v4)',
    category: 'generation',
    icon: Key,
    path: '/uuid-generator',
    priority: 1
  },
  {
    id: 'base64-converter',
    name: 'Base64 Converter',
    description: 'Encode and decode Base64 strings',
    category: 'encoding',
    icon: Code,
    path: '/base64-converter',
    priority: 1
  },
  // P2 Tools
  {
    id: 'url-encoder',
    name: 'URL Encoder',
    description: 'Encode and decode URL strings',
    category: 'encoding',
    icon: Link,
    path: '/url-encoder',
    priority: 2
  },
  {
    id: 'timestamp',
    name: 'Timestamp Converter',
    description: 'Convert between Unix timestamps and human-readable dates',
    category: 'conversion',
    icon: Clock,
    path: '/timestamp',
    priority: 2
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes',
    category: 'generation',
    icon: Hash,
    path: '/hash-generator',
    priority: 2
  },
  // P3 Tools
  {
    id: 'lorem-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate Lorem Ipsum placeholder text',
    category: 'generation',
    icon: FileText,
    path: '/lorem-generator',
    priority: 3
  },
  {
    id: 'number-base-converter',
    name: 'Number Base Converter',
    description: 'Convert between binary, decimal, hexadecimal, and octal',
    category: 'conversion',
    icon: Binary,
    path: '/number-base-converter',
    priority: 3
  }
];

/**
 * Get tool by ID
 */
export function getToolById(id: string): Tool | undefined {
  return TOOLS.find(tool => tool.id === id);
}

/**
 * Get tools by category
 */
export function getToolsByCategory(category: string): Tool[] {
  return TOOLS.filter(tool => tool.category === category);
}

/**
 * Get tools by priority
 */
export function getToolsByPriority(priority: number): Tool[] {
  return TOOLS.filter(tool => tool.priority === priority);
}
