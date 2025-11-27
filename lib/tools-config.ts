import { Tool } from './types';
import { 
  Type, 
  FileText, 
  Binary, 
  Link, 
  Fingerprint, 
  Shield, 
  Clock, 
  Calculator 
} from 'lucide-react';

export const tools: Tool[] = [
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text between different cases (camel, snake, kebab, etc.)',
    icon: Type,
    path: '/tools/case-converter',
    category: 'Converters'
  },
  {
    id: 'lorem-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for your designs',
    icon: FileText,
    path: '/tools/lorem-generator',
    category: 'Generators'
  },
  {
    id: 'base64-converter',
    name: 'Base64 Converter',
    description: 'Encode and decode Base64 strings',
    icon: Binary,
    path: '/tools/base64-converter',
    category: 'Encoders'
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder',
    description: 'Encode and decode URLs',
    icon: Link,
    path: '/tools/url-encoder',
    category: 'Encoders'
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate random UUIDs (v4)',
    icon: Fingerprint,
    path: '/tools/uuid-generator',
    category: 'Security'
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Calculate MD5, SHA-1, SHA-256, and SHA-512 hashes',
    icon: Shield,
    path: '/tools/hash-generator',
    category: 'Security'
  },
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    description: 'Convert between Unix timestamps and human-readable dates',
    icon: Clock,
    path: '/tools/timestamp-converter',
    category: 'Converters'
  },
  {
    id: 'number-base-converter',
    name: 'Number Base Converter',
    description: 'Convert numbers between binary, octal, decimal, and hex',
    icon: Calculator,
    path: '/tools/number-base-converter',
    category: 'Converters'
  }
];
