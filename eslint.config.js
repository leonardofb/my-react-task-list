import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import babelEslintParser from "@babel/eslint-parser";

// Opcional: Limpia las claves de globals.browser para evitar espacios en blanco
const trimmedGlobals = Object.entries(globals.browser).reduce((acc, [key, value]) => {
  acc[key.trim()] = value;
  return acc;
}, {});

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      parser: babelEslintParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: trimmedGlobals,
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
];
