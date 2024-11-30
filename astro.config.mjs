import mdx from "@astrojs/mdx";
// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://Omochice.github.io",
  base: process.env.CI ? "/blog" : "/",
  integrations: [mdx(), sitemap()],
});
