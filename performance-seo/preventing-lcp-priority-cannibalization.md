# Why Multiple `priority` Images Hurt Mobile LCP Instead of Helping

> Date: 2026-11-13

Putting `priority` (or `fetchPriority="high"`) on every card in a hero carousel forces 4–6 images onto the browser's highest-priority download queue simultaneously, starving the actual Largest Contentful Paint (LCP) element on 4G mobile throttling.

```tsx
// Good: strictly index 0 gets priority + eager loading
{cards.map((card, index) => (
  <Image
    key={card.id}
    src={card.imageUrl}
    alt={card.alt}
    width={640}
    height={360}
    priority={index === 0}
    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
  />
))}
```

### Rule of Thumb

- **At most 1 image per viewport** should carry `priority` (`preload` + `fetchpriority="high"`).
- Always pair `priority` with an accurate `sizes` attribute — omitting `sizes` on a responsive `fill` image makes the browser preload the `3840w` variant on mobile.
