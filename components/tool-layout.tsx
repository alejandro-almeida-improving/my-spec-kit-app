'use client';

/**
 * Tool Layout Component - Shared wrapper for all tool pages
 * Feature: 001-dev-tools-suite
 */

import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function ToolLayout({ title, description, children }: ToolLayoutProps) {
  return (
    <div className="container max-w-4xl py-8 px-4 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
