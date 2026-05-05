import { getCollection } from "astro:content";
import { container, text } from "@takumi-rs/helpers";
import type { APIRoute, GetStaticPaths } from "astro";
import { loadDefaultJapaneseParser } from "budoux";
import { ImageResponse } from "takumi-js/response";
import { SITE_TITLE } from "../../consts";
import { ogFonts } from "../../lib/og-fonts";

const parser = loadDefaultJapaneseParser();

const titleStyle = {
  fontSize: 56,
  fontWeight: 700,
  color: "#0f1219",
  lineHeight: 1.4,
} as const;

export const getStaticPaths = (async () => {
  const posts = await getCollection("post");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const { title } = props as { title: string };

  const segments = parser.parse(title).map((segment) =>
    text({
      text: segment,
      style: titleStyle,
    }),
  );

  const node = container({
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#ffffff",
      padding: "80px",
      fontFamily: "Noto Sans JP",
    },
    children: [
      container({
        style: {
          flex: 1,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        },
        children: segments,
      }),
      container({
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
        children: [
          text({
            text: SITE_TITLE,
            style: {
              fontFamily: "JetBrains Mono",
              fontSize: 28,
              color: "#22293a",
            },
          }),
          container({
            style: {
              width: 100,
              height: 4,
              backgroundColor: "#2337ff",
            },
          }),
        ],
      }),
    ],
  });

  return new ImageResponse(node, {
    width: 1200,
    height: 630,
    fonts: ogFonts,
  });
};
