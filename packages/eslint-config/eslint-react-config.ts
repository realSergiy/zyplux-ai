import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import baseConfig from './eslint-base-config.ts';
import { defineConfig } from 'eslint/config';

const reactSettingsConfig = defineConfig({
  settings: {
    react: {
      version: 'detect',
    },
  },
});

const reactHooksConfigValue = reactHooks.configs['recommended-latest'];

const reactConfig2 = defineConfig(
  [reactPlugin.configs.flat['recommended'], reactPlugin.configs.flat['jsx-runtime']].filter(config => !!config),
  ...reactHooksConfigValue,
);

type EslintConfigObject = ReturnType<typeof defineConfig>;

const reactConfig: EslintConfigObject = defineConfig(baseConfig, reactSettingsConfig, reactConfig2);

export default reactConfig;
