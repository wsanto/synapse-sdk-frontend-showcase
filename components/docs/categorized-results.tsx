import { SearchResult } from "@/types/search"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, FolderOpen } from "lucide-react"
import { useState } from "react"
import { EnhancedSearchResult } from "./enhanced-search-result"

interface CategorizedResultsProps {
  results: (SearchResult & {
    _searchScore?: number
    _searchFactors?: string[]
    _matchedContent?: string
  })[]
  query: string
  onResultClick: (href: string) => void
}

export function CategorizedResults({ results, query, onResultClick }: CategorizedResultsProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  
  // Group results by section
  const categorized = results.reduce((groups, result) => {
    const section = result.section
    if (!groups[section]) {
      groups[section] = []
    }
    groups[section].push(result)
    return groups
  }, {} as Record<string, typeof results>)

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  // Auto-expand first category if none are expanded
  const categories = Object.entries(categorized)
  if (categories.length > 0 && expandedCategories.length === 0) {
    expandedCategories.push(categories[0][0])
  }

  if (results.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground px-1">
        <FolderOpen className="h-4 w-4" />
        <span>Grouped by category</span>
        <Badge variant="outline" className="text-xs">
          {results.length} results
        </Badge>
      </div>

      {categories.map(([section, sectionResults]) => {
        const isExpanded = expandedCategories.includes(section)
        const topResult = sectionResults[0]
        
        return (
          <div key={section} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(section)}
              className="w-full px-4 py-3 bg-muted/50 hover:bg-muted transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="font-medium text-foreground">{section}</span>
                <Badge variant="secondary" className="text-xs">
                  {sectionResults.length}
                </Badge>
              </div>
              
              {/* Show top result preview when collapsed */}
              {!isExpanded && topResult && (
                <div className="text-sm text-muted-foreground truncate max-w-md">
                  {topResult.title}
                </div>
              )}
            </button>

            {isExpanded && (
              <div className="divide-y divide-border">
                {sectionResults.map((result, index) => (
                  <EnhancedSearchResult
                    key={`${result.href}-${index}`}
                    result={result}
                    query={query}
                    onClick={() => onResultClick(result.href)}
                  />
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
