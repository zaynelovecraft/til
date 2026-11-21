# Linking `Person`, `WebSite`, and `BlogPosting` Entities in a Single JSON-LD `@graph`

> Date: 2026-11-19

Dropping disconnected `<script type="application/ld+json">` tags across layouts and pages creates duplicate, unlinked `Person` and `Organization` entities in search and AI answer crawlers. Using stable `#id` fragment URIs inside a unified `@graph` lets every article reference a canonical author and publisher node.

```ts
export function buildArticleGraph(siteUrl: string, post: { slug: string; title: string; date: string }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Zayne Lovecraft",
        url: siteUrl,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "BlogPosting",
        "@id": `${siteUrl}/articles/${post.slug}#article`,
        headline: post.title,
        datePublished: post.date,
        author: { "@id": `${siteUrl}/#person` },
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
    ],
  };
}
```

### Always Escape `<` in Inline JSON-LD

Serialize with `JSON.stringify(data).replace(/</g, "\\u003c")` inside `dangerouslySetInnerHTML` so titles containing `</script>` can never break out of the script tag.
