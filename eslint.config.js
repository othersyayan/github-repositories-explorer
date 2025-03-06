import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'dist',
      'build',
      'public',
      '**/out/*',
      '**/node_modules/*',
      'vite.config.js',
      'vite.config.ts',
      'src/reportWebVitals.js',
      'src/service-worker.js',
      'src/serviceWorkerRegistration.js',
      'src/setupTests.js',
      'src/reportWebVitals.ts',
      'src/service-worker.ts',
      'src/serviceWorkerRegistration.ts',
      'src/setupTests.ts',
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/prop-types': 'off',
      'no-alert': 0,
      camelcase: 0,
      'no-console': 0,
      'no-unused-vars': 0,
      'no-param-reassign': 0,
      'no-nested-ternary': 0,
      'no-underscore-dangle': 0,
      'no-restricted-exports': 0,
      'react/no-children-prop': 0,
      'react/react-in-jsx-scope': 0,
      'jsx-a11y/anchor-is-valid': 0,
      'react/no-array-index-key': 0,
      'no-promise-executor-return': 0,
      'import/no-named-as-default': 0,
      'react/require-default-props': 0,
      'react/jsx-props-no-spreading': 0,
      'import/prefer-default-export': 0,
      'react/function-component-definition': 0,
      '@typescript-eslint/naming-convention': 0,
      'jsx-a11y/control-has-associated-label': 0,
      '@typescript-eslint/no-use-before-define': 0,
      'react-refresh/only-export-components': 0,
    },
  }
);
