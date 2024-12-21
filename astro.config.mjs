import mdx from "@astrojs/mdx";
// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://Omochice.github.io/blog",
  base: "/blog",
  integrations: [mdx(), sitemap()],
});
