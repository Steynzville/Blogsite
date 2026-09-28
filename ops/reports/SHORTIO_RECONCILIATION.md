# Short.io affiliate link reconciliation — 28 September 2026

Source: signed-in Short.io dashboard for `steynenslin.s.gy`, compared with `content/articles/*.md` on the merged `main` branch. This is a dashboard and source audit, not an end-to-end sale or commission test. Formspree is the separate contact/new-user form service and does not route these affiliate clicks.

| Observation | Result |
| --- | --- |
| Short.io account records | 15: one homepage link and 14 product links |
| Distinct short links in article source | 12; all 12 exact slugs exist in the account |
| Product destinations | All 14 use the same existing `rzekl.com` tracking-link path, with an AliExpress URL in `ulp` |
| Article destinations with AliExpress share URLs | 10 use `a.aliexpress.com` URLs; their final product pages and eligibility remain unverified |
| Article destinations with direct product URLs | `24vDCplugLED` has a syntactically normal AliExpress product URL; `SolarLED` has a malformed product path |
| Account links unused in current articles | `Home`, `SolarSecurity`, `SolarDeck` |

`SolarLED` currently has an encoded `ulp` value whose product path begins `https://www.aliexpress.com/item/1005007008038230.htmlaRUE...`. Characters are attached directly after `.html`, followed by a long string of encoded share/tracking parameters. That is not a normal AliExpress item path. The account record has been left unchanged: saving a shortened URL with those parameters removed was rejected by automatic approval review because attribution could be affected. Obtain a freshly generated, verified deeplink for the *same exact product* in the authorised Admitad account, confirm programme approval and eligible geography/traffic, then replace only this Short.io destination and test the reader path. Do not blindly strip or graft tracking parameters.

The other ten article links that wrap AliExpress share URLs are structurally plausible in the dashboard, but the existence of a Short.io record and a `rzekl.com` URL does not establish that the merchant product still exists, the share URL reaches it, or purchases will credit this publisher. The cloud browser's site-safety policy blocked a live trace at AliExpress; no alternate route was used. Admitad publisher approval, conversion reports and deeplink generation were unavailable behind its human-verification screen. Short.io's own conversion column showed zero for these records, which is not evidence of zero Admitad commissions.

The `ops/shortlinks.json` allowlist now makes `pnpm ops:audit` fail if an article introduces a Short.io slug that has not been reconciled with the account. It catches source drift only. It cannot inspect mutable Short.io destinations or verify merchant attribution on its own. Any new short link must be checked in Short.io and Admitad before adding it to the allowlist. No recurring Sol agent, live link monitor, or external publishing automation is active merely because the repository includes prompts and CI.
