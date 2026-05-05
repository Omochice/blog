import { container, text } from "@takumi-rs/helpers";
import type { APIRoute } from "astro";
import { ImageResponse } from "takumi-js/response";
import { SITE_TITLE } from "../../consts";
import { ogFonts } from "../../lib/og-fonts";

export const GET: APIRoute = () => {
  const node = container({
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#ffffff",
      padding: "80px",
      fontFamily: "JetBrains Mono",
    },
    children: [
      container({
        style: {
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        children: [
          text({
            text: SITE_TITLE,
            style: {
              fontSize: 96,
              fontWeight: 700,
              color: "#0f1219",
            },
          }),
        ],
      }),
      container({
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        },
        children: [
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
