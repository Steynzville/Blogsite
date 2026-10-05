# Measurement contract

Existing observed setup: GA4 G-C4JR74BJ19 in index.html; Google and Pinterest verification tags; Short.io/Linktree link wrappers. No account-level GA4, Search Console, Pinterest, Short.io or Admitad exports were available during setup. Presence of a tag does NOT prove collection or conversions. Do not treat unknowns as zero.

New event `veluce_commercial_click` uses existing gtag, delegated across raw Markdown and React anchors.

Direct-product funnel events are deliberately separated by evidence level. A click on a live Studio Buy now control emits the GA4-recommended `begin_checkout` event with ZAR value and one item, while the existing commercial-click event remains the general click ledger. Clicking the secure `Verify payment & download` control emits `payment_verification_attempt`. **Do not emit GA4 `purchase` from a thank-you page view or from a verification click.** The thank-you URL can be opened directly and a reference can be mistyped; a purchase event is valid only after the secure delivery service has independently verified the Paystack transaction, product, currency and amount. Add `purchase` server-side (or after a positive verification response exposed to the client) when the secure-delivery source is available for a controlled change.
 Parameters: `page_path`, `link_id` (stable product ID or host/path), `link_domain`, `link_kind`, `placement`. Unknown wrappers are `unverified_shortlink`, not asserted affiliate conversions. No query strings, emails, user IDs, full referrers or click text in this custom payload. No new pixel, API token or navigation delay. GA4 enhanced outbound `click` may also fire: never add both as separate clicks. Do not send `purchase` for outbound clicks.

Account verification needed: confirm property ownership, consent/legal basis and retention, exclude internal/debug traffic, validate ONE click in Realtime/DebugView, register event-scoped custom dimensions for the parameters, verify SPA pageviews and attribution across internal navigation. No account changes were made in setup. Current GA4 may automatically measure history changes; avoid introducing duplicate manual pageviews without observing configuration.

## Minimum data request, once

Prefer read-only existing connectors. Otherwise ask Steyn for the latest complete 28 days plus previous comparable 28 days, and a longer mature commission window:

- GA4: date, landing/page path, source/medium, campaign, country, sessions, engaged sessions, custom commercial clicks (after deployment). Preserve which dimensions are session vs event scoped.
- Search Console: page/query/country/device clicks, impressions, CTR, position; indexing and Core Web Vitals. Search Console clicks are not GA sessions.
- Pinterest: Pin ID, destination, publish date, outbound clicks, saves, impressions. Pin clicks are not outbound clicks.
- Short.io: exact destination mapping and click stats, bot filters and period. Do not repoint links without preserving mappings.
- Admitad: programme approval/terms, eligible product rates, transaction date, nonpersonal SubID, pending/approved/declined status, approved commission, currency, payout date and reversals. Private order identifiers stay out of Git.

Use a secure private location for raw exports; do not paste into public issues. Aggregate only as authorised. `ops/templates/measurement.json` defines the summary format. One record per period/page/source/cohort; do not sum overlapping periods. `null` means missing, 0 means observed zero. Each record needs source, retrieved date, currency, coverage and evidence class. Different currencies require a dated conversion source; keep originals. Match commission cohorts to originating clicks where possible, otherwise label attribution unknown. Hold periods mean recent traffic cannot be judged using payouts alone.

## Calculations

Affiliate revenue = approved commission less reversals, not merchant GMV. Report pending separately. RPV = matched approved commission / sessions; outbound EPC = matched approved commission / commercial clicks. Report denominator and maturity. If matching is unavailable, report aggregate only; never allocate proportionally and call it observed.

Direct contribution = net customer receipts minus goods/landed cost, shipping, packaging, gateway/platform fees, expected net refund/return and chargeback losses, failures, support and acquisition. Final operating profit subtracts fixed software, hosting/domain renewal, content work and other overhead; economic profit additionally values owner/agent time. Net profit after tax needs verified entity/tax records. Cash profit tracks actual payouts/payment dates; a commission on hold is not cash.

`pnpm ops:economics` calculates illustrative cases only. Amounts are ZAR in the supplied examples, consistently including unrecoverable taxes. The 3.68% + R2.30 illustrative gateway charge is Payfast card pricing with fee VAT for a non-VAT-recovering operator; it is NOT asserted to be supported by ShopEazy. The combined platform assumption is a generic sensitivity scenario, not a purchasable stack quote. Replace every material input with a compatible platform/gateway quote before decisions. Fee bases can include shipping/VAT: adapt to the contract. Input fixed costs includes subscriptions and payout allocations; supply income-tax reserve explicitly before after-tax interpretation.

RefundLoss/chargebackLoss/failedDeliveryLoss must be mutually exclusive expected net incremental losses per initiated order, including refunded revenue, retained processing fees, reverse freight and recoverable goods/supplier credits. Do not subtract full refunds again elsewhere. Default examples assume no recovery and do not estimate actual return rates. FX reserve applies to foreign costs; record stress movement and source. CAC=0 denotes no purchased traffic, not zero content/agent effort.

## Experiment record

Store ID, hypothesis, eligible pages/cohort, baseline period, primary metric, single intervention, guardrails, launched SHA, minimum observation period, review date, results/evidence confidence and decision. Start with a 28-day review; extend through commission approval lag. Treat low counts as inconclusive. Revert for broken routes/claims, not merely a noisy week. No false precision or automatic winner without sufficient comparable evidence.
