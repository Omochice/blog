import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import postcss from "lume/plugins/postcss.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import zennRenderer from "https://pax.deno.dev/Omochice/lume-plugin-zenn-renderer@v0.0.1/mod.ts";
import feed from "lume/plugins/feed.ts";

const site = lume({
  location: new URL("https://omochice.github.io/blog/"),
  src: "site",
});

site
  .use(tailwindcss())
  .use(postcss())
  .use(jsx())
  .use(zennRenderer())
  .use(resolveUrls())
  .use(feed({
    output: ["/posts.rss", "/posts.json"],
    query: "type=tech|idea",
    info: {
      title: "=site.title",
      description: "=site.description",
      lang: "ja",
    },
    items: {
      title: "=title",
      description: "=excerpt",
      content: "$.znc",
    },
  }));

export default site;
