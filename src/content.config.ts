import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const post = defineCollection({
  loader: glob({ base: "./src/content/post", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    type: z.union([z.literal("tech"), z.literal("poem"), z.literal("idea")]),
  }),
});

export const collections = { post };
