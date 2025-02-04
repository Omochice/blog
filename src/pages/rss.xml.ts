import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { joinURL } from "ufo";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";

type Context = {
  site: string;
};

export async function GET(context: Context) {
  const posts = await getCollection("post");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: joinURL(import.meta.env.BASE_URL, "posts", post.slug),
      pubDate: post.data.date,
      description: post.data.description || post.body,
    })),
  });
}
