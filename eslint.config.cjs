/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
const { defineConfig } = require('eslint/config');
const jest = require('eslint-plugin-jest');
const prettier = require('eslint-plugin-prettier');
const globals = require('globals');
const js = require('@eslint/js');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {
    extends: compat.extends(
      'airbnb-base',
      'plugin:jest/recommended',
      'plugin:prettier/recommended',
    ),

    plugins: {
      jest,
      prettier,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },

      ecmaVersion: 'latest',
      sourceType: 'commonjs',
    },

    rules: {
      'no-console': 'error',
      'func-names': 'off',
      'no-underscore-dangle': 'off',
      'consistent-return': 'off',
      'jest/expect-expect': 'off',
    },
  },
]);
