// Indicative reference only. Paystack South Africa charges our existing ZAR checkout amounts.
// The React component replaces this reference with a fresh daily market rate when available.
// Reference rate cross-checked 2026-11-05: ~1 ZAR = 0.06122 USD.
export const REFERENCE_ZAR_TO_USD = 0.06122;
export const REFERENCE_RATE_DATE = '2026-11-05';

export function parseZarAmount(value) {
  if (typeof value === 'number') return Number.isFinite(value) && value > 0 ? value : null;
  if (typeof value !== 'string') return null;
  const amount = Number(value.replace(/[^0-9.]/g, ''));
  return Number.isFinite(amount) && amount > 0 ? amount : null;
}

export function formatApproxUsd(zarValue, rate = REFERENCE_ZAR_TO_USD) {
  const amount = parseZarAmount(zarValue);
  if (amount === null || !Number.isFinite(rate) || rate <= 0 || rate >= 1) {
    return 'USD estimate unavailable';
  }
  const usd = Math.round(amount * rate);
  return '≈ US$' + usd.toLocaleString('en-US');
}
