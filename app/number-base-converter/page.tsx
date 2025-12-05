'use client';

/**
 * Number Base Converter Page
 * Feature: 001-dev-tools-suite / User Story 8
 */

import { useState } from 'react';
import { ToolLayout } from '@/components/tool-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { convertToAllBases, getBaseDescription, NumberBase } from '@/lib/conversions/number-base-converter';
import { validateNumberBase } from '@/lib/validation';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';
import { Copy, Check } from 'lucide-react';

export default function NumberBaseConverterPage() {
  const [input, setInput] = useState('');
  const [fromBase, setFromBase] = useState<NumberBase>(10);
  const [output, setOutput] = useState<{
    binary: string;
    octal: string;
    decimal: string;
    hexadecimal: string;
  } | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  const handleConvert = () => {
    setError('');
    setCopied('');

    if (!input.trim()) {
      setError('Input cannot be empty');
      setOutput(null);
      return;
    }

    const validation = validateNumberBase(input.trim(), { fromBase });
    if (!validation.isValid) {
      setError(validation.errors[0]?.message || 'Invalid input');
      setOutput(null);
      return;
    }

    try {
      const result = convertToAllBases(input.trim(), fromBase);
      setOutput(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Conversion failed';
      setError(errorMessage);
      setOutput(null);
      toast.error(errorMessage);
    }
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

  const getPlaceholder = () => {
    switch (fromBase) {
      case 2: return 'Enter binary number (e.g., 11111111)';
      case 8: return 'Enter octal number (e.g., 377)';
      case 10: return 'Enter decimal number (e.g., 255)';
      case 16: return 'Enter hexadecimal number (e.g., FF)';
    }
  };

  return (
    <ToolLayout
      title="Number Base Converter"
      description="Convert numbers between binary, octal, decimal, and hexadecimal"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="from-base">Source Base</Label>
          <Select value={fromBase.toString()} onValueChange={(value) => setFromBase(parseInt(value) as NumberBase)}>
            <SelectTrigger id="from-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">Binary (Base 2)</SelectItem>
              <SelectItem value="8">Octal (Base 8)</SelectItem>
              <SelectItem value="10">Decimal (Base 10)</SelectItem>
              <SelectItem value="16">Hexadecimal (Base 16)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="input">Input Number</Label>
          <Input
            id="input"
            type="text"
            placeholder={getPlaceholder()}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground">
            {getBaseDescription(fromBase)}
          </p>
        </div>

        <Button onClick={handleConvert} className="w-full" size="lg">
          Convert to All Bases
        </Button>

        {error && (
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <p className="text-sm text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}

        {output && !error && (
          <div className="space-y-3">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Binary (Base 2)</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(output.binary, 'Binary')}
                    >
                      {copied === 'Binary' ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="p-3 bg-muted rounded-md font-mono text-sm break-all">
                    {output.binary}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Octal (Base 8)</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(output.octal, 'Octal')}
                    >
                      {copied === 'Octal' ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="p-3 bg-muted rounded-md font-mono text-sm">
                    {output.octal}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Decimal (Base 10)</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(output.decimal, 'Decimal')}
                    >
                      {copied === 'Decimal' ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="p-3 bg-muted rounded-md font-mono text-sm">
                    {output.decimal}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Hexadecimal (Base 16)</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(output.hexadecimal, 'Hexadecimal')}
                    >
                      {copied === 'Hexadecimal' ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="p-3 bg-muted rounded-md font-mono text-sm">
                    {output.hexadecimal}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="text-sm text-muted-foreground space-y-1">
          <p>🔢 <strong>Binary (Base 2)</strong>: Uses digits 0-1</p>
          <p>8️⃣ <strong>Octal (Base 8)</strong>: Uses digits 0-7</p>
          <p>🔟 <strong>Decimal (Base 10)</strong>: Uses digits 0-9</p>
          <p>🔠 <strong>Hexadecimal (Base 16)</strong>: Uses digits 0-9, A-F</p>
          <p className="pt-2">💡 Example: 255₁₀ = FF₁₆ = 377₈ = 11111111₂</p>
        </div>
      </div>
    </ToolLayout>
  );
}
