// components/ui/PreorderCta.tsx

'use client';

import Link from 'next/link';
import { useMarketRoute } from '@/hooks/useMarketRoute';
import { useIsMounted } from '@/hooks/useIsMounted';
import NotifyMeButton from './NotifyMeButton';

interface PreorderCtaProps {
  variant?: 'hero' | 'final';
}

const LoadingSkeleton = () => (
  <div
    role='status'
    aria-label='Loading…'
    className='btn-primary animate-pulse cursor-wait opacity-60'
  >
    <span aria-hidden='true'>Loading…</span>
  </div>
);

export default function PreorderCta({ variant = 'hero' }: PreorderCtaProps) {
  const { market, isDetecting } = useMarketRoute();
  const mounted = useIsMounted();

  if (!mounted || isDetecting) {
    return <LoadingSkeleton />;
  }

  const isAfrica = market.key === 'AFRICA';

  return (
    <div className='flex flex-col gap-3'>
      {isAfrica ? (
        <NotifyMeButton />
      ) : (
        <a
          href={market.checkoutUrl}
          className='btn-primary text-lg px-8 py-4'
          aria-label={`Pre-order CYTRAC — ${market.label} checkout`}
          rel='noopener'
        >
          Pre-Order Now
          <svg
            aria-hidden='true'
            width='18'
            height='18'
            viewBox='0 0 18 18'
            fill='none'
          >
            <path
              d='M3 9h12M10 4l5 5-5 5'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </a>
      )}

      {variant === 'hero' && (
        <p className='text-sm text-white/50'>
          Shipping to: {market.label}{' '}
          <Link
            href='/#market-toggle'
            className='text-cta underline hover:no-underline'
          >
            Not your region? Switch region
          </Link>
        </p>
      )}

      {variant === 'final' && (
        <>
          <p className='text-sm text-white/50'>
            {isAfrica
              ? "We'll notify you as soon as the African market checkout is live."
              : 'Free shipping on orders over £40 to qualifying regions.'}
          </p>
          <span className='trust-check trust-check--on-dark'>
            Estimated delivery: 8–10 weeks from order
          </span>
        </>
      )}
    </div>
  );
}
