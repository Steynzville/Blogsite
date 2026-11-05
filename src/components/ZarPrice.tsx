import { useEffect, useState } from 'react';
import { formatApproxUsd, REFERENCE_ZAR_TO_USD, REFERENCE_RATE_DATE } from '@/lib/price-usd.mjs';

const RATE_URL = 'https://api.frankfurter.dev/v2/rate/zar/usd';
const CACHE_KEY = 'veluce:zar-usd-rate:v1';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

type CachedRate = {
  rate: number;
  fetchedAt: number;
  date?: string;
};

let memoryRate: CachedRate | null = null;
let pendingRate: Promise<CachedRate | null> | null = null;

function readCachedRate() {
  if (memoryRate) return memoryRate;
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedRate;
    if (!Number.isFinite(parsed.rate) || parsed.rate <= 0 || parsed.rate >= 1) return null;
    memoryRate = parsed;
    return parsed;
  } catch {
    return null;
  }
}

function writeCachedRate(value: CachedRate) {
  memoryRate = value;
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(value));
  } catch {
    // A blocked/full localStorage should never prevent price display.
  }
}

async function getZarUsdRate() {
  const cached = readCachedRate();
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) return cached;
  if (pendingRate) return pendingRate;

  pendingRate = fetch(RATE_URL, { headers: { Accept: 'application/json' } })
    .then(async response => {
      if (!response.ok) throw new Error('Exchange-rate request failed');
      const data = (await response.json()) as { rate?: number; date?: string };
      if (!Number.isFinite(data.rate) || !data.rate || data.rate <= 0 || data.rate >= 1) {
        throw new Error('Invalid exchange rate');
      }
      const fresh = { rate: data.rate, date: data.date, fetchedAt: Date.now() };
      writeCachedRate(fresh);
      return fresh;
    })
    .catch(() => cached ?? null)
    .finally(() => {
      pendingRate = null;
    });

  return pendingRate;
}

/**
 * User-facing prices are USD-only estimates. The Paystack-linked checkout
 * remains billed in ZAR and the original ZAR price is the commercial source of truth.
 */
export function ZarPrice({
  value,
  approxClassName = '',
}: {
  value: string | number;
  approxClassName?: string;
}) {
  const [rate, setRate] = useState<CachedRate | null>(() => readCachedRate());

  useEffect(() => {
    let active = true;
    getZarUsdRate().then(nextRate => {
      if (active) setRate(nextRate);
    });
    return () => {
      active = false;
    };
  }, []);

  const approximateRate = rate?.rate ?? REFERENCE_ZAR_TO_USD;
  const sourceDate = rate?.date ?? REFERENCE_RATE_DATE;

  return (
    <span
      className={approxClassName}
      title={`Indicative USD equivalent at a reference exchange rate dated ${sourceDate}. Actual Paystack checkout is charged in South African rand (ZAR); your bank's rate or fees may differ.`}
    >
      {formatApproxUsd(value, approximateRate)}
    </span>
  );
}
