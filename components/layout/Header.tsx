// components/layout/Header.tsx

import Image from 'next/image';
import Link from 'next/link';
import MarketToggle from '@/components/ui/MarketToggle';

/**
 * Sticky site header.
 * Server Component — MarketToggle is the only client island.
 *
 * Mobile: logo left, compact market toggle right. Pre-Order CTA hidden.
 * Desktop: logo left, toggle + Pre-Order CTA right.
 */
export default function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-brand-blue/10 bg-white/90 backdrop-blur-md'>
      <div className='container-content flex items-center justify-between px-4 py-3 md:px-6'>
        {/* Wordmark */}
        <Link
          href='/'
          aria-label='CYTRAC — go to homepage'
          className='group flex items-center'
        >
          <Image
            src='/images/logo/cytrac-logo.png'
            alt='CYTRAC'
            width={248}
            height={96}
            className='w-40 h-auto transition-opacity duration-150 group-hover:opacity-80'
            priority
          />
        </Link>

        {/* Right side */}
        <div className='flex items-center gap-3'>
          <MarketToggle />
          <a
            href='#preorder-updates'
            className='btn-primary hidden text-sm md:inline-flex'
            style={{ padding: '0.5rem 1.25rem' }}
          >
            Pre-Order
          </a>
        </div>
      </div>
    </header>
  );
}
