// lib/geoip.ts
export async function detectCountryCode(): Promise<string | null> {
  try {
    const response = await fetch("https://ipapi.co/json/", {
      next: { revalidate: 86400 }, // Cache if server rendered later
    });
    
    if (!response.ok) return null;
    
    const data = await response.json();
    return data.country_code || null;
  } catch (error) {
    // Fail silently to prevent console pollution for users with strict ad-blockers
    return null;
  }
}