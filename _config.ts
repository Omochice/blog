import lume from "lume/mod.ts";
import blog from "https://deno.land/x/lume_theme_simple_blog@v0.10.2/mod.ts";

const site = lume({
  location: new URL("https://omochice.github.io/blog/"),
  // src: "site",
});

site.use(blog());

export default site;
