// components/ui/MarketToggle.tsx

'use client';

import { useMarketRoute } from '@/hooks/useMarketRoute';
import { useIsMounted } from '@/hooks/useIsMounted';
import type { MarketKey } from '@/types/market';

const MARKET_OPTIONS: { key: MarketKey; label: string; flag: string }[] = [
  { key: 'INTL', label: 'UK / US', flag: '🌍' },
  { key: 'AFRICA', label: 'Africa', flag: '🌍' },
];

const Skeleton = () => (
  <div
    role='status'
    aria-label='Detecting your region…'
    className='h-9 w-44 animate-pulse rounded-pill bg-mint'
  />
);

export default function MarketToggle() {
  const { market, setMarket, isDetecting } = useMarketRoute();
  const mounted = useIsMounted();

  if (!mounted || isDetecting) return <Skeleton />;

  return (
    <div className='flex flex-col items-end gap-0.5 sm:flex-row sm:items-center sm:gap-2'>
      <span className='eyebrow text-[10px] text-forest'>Shipping to</span>

      <div
        role='group'
        aria-label='Select your shipping region'
        className='flex items-center rounded-pill border border-brand-blue/20 bg-white p-0.5 shadow-card'
      >
        {MARKET_OPTIONS.map(({ key, label, flag }) => {
          const isActive = market.key === key;
          return (
            <button
              key={key}
              type='button'
              onClick={() => setMarket(key)}
              aria-pressed={isActive}
              className={[
                'flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-sm font-display font-bold transition-all duration-200 cursor-pointer',
                isActive
                  ? 'bg-cta text-white shadow-cta'
                  : 'text-brand-blue hover:bg-bg-light',
              ].join(' ')}
            >
              <span aria-hidden='true'>{flag}</span>
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
