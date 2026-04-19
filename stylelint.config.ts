import type { Config } from "stylelint";

export default {
  ignoreFiles: ["dist/**"],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recess-order",
    "stylelint-config-astro",
  ],
  overrides: [
    {
      files: ["*.astro", "**/*.astro"],
    },
  ],
} as const satisfies Config;
