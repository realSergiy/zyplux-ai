import { Search, TrendingUp } from 'lucide-react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { useEffect, useRef, useState } from 'react';

const TYPE_INTERVAL_MS = 38;
const GROWTH_PERCENT = 18;
const BARS = [
  { id: 'w1', value: 44 },
  { id: 'w2', value: 68 },
  { id: 'w3', value: 52 },
  { id: 'w4', value: 82 },
  { id: 'w5', value: 96 },
];

export const MiniDashboard = ({ question }: { question: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-60px', once: true });
  const prefersReducedMotion = useReducedMotion();
  const still = prefersReducedMotion === true;
  const [typed, setTyped] = useState(0);
  const [growth, setGrowth] = useState(0);

  const typedCount = still ? question.length : typed;
  const revealed = typedCount >= question.length;
  const growthShown = still ? GROWTH_PERCENT : growth;

  useEffect(() => {
    if (still || !isInView) {
      return;
    }
    let count = 0;
    const id = setInterval(() => {
      count += 1;
      setTyped(count);
      if (count >= question.length) {
        clearInterval(id);
      }
    }, TYPE_INTERVAL_MS);
    return () => {
      clearInterval(id);
    };
  }, [isInView, question.length, still]);

  useEffect(() => {
    if (still || !revealed) {
      return;
    }
    const controls = animate(0, GROWTH_PERCENT, {
      duration: 0.9,
      onUpdate: value => {
        setGrowth(Math.round(value));
      },
    });
    return () => {
      controls.stop();
    };
  }, [revealed, still]);

  return (
    <div className='rounded-xl border border-border bg-surface p-5' ref={ref}>
      <div className='flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-2 text-sm'>
        <Search aria-hidden className='h-4 w-4 shrink-0 text-muted' />
        <span className='text-heading'>{question.slice(0, typedCount)}</span>
        {!revealed && (
          <m.span
            animate={{ opacity: [1, 0, 1] }}
            aria-hidden
            className='inline-block h-4 w-px bg-accent'
            initial={{ opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>

      <p className='mt-5 mb-2 text-xs font-medium text-muted'>North region — last quarter</p>
      <div aria-hidden className='flex h-28 items-end gap-2'>
        {BARS.map((bar, index) => (
          <m.div
            animate={{ scaleY: revealed ? bar.value / 100 : 0 }}
            className='flex-1 rounded-t bg-gradient-to-t from-accent/40 to-accent'
            initial={{ scaleY: still ? bar.value / 100 : 0 }}
            key={bar.id}
            style={{ height: '100%', transformOrigin: 'bottom' }}
            transition={{ delay: still ? 0 : index * 0.08, duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </div>

      <div className='mt-4 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-sm text-success'>
        <TrendingUp aria-hidden className='h-4 w-4' />
        {growthShown}% vs the quarter before
      </div>
    </div>
  );
};
