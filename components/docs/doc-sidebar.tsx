"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight } from "lucide-react"

interface DocSection {
  title: string
  badge?: string
  items: {
    title: string
    href: string
    badge?: string
  }[]
}

const docSections: DocSection[] = [
  {
    title: "Getting Started",
    badge: "V2",
    items: [
      { title: "Overview", href: "/docs" },
      { title: "Quickstart", href: "/docs/quickstart", badge: "V2" },
      { title: "Authentication & Security", href: "/docs/authentication" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { title: "V2 EQ Dimensions", href: "/docs/concepts", badge: "V2" },
    ],
  },
  {
    title: "API Reference",
    badge: "V2",
    items: [
      { title: "Unified Chat API", href: "/docs/api/unified-chat" },
      { title: "Emotion APIs", href: "/docs/api/emotions" },
    ],
  },
  {
    title: "Guides & Resources",
    items: [
      { title: "Guides & Use Cases", href: "/docs/guides", badge: "V2" },
      { title: "Rate Limits", href: "/docs/rate-limits" },
      { title: "Errors & Troubleshooting", href: "/docs/errors" },
    ],
  },
  {
    title: "Research",
    items: [
      { title: "EQ+ Whitepaper", href: "/docs/whitepaper", badge: "V2" },
    ],
  },
  {
    title: "Updates",
    items: [
      { title: "Changelog", href: "/docs/changelog" },
    ],
  },
  {
    title: "Legacy",
    items: [
      { title: "V1 API Reference", href: "/docs/v1-legacy", badge: "Deprecated" },
    ],
  },
]

export function DocSidebar() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["Getting Started", "API Reference", "Core Concepts"])
  const pathname = usePathname()

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => (prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]))
  }

  return (
    <div className="w-64 bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-4">Documentation</h2>
        <nav className="space-y-2">
          {docSections.map((section) => {
            const isExpanded = expandedSections.includes(section.title)
            return (
              <div key={section.title}>
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex items-center justify-between w-full text-left text-sm font-medium py-2 px-2 rounded hover:bg-accent"
                >
                  <span className="flex items-center gap-2">
                    {section.title}
                    {section.badge === "V2" && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded">
                        V2
                      </span>
                    )}
                  </span>
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
                {isExpanded && (
                  <div className="ml-4 space-y-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2 text-sm py-1 px-2 rounded hover:bg-accent",
                          pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                        )}
                      >
                        {item.title}
                        {item.badge === "V2" && (
                          <span className="text-[9px] px-1 py-0.5 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded">
                            V2
                          </span>
                        )}
                        {item.badge === "Deprecated" && (
                          <span className="text-[9px] px-1 py-0.5 bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 rounded">
                            Legacy
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
