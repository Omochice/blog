import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { loadFont } from "./load-font.ts";
import { type OGPTemplateProps, createOGPTemplate } from "./ogp-template.ts";

const WIDTH = 1200;
const HEIGHT = 630;

export async function generateOGPImage(
  props: OGPTemplateProps,
): Promise<Uint8Array> {
  const fontData = await loadFont();

  const svg = await satori(createOGPTemplate(props), {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      {
        name: "Noto Sans JP",
        data: fontData,
        weight: 700,
        style: "normal",
      },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: WIDTH,
    },
  });

  return resvg.render().asPng();
}
