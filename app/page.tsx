// app/page.tsx

import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import ValueProposition from '@/components/sections/ValueProposition';
import TrustSignals from '@/components/sections/TrustSignals';
import GameFeatures from '@/components/sections/GameFeatures';
import NewsletterForm from '@/components/sections/NewsletterForm';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className='flex-1'>
        <Hero />
        <ValueProposition />
        <TrustSignals />
        <GameFeatures />
        <NewsletterForm />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
