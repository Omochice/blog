import { loadDefaultJapaneseParser } from "budoux";

const parser = loadDefaultJapaneseParser();

/**
 * Divides Japanese text into segments with word-break hints using the Budoux parser.
 *
 * @param text The text to be divided
 * @returns The divided text with `<wbr />` tags as word-break hints
 */
export function budouxfy(text: string): string {
  return parser.parse(text).join("<wbr />");
}
