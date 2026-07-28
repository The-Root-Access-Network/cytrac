// components/sections/Hero.tsx

import Image from 'next/image';
import PreOrderButton from '@/components/ui/PreOrderButton';

export default function Hero() {
  return (
    <section
      id='hero'
      className='relative overflow-hidden bg-bg-dark'
      aria-label='CYTRAC — Hero'
    >
      {/* Background grid texture */}
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
          {/* ── LEFT COLUMN — Copy ── */}
          <div className='flex flex-col items-start gap-6 lg:order-1'>
            <span className='eyebrow rounded-pill bg-mint px-3 py-1 text-forest'>
              Now available for pre-order
            </span>

            <h1 className='font-display text-5xl font-black leading-tight text-white lg:text-6xl'>
              Teach your family to{' '}
              <span className='text-cta'>stay safe online</span> — no screens
              needed.
            </h1>

            <p className='max-w-lg text-lg leading-relaxed text-white/70'>
              CYTRAC is a board game that turns cyber safety into a fun family
              game night. Kids and adults learn to spot scams, threats, and
              digital acuity through play.
            </p>

            <ul
              className='flex flex-wrap gap-x-5 gap-y-2'
              aria-label='Key features'
            >
              {[
                'Ages 7 and up',
                '2–5 players',
                '45–60 min per game',
                'No tech required',
              ].map((point) => (
                <li key={point} className='trust-check trust-check--on-dark'>
                  {point}
                </li>
              ))}
            </ul>

            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
              <PreOrderButton size='lg' />
              <a
                href='#how-it-works'
                className='btn-secondary border-white/30 text-white hover:bg-white hover:text-bg-dark'
              >
                See how it works
              </a>
            </div>

            <p className='text-sm text-white/50'>
              Built by{' '}
              <span className='font-semibold text-white/70'>
                The Root Access Network
              </span>{' '}
              — cybersecurity educators in Nigeria and beyond.
            </p>
          </div>

          {/* ── RIGHT COLUMN — Product image ── */}
          <div className='relative lg:order-2 flex justify-center lg:justify-end'>
            <Image
              src='/images/game/cytrac-hero-lifestyle.webp'
              alt='CYTRAC board game box and components laid out on a table'
              width={600}
              height={600}
              priority
              className='w-full max-w-md rounded-2xl drop-shadow-2xl lg:max-w-full'
              sizes='(max-width: 1024px) 100vw, 50vw'
            />

            {/* Floating badge */}
            <div
              className='absolute -bottom-4 -left-4 rounded-2xl bg-cta px-4 py-3 shadow-cta lg:-left-8'
              aria-label='Ships worldwide'
            >
              <p className='font-display text-xs font-black uppercase tracking-wider text-white'>
                Ships worldwide
              </p>
            </div>
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
  );
}
