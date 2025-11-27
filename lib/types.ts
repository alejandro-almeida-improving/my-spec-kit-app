import { type LucideIcon } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  path: string;
  category: 'Converters' | 'Generators' | 'Encoders' | 'Security';
}

export interface ToolState<TInput = string, TOutput = string> {
  input: TInput;
  output: TOutput | null;
  error: string | null;
  isLoading: boolean;
}

export interface BaseConverterProps {
  defaultValue?: string;
}

export type HashAlgorithm = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512';

export type CaseType = 'lowercase' | 'uppercase' | 'camelCase' | 'snake_case' | 'kebab-case' | 'Title Case';

export type NumberBase = 2 | 8 | 10 | 16;
