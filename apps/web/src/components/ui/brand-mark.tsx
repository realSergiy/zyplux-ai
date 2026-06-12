import { Zap } from 'lucide-react';

import { BRAND_NAME } from '@/content';

export const BrandMark = () => (
  <>
    <Zap className='h-6 w-6 text-accent' />
    <span className='text-xl font-bold tracking-tight text-heading'>{BRAND_NAME}</span>
  </>
);
