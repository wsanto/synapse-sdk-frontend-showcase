import { SearchResult } from "@/types/search"

export type { SearchResult }
export const searchIndex: SearchResult[] = [
  // Getting Started
  {
    title: "Overview",
    href: "/docs",
    content: "Kaiko Developer Platform emotionally intelligent AI systems EQ+ layer LLMs agents detect emotions adapt responses maintain emotional memory across interactions",
    section: "Getting Started",
    keywords: ["introduction", "platform", "emotion detection", "ai", "eq+", "llm", "agents"]
  },
  {
    title: "Get Started (Quickstart)",
    href: "/docs/quickstart",
    content: "API key installation curl examples emotions analysis chat completions authentication setup basic implementation getting started guide",
    section: "Getting Started",
    keywords: ["quickstart", "api key", "curl", "examples", "setup", "installation", "authentication"]
  },
  {
    title: "Authentication & Security",
    href: "/docs/authentication",
    content: "API key security authentication methods bearer token headers x-api-key secure implementation best practices key management",
    section: "Getting Started",
    keywords: ["authentication", "security", "api key", "bearer token", "headers", "key management"]
  },

  // Core Concepts
  {
    title: "Models",
    href: "/docs/models",
    content: "Kaiko models emotion-v1 chat completions available models model specifications capabilities limitations",
    section: "Core Concepts",
    keywords: ["models", "emotion-v1", "chat", "specifications", "capabilities"]
  },
  {
    title: "Concepts (EQ+)",
    href: "/docs/concepts",
    content: "EQ+ emotional intelligence layer LLM integration emotion detection response adaptation memory context understanding",
    section: "Core Concepts",
    keywords: ["eq+", "emotional intelligence", "concepts", "layer", "integration", "memory"]
  },

  // API Reference
  {
    title: "Unified Chat API (LLM + Emotion)",
    href: "/docs/api/unified-chat",
    content: "Unified chat API endpoints chat completions emotions analysis streaming parameters response format examples",
    section: "API Reference",
    keywords: ["unified chat", "api", "endpoints", "chat completions", "streaming"]
  },
  {
    title: "Emotion APIs",
    href: "/docs/api/emotions",
    content: "Emotion analysis API endpoints emotions detection user session stateless analysis emotion scores",
    section: "API Reference",
    keywords: ["emotions", "api", "analysis", "detection", "scores", "endpoints"]
  },

  // Advanced Features
  {
    title: "Rate Limits & Error Handling",
    href: "/docs/rate-limits",
    content: "Rate limiting error codes HTTP status codes retry strategies rate limits per endpoint error handling best practices",
    section: "Advanced Features",
    keywords: ["rate limits", "error handling", "retry", "http status", "codes", "strategies"]
  },

  // SDKs & Tools
  {
    title: "Guides & Recipes",
    href: "/docs/guides",
    content: "Implementation guides recipes chatbot integration analytics stateless analysis best practices examples",
    section: "SDKs & Tools",
    keywords: ["guides", "recipes", "examples", "implementation", "best practices"]
  },
  {
    title: "Use Cases",
    href: "/docs/use-cases",
    content: "Real-world use cases applications customer support sentiment analysis emotional AI integration examples",
    section: "SDKs & Tools",
    keywords: ["use cases", "applications", "examples", "integration", "scenarios"]
  },

  // Support & Resources
  {
    title: "Errors & Troubleshooting",
    href: "/docs/errors",
    content: "Common errors troubleshooting guide error codes solutions debugging tips FAQ",
    section: "Support & Resources",
    keywords: ["errors", "troubleshooting", "debugging", "solutions", "faq"]
  },
  {
    title: "Changelog & Deprecations",
    href: "/docs/changelog",
    content: "Changelog version history deprecations new features updates breaking changes release notes",
    section: "Support & Resources",
    keywords: ["changelog", "versions", "deprecations", "updates", "release notes"]
  }
]

export function searchDocs(query: string): SearchResult[] {
  if (!query || query.length < 2) return []

  const lowercaseQuery = query.toLowerCase()
  
  return searchIndex
    .filter(page => 
      page.title.toLowerCase().includes(lowercaseQuery) ||
      page.content.toLowerCase().includes(lowercaseQuery) ||
      page.keywords?.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
    )
    .slice(0, 8)
}
