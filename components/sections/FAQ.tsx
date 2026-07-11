// components/sections/FAQ.tsx

/**
 * FAQ Section — accessible accordion.
 * Dark background to bookend the page against the Hero.
 * "use client" required for accordion open/close state.
 */

'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What age group is CYTRAC designed for?',
    answer:
      'CYTRAC is designed for players aged 10 and up. The scenarios and card language are tailored to be highly accessible to older children and teenagers, while the underlying strategy layers keep adults genuinely engaged. Families playing together tend to get the absolute most out of the experience.',
  },
  {
    question: 'How long does a game take?',
    answer:
      'A full game runs between 45 and 60 minutes. Individual rounds are structured to wrap up in under 10 minutes, keeping the pace brisk and highly engaging. If you have less time, the modular round structure makes it easy to set a natural stopping point without breaking the game flow.',
  },
  {
    question: 'How many players can play?',
    answer:
      'CYTRAC supports 2 to 6 players. While it serves as an excellent head-to-head experience for a parent and child, it truly shines with 4 to 6 players around the table—where more players mean deeper debates, shared perspectives, and more laughs.',
  },
  {
    question: 'Do you need any tech knowledge to play?',
    answer:
      'None at all. CYTRAC is explicitly designed so anyone can jump in and learn from day one, regardless of technical background. The cards use clear, everyday language with no un-explained industry jargon. If you have ever received a suspicious text message or a strange phone call, you already know enough to play.',
  },
  {
    question: 'Where do you ship to?',
    answer:
      'We ship worldwide. For our customers across Africa—including Nigeria, Ghana, Kenya, and South Africa—orders are routed directly through our regional logistics hub for significantly faster delivery timelines and local payment processing. International orders are handled via our UK/US storefronts. Estimated delivery schedules are calculated at checkout.',
  },
  {
    question: 'When will my pre-order ship?',
    answer:
      'Pre-orders are fulfilled sequentially in the order they are received. You will receive an automated tracking link via email as soon as your box dispatch is confirmed. Subscribers on our mailing list receive prioritized milestone updates on manufacturing and shipping timelines before the general public.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'International storefronts support all major global credit and debit networks. Our African regional checkout fully accommodates card networks, direct bank transfers, and local mobile money services depending on your location. All transactions are fully encrypted and securely processed; we never store your payment credentials.',
  },
  {
    question: 'Can I buy CYTRAC as a gift?',
    answer:
      'Absolutely. CYTRAC arrives packaged inside a premium, fully illustrated display box that serves perfectly as a standalone gift. If you want a custom gift note included in the shipping parcel, simply write your message in the order notes block during checkout.',
  },
  {
    question: 'Is there a digital or app version?',
    answer:
      'Not currently. CYTRAC is intentionally built as a screen-free, tactile experience—the core value lies in the conversations and live interactions generated around a physical table. However, our team is currently exploring a digital companion app for deep-dives into real-world threat scenarios for a future release.',
  },
  {
    question: 'Who made CYTRAC?',
    answer:
      'CYTRAC was engineered by The Root Access Network (TRAN), a cybersecurity education organization dedicated to making digital safety intuitive and accessible. TRAN designs and deploys high-impact school tours, local community awareness initiatives, and professional tech mentorship pipelines. CYTRAC represents our flagship physical product brought directly to families.',
  },
];

interface AccordionItemProps {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, index, isOpen, onToggle }: AccordionItemProps) {
  const panelId = `faq-panel-${index}`;
  const triggerId = `faq-trigger-${index}`;

  return (
    <div className='border-b border-white/10 last:border-0'>
      <button
        id={triggerId}
        type='button'
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className='flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-cta focus-visible:text-cta'
      >
        <span className='font-display text-lg font-bold text-white'>
          {item.question}
        </span>
        <span
          aria-hidden='true'
          className={[
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 transition-transform duration-300',
            isOpen ? 'rotate-180 border-cta bg-cta' : 'bg-transparent',
          ].join(' ')}
        >
          <svg
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
            aria-hidden='true'
          >
            <path
              d='M2 4.5l5 5 5-5'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-white'
            />
          </svg>
        </span>
      </button>

      <div
        id={panelId}
        role='region'
        aria-labelledby={triggerId}
        hidden={!isOpen}
      >
        <p className='pb-6 pr-10 text-base leading-relaxed text-white/65 whitespace-pre-line'>
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section id='faq' className='bg-bg-dark' aria-labelledby='faq-heading'>
      <div className='section-pad'>
        <div className='container-content'>
          <div className='grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20 lg:items-start'>
            <div className='lg:sticky lg:top-28'>
              <span className='eyebrow mb-4 block text-mint/80'>Questions</span>
              <h2
                id='faq-heading'
                className='text-4xl font-black text-white lg:text-5xl'
              >
                Everything you want to <span className='text-cta'>know</span>
              </h2>
              <p className='mt-4 text-base leading-relaxed text-white/60'>
                Can&apos;t find what you&apos;re looking for? Reach us at{' '}
                <a
                  href='mailto:marketing@cytracgames.com'
                  className='font-semibold text-white underline underline-offset-4 hover:text-cta transition-colors'
                >
                  marketing@cytracgames.com
                </a>
              </p>
            </div>

            <ul
              className='m-0 p-0 list-none'
              aria-label='Frequently asked questions'
            >
              {FAQ_ITEMS.map((item, index) => (
                <li key={item.question}>
                  <AccordionItem
                    item={item}
                    index={index}
                    isOpen={openIndex === index}
                    onToggle={() => toggle(index)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
