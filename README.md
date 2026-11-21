# TIL — Today I Learned ⚡

[![CI](https://github.com/zaynelovecraft/til/actions/workflows/ci.yml/badge.svg)](https://github.com/zaynelovecraft/til/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/zaynelovecraft/til)](https://github.com/zaynelovecraft/til/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Website](https://img.shields.io/badge/Blog-zaynelovecraft.com-6366f1)](https://www.zaynelovecraft.com/articles)

Concise, copy-pasteable engineering field notes on **Next.js App Router**, **React 19**, **TypeScript**, **Core Web Vitals**, **MCP servers**, and **macOS tooling** — written down as I hit them in day-to-day engineering. Longer deep dives live at **[zaynelovecraft.com/articles](https://www.zaynelovecraft.com/articles)**.

**14 TILs** across **5 categories**.

---

## Recent Notes

<!-- RECENT-TILS:START -->
- **[Streaming Unawaited Server Promises Across RSC -> Client Boundaries with `use()`](nextjs/passing-promises-across-rsc-client-boundaries.md)** — `Next.js & App Router` · *2026-11-20*
- **[Linking `Person`, `WebSite`, and `BlogPosting` Entities in a Single JSON-LD `@graph`](performance-seo/json-ld-entity-graph-id-linking.md)** — `Core Web Vitals & Technical SEO` · *2026-11-19*
- **[Isolating Request Cookies from Cached Shells with `'use cache'`](nextjs/cache-components-use-cache-dynamic-boundaries.md)** — `Next.js & App Router` · *2026-11-18*
- **[Why `console.log()` Corrupts `stdio` MCP Servers](ai-mcp/mcp-server-stdout-jsonrpc-corruption.md)** — `AI Systems & MCP Servers` · *2026-11-17*
- **[Avoiding React 19 SSR Hydration Mismatches with Persisted Zustand Stores](react-typescript/zustand-ssr-hydration-without-mismatch.md)** — `React 19 & TypeScript` · *2026-11-16*
- **[Automatic Per-Remote Git Identity Switching with `includeIf` (`hasconfig`)](macos-dx/url-scoped-git-identities-with-includeif.md)** — `macOS, Git & Developer Tooling` · *2026-11-15*
<!-- RECENT-TILS:END -->

## Categories

- [AI Systems & MCP Servers](#ai-systems-mcp-servers) (2)
- [macOS, Git & Developer Tooling](#macos-git-developer-tooling) (2)
- [Next.js & App Router](#nextjs-app-router) (4)
- [Core Web Vitals & Technical SEO](#core-web-vitals-technical-seo) (3)
- [React 19 & TypeScript](#react-19-typescript) (3)

---

### AI Systems & MCP Servers

- [Why `console.log()` Corrupts `stdio` MCP Servers](ai-mcp/mcp-server-stdout-jsonrpc-corruption.md) — *2026-11-17*
- [Two-Pass Structured Brief + Prose Generation with Zod Quality Gates](ai-mcp/two-pass-structured-generation-zod-gates.md) — *2026-11-09*

### macOS, Git & Developer Tooling

- [Automatic Per-Remote Git Identity Switching with `includeIf` (`hasconfig`)](macos-dx/url-scoped-git-identities-with-includeif.md) — *2026-11-15*
- [Tracing Zombie Listening TCP Ports on macOS Back to Repo CWDs & `launchd`](macos-dx/finding-zombie-port-listeners-on-macos.md) — *2026-11-02*

### Next.js & App Router

- [Streaming Unawaited Server Promises Across RSC -> Client Boundaries with `use()`](nextjs/passing-promises-across-rsc-client-boundaries.md) — *2026-11-20*
- [Isolating Request Cookies from Cached Shells with `'use cache'`](nextjs/cache-components-use-cache-dynamic-boundaries.md) — *2026-11-18*
- [Zero-Compute Static XML & `llms.txt` Route Handlers in App Router](nextjs/route-handler-static-rss-without-edge-pitfalls.md) — *2026-11-14*
- [Catching Accidental `'use client'` Barrel-File Chunk Bloat in CI](nextjs/auditing-client-bundle-bloat-from-barrel-imports.md) — *2026-11-11*

### Core Web Vitals & Technical SEO

- [Linking `Person`, `WebSite`, and `BlogPosting` Entities in a Single JSON-LD `@graph`](performance-seo/json-ld-entity-graph-id-linking.md) — *2026-11-19*
- [Why Multiple `priority` Images Hurt Mobile LCP Instead of Helping](performance-seo/preventing-lcp-priority-cannibalization.md) — *2026-11-13*
- [Zero-CLS Webfont Swaps with `next/font` Fallback Metric Overrides](performance-seo/cls-zero-font-swap-metric-overrides.md) — *2026-11-03*

### React 19 & TypeScript

- [Avoiding React 19 SSR Hydration Mismatches with Persisted Zustand Stores](react-typescript/zustand-ssr-hydration-without-mismatch.md) — *2026-11-16*
- [Preserving Literal Key Inference in Config Maps with TypeScript `satisfies`](react-typescript/satisfies-for-narrow-config-maps.md) — *2026-11-08*
- [Composing User Cancellation and Timeouts with `AbortSignal.any()`](react-typescript/abort-signals-in-debounced-search-effects.md) — *2026-11-05*

---

## Adding a Note

1. Create `<category>/<slug>.md` starting with `# Title` and `> Date: YYYY-MM-DD`.
2. Run `npm run build` to update the count and index in `README.md`.
