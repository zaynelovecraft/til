# Isolating Request Cookies from Cached Shells with `'use cache'`

> Date: 2026-11-18

Reading `cookies()` or `headers()` at the top of a Next.js layout or page opts the entire subtree out of static shell prerendering. With Next.js 16 Cache Components (`'use cache'`), keep the outer layout and shared catalog data cached while isolating user-specific cookie reads inside a small `<Suspense>` boundary.

```tsx
// components/cached-catalog.tsx
import { cacheLife, cacheTag } from "next/cache";

export async function CachedCatalog({ market }: { market: string }) {
  "use cache";
  cacheLife("hours");
  cacheTag(`catalog-${market}`);

  const items = await loadCatalogForMarket(market);
  return <CatalogGrid items={items} />;
}
```

```tsx
// app/[market]/page.tsx
import { Suspense } from "react";
import { CachedCatalog } from "@/components/cached-catalog";
import { PersonalizedCartBanner } from "@/components/personalized-cart-banner";

export default async function MarketPage({ params }: { params: Promise<{ market: string }> }) {
  const { market } = await params;

  return (
    <>
      <Suspense fallback={null}>
        {/* Reads cookies() strictly inside this boundary */}
        <PersonalizedCartBanner />
      </Suspense>
      <CachedCatalog market={market} />
    </>
  );
}
```

### Takeaway

Pass only **primitive, serializable cache keys** (`market`, `locale`, `categorySlug`) as arguments to `'use cache'` functions — every argument automatically becomes part of the cache key.
