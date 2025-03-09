export default {
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
};
