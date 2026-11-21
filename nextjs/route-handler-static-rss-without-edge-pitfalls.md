# Zero-Compute Static XML & `llms.txt` Route Handlers in App Router

> Date: 2026-11-14

App Router `GET` Route Handlers (`app/rss.xml/route.ts`, `app/llms.txt/route.ts`) are statically cached at build time when they don't read dynamic request APIs — **unless** you accidentally accept `request: NextRequest` and inspect headers/searchParams. Explicitly exporting `export const dynamic = "force-static"` guarantees build-time generation and catches accidental dynamic reads immediately.

```ts
// app/articles/rss.xml/route.ts
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Engineering Notes</title>
    ${posts.map((p) => `<item><title>${escapeXml(p.title)}</title></item>`).join("")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
```

### Why It Matters

`next build` outputs `○ (Static)` for the route in the build manifest, serving raw bytes straight from the CDN edge with zero serverless invocations.
