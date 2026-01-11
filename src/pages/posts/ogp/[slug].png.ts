import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { SITE_TITLE } from "../../../consts.ts";
import { generateOGPImage } from "../../../lib/ogp/generate-ogp-image.ts";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("post");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: {
      title: post.data.title,
      date: post.data.date.toISOString().substring(0, 10),
    },
  }));
};

type Props = {
  title: string;
  date: string;
};

export const GET: APIRoute<Props> = async ({ props }) => {
  const { title, date } = props;

  const png = await generateOGPImage({
    title,
    siteName: SITE_TITLE,
    date,
  });

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
