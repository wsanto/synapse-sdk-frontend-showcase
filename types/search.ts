export interface SearchResult {
  title: string
  href: string
  content: string
  section: string
  keywords?: string[]
}

export interface SearchIndex {
  pages: SearchResult[]
}
