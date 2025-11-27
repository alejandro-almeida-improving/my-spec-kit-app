"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { format, fromUnixTime, getUnixTime, isValid, parseISO } from "date-fns"
import { Copy } from "lucide-react"
import { toast } from "sonner"

export default function TimestampConverterPage() {
  const [timestamp, setTimestamp] = useState<string>("")
  const [dateString, setDateString] = useState<string>("")
  const [humanDate, setHumanDate] = useState<string>("")

  // Initialize with current time
  useEffect(() => {
    const now = new Date()
    setTimestamp(getUnixTime(now).toString())
    setDateString(now.toISOString().slice(0, 16)) // YYYY-MM-DDTHH:mm
    updateFromTimestamp(getUnixTime(now).toString())
  }, [])

  const updateFromTimestamp = (ts: string) => {
    setTimestamp(ts)
    const num = parseInt(ts)
    if (!isNaN(num)) {
      const date = fromUnixTime(num)
      if (isValid(date)) {
        setDateString(date.toISOString().slice(0, 16))
        setHumanDate(format(date, "PPpp"))
      } else {
        setHumanDate("Invalid Date")
      }
    } else {
      setHumanDate("Invalid Timestamp")
    }
  }

  const updateFromDate = (ds: string) => {
    setDateString(ds)
    const date = parseISO(ds)
    if (isValid(date)) {
      const ts = getUnixTime(date).toString()
      setTimestamp(ts)
      setHumanDate(format(date, "PPpp"))
    } else {
      setHumanDate("Invalid Date")
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
          <CardTitle>Timestamp Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="timestamp">Unix Timestamp (seconds)</Label>
              <div className="flex gap-2">
                <Input 
                  id="timestamp"
                  value={timestamp} 
                  onChange={(e) => updateFromTimestamp(e.target.value)} 
                  type="number"
                />
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(timestamp)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date (ISO 8601)</Label>
              <Input 
                id="date"
                type="datetime-local" 
                value={dateString} 
                onChange={(e) => updateFromDate(e.target.value)} 
              />
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg text-center">
            <Label className="block mb-2 text-muted-foreground">Human Readable</Label>
            <div className="text-xl font-mono font-medium">{humanDate}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
