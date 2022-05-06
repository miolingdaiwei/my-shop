/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  env: {
    "vue/setup-compiler-macros": true,
  },
  overrides: [
    {
      files: [
        "src/views/**/*.ts",
        "src/views/**/index.vue",
        "src/views/**/**/index.vue",
      ],
      rules: {
        "vue/multi-word-component-names": "off",
      },
    },
  ],
};
