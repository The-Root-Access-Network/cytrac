// app/privacy/page.tsx

import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — CYTRAC',
  description:
    'How The Root Access Network collects, uses, and protects your personal data when you use cytracgames.com.',
};

const LAST_UPDATED = 'July 2026';
const CONTACT_EMAIL = 'marketing@cytracgames.com';
const COMPANY_NAME = 'The Root Access Network';
const COMPANY_ADDRESS = 'Lekki, Lagos, Nigeria';

export default function PrivacyPage() {
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
                Privacy Policy
              </h1>
              <p className='text-sm text-body/60'>
                Last updated: {LAST_UPDATED}
              </p>
            </div>

            <div className='prose-styles'>
              <Section title='Who we are'>
                <p>
                  CYTRAC is a product of {COMPANY_NAME}, a cybersecurity
                  education organisation based in {COMPANY_ADDRESS}. When this
                  policy refers to &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
                  &ldquo;our&rdquo;, it means {COMPANY_NAME}.
                </p>
                <p>
                  If you have questions about this policy or how we handle your
                  data, contact us at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                </p>
              </Section>

              <Section title='What data we collect and why'>
                <p>
                  We collect only the data you actively provide to us. We do not
                  run tracking scripts, advertising pixels, or behavioural
                  analytics on this site.
                </p>
                <Subsection title='Newsletter sign-ups'>
                  <p>
                    If you complete the newsletter form on this site, we collect
                    your email address, first name, and country. This
                    information is used to send you updates about CYTRAC —
                    launch news, pre-order availability, and gameplay previews.
                    We use Mailchimp to manage our mailing list. Your data is
                    stored on Mailchimp&apos;s servers in accordance with their
                    privacy policy.
                  </p>
                  <p>
                    You can unsubscribe at any time using the link in any email
                    we send you, or by contacting us directly.
                  </p>
                </Subsection>
                <Subsection title='Pre-order and purchase data'>
                  <p>
                    When you place a pre-order, you are redirected to one of our
                    checkout platforms — ShopWired (for international orders) or
                    Bumpa (for Nigeria market orders). We do not collect or
                    store your payment details. All payment processing is
                    handled by those platforms and their payment partners
                    (including Paystack). Please refer to their respective
                    privacy policies for details on how they handle your data.
                  </p>
                </Subsection>
                <Subsection title='Cookies and local storage'>
                  <p>
                    This site uses browser local storage to remember your
                    preferred shipping region (UK/US or Africa) so you do not
                    have to select it again on your next visit. No personally
                    identifiable information is stored in local storage. We do
                    not use advertising cookies or third-party tracking cookies.
                  </p>
                </Subsection>
              </Section>

              <Section title='Legal basis for processing (UK & EU visitors)'>
                <p>
                  If you are located in the United Kingdom or European Union, we
                  process your personal data on the following legal bases under
                  UK GDPR and the EU General Data Protection Regulation:
                </p>
                <ul>
                  <li>
                    <strong>Consent</strong> — for newsletter communications.
                    You can withdraw consent at any time by unsubscribing.
                  </li>
                  <li>
                    <strong>Legitimate interests</strong> — for basic site
                    functionality such as remembering your region preference.
                  </li>
                </ul>
              </Section>

              <Section title='Legal basis for processing (Nigerian visitors)'>
                <p>
                  If you are located in Nigeria, we process your personal data
                  in accordance with the Nigeria Data Protection Act 2023 (NDPA)
                  and the Nigeria Data Protection Regulation (NDPR). We process
                  data only where you have provided consent (newsletter sign-up)
                  or where processing is necessary for the performance of a
                  contract (order fulfilment).
                </p>
              </Section>

              <Section title='How long we keep your data'>
                <p>
                  We retain newsletter subscriber data for as long as you remain
                  subscribed. If you unsubscribe, your data is removed from our
                  active mailing list. You can request full deletion at any time
                  by contacting us.
                </p>
                <p>
                  Order and transaction data is retained by our checkout
                  platforms (ShopWired, Bumpa) in accordance with their own
                  retention policies and applicable tax and accounting
                  regulations.
                </p>
              </Section>

              <Section title='Who we share your data with'>
                <p>We share your data only with the following:</p>
                <ul>
                  <li>
                    <strong>Mailchimp</strong> — email marketing platform. Data
                    shared: email address, first name, country.
                  </li>
                  <li>
                    <strong>ShopWired</strong> — checkout and order management
                    for international orders.
                  </li>
                  <li>
                    <strong>Bumpa / Paystack</strong> — checkout and payment
                    processing for Nigeria market orders.
                  </li>
                </ul>
                <p>
                  We do not sell your data to third parties. We do not share
                  your data with advertisers.
                </p>
              </Section>

              <Section title='Your rights'>
                <p>
                  Depending on your location, you may have the following rights
                  regarding your personal data:
                </p>
                <ul>
                  <li>The right to access the data we hold about you</li>
                  <li>The right to correct inaccurate or incomplete data</li>
                  <li>The right to request deletion of your data</li>
                  <li>
                    The right to withdraw consent for data processing based on
                    consent
                  </li>
                  <li>
                    The right to lodge a complaint with a supervisory authority
                    (in the UK: the ICO; in Nigeria: the NDPC)
                  </li>
                </ul>
                <p>
                  To exercise any of these rights, contact us at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We
                  will respond within 30 days.
                </p>
              </Section>

              <Section title='Changes to this policy'>
                <p>
                  We may update this policy from time to time. The date at the
                  top of this page reflects when it was last revised. We will
                  notify active newsletter subscribers of any material changes.
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

// ── Layout helpers ────────────────────────────────────────────────────────────

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

function Subsection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='mt-4'>
      <h3 className='mb-2 font-display text-base font-bold text-bg-dark'>
        {title}
      </h3>
      <div className='flex flex-col gap-3'>{children}</div>
    </div>
  );
}
