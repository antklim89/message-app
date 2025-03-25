import antfu from '@antfu/eslint-config';


export default antfu(
  {
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
    },

    typescript: {
      tsconfigPath: 'tsconfig.json',
      overridesTypeAware: {
        'ts/restrict-template-expressions': ['error', {
          allowAny: false,
          allowBoolean: false,
          allowNullish: false,
          allowNumber: true,
          allowRegExp: false,
          allowNever: false,
        }],
        'ts/no-misused-promises': ['error', { checksVoidReturn: false }],
        'ts/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      },
    },

    isInEditor: true,

    react: true,

    formatters: {
      css: true,
    },

    ignores: [
      '**/node_modules/**',
      '**/public/**',
      '**/pb_data/**',
    ],

    rules: {
      'ts/no-non-null-assertion': 'error',
      'unused-imports/no-unused-imports': 'error',
      'import/newline-after-import': ['error', { count: 2 }],
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          internalPattern: ['^(~|@)/.*'],
          newlinesBetween: 'never',
          groups: [
            'custom',
            'style',
            'side-effect',
            'side-effect-style',
            ['builtin', 'builtin-type'],
            ['external', 'external-type'],
            ['internal', 'internal-type'],
            ['sibling', 'sibling-type'],
            ['parent', 'parent-type'],
            ['index', 'index-type'],
            'object',
            'unknown',
          ],
          customGroups: {
            value: {
              custom: ['react', 'react-dom', 'next', 'next/*'],
            },
            type: {
              custom: ['react', 'react-dom', 'next', 'next/*'],
            },
          },
        },
      ],
      'no-restricted-imports': ['error', { patterns: ['../'] }],
      'style/no-multiple-empty-lines': ['error', { max: 2 }],
      'antfu/if-newline': 'off',
      'style/brace-style': ['off', '1tbs'],
      'no-shadow': 'error',
      'object-curly-newline': ['error', {
        minProperties: 6,
        multiline: false,
        consistent: true,
      }],
      'max-lines-per-function': ['error', 200],
      'max-statements': ['error', 50, { ignoreTopLevelFunctions: true }],
      'style/object-curly-newline': ['error', { consistent: true, minProperties: 4 }],
      'node/prefer-global/process': 'off',
    },
  },
  {
    files: ['**/*.tsx', '**/*.jsx'],
    rules: {
      'react-refresh/only-export-components': ['error', {
        allowConstantExport: true,
        allowExportNames: [
          'dynamicParams',
          'dynamic',
          'generateStaticParams',
          'generateMetadata',
          'metadata',
          'getStaticProps',
          'getStaticPaths',
        ],
      }],
      'style/jsx-one-expression-per-line': ['error', { allow: 'non-jsx' }],
      'style/jsx-max-props-per-line': ['warn', { maximum: { multi: 1, single: 3 } }],
      'style/jsx-sort-props': ['error', { callbacksLast: true, shorthandFirst: true }],
    },
  },
);
