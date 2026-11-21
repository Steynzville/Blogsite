# Pinterest learning loop — 21 November 2026

## Scope and sources

- Account: Pinterest business account `@steynenslin`; matched to Buffer channel `steynenslin` (`6ad4eda5778b240e2f4a6312`) and the repository publishing ledger.
- Pinterest native: Organic Analytics overview collected 21 November 2026; metrics updated one day earlier. Displayed window was 22 October–21 November 2026, with board data available through 19 November.
- Buffer: sent-post metrics and aggregates collected 21 November 2026. Buffer labels its per-post `clicks` as Pin opens and explicitly says they do not include clicks through to the destination.
- GA4: `velucedesign.com` property 540909663, completed diagnostic window 12–18 November 2026, Pinterest referral sessions to article paths.
- No raw export, credentials or private user data are committed.

## Native Pinterest baseline

Pinterest reported 317,027 organic impressions, 11,620 engagements, 164 outbound clicks and 1,520 saves for the displayed last-30-days window. The aggregate outbound-click rate was **0.052%** (164 / 317,027).

Pinterest showed outbound clicks down 19% versus the preceding 30 days while impressions rose 11%. It did not expose the exact prior-window values in the overview, so this review does not invent them. A strict pair of custom completed 28-day native windows was not retrievable in this run.

The highest-impression creative cohorts remained exterior lighting: pathway lighting, privacy-fence lighting, tree moonlighting, architectural wall lighting and poolside lighting. `Outdoor Lighting Ideas` led board exposure with 112.56k impressions across 173 Pins; `Garden & Patio Ideas & Finds` followed with 100.53k across 390 Pins. These are exposure signals, not proof of outbound-click quality.

Pinterest could sort the table by outbound clicks but returned “Not enough data to display” at Pin level. Exact per-Pin native outbound-click leaders, rates and weakest Pins therefore remain unavailable. The sound signal in `ops/buffer/editorial-performance.json` is not overwritten.

## Fresh seven-day diagnostic

For 14–20 November, Buffer reported 35 sent Pinterest posts, 51 impressions and three generic clicks. Those clicks are Pin opens/generic clicks, not native outbound clicks, and the newest posts were still largely unready. They are not used as a conversion-rate denominator.

GA4 recorded 18 Pinterest-referral article sessions for 12–18 November. Six landed on `/article/upward-lighting-architectural-grazing/`, two each on the copper-lantern, LED-strip, moonlighting-tree and pergola guides, and one each on the pathway-moonlighting, hidden-uplighting and natural-stone guides. No key events were recorded. The wall-grazing sessions had 16.7% engagement and zero average engagement time, making the landing page a meaningful editorial refresh opportunity, not evidence that its Pins are the best acquisition creative.

## Decision and confidence

- **Strongest exposure cohort:** exterior-lighting imagery, especially pathways, trees and architectural wall lighting.
- **Weakest qualified signal:** outbound clicks declined while impressions rose; the account is earning visibility without a proportional website-action gain.
- **Evidence confidence:** medium for aggregate native direction; low for individual creative, hook, board and posting-time conclusions because per-Pin outbound clicks were unavailable and recent posts are immature.
- **Implementation this week:** no speculative Pinterest mix, copy, board or schedule change. The editorial refresh improves the wall-grazing destination selected by GA4 and keeps existing four-editorial-Pins/day, one-product-Pin/day, product order, cooldowns and verified-image rules unchanged.

## Candidate experiment and guardrails

When exact per-Pin native outbound data is available, compare two established exterior-lighting cohorts at similar exposure: (1) question-led diagnostic hooks and (2) inspiration-led titles. Primary metric: native outbound clicks / native impressions after a minimum 28-day maturation period. Secondary validation: GA4 engaged sessions by canonical destination.

Guardrails: no publishing-volume or schedule change; no direct affiliate Pins; preserve board semantic fit, 45-day URL and 30-day theme cooldowns, verified imagery and live canonical destinations; do not call a winner at low sample size.

Next review: attempt custom completed 28-day native windows and per-Pin outbound-click export first. If unavailable again, retain the aggregate baseline and do not substitute Buffer Pin opens for outbound clicks.
