import site from "../../_config.ts";

export function joinUrl(to: string): string {
  const n = new URL(to.replace(/^\//, "./"), site.options.location);
  return n.href;
}
