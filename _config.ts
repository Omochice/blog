import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import postcss from "lume/plugins/postcss.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import relativeUrls from "lume/plugins/relative_urls.ts";
import feed from "lume/plugins/feed.ts";
import markdown from "lume/plugins/markdown.ts";
import markdownItKatex from "npm:@vscode/markdown-it-katex";
import codeHighlight from "lume/plugins/code_highlight.ts";

const site = lume({
  location: new URL("https://omochice.github.io/blog/"),
  src: "site",
});

site
  .use(markdown({
    plugins: [
      markdownItKatex.default,
    ],
  }))
  .use(codeHighlight())
  .use(tailwindcss())
  .use(postcss())
  .use(jsx())
  .use(resolveUrls())
  .use(relativeUrls())
  .use(feed({
    output: ["/feed.xml", "/feed.json"],
    query: "type=tech|idea",
    info: {
      title: "=site.title",
      description: "=site.description",
      lang: "ja",
    },
    items: {
      title: "=title",
      description: "=excerpt",
      content: "$.article",
    },
  }))
  .remoteFile(
    "assets/highlight.css",
    "https://unpkg.com/@catppuccin/highlightjs@0.1.4/css/catppuccin-mocha.css",
  );

export default site;
