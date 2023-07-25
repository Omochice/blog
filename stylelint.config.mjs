import { rules as standard } from "npm:stylelint-config-standard";
import { rules as tailwind } from "npm:stylelint-config-tailwindcss";
import { rules as recessOrder } from "npm:stylelint-config-recess-order";
import { default as order } from "npm:stylelint-order";

export default {
  rules: {
    ...standard,
    ...recessOrder,
    ...tailwind,
  },
  plugins: [
    order,
  ],
  ignoreFiles: [
    "_site/**/*",
  ],
};
