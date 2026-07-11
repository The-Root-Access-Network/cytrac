// app/api/subscribe/route.ts

/**
 * Route Handler — Mailchimp subscription proxy.
 *
 * Keeps the Mailchimp action URL server-side only.
 * Client POSTs JSON here; this handler forwards to Mailchimp
 * and returns a clean JSON response.
 *
 * Required env var (server-only, no NEXT_PUBLIC_ prefix):
 *   MAILCHIMP_ACTION_URL=https://cytracgames.us11.list-manage.com/subscribe/post?u=...
 * Also add to .env.local for local development.
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const actionUrl = process.env.MAILCHIMP_ACTION_URL;

  if (!actionUrl) {
    console.error('[subscribe] MAILCHIMP_ACTION_URL is not set.');
    return NextResponse.json(
      { error: 'Server configuration error. Please try again later.' },
      { status: 500 },
    );
  }

  let body: Record<string, string>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 },
    );
  }

  const { EMAIL, FNAME, COUNTRY, botField } = body;

  // Server-side field validation
  if (!EMAIL || !FNAME || !COUNTRY) {
    return NextResponse.json(
      { error: 'All fields are required.' },
      { status: 422 },
    );
  }

  // Basic email shape check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(EMAIL)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 422 },
    );
  }

  // Bot protection — if the honeypot field has a value, silently succeed
  // (don't tell the bot it was caught)
  if (botField) {
    return NextResponse.json({ success: true });
  }

  // Forward to Mailchimp
  const formData = new URLSearchParams();
  formData.append('EMAIL', EMAIL);
  formData.append('FNAME', FNAME);
  formData.append('COUNTRY', COUNTRY);
  // Mailchimp expects the bot field present but empty
  formData.append('b_d3f09316b76ee9f06606331c6_7075ffe2a2', '');

  try {
    const mcRes = await fetch(actionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });

    // Mailchimp returns 200 even for "already subscribed" — that's fine here.
    // It will not return useful JSON from the POST endpoint (only from API v3).
    // A 200 is enough to confirm delivery.
    if (!mcRes.ok) {
      console.error('[subscribe] Mailchimp returned', mcRes.status);
      return NextResponse.json(
        { error: 'Could not submit your details. Please try again.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[subscribe] Fetch to Mailchimp failed:', err);
    return NextResponse.json(
      { error: 'Network error. Please check your connection and try again.' },
      { status: 503 },
    );
  }
}
