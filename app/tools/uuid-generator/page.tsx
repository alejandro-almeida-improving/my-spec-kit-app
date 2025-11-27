"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, RefreshCw } from "lucide-react"
import { toast } from "sonner"

export default function UuidGeneratorPage() {
  const [uuid, setUuid] = useState("")

  const generate = () => {
    setUuid(crypto.randomUUID())
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uuid)
    toast.success("Copied to clipboard")
  }

  useEffect(() => {
    generate()
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>UUID Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full max-w-md space-y-2">
              <Label htmlFor="uuid">Generated UUID (v4)</Label>
              <div className="flex gap-2">
                <Input id="uuid" value={uuid} readOnly className="font-mono text-center text-lg" />
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button onClick={generate} size="lg">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate New UUID
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
