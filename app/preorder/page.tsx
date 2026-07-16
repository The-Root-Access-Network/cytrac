// app/preorder/page.tsx

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PreorderPricing from '@/components/ui/PreorderPricing';
import PreorderCta from '@/components/ui/PreorderCta';

export const metadata: Metadata = {
  title: 'Pre-Order CYTRAC — The Cybersecurity Family Board Game',
  description:
    'Secure your copy of CYTRAC at the pre-order price. £19.99 for international orders. Estimated delivery 8–10 weeks. The cybersecurity board game built for families.',
};

export default function PreorderPage() {
  return (
    <>
      <Header />

      {/* ── Breadcrumb ── */}
      <div className='container-content px-4 pt-4 md:px-6'>
        <nav aria-label='Breadcrumb'>
          <span className='text-sm text-body/60'>
            <Link
              href='/'
              className='transition-colors hover:text-cta'
            >
              Home
            </Link>
            {' '}→{' '}
            <span aria-current='page' className='font-semibold text-body'>
              Pre-Order
            </span>
          </span>
        </nav>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          Section 1 — Hero
         ═══════════════════════════════════════════════════════════ */}
      <section
        className='relative overflow-hidden bg-bg-dark'
        aria-label='Pre-order hero'
      >
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 opacity-[0.04]'
          style={{
            backgroundImage:
              'linear-gradient(var(--color-brand-blue) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-blue) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className='section-pad relative z-10'>
          <div className='container-content grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16'>
            {/* Left column */}
            <div className='flex flex-col items-start gap-6 lg:order-1'>
              <span className='eyebrow rounded-pill bg-mint px-3 py-1 text-forest'>
                Pre-order — Limited availability
              </span>

              <h1 className='font-display text-5xl font-black leading-tight text-white lg:text-6xl'>
                Secure your copy of CYTRAC
              </h1>

              <p className='max-w-lg text-lg leading-relaxed text-white/70'>
                The cybersecurity board game for families. Order now at the
                pre-order price before we open to general sale.
              </p>

              <PreorderPricing />

              <span className='trust-check trust-check--on-dark'>
                Estimated delivery: 8–10 weeks from order
              </span>

              <PreorderCta variant='hero' />
            </div>

            {/* Right column */}
            <div className='relative flex justify-center lg:order-2 lg:justify-end'>
              <Image
                src='/images/game/cytrac-box-bundle.webp'
                alt='CYTRAC board game box'
                width={600}
                height={600}
                priority
                className='w-full max-w-md rounded-2xl drop-shadow-2xl lg:max-w-full'
                sizes='(max-width: 1024px) 100vw, 50vw'
              />
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div aria-hidden='true' className='relative -mb-px'>
          <svg
            viewBox='0 0 1440 48'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='w-full text-bg-light'
            preserveAspectRatio='none'
          >
            <path
              d='M0 48h1440V24C1200 8 960 0 720 0S240 8 0 24v24z'
              fill='currentColor'
            />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          Section 2 — What's in the box
         ═══════════════════════════════════════════════════════════ */}
      <section aria-label="What's in the box" className='bg-bg-light'>
        <div className='section-pad'>
          <div className='container-content'>
            <span className='eyebrow'>In the box</span>

            <h2 className='mt-2 font-display text-3xl font-black text-bg-dark lg:text-4xl'>
              Everything you need to start playing
            </h2>

            <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2'>
              {/* Card 1 — Game board */}
              <div className='card'>
                <Image
                  src='/images/game/game-board-flat-full.webp'
                  alt='CYTRAC game board'
                  width={400}
                  height={280}
                  className='mb-4 w-full rounded-lg'
                />
                <h3 className='font-display text-lg font-bold text-bg-dark'>
                  100-space game board
                </h3>
                <p className='mt-1 text-sm text-body'>
                  Tracks your journey from Cyber Rookie to Cyber Champion
                </p>
              </div>

              {/* Card 2 — Card decks */}
              <div className='card'>
                <div className='mb-4 grid grid-cols-2 gap-2'>
                  <Image
                    src='/images/game/cards-red-threat.webp'
                    alt='Red threat card deck'
                    width={192}
                    height={134}
                    className='w-full rounded-md object-cover'
                  />
                  <Image
                    src='/images/game/cards-green-defense.webp'
                    alt='Green defense card deck'
                    width={192}
                    height={134}
                    className='w-full rounded-md object-cover'
                  />
                  <Image
                    src='/images/game/cards-yellow-concept.webp'
                    alt='Yellow concept card deck'
                    width={192}
                    height={134}
                    className='w-full rounded-md object-cover'
                  />
                  <Image
                    src='/images/game/card-blue-bail.webp'
                    alt='Blue bail card deck'
                    width={192}
                    height={134}
                    className='w-full rounded-md object-cover'
                  />
                </div>
                <h3 className='font-display text-lg font-bold text-bg-dark'>
                  Colour-coded card decks
                </h3>
                <p className='mt-1 text-sm text-body'>
                  Green, Red, Yellow, and Blue — each with real-world scenarios
                </p>
              </div>

              {/* Card 3 — Role tokens */}
              <div className='card'>
                <Image
                  src='/images/game/role-tokens.webp'
                  alt='CYTRAC player role tokens'
                  width={400}
                  height={280}
                  className='mb-4 w-full rounded-lg'
                />
                <h3 className='font-display text-lg font-bold text-bg-dark'>
                  Player role tokens
                </h3>
                <p className='mt-1 text-sm text-body'>
                  Analyst, Defender, Auditor, Engineer, or Responder
                </p>
              </div>

              {/* Card 4 — Rulebook */}
              <div className='card'>
                <Image
                  src='/images/game/cytrac-rulebook.webp'
                  alt='CYTRAC illustrated rulebook'
                  width={400}
                  height={280}
                  className='mb-4 w-full rounded-lg object-cover'
                />
                <h3 className='font-display text-lg font-bold text-bg-dark'>
                  Illustrated rulebook
                </h3>
                <p className='mt-1 text-sm text-body'>
                  Simple enough to learn in minutes, structured for all ages
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          Section 3 — Why pre-order now (generic copy)
         ═══════════════════════════════════════════════════════════ */}
      <section aria-label='Why pre-order now' className='bg-bg-light'>
        <div className='section-pad pt-0'>
          <div className='container-content'>
            <span className='eyebrow'>Why pre-order</span>

            <h2 className='mt-2 font-display text-3xl font-black text-bg-dark lg:text-4xl'>
              Why pre-order now
            </h2>

            <div className='mt-10 grid grid-cols-1 gap-8 md:grid-cols-3'>
              {/* Item 1 — Pricing */}
              <div className='flex flex-col gap-3'>
                <svg
                  aria-hidden='true'
                  width='32'
                  height='32'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-cta'
                >
                  <path d='M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z' />
                  <path d='M7 7h.01' />
                </svg>
                <h3 className='font-display text-xl font-bold text-bg-dark'>
                  Save on the full price
                </h3>
                <p className='text-sm leading-relaxed text-body'>
                  Pre-order pricing is available for a limited time. Lock in
                  your savings before we open to general sale.
                </p>
              </div>

              {/* Item 2 — First in line */}
              <div className='flex flex-col gap-3'>
                <svg
                  aria-hidden='true'
                  width='32'
                  height='32'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-cta'
                >
                  <rect x='3' y='4' width='18' height='16' rx='2' />
                  <path d='M3 10h18' />
                  <path d='M7 15h.01' />
                  <path d='M11 15h2' />
                </svg>
                <h3 className='font-display text-xl font-bold text-bg-dark'>
                  First to receive, first to play
                </h3>
                <p className='text-sm leading-relaxed text-body'>
                  Pre-orders are fulfilled in the order they&apos;re placed. Earlier
                  orders ship first.
                </p>
              </div>

              {/* Item 3 — Mission */}
              <div className='flex flex-col gap-3'>
                <svg
                  aria-hidden='true'
                  width='32'
                  height='32'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-cta'
                >
                  <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
                </svg>
                <h3 className='font-display text-xl font-bold text-bg-dark'>
                  Back a community-built game
                </h3>
                <p className='text-sm leading-relaxed text-body'>
                  CYTRAC was built by The Root Access Network to make
                  cybersecurity education accessible. Every pre-order funds the
                  next print run.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          Section 4 — Delivery & fulfilment (accent band)
         ═══════════════════════════════════════════════════════════ */}
      <section aria-label='Delivery and fulfilment' className='bg-brand-blue'>
        <div className='section-pad py-10'>
          <div className='container-content'>
            <dl className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
              {[
                {
                  label: 'Estimated delivery',
                  detail: '8–10 weeks from order to your door',
                },
                {
                  label: 'Secure payment',
                  detail: 'Handled by trusted payment processors',
                },
                {
                  label: 'Ships worldwide',
                  detail: 'Including across Africa via regional logistics',
                },
                {
                  label: 'Instant confirmation',
                  detail: 'Email confirmation sent immediately after purchase',
                },
              ].map(({ label, detail }) => (
                <div key={label} className='flex flex-col gap-1'>
                  <dt>
                    <span className='trust-check trust-check--on-dark font-bold text-white'>
                      {label}
                    </span>
                  </dt>
                  <dd className='pl-7 text-sm leading-snug text-white/60'>
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          Section 5 — Final CTA
         ═══════════════════════════════════════════════════════════ */}
      <section aria-label='Final call to action' className='bg-bg-dark'>
        <div className='section-pad'>
          <div className='container-content flex flex-col items-center gap-6 text-center'>
            <h2 className='font-display text-3xl font-black text-white lg:text-4xl'>
              Ready to secure your copy?
            </h2>

            <p className='max-w-lg leading-relaxed text-white/70'>
              Join families across Africa and beyond who are already building
              better digital safety habits — one game night at a time.
            </p>

            <PreorderCta variant='final' />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
