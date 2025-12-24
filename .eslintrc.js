module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:playwright/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "playwright/expect-expect": "off", // Optional: depending on preference
    "no-console": "warn",
    "no-unused-vars": "warn",
  },
};
