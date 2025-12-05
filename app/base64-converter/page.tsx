'use client';

/**
 * Base64 Converter Page
 * Feature: 001-dev-tools-suite / User Story 3
 */

import { useState } from 'react';
import { ToolLayout } from '@/components/tool-layout';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { encodeBase64, decodeBase64 } from '@/lib/conversions/base64-converter';
import { validateBase64 } from '@/lib/validation';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';
import { Copy, Check } from 'lucide-react';

export default function Base64ConverterPage() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    setError('');
    setCopied(false);

    try {
      if (mode === 'encode') {
        const result = encodeBase64(input);
        setOutput(result);
      } else {
        // Validate before decoding
        const validation = validateBase64(input);
        if (!validation.isValid) {
          setError(validation.errors[0]?.message || 'Invalid Base64 string');
          setOutput('');
          return;
        }
        const result = decodeBase64(input);
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
      title="Base64 Converter"
      description="Encode text to Base64 or decode Base64 strings back to text"
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
              placeholder="Enter text to encode to Base64..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={6}
              className="font-mono"
            />
          </div>

          <Button onClick={handleConvert} className="w-full" size="lg">
            Encode to Base64
          </Button>
        </TabsContent>

        <TabsContent value="decode" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="decode-input">Base64 to Decode</Label>
            <Textarea
              id="decode-input"
              placeholder="Enter Base64 string to decode..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={6}
              className="font-mono"
            />
          </div>

          <Button onClick={handleConvert} className="w-full" size="lg">
            Decode from Base64
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
          <p>✅ UTF-8 character support</p>
          <p>🔄 Convert between text and Base64 encoding</p>
          <p>✨ Automatic validation for decode operations</p>
        </div>
      </Tabs>
    </ToolLayout>
  );
}
