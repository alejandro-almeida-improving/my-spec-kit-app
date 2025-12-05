'use client';

/**
 * Lorem Ipsum Generator Page
 * Feature: 001-dev-tools-suite / User Story 7
 */

import { useState } from 'react';
import { ToolLayout } from '@/components/tool-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { generateLorem, LoremUnit } from '@/lib/conversions/lorem-generator';
import { validateLoremQuantity } from '@/lib/validation';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';
import { Copy, Check, FileText } from 'lucide-react';

export default function LoremGeneratorPage() {
  const [quantity, setQuantity] = useState('5');
  const [unit, setUnit] = useState<LoremUnit>('paragraphs');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setError('');
    setCopied(false);

    const validation = validateLoremQuantity(quantity);
    if (!validation.isValid) {
      setError(validation.errors[0]?.message || 'Invalid quantity');
      setOutput('');
      return;
    }

    try {
      const count = parseInt(quantity, 10);
      
      // Additional unit-specific validation
      if (unit === 'words' && (count < 1 || count > 10000)) {
        setError('Word count must be between 1 and 10,000');
        setOutput('');
        return;
      }
      if (unit === 'sentences' && (count < 1 || count > 1000)) {
        setError('Sentence count must be between 1 and 1,000');
        setOutput('');
        return;
      }
      if (unit === 'paragraphs' && (count < 1 || count > 100)) {
        setError('Paragraph count must be between 1 and 100');
        setOutput('');
        return;
      }

      const result = generateLorem(count, unit);
      setOutput(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Generation failed';
      setError(errorMessage);
      setOutput('');
      toast.error(errorMessage);
    }
  };

  const handleCopy = async () => {
    const result = await copyToClipboard(output);
    if (result.success) {
      setCopied(true);
      toast.success('Lorem Ipsum copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error(result.error || 'Failed to copy');
    }
  };

  const getMaxQuantity = () => {
    switch (unit) {
      case 'words': return 10000;
      case 'sentences': return 1000;
      case 'paragraphs': return 100;
      default: return 10000;
    }
  };

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate traditional Lorem Ipsum placeholder text"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              max={getMaxQuantity()}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="unit">Unit Type</Label>
            <Select value={unit} onValueChange={(value) => setUnit(value as LoremUnit)}>
              <SelectTrigger id="unit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="words">Words (1-10,000)</SelectItem>
                <SelectItem value="sentences">Sentences (1-1,000)</SelectItem>
                <SelectItem value="paragraphs">Paragraphs (1-100)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleGenerate} className="w-full" size="lg">
          <FileText className="h-4 w-4 mr-2" />
          Generate Lorem Ipsum
        </Button>

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
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Generated Text</Label>
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
                  rows={12}
                  className="font-serif bg-muted text-sm leading-relaxed"
                />
                <div className="text-xs text-muted-foreground">
                  Generated {quantity} {unit}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-sm text-muted-foreground space-y-1">
          <p>📝 Traditional Lorem Ipsum text from classic Latin literature</p>
          <p>🎲 Randomized generation for varied output each time</p>
          <p>✨ Perfect for mockups, wireframes, and design prototypes</p>
          <p className="pt-2">💡 Each generation produces different text for natural variation</p>
        </div>
      </div>
    </ToolLayout>
  );
}
