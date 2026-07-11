// components/sections/GameFeatures.tsx

import Image from 'next/image';
import PreOrderButton from '@/components/ui/PreOrderButton';

interface Feature {
  eyebrow: string;
  heading: string;
  body: string;
  bullets: string[];
  imageSrc: string;
  imageAlt: string;
}

const FEATURES: Feature[] = [
  {
    eyebrow: 'The board',
    heading: 'The ultimate race from Cyber Rookie to Cyber Champion',
    body: 'The custom 100-step game board turns cybersecurity into an interactive journey. Players navigate a high-stakes grid where every roll of the dice brings you closer to safety — or drops you straight into an online trap.',
    bullets: [
      '100 interactive spaces tracking your digital safety journey',
      'Special landing squares that trigger real-world security scenarios',
      'Designed for 2–5 players, optimized for ages 7 and up',
    ],
    imageSrc: '/images/game/game-board-flat-full.webp',
    imageAlt: 'CYTRAC game board showing the full board, cards, and tokens',
  },
  {
    eyebrow: 'The cards',
    heading: 'Action cards that reward smart choices and punish risks',
    body: 'No boring lectures here. Draw from colour-coded decks that directly affect your place on the board. Master real-world cyber concepts while managing rewards, penalties, and game-changing special items.',
    bullets: [
      'Green Cards: Safe habits that propel your token forward',
      'Red Cards: Common digital mistakes that set your progress back',
      'Yellow & Blue Decks: Core security knowledge drops and high-value Bail Cards',
    ],
    imageSrc: '/images/game/cards-red-threat.webp',
    imageAlt: 'CYTRAC card deck fanned out showing threat and defence cards',
  },
  {
    eyebrow: 'The gameplay',
    heading: 'Fast-paced, competitive, and instantly familiar',
    body: 'Built on classic race mechanics that anyone can pick up in seconds, CYTRAC gets families talking. As players read scenarios aloud, parents and kids naturally debate choices, laugh through penalties, and internalise safety habits that stick.',
    bullets: [
      'Choose your professional role: Analyst, Defender, Auditor, Engineer, or Responder',
      'Active reading and discussion mechanics make learning purely collaborative',
      'Perfect for family game nights, classrooms, or community workshops',
    ],
    imageSrc: '/images/game/cytrac-hero-game-setting.webp',
    imageAlt: 'CYTRAC game set up on a table ready to play',
  },
];

export default function GameFeatures() {
  return (
    <section
      id='how-it-works'
      className='bg-bg-light'
      aria-labelledby='features-heading'
    >
      <div className='section-pad'>
        <div className='container-content'>
          <div className='mb-16 max-w-2xl'>
            <span className='eyebrow mb-3 block'>How it works</span>
            <h2
              id='features-heading'
              className='text-4xl font-black text-bg-dark lg:text-5xl'
            >
              Everything in the box,{' '}
              <span className='text-brand-blue'>explained</span>
            </h2>
          </div>

          <div className='flex flex-col gap-24'>
            {FEATURES.map(
              (
                { eyebrow, heading, body, bullets, imageSrc, imageAlt },
                index,
              ) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={eyebrow}
                    className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16'
                  >
                    <div
                      className={[
                        'relative overflow-hidden rounded-2xl shadow-card',
                        isEven ? 'lg:order-1' : 'lg:order-2',
                      ].join(' ')}
                    >
                      <Image
                        src={imageSrc}
                        alt={imageAlt}
                        width={560}
                        height={420}
                        className='w-full object-cover'
                        sizes='(max-width: 1024px) 100vw, 50vw'
                      />
                    </div>

                    <div
                      className={[
                        'flex flex-col gap-5',
                        isEven ? 'lg:order-2' : 'lg:order-1',
                      ].join(' ')}
                    >
                      <span className='eyebrow'>{eyebrow}</span>
                      <h3 className='text-3xl font-black text-bg-dark lg:text-4xl'>
                        {heading}
                      </h3>
                      <p className='text-base leading-relaxed text-body'>
                        {body}
                      </p>
                      <ul
                        className='flex flex-col gap-2'
                        aria-label={`${eyebrow} details`}
                      >
                        {bullets.map((point) => (
                          <li key={point} className='trust-check'>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              },
            )}
          </div>

          <div className='mt-20 flex flex-col items-center gap-4 text-center'>
            <p className='font-display text-lg font-bold text-bg-dark'>
              Ready to bring CYTRAC home?
            </p>
            <PreOrderButton size='lg' />
            <p className='text-sm text-body'>
              Free shipping on orders over £40 / $50 to qualifying regions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
