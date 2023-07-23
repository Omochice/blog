import lume from "lume/mod.ts";
import windi from "lume/plugins/windi_css.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import zennRenderer from "./plugins/zenn-renderer/mod.ts";
import zennKatex from "./plugins/zenn-katex/mod.ts";
import pagefind from "lume/plugins/pagefind.ts";

const site = lume({
  location: new URL("https://omochice.github.io/blog/"),
});

site.use(jsx())
  .use(windi())
  .use(zennRenderer())
  .use(zennKatex())
  .use(resolveUrls())
  .use(pagefind())
  .copy("/assets");

export default site;

export const title = "$ Omochice 2>&1";
