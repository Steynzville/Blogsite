# VELUCE commercial & indexing baseline — 5 November 2026

**Status:** pre-revenue; owner confirmed zero real customer purchases and zero affiliate purchases. This report is an aggregate evidence ledger, not a traffic or earnings forecast. No private customer data is stored.

## Comparable measured periods

Source: connected GA4 property for velucedesign.com; 6 October–2 November 2026 (28 days), compared with 8 September–5 October.

| Metric | Previous 28 days | Current 28 days | Interpretation |
|---|---:|---:|---|
| GA4 sessions | 166 | 280 | Includes owner QA and potentially unqualified sessions |
| GA4 engaged sessions | 93 | 124 | Engagement grew slower than raw sessions |
| GA4 pageviews | 448 | 420 | More sessions, fewer pageviews |
| GA4 active users | 127 | 256 | Unique metric, not necessarily prospective buyers |
| GA4 checkout starts | 0 | 1 | Existing internal QA confirmed; not evidence of real demand |
| GA4 e-commerce purchases | 0 | 0 | Aligned with owner's confirmation |
| GSC Google Web Search clicks | 7 | 8 | Search Console clicks are not GA4 sessions |
| GSC Google Web Search impressions | 405 | 469 | Modest early search visibility |

Other current GA4 observations: engagement rate **44.29%**; 40.32 seconds average engagement per session; 12 `veluce_commercial_click` events from 8 active users, potentially including tests. Do not count a checkout start, verification attempt or thank-you view as a sale.

## Traffic quality by attributed source

GA4 current 28 days, source/medium grouping:

- Pinterest sources combined: **130 sessions**; includes separately tagged `Pinterest / organic`, `pinterest / organic_social` and localized Pinterest referral domains. Different spellings should be retained raw and normalized only in analysis.
- Facebook sources combined: **77 sessions**. Within these, `m.facebook.com / referral` logged **51 mobile sessions but only 1 engaged session**, one pageview each. This is an anomaly requiring referrer/bot/preview investigation; do **not** state these are confirmed bots or block real Facebook traffic without proof.
- Direct: **60 sessions**, likely includes internal QA.
- Google + DuckDuckGo organic: **13 sessions** (not identical to 8 GSC Google clicks).

Leading GA4 landing pages: homepage 38 sessions, LED deck strip article 25, copper lanterns 21, pergola lighting 16, architectural grazing 13. The six Studio pages received an estimated **48 pageviews combined** across URL variants; direct and QA traffic distort real buyer-interest inference.

## Search Console state (direct URL inspection 5 November)

Google's sitemap `https://velucedesign.com/sitemap.xml` was registered without processing errors or warnings. Existing crawl status is **not** a guarantee of indexing after deployment:

| Canonical product URL | Status before discovery changes |
|---|---|
| /outdoor-lighting-blueprint/ | Crawled — currently not indexed |
| /luxury-outdoor-room-planner/ | Crawled — currently not indexed |
| /designer-brief-builder/ | Discovered — currently not indexed |
| /luxury-lighting-formula/ | Submitted and indexed |
| /room-procurement-system/ | Submitted and indexed |
| /complete-home-design-system/ | Unknown to Google |

All six links are present in the sitemap. This PR improves their HTML crawler fallbacks, homepage internal links and accurate lastmod hints. Neither a sitemap resubmission nor an indexing request guarantees indexing.

## Conversion instrumentation added in PR #49

- `view_item` for viewing one of six recognised product routes. Tracks product exploration, not checkout completion.
- `select_item` for clicking a product exploration link, including article modules and the homepage Studio links. Not emitted by purchase or payment-verification controls.
- Preexisting `veluce_commercial_click`, `begin_checkout` and secure verified `purchase` definitions remain unchanged. Never total up overlapping events as distinct customers.
- No paid campaigns, affiliate redirects, product prices, checkout URLs, payment credentials, Pinterest assets or scheduled posting settings were modified.

## Evaluation plan

Review after a *full 28 days from deployment* rather than declaring new creatives winners immediately. Compare:
1. Non-owner sessions and engaged sessions by landing page and accurate session-source grouping.
2. `select_item` and `view_item` by item ID, then `begin_checkout` by item and **server-verified successful purchases**.
3. Native Pinterest **outbound clicks and impressions by Pin and destination**, not Buffer Pin closeup clicks.
4. GSC index verdict and search impressions by each product canonical; inspect crawl quality if excluded.
5. Approved affiliate commissions net of reversals, not merchant clicks or unapproved actions.

Next account-level tasks: exclude internal/debug traffic in GA4 without losing historical data; confirm ecommerce event/custom-dimension availability; investigate suspicious Facebook mobile referrals; verify eligible affiliate link routing and actual commissions; request indexing manually for any still-excluded product URLs if GSC does not provide writable indexing actions. Fixing public HTML alone cannot update historical traffic or guarantee future sales.
