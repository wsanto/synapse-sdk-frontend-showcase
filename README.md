# Synapse SDK Docs Site (showcase excerpt)

An excerpt from a Next.js developer-documentation site I built for an API/SDK product. This repo
shows the **documentation platform's search and rendering infrastructure** — full-text/fuzzy search
over docs content, syntax-highlighted code blocks, a doc sidebar/navigation system, and the generic
UI component layer — as a demonstration of building a docs platform, not the underlying product's
API surface or its content.

This is a curated excerpt, not the full site: the actual documentation content (API reference,
guides, whitepaper) and an internal reporting app that lived alongside this site are not included,
so this repo is for reading, not running.

## What's included here

- **`lib/advanced-search.ts`, `docs-search.ts`, `search-utils.ts`** — the search engine behind the
  docs site: indexing, ranking, and querying documentation content.
- **`components/docs/`** — search UI (`doc-search.tsx`, `enhanced-search-result.tsx`,
  `search-result.tsx`, `categorized-results.tsx`, `recent-searches.tsx`, `search-analytics.tsx`),
  a syntax-highlighted `code-block.tsx`, an API-endpoint renderer, and the doc sidebar.
- **`components/ui/`** — generic UI primitives (button, card, dialog, alert, badge, input).
- **`app/`** — the top-level Next.js app shell and the docs section's layout/loading states (content
  pages themselves are excluded — see below).

## What was built but isn't shown here

- **The actual API documentation content** — API reference, authentication, models, quickstart,
  streaming, webhooks, SDKs, and a technical whitepaper. This is the product's real content, not
  generic docs-platform code.
- **An internal reporting application** (Next.js + AWS Lambda + a separate dbt data-transformation
  project) that lived in the same monorepo — unrelated to the docs platform and internal-only.
- **Infrastructure shutdown/account-closure runbooks and scripts** for a since-decommissioned AWS
  environment this product ran on — operational history, not something relevant to a code sample,
  and the kind of thing that's better not republished regardless.

I'm happy to walk through the design of any of these in conversation — they're just not published
as code.

## Stack

Next.js (App Router), TypeScript, Tailwind, shadcn/ui-style component primitives.
