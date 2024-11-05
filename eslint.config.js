import globals from "globals";
import pluginJs from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  { ignores: ["node_modules", "examples", "outputs"] },
  { plugins: { prettier: prettierPlugin } },
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "off",
      ...prettierConfig.rules,
      "prettier/prettier": "error",
      "linebreak-style": ["error", "windows"],
    },
  },
];
