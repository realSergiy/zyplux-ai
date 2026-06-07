// ToDo: change to prettier.config.ts
// ToDo:  once they resolve https://github.com/prettier/prettier-vscode/issues/3623
// ToDo:  or VS Code upgrade to the newer node.js with type stripping
// ToDo:  import { type Config } from 'prettier';
// ToDo:  const config: Config = { };
// ToDo:  export default config;

// ToDo:  import { Config } from "prettier";

export default /** @type {const} @satisfies {Config} */ ({
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxSingleQuote: true,
  printWidth: 120,
  proseWrap: 'always',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  overrides: [
    {
      files: '*.md',
      options: {
        printWidth: Infinity,
        proseWrap: 'preserve',
      },
    },
  ],
});
