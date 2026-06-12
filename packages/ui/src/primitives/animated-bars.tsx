import { cx } from '@zyplux/ui/lib/style';
import { useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';

type Bar = { id: string; percent: number };

export const AnimatedBars = ({
  bars,
  className,
  revealed = true,
}: {
  bars: Bar[];
  className?: string;
  revealed?: boolean;
}) => {
  const prefersReducedMotion = useReducedMotion();
  const still = prefersReducedMotion === true;

  return (
    <div aria-hidden className={cx('flex h-28 items-end gap-2', className)}>
      {bars.map((bar, index) => (
        <m.div
          animate={{ scaleY: revealed ? bar.percent / 100 : 0 }}
          className='flex-1 rounded-t bg-linear-to-t from-accent/40 to-accent'
          initial={{ scaleY: still ? bar.percent / 100 : 0 }}
          key={bar.id}
          style={{ height: '100%', transformOrigin: 'bottom' }}
          transition={{ delay: still ? 0 : index * 0.08, duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};
