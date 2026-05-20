import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      "public/**"
    ]
  },
  {
    plugins: {
      "@next/next": nextPlugin
    }
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module"
      },
      globals: {
        React: "readonly",
        console: "readonly",
        crypto: "readonly",
        window: "readonly",
        process: "readonly",
        Request: "readonly",
        URL: "readonly"
      }
    },
    plugins: {
      "@next/next": nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      "no-unused-vars": "off",
      "no-undef": "off"
    }
  }
];
