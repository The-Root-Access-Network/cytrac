// types/market.ts
export type MarketKey = 'INTL' | 'AFRICA';

export interface Market {
  key: MarketKey;
  label: string;
  currency: string;
  checkoutUrl: string;
}

export interface MarketState {
  active: Market;
  detected: MarketKey | null;
  isDetecting: boolean;
  isManual: boolean;
  error: string | null;
}
