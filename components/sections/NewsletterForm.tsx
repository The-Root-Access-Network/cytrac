// components/sections/NewsletterForm.tsx

'use client';

import { useState, useRef, useEffect } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

// ── Inline modal ──────────────────────────────────────────────────────────────

interface StatusModalProps {
  status: 'success' | 'error';
  message: string;
  onClose: () => void;
}

function StatusModal({ status, message, onClose }: StatusModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Trap focus on the close button when modal opens
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const isSuccess = status === 'success';

  return (
    // Backdrop
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Scrim */}
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-bg-dark/60 backdrop-blur-sm'
      />

      {/* Panel */}
      <div className='relative w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl text-center'>
        {/* Icon */}
        <div
          className={[
            'mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full text-3xl',
            isSuccess ? 'bg-mint' : 'bg-red-50',
          ].join(' ')}
          aria-hidden='true'
        >
          {isSuccess ? '🎉' : '⚠️'}
        </div>

        <h3
          id='modal-title'
          className='mb-2 font-display text-2xl font-black text-bg-dark'
        >
          {isSuccess ? "You're on the list!" : 'Something went wrong'}
        </h3>

        <p className='mb-6 text-base leading-relaxed text-body'>{message}</p>

        <button
          ref={closeRef}
          type='button'
          onClick={onClose}
          className={
            isSuccess
              ? 'btn-primary w-full justify-center'
              : 'btn-secondary w-full justify-center'
          }
        >
          {isSuccess ? 'Got it' : 'Try again'}
        </button>
      </div>
    </div>
  );
}

// ── Form ──────────────────────────────────────────────────────────────────────

export default function NewsletterForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [modalMessage, setModalMessage] = useState('');

  function closeModal() {
    // On success, keep the form cleared; on error, let them retry
    setStatus('idle');
    setModalMessage('');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      EMAIL: data.get('EMAIL') as string,
      FNAME: data.get('FNAME') as string,
      COUNTRY: data.get('COUNTRY') as string,
      // Pass honeypot value to server — server checks it, not client
      botField: data.get('b_d3f09316b76ee9f06606331c6_7075ffe2a2') as string,
    };

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setModalMessage(
          "We'll keep you updated with launch news, exclusive offers, and gameplay previews. Check your inbox soon.",
        );
        setStatus('success');
        form.reset();
      } else {
        setModalMessage(
          json.error ?? 'Something went wrong. Please try again.',
        );
        setStatus('error');
      }
    } catch {
      setModalMessage(
        'Network error. Please check your connection and try again.',
      );
      setStatus('error');
    }
  }

  const isSubmitting = status === 'submitting';
  const inputClass =
    'w-full rounded-xl border-2 border-brand-blue/20 bg-bg-light px-4 py-3.5 text-base text-bg-dark placeholder:text-body/40 transition-colors focus:border-brand-blue focus:bg-white focus:outline-none disabled:opacity-50';

  return (
    <>
      {/* Status modal */}
      {(status === 'success' || status === 'error') && (
        <StatusModal
          status={status}
          message={modalMessage}
          onClose={closeModal}
        />
      )}

      <section
        id='preorder-updates'
        className='bg-bg-light'
        aria-labelledby='newsletter-heading'
      >
        <div className='section-pad'>
          <div className='container-content max-w-4xl'>
            <div className='card rounded-3xl px-6 py-14 md:px-14'>
              {/* Header */}
              <div className='mb-10 text-center'>
                <span className='eyebrow mb-4 inline-block rounded-pill bg-mint px-4 py-1.5'>
                  Stay updated
                </span>
                <h2
                  id='newsletter-heading'
                  className='mb-4 text-4xl font-black text-brand-blue lg:text-5xl'
                >
                  Still thinking it over?
                </h2>
                <p className='mx-auto max-w-xl text-lg leading-relaxed text-body'>
                  Leave your email and we&apos;ll keep you in the loop — launch
                  news, exclusive offers, gameplay previews, and future CYTRAC
                  releases. Not ready to pre-order today? You&apos;ll still be
                  first to know.
                </p>
              </div>

              {/* Form */}
              <form
                id='mc-embedded-subscribe-form'
                name='mc-embedded-subscribe-form'
                onSubmit={handleSubmit}
                noValidate
              >
                <div className='mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3'>
                  <div className='flex flex-col gap-1.5'>
                    <label htmlFor='mce-EMAIL' className='eyebrow text-[10px]'>
                      Email address <span aria-hidden='true'>*</span>
                    </label>
                    <input
                      type='email'
                      name='EMAIL'
                      id='mce-EMAIL'
                      required
                      autoComplete='email'
                      placeholder='you@example.com'
                      disabled={isSubmitting}
                      className={inputClass}
                    />
                  </div>

                  <div className='flex flex-col gap-1.5'>
                    <label htmlFor='mce-FNAME' className='eyebrow text-[10px]'>
                      First name <span aria-hidden='true'>*</span>
                    </label>
                    <input
                      type='text'
                      name='FNAME'
                      id='mce-FNAME'
                      required
                      autoComplete='given-name'
                      placeholder='Your first name'
                      disabled={isSubmitting}
                      className={inputClass}
                    />
                  </div>

                  <div className='flex flex-col gap-1.5'>
                    <label
                      htmlFor='mce-COUNTRY'
                      className='eyebrow text-[10px]'
                    >
                      Country <span aria-hidden='true'>*</span>
                    </label>
                    <input
                      type='text'
                      name='COUNTRY'
                      id='mce-COUNTRY'
                      required
                      autoComplete='country-name'
                      placeholder='e.g. Nigeria'
                      disabled={isSubmitting}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Honeypot — hidden from users and screen readers */}
                <div aria-hidden='true' className='absolute left-[-5000px]'>
                  <input
                    type='text'
                    name='b_d3f09316b76ee9f06606331c6_7075ffe2a2'
                    tabIndex={-1}
                    defaultValue=''
                    readOnly
                  />
                </div>

                <button
                  type='submit'
                  name='subscribe'
                  id='mc-embedded-subscribe'
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className='btn-primary w-full justify-center text-lg'
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        aria-hidden='true'
                        className='animate-spin'
                        width='18'
                        height='18'
                        viewBox='0 0 18 18'
                        fill='none'
                      >
                        <circle
                          cx='9'
                          cy='9'
                          r='7'
                          stroke='currentColor'
                          strokeOpacity='0.3'
                          strokeWidth='2'
                        />
                        <path
                          d='M9 2a7 7 0 0 1 7 7'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                        />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    <>
                      Keep me updated
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
                    </>
                  )}
                </button>
              </form>

              {/* Trust row */}
              <ul
                aria-label='Email list assurances'
                className='mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2'
              >
                {[
                  'No spam',
                  'Unsubscribe anytime',
                  'Exclusive launch updates',
                ].map((item) => (
                  <li key={item} className='trust-check text-body'>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
