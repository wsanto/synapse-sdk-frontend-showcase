import { SearchResult } from "@/types/search"
import { highlightText } from "@/lib/search-utils"

interface SearchResultItemProps {
  result: SearchResult
  query: string
  onClick: () => void
}

export function SearchResultItem({ result, query, onClick }: SearchResultItemProps) {
  const highlightedTitle = highlightText(result.title, query)
  const highlightedContent = highlightText(result.content.slice(0, 150), query)

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-3 hover:bg-accent rounded-md transition-colors border border-transparent hover:border-border/50"
    >
      <div 
        className="font-medium text-foreground"
        dangerouslySetInnerHTML={{ __html: highlightedTitle }}
      />
      <div className="text-sm text-muted-foreground mb-1">{result.section}</div>
      <div 
        className="text-xs text-muted-foreground line-clamp-2"
        dangerouslySetInnerHTML={{ __html: highlightedContent + '...' }}
      />
    </button>
  )
}
