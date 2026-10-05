const shortHosts = new Set(['steynenslin.s.gy', 'tr.ee']);
export function commercialKind(href) {
  let url;
  try { url = new URL(href); } catch { return null; }
  if (!['https:', 'http:'].includes(url.protocol)) return null;
  const host = url.hostname.toLowerCase();
  if (shortHosts.has(host)) return 'unverified_shortlink';
  if (/(^|\.)(admitad\.com|admitad\.link|aliexpress\.com|aliexpress\.us)$/.test(host)) return 'affiliate_candidate';
  return null;
}
export function commercialEvent(anchor, pathname) {
  const kind = commercialKind(anchor.href);
  if (!kind && !anchor.dataset.productId) return null;
  const url = new URL(anchor.href);
  return {page_path: pathname, link_domain: url.hostname,
    link_id: anchor.dataset.productId || url.hostname + url.pathname,
    link_kind: kind || 'declared_commercial', placement: anchor.dataset.placement || 'editorial'};
}
export function installCommerceTracking(doc, win) {
  const handler = event => {
    if (event.type === 'auxclick' && event.button !== 1) return;
    const anchor = event.target?.closest?.('a[href]');
    if (!anchor) return;
    const payload = commercialEvent(anchor, win.location.pathname);
    if (payload && typeof win.gtag === 'function') {
      win.gtag('event', 'veluce_commercial_click', payload);

      if (anchor.dataset.checkout === 'true') {
        const value = Number(anchor.dataset.value);
        const currency = anchor.dataset.currency || 'ZAR';
        const item = {
          item_id: anchor.dataset.productId || payload.link_id,
          item_name: anchor.dataset.productName || anchor.dataset.productId || payload.link_id,
          quantity: 1,
          ...(Number.isFinite(value) ? { price: value } : {}),
        };
        win.gtag('event', 'begin_checkout', {
          currency,
          ...(Number.isFinite(value) ? { value } : {}),
          items: [item],
        });
      }

      if (anchor.dataset.placement === 'payment-verification') {
        win.gtag('event', 'payment_verification_attempt', {
          product_id: anchor.dataset.productId || payload.link_id,
          page_path: win.location.pathname,
        });
      }
    }
  };
  doc.addEventListener('click', handler);
  doc.addEventListener('auxclick', handler);
  return () => { doc.removeEventListener('click', handler); doc.removeEventListener('auxclick', handler); };
}
