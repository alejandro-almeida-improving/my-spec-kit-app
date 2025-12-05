'use client';

/**
 * Hash Generator Page
 * Feature: 001-dev-tools-suite / User Story 6
 */

import { useState } from 'react';
import { ToolLayout } from '@/components/tool-layout';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateHash, getHashLength, HashAlgorithm } from '@/lib/conversions/hash-generator';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';
import { Copy, Check, Hash } from 'lucide-react';

export default function HashGeneratorPage() {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setIsProcessing(true);
    setCopied(false);

    try {
      const hash = await generateHash(input, algorithm);
      setOutput(hash);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Hash generation failed';
      toast.error(errorMessage);
      setOutput('');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async () => {
    const result = await copyToClipboard(output);
    if (result.success) {
      setCopied(true);
      toast.success('Hash copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error(result.error || 'Failed to copy');
    }
  };

  const expectedLength = getHashLength(algorithm);

  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes for any text"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input">Input Text</Label>
          <Textarea
            id="input"
            placeholder="Enter text to hash..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground">
            Enter any text (including empty string) to generate a hash
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="algorithm">Hash Algorithm</Label>
          <Select value={algorithm} onValueChange={(value) => setAlgorithm(value as HashAlgorithm)}>
            <SelectTrigger id="algorithm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MD5">MD5 (32 characters)</SelectItem>
              <SelectItem value="SHA-1">SHA-1 (40 characters)</SelectItem>
              <SelectItem value="SHA-256">SHA-256 (64 characters)</SelectItem>
              <SelectItem value="SHA-512">SHA-512 (128 characters)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleGenerate} 
          className="w-full" 
          size="lg"
          disabled={isProcessing}
        >
          <Hash className="h-4 w-4 mr-2" />
          {isProcessing ? 'Generating...' : 'Generate Hash'}
        </Button>

        {output && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Hash Output ({algorithm})</Label>
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
                <div className="p-4 bg-muted rounded-md">
                  <code className="text-sm font-mono break-all">{output}</code>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Length: {output.length} characters</span>
                  <span>Expected: {expectedLength} characters</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-sm text-muted-foreground space-y-1">
          <p>🔐 <strong>MD5</strong>: Fast but not cryptographically secure (legacy use)</p>
          <p>✅ <strong>SHA-1</strong>: Better than MD5 but deprecated for security</p>
          <p>🛡️ <strong>SHA-256</strong>: Industry standard, highly secure</p>
          <p>🔒 <strong>SHA-512</strong>: Maximum security, longer hash</p>
          <p className="pt-2">💡 Same input always produces the same hash (deterministic)</p>
        </div>
      </div>
    </ToolLayout>
  );
}
