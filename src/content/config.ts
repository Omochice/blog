import { defineCollection, z } from "astro:content";

const post = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string().default("Omochice's blog post"),
    // Transform string to Date object
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    type: z.union([z.literal("tech"), z.literal("poem"), z.literal("idea")]),
  }),
});

export const collections = { post };
