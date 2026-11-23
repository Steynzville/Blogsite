# Pinterest learning loop — 23 November 2026

## Scope and sources

- Account: Pinterest business account `@steynenslin`, matched to Buffer channel `steynenslin` (`6ad4eda5778b240e2f4a6312`) and the repository publishing ledger.
- Pinterest native: Organic Analytics overview collected 23 November 2026. Pinterest stated metrics were updated one day earlier; the fresh Pin table was available through 21 November and Pinterest records daily data in UTC.
- GA4: `velucedesign.com` property `540909663`, using Pinterest-labelled organic/referral source-medium rows. Windsor's current plan exposes only the latest 30 days, so the earlier completed comparison window could not be corroborated in GA4.
- Buffer: the repository ledger was used to match validated Pin IDs, canonical destinations and boards. Buffer generic clicks were not substituted for Pinterest-native outbound clicks.
- No raw export, credentials, private identity data or user-level activity is committed.

## Two completed 28-day Pinterest-native windows

| Window | Impressions | Outbound clicks | Outbound-click rate | Saves |
| --- | ---: | ---: | ---: | ---: |
| 28 September–25 October 2026 | 286,330 | 201 | 0.070% | 1,120 |
| 26 October–22 November 2026 | 288,132 | 162 | 0.056% | 1,430 |

Impressions were nearly flat (+0.6%), while outbound clicks fell by 39 and the outbound-click rate declined by about 20%. Saves rose by about 27%. The account is still generating visual interest, but the later window converted a smaller share of exposure into site visits.

The later window generated 133 GA4 Pinterest-labelled sessions, 63 engaged sessions (47.4%), 203 pageviews and no recorded key events. The earlier GA4 window is unavailable under the connected plan's 30-day history limit; no unavailable value is reported as zero.

## Fresh diagnostic: 16–21 November

Pinterest reported 83,958 impressions, 3,040 engagements, 51 outbound clicks and 450 saves. The native outbound-click rate was **0.061%**. Pinterest showed outbound clicks flat versus the preceding seven days while impressions were down 3%; this is directional only.

GA4 returned 42 Pinterest-labelled sessions, 19 engaged sessions (45.2%), 64 pageviews and no recorded key events for 16–22 November. The leading canonical landing pages were the outdoor LED-strip guide (8 sessions), refreshed wall-grazing guide (8), pergola-lighting guide (5), garden-pathway guide (4) and copper-lantern guide (4). Source naming remains split between `Pinterest / organic` and `pinterest.com / referral`, so both were included.

Pinterest's outbound-click sort exposed exact per-Pin results. The strongest mature rows included:

| Pin | Exact Pin ID | Destination / board | Outbound clicks | Reported rate |
| --- | --- | --- | ---: | ---: |
| Architectural Wall Lighting Ideas for a Luxury Exterior | `296815431716203846` | `/article/upward-lighting-architectural-grazing/` · Garden & Patio / Outdoor Lighting & Atmosphere | 7 | 0.1% |
| Modern Privacy Fence Lighting Ideas | `296815431715614668` | Destination and board not validated in the current repository ledger; excluded from canonical cohort decisions | 5 | <0.1% |
| Uplighting a Multi-Stem Tree to Reveal Bark and Branch Structure | Pinterest table exposed the title but the current exact ID was not matched to the Buffer ledger | `/article/hidden-uplighting-mature-trees/` · Outdoor Lighting Ideas | 3 | 0.3% |
| Low Maintenance Outdoor Lighting That Runs Automatically | Pinterest table exposed the title but repository matching was incomplete | Not used for a canonical cohort decision | 2 | 2.2% |
| LED Pathway Lighting Ideas for Modern Gardens | `296815431715620300` | Canonical destination not revalidated in the current ledger | 2 | <0.1% |
| Copper Outdoor Lanterns: Patina, Lifespan and Buying Tips | `296815431716238457` | `/article/copper-lanterns-age-with-grace/` · Attainable Luxury Outdoor Lighting | 2 | 1.0% |

Several high-rate rows had only one or two clicks and very low impressions. They are useful experiment candidates, not winners. Early living-room creative (`Cozy Living Room | Your Sanctuary Retreat Room Edit` and `Evening Ritual | Cozy Mode for Your Living Room`) generated one outbound click each at roughly 2%, but the sample is too small for a mix change.

## Decision, confidence and implementation

- **Strongest qualified cohort:** exterior architectural lighting remains the most reliable source of absolute outbound clicks, with the wall-lighting Pin producing seven in the fresh window and the refreshed destination receiving eight GA4 sessions.
- **Best engagement signal:** the moonlighting-tree guide had 11 Pinterest sessions in the completed later window, six engaged sessions and unusually high average engagement in its organic-source row; sample size remains modest.
- **Weakest strategic signal:** the later 28-day outbound-click rate fell despite stable impressions and more saves. Inspiration is not consistently converting to qualified visits.
- **Evidence confidence:** high for the two aggregate Pinterest windows; medium for matched mature Pins; low for newer small creative cohorts and posting-time conclusions.
- **GitHub-owned Pinterest optimization:** none deployed. Exact per-Pin data is now available, but the fresh living-room and diagnostic-hook samples are too small, and some leading rows could not be validated against exact canonical destinations in the current ledger. The sound `ops/buffer/editorial-performance.json` baseline is preserved.
- **Editorial response:** this run adds a distinct living-room lighting article with practical scene-led hooks. That creates a relevant destination for future controlled living-room creative without changing publishing volume, schedule, boards, cooldowns or automation.

## Candidate experiment and guardrails

After the new living-room article has a minimum 28-day maturation period, compare two semantically matched creative approaches at reasonable exposure: **problem/diagnostic** (for example, “Why one bright living room feels flat”) versus **scene/outcome** (“Four living-room scenes for a calmer evening”). Primary metric: native outbound clicks divided by native impressions. Secondary validation: GA4 engaged sessions to the exact canonical article.

Guardrails: preserve four editorial Pins/day, one product Pin/day, the fixed six-product order, 45-day URL and 30-day theme cooldowns, verified imagery, board semantic fit, live canonical destinations and the free budget. Do not declare a winner from one or two clicks. Do not use Buffer Pin opens as outbound clicks.

Next review: revalidate exact destinations and board mappings for the unmatched leading Pins, then compare mature living-room hooks only after adequate exposure and age.
