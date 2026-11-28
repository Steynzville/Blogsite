# Pinterest learning loop — 28 November 2026

## Scope and sources

- Pinterest business account: `@steynenslin`, matched to Buffer channel `steynenslin` (`6ad4eda5778b240e2f4a6312`) and the repository publishing ledger.
- Pinterest native Analytics overview collected 28 November 2026. The latest completed date exposed by the account view was 20 November; daily data is recorded in UTC. The review excludes 21–28 November rather than treating lagged or unavailable values as zero.
- GA4 property: `velucedesign.com` (`540909663`) through the connected read-only Windsor source. Pinterest-labelled organic and referral source-medium rows are combined. Windsor's current history limit prevented a full GA4 comparison for the older Pinterest window.
- Buffer and `ops/buffer/ledger.json` were used only to validate exact Pin IDs, canonical destinations and boards. Buffer generic clicks were not substituted for Pinterest-native outbound clicks.
- No raw export, credentials, private identity data or user-level activity is committed.

## Two completed 28-day Pinterest-native windows

| Window                       | Impressions | Outbound clicks | Outbound-click rate | Saves |
| ---------------------------- | ----------: | --------------: | ------------------: | ----: |
| 26 September–23 October 2026 |     277,364 |             195 |              0.070% | 1,080 |
| 24 October–20 November 2026  |     300,290 |             166 |              0.055% | 1,460 |

The later window gained 22,926 impressions (+8.3%) but produced 29 fewer outbound clicks (-14.9%). Its outbound-click rate declined by about 21%. Saves increased by 380 (+35.2%). The account is attracting more viewing and saving, but a smaller share of exposure is becoming a site visit.

GA4 could not reproduce both completed 28-day windows because the connected plan exposes only the latest 30 days. For the available 29 October–20 November subset, Pinterest-labelled traffic generated 95 sessions, 47 engaged sessions (49.5%), 146 views and no recorded key events. The missing earlier period is unavailable, not zero.

## Fresh completed diagnostic: 14–20 November

Pinterest reported 94,370 impressions, 3,520 engagements, 58 outbound clicks and 491 saves. The native outbound-click rate was **0.061%**. Compared with the preceding seven days, Pinterest showed impressions up 33% and outbound clicks up 48%; the implied rate improvement is directional and does not reverse the weaker completed-window trend.

GA4 returned 39 Pinterest-labelled sessions, 18 engaged sessions (46.2%), 61 views and no recorded key events for the same dates.

Exact high-click rows that could be matched safely include:

| Pin                                                                    | Exact Pin ID         | Destination / board                                                                                | Outbound clicks | Reported rate |
| ---------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------- | --------------: | ------------: |
| Architectural Wall Lighting Ideas for a Luxury Exterior                | `296815431716203846` | `/article/upward-lighting-architectural-grazing/` · Garden & Patio / Outdoor Lighting & Atmosphere |               8 |          0.1% |
| Uplighting a Multi-Stem Tree to Reveal Bark and Branch Structure       | `296815431716407569` | `/article/hidden-uplighting-mature-trees/` · Outdoor Lighting Ideas                                |               3 |          0.3% |
| How to Uplight a Mature Tree Without Harsh Glare                       | `296815431716427863` | `/article/hidden-uplighting-mature-trees/` · Outdoor Lighting Ideas                                |               2 |          0.8% |
| Copper Outdoor Lanterns: Patina, Lifespan and Buying Tips              | `296815431716238457` | `/article/copper-lanterns-age-with-grace/` · Attainable Luxury Outdoor Lighting                    |               2 |          0.9% |
| Outdoor Furniture Layout: Measure the Conversation Zone Before You Buy | `296815431716390408` | `/luxury-outdoor-room-planner/` · product rotation board mapping in ledger                         |               2 |          0.3% |

The `Outdoor Lighting Ideas` board produced 25 outbound clicks in the fresh window; `Garden & Patio Ideas & Finds` produced 14. Board totals include all qualifying Pins and are not attributed to one article.

## Destination evidence and editorial decision

- **Strongest absolute fresh Pin:** architectural wall lighting, with eight outbound clicks. Its destination was materially refreshed on 21 November and should be allowed to mature before another change.
- **Best matched refresh opportunity:** two mature-tree uplighting Pins produced five outbound clicks in the fresh window. GA4 recorded four Pinterest-labelled sessions to the exact article, one engaged session (25%), nine views and no key events. Across the available 29 October–20 November subset, the article received seven sessions, four engaged sessions (57.1%) and 13 views.
- **Content defect:** the destination still used universal fixture counts, distances, angles and solar-runtime promises; it framed solar as the default, contained an invented installation-cost range and retained old product placements outside the catalogue approved for automated refreshes.
- **Decision:** materially refresh `/article/hidden-uplighting-mature-trees/` around sightline testing, beam control, restrained output, warmer light, system choice, root protection and seasonal commissioning. Preserve the canonical URL and existing suitable imagery.
- **Confidence:** high for aggregate Pinterest windows; medium for matched mature Pins and GA4 destination behaviour; low for individual one-click/high-rate rows and posting-time conclusions.

## Controlled optimization

No Pinterest publishing rule, schedule, board mix or creative weighting changed. The evidence supports improving the qualified-click destination, but not reallocating the fixed publishing mix from one fresh week. The current `ops/buffer/editorial-performance.json` remains untouched because exact impressions were not available for every validated Pin in a complete canonical cohort; replacing its sound baseline with rounded rates would reduce auditability.

### Candidate experiment

After the refreshed mature-tree article has at least 28 completed days, compare two semantically matched and similarly exposed creative hooks:

1. **Diagnostic:** “How to uplight a mature tree without harsh glare.”
2. **Structural outcome:** “Reveal bark and branching structure with one controlled beam.”

Primary metric: Pinterest-native outbound clicks divided by impressions. Secondary validation: GA4 engaged sessions to the exact canonical article. Do not declare a winner from one or two clicks.

Guardrails remain unchanged: four editorial Pins/day, one product Pin/day, fixed six-product order, 45-day URL and 30-day theme cooldowns, verified imagery, semantic board fit, live destinations, non-reuse and zero spend.

Next review: 26 December 2026 or later, once the refreshed destination and any eligible matched creative have a full completed 28-day observation period.
