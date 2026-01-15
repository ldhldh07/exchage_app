import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import boundaries from "eslint-plugin-boundaries";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", ".next/**", "*.config.js", "*.config.ts"],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettierConfig],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      boundaries,
      prettier,
      react,
      "react-hooks": reactHooks,
    },
    settings: {
      react: {
        version: "detect",
      },
      "boundaries/elements": [
        { type: "app", pattern: "src/app/*/**" },
        { type: "widgets", pattern: "src/widgets/*/**" },
        { type: "features", pattern: "src/features/*/**" },
        { type: "entities", pattern: "src/entities/*/**" },
        { type: "shared", pattern: "src/shared/*/**" },
      ],
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "prettier/prettier": "error",
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: "app",
              allow: ["widgets", "features", "entities", "shared"],
            },
            { from: "widgets", allow: ["features", "entities", "shared"] },
            { from: "features", allow: ["entities", "shared"] },
            { from: "entities", allow: ["shared"] },
            { from: "shared", allow: ["shared"] },
          ],
        },
      ],
    },
  },
);
