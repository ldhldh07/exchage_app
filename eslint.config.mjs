import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import boundaries from "eslint-plugin-boundaries";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

const eslintConfig = defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  globalIgnores(["dist/**", "node_modules/**", "dev_team/**", ".next/**", "*.config.js"]),
  {
    files: ["**/*.{ts,tsx}"],
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
        { type: "pages", pattern: "src/pages/*/**" },
        { type: "widgets", pattern: "src/widgets/*/**" },
        { type: "features", pattern: "src/features/*/**" },
        { type: "entities", pattern: "src/entities/*/**" },
        { type: "shared", pattern: "src/shared/*/**" },
      ],
    },
    rules: {
      "prettier/prettier": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: "pages",
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
]);

export default eslintConfig;
