import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import type { FontLoader } from "@takumi-rs/core";

const fontFile = (specifier: string) =>
  readFile(fileURLToPath(import.meta.resolve(specifier)));

const [notoRegular, notoBold, jetbrainsRegular, jetbrainsBold] =
  await Promise.all([
    fontFile(
      "@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-400-normal.woff2",
    ),
    fontFile(
      "@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-700-normal.woff2",
    ),
    fontFile(
      "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2",
    ),
    fontFile(
      "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2",
    ),
  ]);

export const ogFonts: FontLoader[] = [
  { name: "Noto Sans JP", data: notoRegular, weight: 400, style: "normal" },
  { name: "Noto Sans JP", data: notoBold, weight: 700, style: "normal" },
  {
    name: "JetBrains Mono",
    data: jetbrainsRegular,
    weight: 400,
    style: "normal",
  },
  {
    name: "JetBrains Mono",
    data: jetbrainsBold,
    weight: 700,
    style: "normal",
  },
];
