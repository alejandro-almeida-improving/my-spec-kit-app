"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { LoremIpsum } from "lorem-ipsum"

export default function LoremGeneratorPage() {
  const [count, setCount] = useState(3)
  const [unit, setUnit] = useState<"paragraphs" | "sentences" | "words">("paragraphs")
  const [output, setOutput] = useState("")

  const generate = () => {
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      }
    })

    let text = ""
    if (unit === "paragraphs") {
      text = lorem.generateParagraphs(count)
    } else if (unit === "sentences") {
      text = lorem.generateSentences(count)
    } else {
      text = lorem.generateWords(count)
    }
    setOutput(text)
  }

  useEffect(() => {
    generate()
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    toast.success("Copied to clipboard")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lorem Ipsum Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2 w-32">
              <Label htmlFor="count">Count</Label>
              <Input 
                id="count"
                type="number" 
                min={1} 
                max={100} 
                value={count} 
                onChange={(e) => setCount(parseInt(e.target.value) || 1)} 
              />
            </div>
            <div className="space-y-2 w-40">
              <Label htmlFor="unit">Unit</Label>
              <Select value={unit} onValueChange={(v: any) => setUnit(v)}>
                <SelectTrigger id="unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paragraphs">Paragraphs</SelectItem>
                  <SelectItem value="sentences">Sentences</SelectItem>
                  <SelectItem value="words">Words</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={generate}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate
            </Button>
          </div>

          {output && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="result">Result</Label>
                <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </div>
              <Textarea 
                id="result"
                readOnly 
                value={output} 
                className="min-h-[200px] bg-muted"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
