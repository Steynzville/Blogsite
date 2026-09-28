# Short.io affiliate link reconciliation — 28 September 2026

This report records the initial authenticated dashboard audit and subsequent repairs. Formspree handles the separate contact form; it does not route affiliate clicks. Read the article source, `ops/shortlinks.json`, and current Short.io/Linktree state together.

## Initial observation (historical)

The dashboard then contained 15 records (one homepage, 14 products), including all 12 article slugs. The `SolarLED` destination had a malformed nested AliExpress item path, and Linktree's `COBled` card pointed to a Short.io slug with no record. Ten article destinations used `a.aliexpress.com` share URLs. The first public Linktree audit later found the 12V/24V card linking directly to an Admitad wrapper rather than through `24vDCplugLED`. These findings describe the state **before** the corrections below; they are not open repair tasks.

## Current mapping and evidence

| Slug | Placement and intent | Current evidence |
| --- | --- | --- |
| `TUYAcobLED` | Article 220V smart/Tuya COB LED strip | Existing Short.io record; owner confirmed product intent and routing. Final listing and credited sale remain unverified. |
| `24vDCplugLED` | Article 12V/24V IP67 DC COB strip and corresponding Linktree card | Existing Short.io record. Owner replaced the card's direct Admitad URL with this short URL and manually tested it on 28 September. The bypass finding is resolved. |
| `SolarLED` | Article and Linktree solar outdoor LED strip | Existing Short.io slug retained; malformed destination replaced with a newly generated Admitad deeplink for AliExpress item `1005009013305099`. Admitad Link Checker reported Active. Owner restored the Linktree card. |
| `COBled` | Separate Linktree 12V/24V high-density COB strip | Short.io slug created for a newly generated Admitad deeplink for item `1005003279313941`; Link Checker reported Active. Owner corrected card title to “12V/24V High-Density COB LED Strip” and manually tested routing. It is not the article's 220V CTA. |

The public Linktree shop was observed at 13 products after SolarLED and COBled were restored, with their card URLs pointing to the respective Short.io slugs. The later `24vDCplugLED` and COBled title changes are owner-tested; this cloud browser has not independently refreshed them because its Linktree admin session expired. No affiliate URL or parameter was reconstructed from the malformed original.

The existence of a Short.io record, an Admitad `rzekl.com` wrapper, or an Active Link Checker result does not prove current merchant stock, the right electrical variant for a buyer, geographic eligibility, or an attributed commission. AliExpress final redirects could not be opened under the cloud browser's site-safety policy. The remaining article and shop products still need those checks; the initial zero Short.io conversions is not evidence of zero Admitad commissions.

`ops/shortlinks.json` is the slug registry. `pnpm ops:audit` checks source slugs and direct Amazon/Temu links, but cannot inspect mutable account destinations or stock. Reuse existing slugs, validate changes in Admitad, update Short.io/Linktree, then record evidence and verification scope in the registry and `ops/state.json`. No recurring live link monitor or autonomous publisher is active merely because this repository includes operator instructions.
