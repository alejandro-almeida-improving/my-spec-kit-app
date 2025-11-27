"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { toast } from "sonner"

export default function CaseConverterPage() {
  const [input, setInput] = useState("")
  
  const toWords = (text: string) => {
    return text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || []
  }

  const convert = (text: string, type: string) => {
    if (!text) return ""
    
    // Simple conversions
    if (type === "lowercase") return text.toLowerCase()
    if (type === "uppercase") return text.toUpperCase()

    // Complex conversions requiring word splitting
    const words = toWords(text)
    
    switch (type) {
      case "camelCase": 
        return words.map((word, i) => 
          i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join('')
      case "snake_case":
        return words.map(word => word.toLowerCase()).join('_')
      case "kebab-case":
        return words.map(word => word.toLowerCase()).join('-')
      case "Title Case":
        return words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
      default: return text
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Case Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input">Input Text</Label>
            <Textarea 
              id="input"
              placeholder="Type or paste your text here..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={5}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: "lowercase", label: "lowercase" },
              { id: "uppercase", label: "UPPERCASE" },
              { id: "camelCase", label: "camelCase" },
              { id: "snake_case", label: "snake_case" },
              { id: "kebab-case", label: "kebab-case" },
              { id: "Title Case", label: "Title Case" },
            ].map((type) => (
              <div key={type.id} className="space-y-2">
                <Label>{type.label}</Label>
                <div className="flex gap-2">
                  <div className="flex-1 p-2 border rounded-md bg-muted min-h-[40px] break-all">
                    {convert(input, type.id)}
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => copyToClipboard(convert(input, type.id))}
                    disabled={!input}
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
