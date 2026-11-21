# Avoiding React 19 SSR Hydration Mismatches with Persisted Zustand Stores

> Date: 2026-11-16

Reading a `persist`-backed Zustand store (`localStorage`) directly during initial render causes a React hydration mismatch because the server renders default state while the browser restores persisted state synchronously. Deferring selector output until mount with a tiny hook keeps SSR and initial client markup identical.

```ts
// hooks/use-hydrated-store.ts
import { useEffect, useState } from "react";

export function useHydratedStore<T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  selector: (state: T) => F,
  fallback: F,
): F {
  const value = store(selector) as F;
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated ? value : fallback;
}
```

### Usage

```tsx
const itemCount = useHydratedStore(useCartStore, (s) => s.items.length, 0);
```

Both SSR and the first client render see `0`, eliminating hydration errors without disabling SSR on the header.
