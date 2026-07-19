import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className='flex flex-1 flex-col items-center justify-center bg-bg-dark'>
        <div className='section-pad w-full'>
          <div className='container-content flex flex-col items-center gap-8 text-center'>
            {/* Error code */}
            <p
              className='font-display text-8xl font-black text-white/10 lg:text-9xl'
              aria-hidden='true'
            >
              404
            </p>

            {/* Copy */}
            <div className='-mt-4 flex flex-col gap-4'>
              <span className='eyebrow text-mint/70'>Page not found</span>
              <h1 className='font-display text-3xl font-black text-white lg:text-4xl'>
                Looks like this page fell into a phishing trap.
              </h1>
              <p className='mx-auto max-w-md text-base leading-relaxed text-white/60'>
                The page you&apos;re looking for doesn&apos;t exist or may have
                moved. Let&apos;s get you back to safety.
              </p>
            </div>

            {/* CTAs */}
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
              <Link href='/' className='btn-primary'>
                Back to home
                <svg
                  aria-hidden='true'
                  width='18'
                  height='18'
                  viewBox='0 0 18 18'
                  fill='none'
                >
                  <path
                    d='M3 9h12M10 4l5 5-5 5'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </Link>
              <Link
                href='/preorder'
                className='btn-secondary border-white/30 text-white hover:bg-white hover:text-bg-dark'
              >
                Pre-order CYTRAC
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
