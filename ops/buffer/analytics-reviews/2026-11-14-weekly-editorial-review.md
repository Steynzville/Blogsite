# Pinterest learning review — 14 November 2026

## Scope and sources

- Account: Veluce Pinterest channel `steynenslin`, Buffer channel `6ad4eda5778b240e2f4a6312`.
- Collection time: 2026-11-14 06:33 SAST.
- Available-through: Buffer metrics refreshed per post, generally through 2026-11-13; newly sent posts may not yet have usable exposure.
- Source: authenticated Buffer per-post insights matched to the repository publishing ledger. Buffer `clicks` are **Pin opens**, not Pinterest-native `OUTBOUND_CLICK`.
- Native Pinterest per-Pin analytics were not available to this run. GA4 was not available. No unavailable field is recorded as zero.

## Comparable windows

| Window | Posts sent | Posts with non-zero reported impressions | Impressions | Buffer Pin opens | Open rate | Saves |
|---|---:|---:|---:|---:|---:|---:|
| 7–13 Nov 2026 | 17 | 7 | 38 | 2 | 5.26% | 0 |
| 31 Oct–6 Nov 2026 | 33 | 33 | 911 | 32 | 3.51% | 0 |
| 17 Oct–13 Nov 2026 | 99 | 85 | 4,844 | 144 | 2.97% | 15 |

The fresh seven-day rate is not comparable enough to call an improvement: 10 of 17 posts had no matured exposure and the denominator is only 38 impressions. The authenticated Buffer plan exposed only the latest 31 days, so two complete non-overlapping 28-day windows were not available. Pinterest-native outbound clicks remain unavailable.

## Directional creative observations

- The largest mature single-post sample in the retrieved data was an intimate stone fire-pit scene: 607 impressions, 19 Pin opens and 2 saves (3.13% open rate). This supports keeping practical, lived-in outdoor-room scenes in exploration, but it does not establish outbound traffic.
- A minimalist pergola scene produced 134 impressions, 4 Pin opens and 1 save (2.99% open rate). It is a stronger denominator than the very small high-rate posts.
- Several newer question-led Pins show high open rates on only 5–12 impressions. They are hypotheses, not winners.
- Tree-uplighting, pathway and some pergola creatives recorded 20–46 impressions with no opens in the prior window. These are weak observations, but sample sizes remain too small for wholesale topic or board changes.

## Decision and next test

**Optimization deployed:** none. Changing the GitHub-owned topic mix, board matching or creative strategy would be speculative because the required Pinterest-native outbound-click metric was unavailable and the fresh seven-day data is heavily lagged.

**Candidate experiment:** when native Pinterest analytics become available, compare question-led problem/decision hooks against descriptive inspiration hooks within the same topic, destination type and board. Primary metric: `OUTBOUND_CLICK / IMPRESSION`; secondary guardrails: saves, Pin opens, exact destination validity and semantic board fit.

**Guardrails:** preserve four editorial Pins/day, one product Pin/day, fixed product rotation, cooldowns, non-reuse, verified imagery, accurate destinations and existing schedules. Do not optimize against Buffer Pin opens as if they were outbound clicks.

**Confidence:** low for cohort ranking; high for the decision to avoid a speculative repository change.
