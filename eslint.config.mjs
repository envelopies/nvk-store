import nx from '@nx/eslint-plugin';
import angularEslint from '@angular-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', 'node_modules', '.nx'],
  },
  {
    files: ['**/*.ts'],
    plugins: {
      '@angular-eslint': angularEslint,
      '@typescript-eslint': tseslint.plugin,
      prettier: prettier,
    },
    languageOptions: {
      parser,
      parserOptions: {
        project: ['./tsconfig.base.json'],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            accessors: 'explicit',
            constructors: 'no-public',
            methods: 'explicit',
            properties: 'explicit',
            parameterProperties: 'explicit',
          },
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/prefer-readonly': 'error',

      '@angular-eslint/component-class-suffix': ['error', { suffixes: ['Component'] }],
      '@angular-eslint/directive-class-suffix': ['error', { suffixes: ['Directive'] }],
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',

      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@angular/core',
              importNames: ['Inject'],
              message: 'Используй inject() вместо @Inject',
            },
          ],
          patterns: [
            {
              group: ['../../../*'],
              message: 'Слишком глубокий relative import. Используй alias через tsconfig.base.json',
            },
          ],
        },
      ],
      'max-lines': ['warn', 500],
      'max-lines-per-function': ['warn', { max: 75, skipComments: true, skipBlankLines: true }],
      complexity: ['warn', 10],
      'no-console': 'error',
      'no-debugger': 'error',
      'prettier/prettier': 'error',
    },
  },
];
