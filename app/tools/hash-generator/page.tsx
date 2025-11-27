"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { toast } from "sonner"

export default function HashGeneratorPage() {
  const [input, setInput] = useState("")
  const [hashes, setHashes] = useState<{ [key: string]: string }>({})

  const calculateHashes = async (text: string) => {
    if (!text) {
      setHashes({})
      return
    }

    const encoder = new TextEncoder()
    const data = encoder.encode(text)

    const algorithms = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"]
    const newHashes: { [key: string]: string } = {}

    for (const algo of algorithms) {
      try {
        const hashBuffer = await crypto.subtle.digest(algo, data)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
        newHashes[algo] = hashHex
      } catch (e) {
        console.error(`Error calculating ${algo}`, e)
      }
    }
    
    setHashes(newHashes)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setInput(text)
    calculateHashes(text)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hash Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="input">Input Text</Label>
            <Textarea 
              id="input"
              placeholder="Type text to hash..." 
              value={input}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          <div className="space-y-4">
            {["SHA-1", "SHA-256", "SHA-384", "SHA-512"].map((algo) => (
              <div key={algo} className="space-y-2">
                <Label htmlFor={`hash-${algo}`}>{algo}</Label>
                <div className="flex gap-2">
                  <Input id={`hash-${algo}`} value={hashes[algo] || ""} readOnly className="font-mono text-xs" />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => copyToClipboard(hashes[algo] || "")}
                    disabled={!hashes[algo]}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
