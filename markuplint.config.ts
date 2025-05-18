import type { Config } from "@markuplint/ml-config";

const config = {
  extends: ["markuplint:recommended"] as const,
  parser: {
    ".astro$": "@markuplint/astro-parser",
  },
} as const satisfies Config;

export default config;
