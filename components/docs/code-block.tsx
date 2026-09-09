"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface CodeBlockProps {
  code: string
  language: string
  title?: string
}

export function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      {title && (
        <div className="flex items-center justify-between bg-muted px-4 py-2 rounded-t-lg border">
          <span className="text-sm font-medium">{title}</span>
          <span className="text-xs text-muted-foreground uppercase">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className={cn("p-4 rounded-lg bg-muted overflow-x-auto", title ? "rounded-t-none" : "")}>
          <code className="text-sm font-mono">{code}</code>
        </pre>
        <Button variant="ghost" size="sm" className="absolute top-2 right-2 h-8 w-8 p-0" onClick={copyToClipboard}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
