// context/MarketContext.tsx
"use client";

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { detectCountryCode } from "@/lib/geoip";
import { resolveMarketFromCountry, MARKETS, DEFAULT_MARKET } from "@/lib/markets";
import type { MarketKey, MarketState, Market } from "@/types/market";

interface MarketContextValue extends MarketState {
  setMarket: (key: MarketKey) => void;
  market: Market;
}

export const MarketContext = createContext<MarketContextValue | null>(null);

export function MarketProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MarketState>({
    active: MARKETS[DEFAULT_MARKET],
    detected: null,
    isDetecting: true,
    isManual: false,
    error: null,
  });

  useEffect(() => {
    // Read from localStorage to preserve manual customer configuration overrides
    const savedKey = localStorage.getItem("cytrac_market") as MarketKey | null;

    if (savedKey && MARKETS[savedKey]) {
      setState((prev) => ({
        ...prev,
        active: MARKETS[savedKey],
        detected: savedKey,
        isDetecting: false,
        isManual: true,
      }));
      return;
    }

    detectCountryCode().then((code) => {
      const resolvedKey = code ? resolveMarketFromCountry(code) : DEFAULT_MARKET;

      setState((prev) => ({
        ...prev,
        active: MARKETS[resolvedKey],
        detected: resolvedKey,
        isDetecting: false,
        error: code ? null : "GeoIP fallback triggered.",
      }));
    });
  }, []);

  const setMarket = useCallback((key: MarketKey) => {
    localStorage.setItem("cytrac_market", key);
    setState((prev) => ({
      ...prev,
      active: MARKETS[key],
      isManual: true,
      error: null,
    }));
  }, []);

  return (
    <MarketContext.Provider value={{ ...state, market: state.active, setMarket }}>
      {children}
    </MarketContext.Provider>
  );
}