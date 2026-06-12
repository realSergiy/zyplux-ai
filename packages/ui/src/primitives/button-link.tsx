import type { VariantProps } from 'cva';
import type { ComponentProps } from 'react';

import { button } from '@zyplux/ui/recipes';
import * as m from 'motion/react-m';

export const ButtonLink = ({
  className,
  intent,
  size,
  ...anchorProps
}: ComponentProps<typeof m.a> & VariantProps<typeof button>) => (
  <m.a
    className={button({ class: className, intent, size })}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.97 }}
    {...anchorProps}
  />
);
