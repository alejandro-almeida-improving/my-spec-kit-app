"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { toast } from "sonner"

export default function NumberBaseConverterPage() {
  const [values, setValues] = useState({
    decimal: "",
    hex: "",
    binary: "",
    octal: ""
  })

  const update = (value: string, base: number) => {
    if (!value) {
      setValues({ decimal: "", hex: "", binary: "", octal: "" })
      return
    }

    try {
      const num = parseInt(value, base)
      if (isNaN(num)) return 

      setValues({
        decimal: num.toString(10),
        hex: num.toString(16).toUpperCase(),
        binary: num.toString(2),
        octal: num.toString(8)
      })
    } catch (e) {
      // Ignore invalid input
    }
  }

  const handleChange = (value: string, base: number) => {
    // Validate input based on base
    let valid = false
    if (base === 10) valid = /^[0-9]*$/.test(value)
    else if (base === 16) valid = /^[0-9a-fA-F]*$/.test(value)
    else if (base === 2) valid = /^[01]*$/.test(value)
    else if (base === 8) valid = /^[0-7]*$/.test(value)

    if (valid) {
      update(value, base)
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
          <CardTitle>Number Base Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="decimal">Decimal (Base 10)</Label>
              <div className="flex gap-2">
                <Input 
                  id="decimal"
                  value={values.decimal} 
                  onChange={(e) => handleChange(e.target.value, 10)} 
                  placeholder="0-9"
                />
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(values.decimal)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hex">Hexadecimal (Base 16)</Label>
              <div className="flex gap-2">
                <Input 
                  id="hex"
                  value={values.hex} 
                  onChange={(e) => handleChange(e.target.value, 16)} 
                  placeholder="0-9, A-F"
                />
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(values.hex)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="binary">Binary (Base 2)</Label>
              <div className="flex gap-2">
                <Input 
                  id="binary"
                  value={values.binary} 
                  onChange={(e) => handleChange(e.target.value, 2)} 
                  placeholder="0-1"
                />
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(values.binary)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="octal">Octal (Base 8)</Label>
              <div className="flex gap-2">
                <Input 
                  id="octal"
                  value={values.octal} 
                  onChange={(e) => handleChange(e.target.value, 8)} 
                  placeholder="0-7"
                />
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(values.octal)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
