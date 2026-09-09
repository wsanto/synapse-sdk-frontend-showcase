"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Search, Clock, TrendingUp, BarChart3, FolderOpen, List } from "lucide-react"
import { searchDocs, SearchResult, searchIndex } from "@/lib/docs-search"
import { advancedSearch, categorizeResults } from "@/lib/advanced-search"
import { addToRecentSearches, trackSearch } from "@/lib/search-utils"
import { EnhancedSearchResult } from "./enhanced-search-result"
import { CategorizedResults } from "./categorized-results"
import { SearchAnalytics, SearchAnalyticsTracker } from "./search-analytics"
import { RecentSearches } from "./recent-searches"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function DocSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<(SearchResult & {
    _searchScore?: number
    _searchFactors?: string[]
    _matchedContent?: string
  })[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'categorized'>('categorized')
  const [showAnalytics, setShowAnalytics] = useState(false)
  const searchTimeoutRef = useRef<NodeJS.Timeout>()
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === "Escape" && open) {
        setOpen(false)
        setQuery("")
      }
    }
    
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open])

  useEffect(() => {
    // Debounced advanced search
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (query.length < 2) {
      setResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    searchTimeoutRef.current = setTimeout(() => {
      // Use advanced search instead of basic search
      const advancedResults = advancedSearch(query, searchIndex)
      setResults(advancedResults)
      setIsSearching(false)
      
      // Track analytics for search queries
      if (query.length >= 2) {
        trackSearch(query, advancedResults.length)
        SearchAnalyticsTracker.trackSearch(query, advancedResults.length)
      }
    }, 400) // Slightly longer delay for advanced search

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [query])

  const handleResultClick = (href: string) => {
    addToRecentSearches(query)
    setOpen(false)
    setQuery("")
    router.push(href)
  }

  const handleRecentSearchClick = (recentQuery: string) => {
    setQuery(recentQuery)
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      setQuery("")
      setResults([])
    }
  }

  const analytics = SearchAnalyticsTracker.getSessionStats()

  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setOpen(true)}
        className="relative w-64 justify-start text-sm text-muted-foreground"
      >
        <Search className="h-4 w-4 mr-2 text-muted-foreground" />
        Search docs...
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documentation with fuzzy matching..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="pl-10 pr-20 border-0 focus-visible:ring-0 text-base"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                {isSearching && (
                  <div className="animate-spin h-4 w-4 border-2 border-muted-foreground border-t-transparent rounded-full" />
                )}
                <kbd className="text-xs text-muted-foreground">⌘K</kbd>
              </div>
            </div>
            
            {/* View mode toggle and analytics */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'categorized' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('categorized')}
                  className="text-xs"
                >
                  <FolderOpen className="h-3 w-3 mr-1" />
                  Categories
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="text-xs"
                >
                  <List className="h-3 w-3 mr-1" />
                  List
                </Button>
              </div>
              
              {process.env.NODE_ENV === 'development' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAnalytics(!showAnalytics)}
                  className="text-xs text-muted-foreground"
                >
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Analytics
                </Button>
              )}
            </div>
          </DialogHeader>
          
          <div className="max-h-96 overflow-y-auto">
            {query.length < 2 ? (
              <div className="text-center text-muted-foreground py-8">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Type at least 2 characters for advanced search</p>
                <p className="text-xs mt-1">Features: fuzzy matching, smart ranking, categorization</p>
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground mb-2">Popular searches:</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {["API key", "authentication", "emotions", "quickstart", "streaming"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
                <RecentSearches onSearchSelect={handleRecentSearchClick} />
                {showAnalytics && (
                  <SearchAnalytics {...analytics} />
                )}
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground px-3 pb-2">
                  <TrendingUp className="h-3 w-3" />
                  Found {results.length} advanced results for "{query}"
                  <span className="ml-auto">
                    Sorted by relevance
                  </span>
                </div>
                
                {viewMode === 'categorized' ? (
                  <CategorizedResults
                    results={results}
                    query={query}
                    onResultClick={handleResultClick}
                  />
                ) : (
                  <div className="space-y-2">
                    {results.map((result, index) => (
                      <EnhancedSearchResult
                        key={`${result.href}-${index}`}
                        result={result}
                        query={query}
                        onClick={() => handleResultClick(result.href)}
                      />
                    ))}
                  </div>
                )}
                
                {showAnalytics && (
                  <SearchAnalytics {...analytics} />
                )}
              </div>
            ) : !isSearching ? (
              <div className="text-center text-muted-foreground py-8">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No advanced results found for "{query}"</p>
                <p className="text-sm mt-1">Try different keywords or check spelling</p>
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground mb-2">Suggested topics:</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {["authentication", "API reference", "error handling", "SDKs", "streaming"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <div className="animate-spin h-8 w-8 border-2 border-muted-foreground border-t-transparent rounded-full mx-auto mb-2" />
                <p>Advanced searching...</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
