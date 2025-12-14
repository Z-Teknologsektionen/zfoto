import antfu from "@antfu/eslint-config";

export default antfu(
  {
    react: true,
    nextjs: true,
    jsonc: true,
    jsx: true,
    stylistic: false,
    toml: false,
    lessOpinionated: true,
    formatters: {
      css: "prettier",
      html: "prettier",
      markdown: "prettier",
      svg: "prettier",
      xml: "prettier",
    },
    type: "app",
    typescript: {
      overrides: {
        "ts/consistent-type-definitions": ["error", "type"],
      },
      tsconfigPath: "tsconfig.json",
    },
    test: false,
    unicorn: false,
  },
  {
    rules: {
      "node/prefer-global/process": "off",
    },
  },
);
