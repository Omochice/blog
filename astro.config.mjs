import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
// @ts-check
import { defineConfig } from "astro/config";
import { loadDefaultJapaneseParser } from "budoux";
import { visit } from "unist-util-visit";

function remarkBudoux() {
  const parser = loadDefaultJapaneseParser();
  return (tree) => {
    visit(tree, "text", (node) => {
      if (node.value.trim() === "") {
        return;
      }
      node.value = parser.parse(node.value).join("<wbr />");
      node.type = "html";
    });
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://Omochice.github.io/blog",
  base: "/blog",
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkBudoux],
  },
});
