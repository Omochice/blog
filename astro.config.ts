import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
// @ts-check
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import lightningcss from "vite-plugin-lightningcss";

// https://astro.build/config
export default defineConfig({
  site: "https://Omochice.github.io/blog",
  base: "/blog",
  integrations: [mdx(), sitemap()],
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          content: {
            type: "text",
            value: "#",
          },
          headingProperties: {
            className: ["anchor"],
          },
          properties: {
            className: ["anchor-link"],
          },
        },
      ],
    ],
  },
  vite: {
    plugins: [
      ...lightningcss({
        browserslist: ["> 0.5%", "last 2 versions", "not dead"],
        minify: true,
        sourceMap: true,
      }),
    ],
  },
});
