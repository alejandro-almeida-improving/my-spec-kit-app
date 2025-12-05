'use client';

/**
 * Timestamp Converter Page
 * Feature: 001-dev-tools-suite / User Story 5
 */

import { useState } from 'react';
import { ToolLayout } from '@/components/tool-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  timestampToDate,
  dateToTimestamp,
  getCurrentTimestamp,
  formatISO,
  formatUTC,
  formatLocale,
  formatRelativeTime,
  parseDate
} from '@/lib/conversions/timestamp';
import { validateTimestamp, validateDateString } from '@/lib/validation';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';
import { Copy, Check, Clock } from 'lucide-react';

export default function TimestampPage() {
  const [mode, setMode] = useState<'toDate' | 'toTimestamp'>('toDate');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<{
    timestamp?: number;
    iso?: string;
    utc?: string;
    locale?: string;
    relative?: string;
  }>({});
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  const handleConvert = () => {
    setError('');
    setCopied('');

    try {
      if (mode === 'toDate') {
        const validation = validateTimestamp(input);
        if (!validation.isValid) {
          setError(validation.errors[0]?.message || 'Invalid timestamp');
          setOutput({});
          return;
        }

        const timestamp = parseInt(input, 10);
        const date = timestampToDate(timestamp);

        setOutput({
          timestamp,
          iso: formatISO(date),
          utc: formatUTC(date),
          locale: formatLocale(date),
          relative: formatRelativeTime(date)
        });
      } else {
        const validation = validateDateString(input);
        if (!validation.isValid) {
          setError(validation.errors[0]?.message || 'Invalid date');
          setOutput({});
          return;
        }

        const date = parseDate(input);
        const timestamp = dateToTimestamp(date);

        setOutput({
          timestamp,
          iso: formatISO(date),
          utc: formatUTC(date),
          locale: formatLocale(date),
          relative: formatRelativeTime(date)
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Conversion failed';
      setError(errorMessage);
      setOutput({});
      toast.error(errorMessage);
    }
  };

  const handleCurrentTime = () => {
    const timestamp = getCurrentTimestamp();
    setInput(timestamp.toString());
    setMode('toDate');
    setError('');
    setCopied('');
  };

  const handleCopy = async (value: string, label: string) => {
    const result = await copyToClipboard(value);
    if (result.success) {
      setCopied(label);
      toast.success(`${label} copied to clipboard!`);
      setTimeout(() => setCopied(''), 2000);
    } else {
      toast.error(result.error || 'Failed to copy');
    }
  };

  const handleTabChange = (value: string) => {
    setMode(value as 'toDate' | 'toTimestamp');
    setInput('');
    setOutput({});
    setError('');
    setCopied('');
  };

  const hasOutput = Object.keys(output).length > 0;

  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert between Unix timestamps and human-readable dates"
    >
      <div className="space-y-4">
        <Button onClick={handleCurrentTime} variant="outline" className="w-full">
          <Clock className="h-4 w-4 mr-2" />
          Use Current Time
        </Button>

        <Tabs value={mode} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="toDate">Timestamp → Date</TabsTrigger>
            <TabsTrigger value="toTimestamp">Date → Timestamp</TabsTrigger>
          </TabsList>

          <TabsContent value="toDate" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timestamp-input">Unix Timestamp</Label>
              <Input
                id="timestamp-input"
                type="text"
                placeholder="Enter Unix timestamp (e.g., 1701792000)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Accepts both seconds and milliseconds
              </p>
            </div>

            <Button onClick={handleConvert} className="w-full" size="lg">
              Convert to Date
            </Button>
          </TabsContent>

          <TabsContent value="toTimestamp" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date-input">Date String</Label>
              <Input
                id="date-input"
                type="text"
                placeholder="Enter date (e.g., 2025-12-05 or Dec 5, 2025)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Accepts various date formats (ISO, locale, etc.)
              </p>
            </div>

            <Button onClick={handleConvert} className="w-full" size="lg">
              Convert to Timestamp
            </Button>
          </TabsContent>
        </Tabs>

        {error && (
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <p className="text-sm text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}

        {hasOutput && !error && (
          <div className="space-y-3">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Unix Timestamp</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(output.timestamp?.toString() || '', 'Timestamp')}
                    >
                      {copied === 'Timestamp' ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="p-3 bg-muted rounded-md font-mono text-sm">
                    {output.timestamp}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">ISO 8601</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(output.iso || '', 'ISO')}
                    >
                      {copied === 'ISO' ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="p-3 bg-muted rounded-md font-mono text-sm">
                    {output.iso}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">UTC String</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(output.utc || '', 'UTC')}
                    >
                      {copied === 'UTC' ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="p-3 bg-muted rounded-md font-mono text-sm">
                    {output.utc}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Locale String</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(output.locale || '', 'Locale')}
                    >
                      {copied === 'Locale' ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="p-3 bg-muted rounded-md font-mono text-sm">
                    {output.locale}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Relative Time</Label>
                  <div className="p-3 bg-muted rounded-md text-sm">
                    {output.relative}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="text-sm text-muted-foreground space-y-1">
          <p>⏰ Current Time button fills in the current Unix timestamp</p>
          <p>🔄 Supports conversion in both directions</p>
          <p>📋 Click copy icons to copy individual formats</p>
        </div>
      </div>
    </ToolLayout>
  );
}
