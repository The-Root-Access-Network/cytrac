// lib/markets.ts
import type { MarketKey, Market } from "@/types/market";

export const DEFAULT_MARKET: MarketKey = "INTL";

export const MARKETS: Record<MarketKey, Market> = {
  INTL: {
    key: "INTL",
    label: "International (US/UK)",
    currency: "GBP",
    checkoutUrl: process.env.NEXT_PUBLIC_SHOPWIRED_URL || "https://shopwired-placeholder.com",
  },
  AFRICA: {
    key: "AFRICA",
    label: "Nigeria",
    currency: "NGN",
    checkoutUrl: process.env.NEXT_PUBLIC_BUMPA_URL || "https://bumpa-placeholder.com",
  },
};

// Target specific high-intent operating regions for the African market
const AFRICA_COUNTRY_CODES = new Set([
  "NG", "GH", "KE", "ZA", "RW", "EG", "MA", "CM", "CI", "SN"
]);

export function resolveMarketFromCountry(countryCode: string): MarketKey {
  return AFRICA_COUNTRY_CODES.has(countryCode.toUpperCase()) ? "AFRICA" : "INTL";
}