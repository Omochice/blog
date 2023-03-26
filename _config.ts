import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx.ts";
import windi from "lume/plugins/windi_css.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import zennRenderer from "./plugins/zenn-renderer/mod.ts";
import zennKatex from "./plugins/zenn-katex/mod.ts";

const site = lume({
  location: new URL("https://omochice.github.io/gh-pages/"),
});

site.use(jsx())
  .use(windi())
  .use(zennRenderer())
  .use(zennKatex())
  .use(resolveUrls())
  .copy("/assets");

export default site;

export const title = "$ Omochice 2>&1";
