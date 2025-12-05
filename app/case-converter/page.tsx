'use client';

/**
 * Case Converter Page
 * Feature: 001-dev-tools-suite / User Story 1
 */

import { useState } from 'react';
import { ToolLayout } from '@/components/tool-layout';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { convertCase, CaseFormat } from '@/lib/conversions/case-converter';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';
import { Copy, Check } from 'lucide-react';

export default function CaseConverterPage() {
  const [input, setInput] = useState('');
  const [format, setFormat] = useState<CaseFormat>('lowercase');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    const result = convertCase(input, format);
    setOutput(result);
    setCopied(false);
  };

  const handleCopy = async () => {
    const result = await copyToClipboard(output);
    if (result.success) {
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error(result.error || 'Failed to copy');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
      handleConvert();
    }
  };

  return (
    <ToolLayout
      title="Case Converter"
      description="Convert text between lowercase, UPPERCASE, Title Case, and camelCase formats"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input">Input Text</Label>
          <Textarea
            id="input"
            placeholder="Enter text to convert..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            rows={6}
            className="font-mono"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="format">Target Format</Label>
          <Select value={format} onValueChange={(value) => setFormat(value as CaseFormat)}>
            <SelectTrigger id="format">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lowercase">lowercase</SelectItem>
              <SelectItem value="uppercase">UPPERCASE</SelectItem>
              <SelectItem value="titlecase">Title Case</SelectItem>
              <SelectItem value="camelcase">camelCase</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleConvert} className="w-full" size="lg">
          Convert
        </Button>

        {output && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Output</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    disabled={!output}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <Textarea
                  value={output}
                  readOnly
                  rows={6}
                  className="font-mono bg-muted"
                />
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-sm text-muted-foreground">
          <p>💡 Tip: Press Cmd+Enter to convert quickly</p>
        </div>
      </div>
    </ToolLayout>
  );
}
