# Two-Pass Structured Brief + Prose Generation with Zod Quality Gates

> Date: 2026-11-09

Asking an LLM to plan structure, adhere to SEO constraints, and write clean long-form prose in a single prompt degrades both structure and tone. Splitting the pipeline into a deterministic `generateObject` brief step followed by a constrained `generateText` pass catches bad outlines before spending tokens on prose.

```ts
import { generateObject, generateText } from "ai";
import { z } from "zod";

const BriefSchema = z.object({
  title: z.string().min(45).max(65),
  thesis: z.string(),
  sections: z.array(z.object({ heading: z.string(), keyPoint: z.string() })).min(3).max(6),
});

export async function runPipeline(model: Parameters<typeof generateText>[0]["model"], topic: string) {
  const { object: brief } = await generateObject({
    model,
    schema: BriefSchema,
    prompt: `Create a technical outline for: ${topic}`,
  });

  const { text } = await generateText({
    model,
    prompt: `Write the article strictly following this verified brief:\n${JSON.stringify(brief, null, 2)}`,
  });

  return { brief, text };
}
```
