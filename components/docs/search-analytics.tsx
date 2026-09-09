import { BarChart3, TrendingUp, Users, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SearchAnalyticsProps {
  totalSearches: number
  averageResults: number
  topQueries: string[]
  sessionSearches: number
}

export function SearchAnalytics({ 
  totalSearches, 
  averageResults, 
  topQueries, 
  sessionSearches 
}: SearchAnalyticsProps) {
  if (process.env.NODE_ENV !== 'development') {
    return null // Only show in development mode
  }

  return (
    <div className="border-t border-border pt-4 mt-4">
      <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
        <BarChart3 className="h-4 w-4" />
        <span>Search Analytics (Development Mode)</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Search className="h-4 w-4 text-blue-500" />
            <span className="text-xs text-muted-foreground">Session Searches</span>
          </div>
          <div className="text-lg font-semibold text-foreground">{sessionSearches}</div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-xs text-muted-foreground">Avg Results</span>
          </div>
          <div className="text-lg font-semibold text-foreground">{averageResults.toFixed(1)}</div>
        </div>
      </div>

      {topQueries.length > 0 && (
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-purple-500" />
            <span className="text-xs text-muted-foreground">Popular Searches</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {topQueries.map((query, index) => (
              <Badge 
                key={query} 
                variant="outline" 
                className="text-xs px-2 py-0.5"
              >
                {index + 1}. {query}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Analytics storage utilities
export class SearchAnalyticsTracker {
  private static sessionSearches: string[] = []
  private static searchResults: number[] = []

  static trackSearch(query: string, resultCount: number) {
    this.sessionSearches.push(query)
    this.searchResults.push(resultCount)
    
    // Track in localStorage for persistence
    try {
      const existing = JSON.parse(localStorage.getItem('search-analytics') || '{}')
      const updated = {
        ...existing,
        [new Date().toISOString()]: { query, resultCount }
      }
      localStorage.setItem('search-analytics', JSON.stringify(updated))
    } catch (error) {
      console.warn('Failed to save search analytics:', error)
    }
  }

  static getSessionStats() {
    return {
      totalSearches: this.sessionSearches.length,
      averageResults: this.searchResults.length > 0 
        ? this.searchResults.reduce((a, b) => a + b, 0) / this.searchResults.length 
        : 0,
      topQueries: this.getTopQueries(),
      sessionSearches: this.sessionSearches.length
    }
  }

  private static getTopQueries(): string[] {
    const queryCounts = this.sessionSearches.reduce((counts, query) => {
      counts[query] = (counts[query] || 0) + 1
      return counts
    }, {} as Record<string, number>)

    return Object.entries(queryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([query]) => query)
  }

  static clearSession() {
    this.sessionSearches = []
    this.searchResults = []
  }
}
