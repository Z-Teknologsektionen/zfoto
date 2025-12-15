import antfu from "@antfu/eslint-config";

export default antfu(
  {
    ignores: ["*.mjs", "**/*.mjs/**"],
    formatters: true,
    react: true,
    lessOpinionated: true,
    nextjs: true,
    typescript: {
      overrides: {
        "ts/consistent-type-definitions": ["error", "type"],
      },
      tsconfigPath: "tsconfig.json",
    },
    stylistic: false,
    test: false,
  },
  {
    rules: {
      "node/prefer-global/process": "off",
    },
  },
);
