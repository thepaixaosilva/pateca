const jest = require('eslint-plugin-jest');
const prettier = require('eslint-plugin-prettier');
const globals = require('globals');
const js = require('@eslint/js');

module.exports = [
  // Configuração base do JavaScript recomendada
  js.configs.recommended,
  
  // Configuração para Jest
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    plugins: {
      jest,
    },
    rules: {
      ...jest.configs.recommended.rules,
    },
  },
  
  // Configuração principal
  {
    files: ['**/*.js'],
    plugins: {
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
      // Regras do Prettier
      'prettier/prettier': 'error',
      
      // Regras personalizadas
      'no-console': 'error',
      'func-names': 'off',
      'no-underscore-dangle': 'off',
      'consistent-return': 'off',
      'jest/expect-expect': 'off',
      
      // Algumas regras do Airbnb Base que você pode querer manter
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'eqeqeq': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-duplicate-imports': 'error',
      'no-useless-return': 'error',
      'no-else-return': 'error',
      'prefer-template': 'error',
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-spacing': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'indent': ['error', 2],
    },
  },
];