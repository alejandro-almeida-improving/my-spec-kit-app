'use client';

/**
 * URL Encoder Page
 * Feature: 001-dev-tools-suite / User Story 4
 */

import { useState } from 'react';
import { ToolLayout } from '@/components/tool-layout';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { encodeURL, decodeURL } from '@/lib/conversions/url-encoder';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';
import { Copy, Check } from 'lucide-react';

export default function URLEncoderPage() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    setError('');
    setCopied(false);

    if (!input.trim()) {
      setError('Input cannot be empty');
      setOutput('');
      return;
    }

    try {
      if (mode === 'encode') {
        const result = encodeURL(input);
        setOutput(result);
      } else {
        const result = decodeURL(input);
        setOutput(result);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Conversion failed';
      setError(errorMessage);
      setOutput('');
      toast.error(errorMessage);
    }
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

  const handleTabChange = (value: string) => {
    setMode(value as 'encode' | 'decode');
    setInput('');
    setOutput('');
    setError('');
    setCopied(false);
  };

  return (
    <ToolLayout
      title="URL Encoder"
      description="Encode text for URLs or decode URL-encoded strings"
    >
      <Tabs value={mode} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="encode">Encode</TabsTrigger>
          <TabsTrigger value="decode">Decode</TabsTrigger>
        </TabsList>

        <TabsContent value="encode" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="encode-input">Text to Encode</Label>
            <Textarea
              id="encode-input"
              placeholder="Enter text to encode for URLs (e.g., Hello World & Co.)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={6}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Special characters like spaces, &, =, ? will be encoded
            </p>
          </div>

          <Button onClick={handleConvert} className="w-full" size="lg">
            Encode for URL
          </Button>
        </TabsContent>

        <TabsContent value="decode" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="decode-input">URL-Encoded Text to Decode</Label>
            <Textarea
              id="decode-input"
              placeholder="Enter URL-encoded text to decode (e.g., Hello%20World%20%26%20Co.)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={6}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Text with %XX encoding will be decoded to original characters
            </p>
          </div>

          <Button onClick={handleConvert} className="w-full" size="lg">
            Decode from URL
          </Button>
        </TabsContent>

        {error && (
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <p className="text-sm text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}

        {output && !error && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Output</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
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

        <div className="text-sm text-muted-foreground space-y-1">
          <p>🔗 Encode: Spaces → %20, & → %26, = → %3D</p>
          <p>📝 Decode: %XX → Original characters</p>
          <p>✅ Handles all special characters and UTF-8</p>
        </div>
      </Tabs>
    </ToolLayout>
  );
}
