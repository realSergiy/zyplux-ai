import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';

import { inlineLink } from '@zyplux/ui/recipes';

const InlineLink = (props: ComponentProps<'a'>) => <a className={inlineLink()} {...props} />;

export const PROSE_COMPONENTS = { a: InlineLink } satisfies MDXComponents;
