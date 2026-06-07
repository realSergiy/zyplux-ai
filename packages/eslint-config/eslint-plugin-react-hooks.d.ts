import type { Linter } from 'eslint';

declare module 'eslint-plugin-react-hooks' {
  const plugin: {
    configs: {
      'recommended-legacy': {
        plugins: string[];
        rules: Linter.RulesRecord;
      };
      'recommended-latest-legacy': {
        plugins: string[];
        rules: Linter.RulesRecord;
      };
      'flat/recommended': Linter.Config[];
      'recommended-latest': Linter.Config[];
      recommended: Linter.Config[];
    };
    rules: Record<string, unknown>;
    meta: { name: string };
  };

  export = plugin;
}
