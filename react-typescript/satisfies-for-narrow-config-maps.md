# Preserving Literal Key Inference in Config Maps with TypeScript `satisfies`

> Date: 2026-11-08

Annotating a configuration object as `const ROUTES: Record<string, RouteConfig> = { ... }` widens `keyof typeof ROUTES` to `string`, destroying autocomplete on route keys. Using `satisfies` validates every value against `Record<string, RouteConfig>` while keeping narrow literal keys intact.

```ts
type RouteConfig = {
  path: `/${string}`;
  cacheSeconds: number;
};

export const ROUTES = {
  home: { path: "/", cacheSeconds: 3600 },
  articles: { path: "/articles", cacheSeconds: 3600 },
  work: { path: "/work", cacheSeconds: 86400 },
} satisfies Record<string, RouteConfig>;

// Narrow union: "home" | "articles" | "work"
export type RouteKey = keyof typeof ROUTES;
```

### Bonus

Combine `as const satisfies Record<string, RouteConfig>` when you also want the nested `path` values preserved as literal string types (`"/articles"` instead of `` `/${string}` ``).
