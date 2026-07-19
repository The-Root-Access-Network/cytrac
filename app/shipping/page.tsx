// app/shipping/page.tsx

import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Shipping Policy — CYTRAC',
  description:
    'Delivery timelines, shipping regions, and fulfilment information for CYTRAC pre-orders.',
};

const LAST_UPDATED = 'July 2026';
const CONTACT_EMAIL = 'marketing@cytracgames.com';

export default function ShippingPage() {
  return (
    <>
      <Header />
      <main className='flex-1 bg-bg-light'>
        <div className='section-pad'>
          <div className='container-content max-w-3xl'>
            {/* Header */}
            <div className='mb-12'>
              <span className='eyebrow mb-3 block'>Legal</span>
              <h1 className='mb-4 font-display text-4xl font-black text-bg-dark lg:text-5xl'>
                Shipping Policy
              </h1>
              <p className='text-sm text-body/60'>
                Last updated: {LAST_UPDATED}
              </p>
            </div>

            <div className='prose-styles flex flex-col gap-0'>
              <Section title='Pre-order fulfilment timeline'>
                <p>
                  CYTRAC is currently available for pre-order. Pre-orders are
                  fulfilled in the order they are received. Our current
                  estimated delivery window is{' '}
                  <strong>12 to 16 weeks from the date of your order</strong>.
                </p>
                <p>
                  You will receive an email confirmation immediately after your
                  order is placed. You will receive a second notification with
                  tracking information when your order has been dispatched.
                </p>
                <p>
                  If you signed up to our mailing list, you will receive updates
                  on manufacturing and shipping progress before the general
                  public.
                </p>
              </Section>

              <Section title='International orders (UK, US & beyond)'>
                <p>
                  International orders are processed through our ShopWired
                  storefront at{' '}
                  <a
                    href='https://intl.cytracgames.com'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    intl.cytracgames.com
                  </a>
                  . Fulfilment is handled from the United Kingdom via Royal Mail
                  Click &amp; Drop.
                </p>
                <p>
                  Shipping costs and estimated delivery times for your specific
                  destination are calculated and displayed at checkout before
                  you confirm your order.
                </p>
                <p>
                  We currently ship to the United Kingdom, the United States,
                  and select international destinations. If you are unsure
                  whether we ship to your country, contact us before placing an
                  order.
                </p>
              </Section>

              <Section title='African market orders (Nigeria & beyond)'>
                <p>
                  Orders for the African market are managed locally by our
                  Nigeria-based team. Fulfilment for Nigerian orders is handled
                  via local logistics partners including GIG, DHL, Speedaf and
                  similar carriers. Delivery timelines within Nigeria are
                  typically shorter than international estimates.
                </p>
                <p>
                  For orders to other African countries, our team handles
                  cross-border shipping on a case-by-case basis. Contact us at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> before
                  placing an order if you are outside Nigeria and within Africa.
                </p>
              </Section>

              <Section title='Order tracking'>
                <p>
                  Once your order has been dispatched, you will receive a
                  tracking number via the email address used at checkout.
                  International orders are trackable through the Royal Mail
                  website. Nigerian and African orders are trackable through the
                  logistics partner assigned to your shipment.
                </p>
              </Section>

              <Section title='Customs and import duties'>
                <p>
                  For orders shipped internationally, customs duties, taxes, and
                  import fees may be levied by your country&apos;s customs
                  authority upon arrival. These charges are the responsibility
                  of the recipient and are not included in our shipping fees. We
                  are unable to predict or control these charges.
                </p>
              </Section>

              <Section title='Damaged or missing orders'>
                <p>
                  If your order arrives damaged or does not arrive within a
                  reasonable time after the estimated delivery window, contact
                  us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>{' '}
                  with your order number and a description of the issue. We will
                  work with you to resolve it as quickly as possible.
                </p>
              </Section>

              <Section title='Questions'>
                <p>
                  If you have any questions about your order or our shipping
                  process, reach us at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We
                  aim to respond within 2 business days.
                </p>
              </Section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ── Layout helper ─────────────────────────────────────────────────────────────

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className='mb-10 border-t border-brand-blue/10 pt-8'>
      <h2 className='mb-4 font-display text-xl font-black text-bg-dark'>
        {title}
      </h2>
      <div className='flex flex-col gap-3 text-base leading-relaxed text-body'>
        {children}
      </div>
    </section>
  );
}
