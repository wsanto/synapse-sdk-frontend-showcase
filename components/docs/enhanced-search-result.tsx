import { SearchResult } from "@/types/search"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, FileText } from "lucide-react"

interface EnhancedSearchResultProps {
  result: SearchResult & {
    _searchScore?: number
    _searchFactors?: string[]
    _matchedContent?: string
  }
  query: string
  onClick: () => void
}

export function EnhancedSearchResult({ result, query, onClick }: EnhancedSearchResultProps) {
  const score = result._searchScore || 0
  const isHighScore = score > 50
  const isPopular = result._searchFactors?.includes('popularity')
  
  // Get relevance indicator
  const getRelevanceIndicator = () => {
    if (score > 80) return { color: 'bg-green-500', text: 'Very Relevant' }
    if (score > 50) return { color: 'bg-yellow-500', text: 'Relevant' }
    if (score > 20) return { color: 'bg-orange-500', text: 'Somewhat Relevant' }
    return { color: 'bg-gray-500', text: 'Less Relevant' }
  }
  
  const relevance = getRelevanceIndicator()
  
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 hover:bg-accent rounded-lg transition-all duration-200 border border-transparent hover:border-border/50 group"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h3 
              className="font-semibold text-foreground group-hover:text-primary transition-colors"
              dangerouslySetInnerHTML={{ 
                __html: highlightText(result.title, query) 
              }}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary" className="text-xs">
              {result.section}
            </Badge>
            {isPopular && (
              <Badge variant="outline" className="text-xs">
                <Star className="h-3 w-3 mr-1" />
                Popular
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${relevance.color}`} />
            <span className="text-xs text-muted-foreground">{relevance.text}</span>
          </div>
          {isHighScore && (
            <TrendingUp className="h-4 w-4 text-green-500" />
          )}
        </div>
      </div>
      
      <div 
        className="text-sm text-muted-foreground leading-relaxed"
        dangerouslySetInnerHTML={{ 
          __html: highlightText(result._matchedContent || result.content.slice(0, 200), query) 
        }}
      />
      
      {/* Search factors (for debugging or power users) */}
      {process.env.NODE_ENV === 'development' && result._searchFactors && (
        <div className="mt-2 text-xs text-muted-foreground">
          <span className="font-mono bg-muted px-1 rounded">
            Score: {score.toFixed(1)}
          </span>
          <span className="ml-2 font-mono text-xs">
            {result._searchFactors.join(', ')}
          </span>
        </div>
      )}
    </button>
  )
}

// Enhanced highlighting function
function highlightText(text: string, query: string): string {
  if (!query) return text
  
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<mark class="search-highlight">$1</mark>')
}
