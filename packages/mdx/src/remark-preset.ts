import type { Preset } from 'unified';

import remarkPresetLintRecommended from 'remark-preset-lint-recommended';

import { MDX_OPTIONS } from './options';

const remarkPreset: Preset = {
  plugins: [...(MDX_OPTIONS.remarkPlugins ?? []), remarkPresetLintRecommended],
};

export default remarkPreset;
