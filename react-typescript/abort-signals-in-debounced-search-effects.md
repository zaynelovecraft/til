# Composing User Cancellation and Timeouts with `AbortSignal.any()`

> Date: 2026-11-05

Instead of manually wiring `setTimeout(() => controller.abort(), 5000)` and cleaning up timers when canceling stale `fetch` calls on rapid user input, Node 20+ and all modern browsers support `AbortSignal.any()` + `AbortSignal.timeout()` natively.

```ts
export async function searchCatalog(query: string, callerSignal?: AbortSignal) {
  const signals = [AbortSignal.timeout(4_000)];
  if (callerSignal) signals.push(callerSignal);

  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
    signal: AbortSignal.any(signals),
  });

  if (!res.ok) throw new Error(`Search failed: ${res.status}`);
  return res.json();
}
```

### Distinguishing Cancel vs. Timeout

- User-triggered `controller.abort()` throws `DOMException` with `err.name === "AbortError"`.
- `AbortSignal.timeout()` throws `DOMException` with `err.name === "TimeoutError"`, making telemetry filtering trivial.
