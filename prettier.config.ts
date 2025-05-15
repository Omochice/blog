import type { Config } from "prettier";

const config = {
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  trailingComma: "all",
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  bracketSameLine: false,
  singleAttributePerLine: true,
} as const satisfies Config;

export default config;
