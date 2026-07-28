// components/layout/Footer.tsx

import Image from 'next/image';
import Link from 'next/link';

const FOOTER_LINKS = {
  product: [
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Why CYTRAC', href: '/#why-cytrac' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Pre-order', href: '/preorder' },
  ],
  organisation: [
    {
      label: 'The Root Access Network',
      href: 'https://therootaccessnetwork.com',
      external: true,
    },
    {
      label: 'Community programmes',
      href: 'https://therootaccessnetwork.com/programs/',
      external: true,
    },
    {
      label: 'Contact us',
      href: 'mailto:marketing@cytracgames.com',
      external: true,
    },
  ],
  legal: [
    { label: 'Privacy policy', href: '/privacy' },
    { label: 'Terms of use', href: '/terms' },
    { label: 'Shipping policy', href: '/shipping' },
  ],
} as const;

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/18yekWBXDP/',
    icon: (
      <svg
        width='18'
        height='18'
        viewBox='0 0 18 18'
        fill='none'
        aria-hidden='true'
      >
        <path
          d='M17 9a8 8 0 1 0-9.25 7.903V11.5H5.75v-2.5h2V7.25A2.75 2.75 0 0 1 10.5 4.5h1.75v2.5H10.5a.5.5 0 0 0-.5.5V9h2.25l-.375 2.5H10V16.903A8.001 8.001 0 0 0 17 9z'
          fill='currentColor'
        />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@cytracgames',
    icon: (
      <svg
        width='18'
        height='18'
        viewBox='0 0 18 18'
        fill='none'
        aria-hidden='true'
      >
        <path
          d='M13.5 1.5h-2.25v9.75a2.25 2.25 0 1 1-2.25-2.25c.2 0 .38.03.562.075V6.75a4.5 4.5 0 1 0 3.938 4.5V6.188a6.713 6.713 0 0 0 3.75 1.124V5.063a4.463 4.463 0 0 1-3.75-3.563z'
          fill='currentColor'
        />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/cytracgames',
    icon: (
      <svg
        width='18'
        height='18'
        viewBox='0 0 18 18'
        fill='none'
        aria-hidden='true'
      >
        <path
          d='M13.5 2.25h2.25l-4.91 5.61L16.5 15.75h-4.52l-3.54-4.63-4.05 4.63H2.13l5.25-6-5.13-7.5h4.63l3.2 4.23 3.42-3.98zM12.75 14.5h1.25L5.3 3.5H3.96l8.79 11z'
          fill='currentColor'
        />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/cytracgames',
    icon: (
      <svg
        width='18'
        height='18'
        viewBox='0 0 18 18'
        fill='none'
        aria-hidden='true'
      >
        <rect
          x='2'
          y='2'
          width='14'
          height='14'
          rx='4'
          stroke='currentColor'
          strokeWidth='1.5'
        />
        <circle
          cx='9'
          cy='9'
          r='3.25'
          stroke='currentColor'
          strokeWidth='1.5'
        />
        <circle cx='13' cy='5' r='0.75' fill='currentColor' />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/showcase/cytracgames/',
    icon: (
      <svg
        width='18'
        height='18'
        viewBox='0 0 18 18'
        fill='none'
        aria-hidden='true'
      >
        <rect
          x='2'
          y='2'
          width='14'
          height='14'
          rx='2'
          stroke='currentColor'
          strokeWidth='1.5'
        />
        <path
          d='M5.5 7.5v5M5.5 5.5v.5M8.5 12.5v-3a1.5 1.5 0 0 1 3 0v3M8.5 7.5v5'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
      </svg>
    ),
  },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className='bg-bg-dark border-t border-white/10'
      aria-label='Site footer'
    >
      <div className='section-pad pb-8'>
        <div className='container-content'>
          <div className='grid grid-cols-1 gap-12 border-b border-white/10 pb-12 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-8'>
            {/* Brand column */}
            <div className='flex flex-col gap-5'>
              <Link
                href='/'
                aria-label='CYTRAC — go to homepage'
                className='w-fit group'
              >
                <Image
                  src='/images/logo/cytrac-logo-wordmark.png'
                  alt='CYTRAC'
                  width={280}
                  height={96}
                  className='w-56 h-auto transition-opacity duration-150 group-hover:opacity-80'
                />
              </Link>

              <p className='max-w-xs text-sm leading-relaxed text-white/50'>
                A cybersecurity board game for families. Built by The Root
                Access Network to make digital safety education accessible to
                everyone.
              </p>

              <div className='flex items-center gap-3'>
                {SOCIAL_LINKS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/50 transition-all hover:border-white/30 hover:text-white'
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className='eyebrow mb-5 text-white/40'>Product</h3>
              <ul className='flex flex-col gap-3'>
                {FOOTER_LINKS.product.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className='text-sm text-white/60 transition-colors hover:text-white'
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organisation */}
            <div>
              <h3 className='eyebrow mb-5 text-white/40'>Organisation</h3>
              <ul className='flex flex-col gap-3'>
                {FOOTER_LINKS.organisation.map(({ label, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className='text-sm text-white/60 transition-colors hover:text-white'
                      {...(external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className='eyebrow mb-5 text-white/40'>Legal</h3>
              <ul className='flex flex-col gap-3'>
                {FOOTER_LINKS.legal.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className='text-sm text-white/60 transition-colors hover:text-white'
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='flex flex-col gap-3 pt-8 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-xs text-white/35'>
              © {currentYear} The Root Access Network. All rights reserved.
            </p>
            <p className='text-xs text-white/35'>
              Shipping worldwide — including across Nigeria and neighbouring countries.{' '}
              <Link
                href='#preorder-updates'
                className='underline underline-offset-4 transition-colors hover:text-white/60'
              >
                Stay updated
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
