// components/ui/PreorderPricing.tsx

'use client';

import { useMarketRoute } from '@/hooks/useMarketRoute';
import { useIsMounted } from '@/hooks/useIsMounted';

export default function PreorderPricing() {
  const { market, isDetecting } = useMarketRoute();
  const mounted = useIsMounted();

  if (!mounted || isDetecting) {
    return (
      <div
        role='status'
        aria-label='Loading pricing…'
        className='h-8 w-32 animate-pulse rounded-md bg-white/10'
      />
    );
  }

  if (market.key === 'AFRICA') {
    return (
      <div className='flex flex-col gap-1'>
        <div className='flex items-baseline gap-3'>
          <span className='font-display text-4xl font-black text-white'>
            ₦25,000
          </span>
        </div>
        <span className='text-sm text-white/50'>Pre-order price</span>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex items-baseline gap-3'>
        <span className='font-display text-4xl font-black text-white'>
          £19.99
        </span>
        <span className='font-display text-lg font-bold text-white/40 line-through'>
          £24.99
        </span>
      </div>
      <span className='text-sm text-white/50'>
        Pre-order price — save £5
      </span>
    </div>
  );
}
