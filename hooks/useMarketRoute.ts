// hooks/useMarketRoute.ts
import { useContext } from 'react';
import { MarketContext } from '@/context/MarketContext';

export function useMarketRoute() {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error(
      'useMarketRoute must be executed within a MarketProvider scope.',
    );
  }
  return context;
}
