import { SearchResult } from "@/types/search"

// Fuse.js style fuzzy matching implementation (lightweight version)
interface FuzzyMatchResult {
  score: number
  matches: Array<{
    key: string
    value: string
    indices: Array<[number, number]>
  }>
}

export function fuzzySearch(pattern: string, text: string): FuzzyMatchResult {
  pattern = pattern.toLowerCase()
  text = text.toLowerCase()
  
  if (!pattern) return { score: 1, matches: [] }
  if (!text) return { score: 0, matches: [] }
  
  let patternIndex = 0
  let score = 0
  let consecutiveMatches = 0
  const matches: Array<[number, number]> = []
  
  for (let i = 0; i < text.length && patternIndex < pattern.length; i++) {
    if (text[i] === pattern[patternIndex]) {
      if (matches.length === 0 || matches[matches.length - 1][1] !== i - 1) {
        matches.push([i, i])
      } else {
        matches[matches.length - 1][1] = i
      }
      
      patternIndex++
      consecutiveMatches++
      score += 1 + (consecutiveMatches * 0.5) // Bonus for consecutive matches
    } else {
      consecutiveMatches = 0
    }
  }
  
  // Normalize score based on pattern length and text length
  const completionRatio = patternIndex / pattern.length
  const textRatio = patternIndex / text.length
  
  return {
    score: completionRatio * 0.7 + textRatio * 0.3 + score * 0.1,
    matches: patternIndex === pattern.length ? [{ key: 'content', value: text, indices: matches }] : []
  }
}

// Enhanced search with multiple ranking factors
export function advancedSearch(query: string, searchIndex: SearchResult[]): SearchResult[] {
  if (!query || query.length < 2) return []

  const lowercaseQuery = query.toLowerCase()
  const results = searchIndex.map(page => {
    let score = 0
    const factors: string[] = []
    
    // Title exact match (highest weight)
    if (page.title.toLowerCase().includes(lowercaseQuery)) {
      score += 100
      factors.push('title-exact')
    }
    
    // Title fuzzy match
    const titleFuzzy = fuzzySearch(lowercaseQuery, page.title)
    if (titleFuzzy.score > 0.3) {
      score += titleFuzzy.score * 50
      factors.push('title-fuzzy')
    }
    
    // Content exact match
    const contentMatches = (page.content.toLowerCase().match(new RegExp(lowercaseQuery, 'g')) || []).length
    if (contentMatches > 0) {
      score += contentMatches * 10
      factors.push(`content-exact-${contentMatches}`)
    }
    
    // Content fuzzy match
    const contentFuzzy = fuzzySearch(lowercaseQuery, page.content)
    if (contentFuzzy.score > 0.2) {
      score += contentFuzzy.score * 25
      factors.push('content-fuzzy')
    }
    
    // Keyword matches
    const keywordMatches = page.keywords?.filter(keyword => 
      keyword.toLowerCase().includes(lowercaseQuery)
    ).length || 0
    if (keywordMatches > 0) {
      score += keywordMatches * 15
      factors.push(`keywords-${keywordMatches}`)
    }
    
    // Section priority (some sections are more important)
    const sectionPriority = {
      'Getting Started': 10,
      'API Reference': 9,
      'Core Concepts': 8,
      'Advanced Features': 7,
      'SDKs & Tools': 6,
      'Support & Resources': 5
    }
    score += sectionPriority[page.section as keyof typeof sectionPriority] || 0
    factors.push('section-priority')
    
    // Page popularity (simulated - could be from analytics)
    const popularityScore = getPagePopularity(page.href)
    score += popularityScore
    if (popularityScore > 0) factors.push('popularity')
    
    return {
      ...page,
      _searchScore: score,
      _searchFactors: factors,
      _matchedContent: getMatchedContent(page.content, lowercaseQuery, 200)
    }
  })
  
  // Filter out results with no meaningful matches
  const filteredResults = results.filter(result => result._searchScore > 5)
  
  // Sort by score (descending) and limit to top 12
  return filteredResults
    .sort((a, b) => (b._searchScore || 0) - (a._searchScore || 0))
    .slice(0, 12)
}

// Simulated page popularity (in real app, this would come from analytics)
function getPagePopularity(href: string): number {
  const popularityMap: Record<string, number> = {
    '/docs': 20,
    '/docs/quickstart': 18,
    '/docs/authentication': 15,
    '/docs/api/unified-chat': 12,
    '/docs/api/emotions': 10,
    '/docs/models': 8,
    '/docs/guides': 7,
    '/docs/support': 5
  }
  return popularityMap[href] || 0
}

// Extract relevant content around matches
function getMatchedContent(content: string, query: string, maxLength: number): string {
  const queryIndex = content.toLowerCase().indexOf(query.toLowerCase())
  if (queryIndex === -1) return content.slice(0, maxLength)
  
  const start = Math.max(0, queryIndex - 50)
  const end = Math.min(content.length, queryIndex + query.length + 100)
  
  let excerpt = content.slice(start, end)
  if (start > 0) excerpt = '...' + excerpt
  if (end < content.length) excerpt = excerpt + '...'
  
  return excerpt
}

// Search result categorization
export function categorizeResults(results: SearchResult[]): Record<string, SearchResult[]> {
  return results.reduce((categories, result) => {
    const category = result.section
    if (!categories[category]) {
      categories[category] = []
    }
    categories[category].push(result)
    return categories
  }, {} as Record<string, SearchResult[]>)
}
