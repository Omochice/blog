import { loadDefaultJapaneseParser } from "budoux";

const parser = loadDefaultJapaneseParser();

/**
 * The one that divides text in a way that's nicely
 *
 * @param text The text to be divided
 * @returns The divided text
 */
export function budouxfy(text: string): string {
  return parser.parse(text).join("<wbr />");
}
