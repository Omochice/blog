import { rules as standard } from "npm:stylelint-config-standard@34.0.0";
import { rules as tailwind } from "npm:stylelint-config-tailwindcss@0.0.7";
import { rules as recessOrder } from "npm:stylelint-config-recess-order@4.3.0";
import { default as order } from "npm:stylelint-order@6.0.3";

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
