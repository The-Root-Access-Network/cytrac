// components/layout/Header.tsx

/**
 * Sticky site header.
 * - Left:   CYTRAC wordmark (links to #top)
 * - Right:  MarketToggle (client component — hydrates independently)
 *
 * Header itself is a Server Component. Only MarketToggle is "use client".
 */

import Image from "next/image";
import Link from "next/link";
import MarketToggle from "@/components/ui/MarketToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-blue/10 bg-white/90 backdrop-blur-md">
      <div className="container-content flex items-center justify-between py-3 px-4 md:px-6">

        {/* Wordmark */}
        <Link
          href="/"
          aria-label="CYTRAC — go to homepage"
          className="flex items-center group"
        >
          <Image
            src="/images/logo/cytrac-logo.png"
            alt="CYTRAC"
            width={124}
            height={48}
            className="h-12 w-auto transition-opacity duration-150 group-hover:opacity-80"
            priority
          />
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <MarketToggle />
          <a
            href="#preorder-updates"
            className="btn-primary hidden md:inline-flex text-sm py-2 px-5"
          >
            Pre-Order
          </a>
        </div>

      </div>
    </header>
  );
}