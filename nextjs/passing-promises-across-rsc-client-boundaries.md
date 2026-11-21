# Streaming Unawaited Server Promises Across RSC -> Client Boundaries with `use()`

> Date: 2026-11-20

In Next.js App Router with React 19, awaiting slow secondary queries inside a Server Component blocks the entire route segment's shell. Instead, start the promise on the server **without** `await`, pass the promise prop across the RSC boundary into a `<Suspense>`-wrapped Client Component, and unwrap it with `React.use()`.

```tsx
// app/products/[id]/page.tsx (Server Component)
import { Suspense } from "react";
import { InventoryBadge } from "./inventory-badge";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Kick off slow inventory check without awaiting it on the critical path
  const inventoryPromise = fetchInventoryStatus(id);

  return (
    <main>
      <h1>Product #{id}</h1>
      <Suspense fallback={<span className="skeleton">Checking stock...</span>}>
        <InventoryBadge inventoryPromise={inventoryPromise} />
      </Suspense>
    </main>
  );
}
```

```tsx
// app/products/[id]/inventory-badge.tsx
"use client";

import { use } from "react";

export function InventoryBadge({
  inventoryPromise,
}: {
  inventoryPromise: Promise<{ inStock: boolean; count: number }>;
}) {
  const { inStock, count } = use(inventoryPromise);
  return <span>{inStock ? `${count} available` : "Out of stock"}</span>;
}
```

### Gotchas

- The resolved value **must be RSC-serializable** (plain objects, primitives, dates — no class instances or functions).
- Always wrap the consuming Client Component in an `<ErrorBoundary>` + `<Suspense>` pair so rejected promises degrade gracefully instead of crashing the tree.
