// components/ui/PreOrderButton.tsx

'use client';

import { useMarketRoute } from '@/hooks/useMarketRoute';
import { useIsMounted } from '@/hooks/useIsMounted';

interface PreOrderButtonProps {
  size?: 'default' | 'lg';
  className?: string;
}

const LoadingSkeleton = ({
  sizeClass,
  className,
}: {
  sizeClass: string;
  className: string;
}) => (
  <div
    role='status'
    aria-label='Loading pre-order link…'
    className={`btn-primary animate-pulse opacity-60 cursor-wait ${sizeClass} ${className}`}
  >
    <span aria-hidden='true'>Loading…</span>
  </div>
);

export default function PreOrderButton({
  size = 'default',
  className = '',
}: PreOrderButtonProps) {
  const { market, isDetecting } = useMarketRoute();
  const mounted = useIsMounted();

  const sizeClass = size === 'lg' ? 'text-lg px-8 py-4' : 'text-sm py-2 px-5';

  if (!mounted || isDetecting) {
    return <LoadingSkeleton sizeClass={sizeClass} className={className} />;
  }

  return (
    <a
      href={market.checkoutUrl}
      className={`btn-primary ${sizeClass} ${className}`}
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
  );
}
