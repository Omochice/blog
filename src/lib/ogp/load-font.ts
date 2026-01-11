const GOOGLE_FONTS_CSS_URL =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&display=swap";

async function fetchFontCss(): Promise<string> {
  const response = await fetch(GOOGLE_FONTS_CSS_URL, {
    headers: {
      // Request TTF format by using an older User-Agent
      // WOFF2 is not supported by satori
      "User-Agent":
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Google Fonts CSS: ${response.statusText}`);
  }

  return response.text();
}

function extractFontUrl(css: string): string {
  const urlMatch = css.match(/src:\s*url\(([^)]+)\)/);
  if (!urlMatch?.[1]) {
    throw new Error("Failed to extract font URL from CSS");
  }
  return urlMatch[1];
}

export async function loadFont(): Promise<ArrayBuffer> {
  const css = await fetchFontCss();
  const fontUrl = extractFontUrl(css);

  const fontResponse = await fetch(fontUrl);
  if (!fontResponse.ok) {
    throw new Error(`Failed to fetch font: ${fontResponse.statusText}`);
  }

  return fontResponse.arrayBuffer();
}
