import { Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getRecentSearches, clearRecentSearches } from "@/lib/search-utils"

interface RecentSearchesProps {
  onSearchSelect: (query: string) => void
}

export function RecentSearches({ onSearchSelect }: RecentSearchesProps) {
  const recentSearches = getRecentSearches()

  if (recentSearches.length === 0) {
    return null
  }

  return (
    <div className="border-t border-border pt-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-3 w-3" />
          Recent searches
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearRecentSearches}
          className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <X className="h-3 w-3 mr-1" />
          Clear
        </Button>
      </div>
      <div className="flex flex-wrap gap-1">
        {recentSearches.map((query, index) => (
          <button
            key={`${query}-${index}`}
            onClick={() => onSearchSelect(query)}
            className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            {query}
          </button>
        ))}
      </div>
    </div>
  )
}
