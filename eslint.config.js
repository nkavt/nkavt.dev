// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import astro from 'eslint-plugin-astro';
import betterTailwind from 'eslint-plugin-better-tailwindcss';
import globals from 'globals';

export default tseslint.config(
  { ignores: ['dist/', '.astro/', 'node_modules/', 'public/'] },
  {
    // Build-time scripts run in Node and drive a headless browser
    files: ['scripts/**/*.{js,mjs}', '*.config.{js,mjs}'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    // Tailwind: correctness as errors, style rules (canonical names, ordering, shorthands) as warnings
    files: ['**/*.{ts,tsx,astro}'],
    plugins: { 'better-tailwindcss': betterTailwind },
    settings: { 'better-tailwindcss': { entryPoint: 'src/styles/global.css' } },
    rules: {
      ...betterTailwind.configs['correctness-error'].rules,
      ...betterTailwind.configs['stylistic-warn'].rules,
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
      // `.readme` styles markdown descendants from global.css, so it is not a Tailwind utility
      'better-tailwindcss/no-unknown-classes': ['error', { ignore: ['readme'] }],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...react.configs.flat.recommended,
    ...react.configs.flat['jsx-runtime'],
    settings: { react: { version: 'detect' } },
    plugins: { react, 'react-hooks': reactHooks, 'jsx-a11y': jsxA11y },
    languageOptions: { globals: { ...globals.browser } },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react/prop-types': 'off',
    },
  },
);
