import type React from "react"
import { DocSidebar } from "@/components/docs/doc-sidebar"
import { DocsNav } from "@/components/layout/docs-nav"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen">
      <DocsNav />
      <div className="flex flex-1 overflow-hidden">
        <DocSidebar />
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
