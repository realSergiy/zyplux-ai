import { useCountUp } from '@zyplux/ui/hooks/use-count-up';
import { useTypewriter } from '@zyplux/ui/hooks/use-typewriter';
import { BlinkingCaret } from '@zyplux/ui/motion/blinking-caret';
import { AnimatedBars } from '@zyplux/ui/primitives/animated-bars';
import { pill } from '@zyplux/ui/recipes';
import { Search, TrendingUp } from 'lucide-react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

const GROWTH_PERCENT = 18;
const BARS = [
  { id: 'w1', percent: 44 },
  { id: 'w2', percent: 68 },
  { id: 'w3', percent: 52 },
  { id: 'w4', percent: 82 },
  { id: 'w5', percent: 96 },
];

export const MiniDashboard = ({
  caption,
  growthNote,
  question,
}: {
  caption: string;
  growthNote: string;
  question: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-60px', once: true });
  const { revealed, typedText } = useTypewriter(question, { play: isInView });
  const growth = useCountUp(GROWTH_PERCENT, { play: revealed });

  return (
    <div className='rounded-xl border border-border bg-surface p-5' ref={ref}>
      <div className='flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-2 text-sm'>
        <Search aria-hidden className='h-4 w-4 shrink-0 text-muted' />
        <span className='text-heading'>{typedText}</span>
        {!revealed && <BlinkingCaret />}
      </div>

      <p className='mt-5 mb-2 text-xs font-medium text-muted'>{caption}</p>
      <AnimatedBars bars={BARS} revealed={revealed} />

      <div className={pill({ class: 'mt-4', tone: 'success' })}>
        <TrendingUp aria-hidden className='h-4 w-4' />
        {growth}% {growthNote}
      </div>
    </div>
  );
};
