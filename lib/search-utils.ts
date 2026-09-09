export function highlightText(text: string, query: string): string {
  if (!query) return text
  
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

export function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem('doc-searches')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function addToRecentSearches(query: string): void {
  if (typeof window === 'undefined') return
  
  try {
    const recent = getRecentSearches()
    const updated = [query, ...recent.filter(s => s !== query)].slice(0, 5)
    localStorage.setItem('doc-searches', JSON.stringify(updated))
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function clearRecentSearches(): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem('doc-searches')
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function trackSearch(query: string, resultCount: number): void {
  // Send to analytics service (placeholder)
  console.log('Search analytics:', { query, resultCount, timestamp: new Date().toISOString() })
  
  // You can integrate with your analytics service here:
  // - Google Analytics
  // - Mixpanel
  // - Plausible
  // - Custom analytics endpoint
}
