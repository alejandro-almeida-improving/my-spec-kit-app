"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, ArrowRightLeft } from "lucide-react"
import { toast } from "sonner"

export default function Base64ConverterPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")

  const process = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(input))
      } else {
        setOutput(atob(input))
      }
    } catch (e) {
      toast.error("Invalid input for Base64 decoding")
      setOutput("")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    toast.success("Copied to clipboard")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Base64 Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center mb-4">
            <div className="flex items-center bg-muted p-1 rounded-lg">
              <Button 
                variant={mode === "encode" ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setMode("encode")}
              >
                Encode
              </Button>
              <Button 
                variant={mode === "decode" ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setMode("decode")}
              >
                Decode
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="input">Input</Label>
              <Textarea 
                id="input"
                placeholder={mode === "encode" ? "Text to encode..." : "Base64 to decode..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={10}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="output">Output</Label>
              <div className="relative">
                <Textarea 
                  id="output"
                  readOnly 
                  value={output} 
                  rows={10}
                  className="bg-muted"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2"
                  onClick={copyToClipboard}
                  disabled={!output}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={process} className="w-full md:w-auto">
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
