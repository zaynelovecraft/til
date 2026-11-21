#!/usr/bin/env node
/**
 * Scans category folders for Markdown TIL notes, validates structure,
 * and regenerates README.md (or verifies it is up-to-date with --check).
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(process.cwd());
const CHECK_ONLY = process.argv.includes("--check");

const CATEGORY_LABELS = {
  nextjs: "Next.js & App Router",
  "react-typescript": "React 19 & TypeScript",
  "performance-seo": "Core Web Vitals & Technical SEO",
  "ai-mcp": "AI Systems & MCP Servers",
  "macos-dx": "macOS, Git & Developer Tooling",
};

const IGNORED_DIRS = new Set([".git", ".github", "node_modules", "scripts"]);

function collectEntries() {
  const entries = [];
  const dirs = readdirSync(ROOT).filter((name) => {
    if (IGNORED_DIRS.has(name) || name.startsWith(".")) return false;
    return statSync(join(ROOT, name)).isDirectory();
  });

  for (const category of dirs.sort()) {
    const dirPath = join(ROOT, category);
    const files = readdirSync(dirPath)
      .filter((f) => f.endsWith(".md"))
      .sort();

    for (const file of files) {
      const fullPath = join(dirPath, file);
      const relPath = `${category}/${file}`;
      const raw = readFileSync(fullPath, "utf8");

      const titleMatch = raw.match(/^#\s+(.+)$/m);
      if (!titleMatch) {
        throw new Error(`Missing '# Title' heading in ${relPath}`);
      }

      const dateMatch = raw.match(/^>\s*Date:\s*(\d{4}-\d{2}-\d{2})/m);
      if (!dateMatch) {
        throw new Error(`Missing '> Date: YYYY-MM-DD' metadata line in ${relPath}`);
      }

      entries.push({
        category,
        categoryLabel: CATEGORY_LABELS[category] || category,
        file,
        relPath,
        title: titleMatch[1].trim(),
        date: dateMatch[1],
      });
    }
  }

  return entries;
}

function buildReadme(entries) {
  const byDateDesc = [...entries].sort(
    (a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title),
  );
  const categories = [...new Set(entries.map((e) => e.category))];

  const recentLines = byDateDesc
    .slice(0, 6)
    .map((e) => `- **[${e.title}](${e.relPath})** — \`${e.categoryLabel}\` · *${e.date}*`)
    .join("\n");

  const categoryToc = categories
    .map((cat) => {
      const count = entries.filter((e) => e.category === cat).length;
      const label = CATEGORY_LABELS[cat] || cat;
      const anchor = label
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      return `- [${label}](#${anchor}) (${count})`;
    })
    .join("\n");

  const categorySections = categories
    .map((cat) => {
      const label = CATEGORY_LABELS[cat] || cat;
      const catEntries = entries
        .filter((e) => e.category === cat)
        .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
      const bullets = catEntries
        .map((e) => `- [${e.title}](${e.relPath}) — *${e.date}*`)
        .join("\n");
      return `### ${label}\n\n${bullets}`;
    })
    .join("\n\n");

  return `# TIL — Today I Learned ⚡

[![CI](https://github.com/zaynelovecraft/til/actions/workflows/ci.yml/badge.svg)](https://github.com/zaynelovecraft/til/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/zaynelovecraft/til)](https://github.com/zaynelovecraft/til/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Website](https://img.shields.io/badge/Blog-zaynelovecraft.com-6366f1)](https://www.zaynelovecraft.com/articles)

Concise, copy-pasteable engineering field notes on **Next.js App Router**, **React 19**, **TypeScript**, **Core Web Vitals**, **MCP servers**, and **macOS tooling** — written down as I hit them in day-to-day engineering. Longer deep dives live at **[zaynelovecraft.com/articles](https://www.zaynelovecraft.com/articles)**.

**${entries.length} TILs** across **${categories.length} categories**.

---

## Recent Notes

<!-- RECENT-TILS:START -->
${recentLines}
<!-- RECENT-TILS:END -->

## Categories

${categoryToc}

---

${categorySections}

---

## Adding a Note

1. Create \`<category>/<slug>.md\` starting with \`# Title\` and \`> Date: YYYY-MM-DD\`.
2. Run \`npm run build\` to update the count and index in \`README.md\`.
`;
}

const entries = collectEntries();
const nextReadme = buildReadme(entries);
const readmePath = join(ROOT, "README.md");

if (CHECK_ONLY) {
  let current = "";
  try {
    current = readFileSync(readmePath, "utf8");
  } catch {
    console.error("README.md does not exist. Run `npm run build`.");
    process.exit(1);
  }
  if (current !== nextReadme) {
    console.error("README.md index is out of sync with TIL files. Run `npm run build`.");
    process.exit(1);
  }
  console.log(`Verified ${entries.length} TIL entries across README.md.`);
} else {
  writeFileSync(readmePath, nextReadme, "utf8");
  console.log(`Generated README.md with ${entries.length} TIL entries.`);
}
