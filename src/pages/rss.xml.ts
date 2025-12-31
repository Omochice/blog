import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { experimental_AstroContainer } from "astro/container";
import sanitizeHtml from "sanitize-html";
import { joinURL } from "ufo";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";

type Context = {
  site: string;
};

export async function GET(context: Context) {
  const posts = await getCollection("post");
  const container = await experimental_AstroContainer.create();
  const items = await Promise.all(
    posts
      .filter((post) => post.data.type !== "poem")
      .map(async (post) => ({
        ...post.data,
        link: joinURL(import.meta.env.BASE_URL, "posts", post.slug),
        pubDate: post.data.date,
        content: sanitizeHtml(
          await container.renderToString((await post.render()).Content),
          {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
          },
        ),
      })),
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: items.sort((a, b) => b.date.valueOf() - a.date.valueOf()),
  });
}
