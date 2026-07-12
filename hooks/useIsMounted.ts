// hooks/useIsMounted.ts

"use client";

import { useEffect, useState } from "react";

/**
 * Returns false on the server and on the first client render,
 * then true after mount. Prevents SSR/client hydration mismatches
 * in components reading from async context (MarketContext).
 */
export function useIsMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    function mount() {
      setMounted(true);
    }
    mount();
  }, []);

  return mounted;
}
