# Catching Accidental `'use client'` Barrel-File Chunk Bloat in CI

> Date: 2026-11-11

A single stray import from an un-tree-shakeable barrel file inside a `"use client"` component can quietly add `80–150 KB` (gzipped) to `.next/static/chunks` without breaking TypeScript or unit tests. Measuring actual gzipped `.js` chunks after `next build` in CI catches client bundle regressions before merge.

```mjs
import { readdirSync, readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join } from "node:path";

const CHUNKS_DIR = ".next/static/chunks";
const MAX_SINGLE_CHUNK_KB = 120;

for (const file of readdirSync(CHUNKS_DIR).filter((f) => f.endsWith(".js"))) {
  const gzBytes = gzipSync(readFileSync(join(CHUNKS_DIR, file))).length;
  const gzKb = gzBytes / 1024;
  if (gzKb > MAX_SINGLE_CHUNK_KB) {
    throw new Error(`Chunk ${file} (${gzKb.toFixed(1)} KB gz) exceeds ${MAX_SINGLE_CHUNK_KB} KB budget`);
  }
}
```

### Fix Pattern

Pair CI chunk budgets with `experimental.optimizePackageImports` in `next.config.ts` for icon and UI libraries (`lucide-react`, `react-icons`, `@radix-ui/*`).
