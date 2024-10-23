import type { Page } from "lume/core/file.ts";
import site from "../../../_config.ts";
import { compareDesc, fromUnixTime, parse } from "date-fns";
import { basename } from "jsr:@std/path@1.0.6/basename";
import { err, ok, Result } from "npm:neverthrow@8.1.0";

function comparePage(a: Page, b: Page): number {
  const defaultCreated = fromUnixTime(0);
  const createdA = parseDate(a.src.path);
  const createdB = parseDate(b.src.path);
  return compareDesc(
    createdA.isOk() ? createdA.value : defaultCreated,
    createdB.isOk() ? createdB.value : defaultCreated,
  );
}

function parseDate(p: string): Result<Date, unknown> {
  const base = basename(p);
  const r = /^\d{4}-\d{1,2}-\d{1,2}/.exec(base);
  if (r == null || r.length === 0) {
    return err(`${basename} hasnt ${r}`);
  }
  try {
    const p = parse(r[0], "yyyy-MM-dd", new Date());
    // NOTE: p maybe invalid
    if (isNaN(p.getDate())) throw new Error(`${p}`);
    return ok(p);
  } catch (e) {
    return err(e);
  }
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
