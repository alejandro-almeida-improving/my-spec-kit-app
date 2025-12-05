'use client';

/**
 * UUID Generator Page
 * Feature: 001-dev-tools-suite / User Story 2
 */

import { useState } from 'react';
import { ToolLayout } from '@/components/tool-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { generateUUID, generateMultipleUUIDs } from '@/lib/conversions/uuid-generator';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';
import { Copy, Check, RefreshCw } from 'lucide-react';

export default function UUIDGeneratorPage() {
  const [uuid, setUuid] = useState('');
  const [count, setCount] = useState('1');
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const numCount = parseInt(count, 10);
    if (isNaN(numCount) || numCount < 1 || numCount > 100) {
      toast.error('Please enter a number between 1 and 100');
      return;
    }

    if (numCount === 1) {
      const newUuid = generateUUID();
      setUuid(newUuid);
      setUuids([]);
    } else {
      const newUuids = generateMultipleUUIDs(numCount);
      setUuids(newUuids);
      setUuid('');
    }
    setCopied(false);
  };

  const handleCopy = async () => {
    const textToCopy = uuid || uuids.join('\n');
    const result = await copyToClipboard(textToCopy);
    if (result.success) {
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error(result.error || 'Failed to copy');
    }
  };

  const hasOutput = uuid || uuids.length > 0;

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate standards-compliant UUIDs (RFC 4122 v4)"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="count">Number of UUIDs</Label>
          <Input
            id="count"
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            placeholder="1"
          />
          <p className="text-xs text-muted-foreground">
            Generate 1-100 UUIDs at once
          </p>
        </div>

        <Button onClick={handleGenerate} className="w-full" size="lg">
          <RefreshCw className="h-4 w-4 mr-2" />
          Generate UUID{parseInt(count) > 1 ? 's' : ''}
        </Button>

        {hasOutput && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Generated UUID{uuids.length > 1 ? 's' : ''}</Label>
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
                {uuid && (
                  <div className="p-4 bg-muted rounded-md">
                    <code className="text-sm font-mono">{uuid}</code>
                  </div>
                )}
                {uuids.length > 0 && (
                  <div className="p-4 bg-muted rounded-md max-h-96 overflow-y-auto">
                    {uuids.map((id, index) => (
                      <div key={index} className="text-sm font-mono py-1">
                        {id}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-sm text-muted-foreground space-y-1">
          <p>✅ RFC 4122 v4 compliant</p>
          <p>🔒 Cryptographically secure random generation</p>
          <p>📋 Click Copy to copy all UUIDs to clipboard</p>
        </div>
      </div>
    </ToolLayout>
  );
}
