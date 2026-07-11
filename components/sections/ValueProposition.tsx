// components/sections/ValueProposition.tsx

/**
 * Value Proposition Section
 * Three-column grid explaining why CYTRAC matters.
 * Server Component — no interactivity needed.
 */

const VALUE_PROPS = [
  {
    icon: (
      <svg
        aria-hidden='true'
        width='32'
        height='32'
        viewBox='0 0 32 32'
        fill='none'
      >
        <rect width='32' height='32' rx='8' fill='var(--color-mint)' />
        <path
          d='M8 10h16M8 16h10M8 22h13'
          stroke='var(--color-forest)'
          strokeWidth='2'
          strokeLinecap='round'
        />
        <circle cx='24' cy='22' r='4' fill='var(--color-success)' />
        <path
          d='M22 22l1.5 1.5L26 20'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
    eyebrow: 'Screen-free time',
    heading: 'Game night that actually teaches something',
    body: 'Put the phones down and deal the cards. CYTRAC gives families a reason to sit together — and something real to talk about when the game is over.',
  },
  {
    icon: (
      <svg
        aria-hidden='true'
        width='32'
        height='32'
        viewBox='0 0 32 32'
        fill='none'
      >
        <rect width='32' height='32' rx='8' fill='var(--color-mint)' />
        <path
          d='M16 6l2.5 5 5.5.8-4 3.9.95 5.5L16 18.5l-4.95 2.7.95-5.5-4-3.9 5.5-.8L16 6z'
          fill='var(--color-cta)'
          stroke='var(--color-cta)'
          strokeWidth='1'
          strokeLinejoin='round'
        />
        <path
          d='M10 24h12'
          stroke='var(--color-forest)'
          strokeWidth='2'
          strokeLinecap='round'
        />
      </svg>
    ),
    eyebrow: 'Gamified learning',
    heading: 'Learn by doing, not by reading',
    body: 'Every round puts players inside real scenarios — spotting a phishing email, choosing a strong password, reacting to a scam call. The lessons stick because they feel like wins.',
  },
  {
    icon: (
      <svg
        aria-hidden='true'
        width='32'
        height='32'
        viewBox='0 0 32 32'
        fill='none'
      >
        <rect width='32' height='32' rx='8' fill='var(--color-mint)' />
        <path
          d='M16 7l7 4v6c0 4-3 7.5-7 9-4-1.5-7-5-7-9v-6l7-4z'
          fill='var(--color-brand-blue)'
          opacity='0.15'
          stroke='var(--color-brand-blue)'
          strokeWidth='1.5'
          strokeLinejoin='round'
        />
        <path
          d='M13 16l2 2 4-4'
          stroke='var(--color-brand-blue)'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
    eyebrow: 'Real-world habits',
    heading: "Skills they'll use the moment they log on",
    body: "CYTRAC isn't about abstract theory. Every card, every challenge, every question maps directly to something your family will encounter on their phone, laptop, or at school.",
  },
] as const;

export default function ValueProposition() {
  return (
    <section
      id='why-cytrac'
      className='bg-bg-light'
      aria-labelledby='vp-heading'
    >
      <div className='section-pad'>
        <div className='container-content'>
          {/* Section header */}
          <div className='mb-12 max-w-2xl'>
            <span className='eyebrow mb-3 block'>Why CYTRAC</span>
            <h2
              id='vp-heading'
              className='text-4xl font-black text-bg-dark lg:text-5xl'
            >
              Cybersecurity your whole family{' '}
              <span className='text-brand-blue'>will actually remember</span>
            </h2>
          </div>

          {/* Three-column grid */}
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            {VALUE_PROPS.map(({ icon, eyebrow, heading, body }) => (
              <div key={eyebrow} className='card flex flex-col gap-4'>
                {/* Icon */}
                <div>{icon}</div>

                {/* Copy */}
                <div>
                  <span className='eyebrow mb-1 block'>{eyebrow}</span>
                  <h3 className='mb-2 text-xl font-black text-bg-dark'>
                    {heading}
                  </h3>
                  <p className='text-base leading-relaxed text-body'>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
