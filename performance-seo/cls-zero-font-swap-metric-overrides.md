# Zero-CLS Webfont Swaps with `next/font` Fallback Metric Overrides

> Date: 2026-11-03

Even with `font-display: swap`, swapping from system `Arial` to a custom sans-serif shifts multi-line headings enough to register `0.03–0.08` Cumulative Layout Shift (CLS). `next/font/google` automatically computes `@font-face` `size-adjust`, `ascent-override`, and `descent-override` on an invisible local fallback font when `adjustFontFallback` stays enabled.

```tsx
// app/layout.tsx
import { Inter, JetBrains_Mono } from "next/font/google";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  adjustFontFallback: true,
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  adjustFontFallback: false, // Monospace fonts share fixed advance widths
});
```

### Gotcha

Self-hosted `next/font/local` enables `adjustFontFallback: "Arial"` by default — switch to `adjustFontFallback: "Times New Roman"` when loading a **serif** display font so glyph proportions match closely.
