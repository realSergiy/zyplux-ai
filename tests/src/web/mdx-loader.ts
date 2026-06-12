import { compile } from '@mdx-js/mdx';
import { MDX_OPTIONS } from '@zyplux/web/mdx-options';
import { plugin } from 'bun';

plugin({
  name: 'mdx',
  setup: build => {
    build.onLoad({ filter: /\.mdx$/ }, async ({ path }) => ({
      contents: String(await compile(await Bun.file(path).text(), MDX_OPTIONS)),
      loader: 'js',
    }));
  },
});
