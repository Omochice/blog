import type { Page } from "lume/core.ts";
import site from "./_config.ts";
import { compareDesc, fromUnixTime } from "date-fns";

function comparePage(a: Page, b: Page): number {
  const defaultCreated = fromUnixTime(0);
  return compareDesc(
    a.src?.created ?? defaultCreated,
    b.src?.created ?? defaultCreated,
  );
}

export function getPosts(tag?: string): Page[] {
  const posts = site.pages
    .filter((page: Page) => page.data.type !== undefined)
    .sort(comparePage);
  if (tag === undefined) {
    return posts;
  }
  return posts.filter((p: Page) => {
    const tags = (p.data.topics ?? [])
      .map((t: string) => t.toLowerCase());
    return tags.includes(tag.toLowerCase());
  });
}

export function getTags(): Set<string> {
  return new Set(
    getPosts().map((page) => page.data.topics ?? [])
      .flat()
      .filter((e: string) => !/^\s*$/.test(e))
      .map((tag: string) => tag!.toLowerCase()),
  );
}
