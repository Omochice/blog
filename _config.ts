import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import postcss from "lume/plugins/postcss.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import zennRenderer from "./plugins/zenn-renderer/mod.ts";
import zennKatex from "./plugins/zenn-katex/mod.ts";

const site = lume({
  location: new URL("https://omochice.github.io/blog/"),
});

site
  .use(tailwindcss())
  .use(postcss())
  .use(jsx())
  .use(zennRenderer())
  .use(zennKatex())
  .use(resolveUrls())

export default site;

export const title = "$ Omochice 2>&1";
