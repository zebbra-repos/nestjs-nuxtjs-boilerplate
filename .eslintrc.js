module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:nuxt/recommended",
  ],
  plugins: ["prettier"],
  // add your custom rules here
  rules: {
    "no-useless-constructor": 0,
    "no-console": 0,
    "no-use-before-define": 0,
  },
};
