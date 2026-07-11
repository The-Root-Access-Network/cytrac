// components/sections/TrustSignals.tsx

/**
 * Trust Signals Section
 * Compact grid of verified checkmarks. Sits directly below ValueProposition.
 * Server Component.
 */

const TRUST_ITEMS = [
  {
    label: 'Secure payment',
    detail: 'Checkout is handled by trusted payment processors.',
  },
  {
    label: 'Worldwide shipping',
    detail: 'We ship to over 50 countries, including across Africa.',
  },
  {
    label: 'Family tested',
    detail: 'Playtested with real families across multiple age groups.',
  },
  {
    label: 'Educationally approved',
    detail: 'Curriculum aligned with digital safety frameworks.',
  },
] as const;

export default function TrustSignals() {
  return (
    <section aria-label='Trust signals' className='bg-brand-blue'>
      <div className='section-pad py-10'>
        <div className='container-content'>
          <dl className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {TRUST_ITEMS.map(({ label, detail }) => (
              <div key={label} className='flex flex-col gap-1'>
                <dt>
                  {/*
                    trust-check::before renders a green checkmark circle.
                    On brand-blue background we override text colour to white.
                  */}
                  <span className='trust-check trust-check--on-dark text-white font-bold'>
                    {label}
                  </span>
                </dt>
                <dd className='pl-7 text-sm text-white/60 leading-snug'>
                  {detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
