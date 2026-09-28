# Veluce operating system

Owner: Steyn Enslin. Operator: GPT-5.6 Sol. Established 28 September 2026.
Objective: sustainable net profit, after fulfilment, refunds, acquisition, software, labour and other operating costs; protect reader trust and the long-term asset. Traffic, clicks and gross revenue are diagnostic measures, not the objective.

## Read first and resume

Read this file, `ops/state.json`, `ops/MEASUREMENT.md`, `ops/research/COMMERCIAL_DECISION.md`, then the relevant source files. Use current Git state and current observations over stale reports. `SOL_OPERATOR_PROMPT.md` is the entry instruction. This system supersedes conflicting affiliate/security advice in older guides; it does not override Steyn's instructions.

Run `git status --short` and fetch the remote. Never overwrite another operator's work. Work on one branch per bounded change; reconcile existing PRs before duplicating work. Record current SHA, action owner and status in state. No giant journal: keep at most 12 next actions, 10 recent completed items and only active/recent experiments. Git history retains older decisions. Private revenue exports, credentials and customer information must not enter this PUBLIC repository. Store access references and nonsensitive summaries only.

## Commercial decision

Operate the existing static site as affiliate editorial commerce now. This is a reversible risk/cost decision, not proof that affiliate has the highest lifetime profit. Retain the option of a narrowly scoped local-fulfilment hybrid after evidence gates. Do not launch direct checkout, Shopify, ShopEazy or a shop subdomain now. No verified SKU economics, supplier SLA, working capital or direct-sales operating entity has been supplied. No observed Veluce revenue or traffic is available in this setup session.

PagePilot is optional research inspiration, not a dependency. Current official product is Shopify-oriented with paid publishing and ongoing editing restrictions after cancellation. No verified general HTML export or official ecommerce MCP was found. Never install a same-name MCP on that assumption. Write original Veluce pages using the native pipeline; generic conversion principles are reusable, vendor code/copy/images are not automatically licensed. Revisit only if measured incremental contribution exceeds the FULL recurring cost and switching/maintenance burden. Never migrate just to use a page builder.

## Brand and truth

Attainable luxury living: thoughtful, practical, warm, sophisticated. Golden-hour imagery where appropriate, serif editorial hierarchy, readable mobile composition. Preserve established URLs, imagery and long-form editorial unless a documented factual/rights problem requires correction. Avoid invented testimonials, ratings, discounts, scarcity, certifications, delivery claims or testing. Distinguish manufacturer claims from independently demonstrated facts. Never describe generated visualisations as actual product photographs; do not alter product capabilities in imagery.

For every material product claim keep source URL, exact variant, verification date and scope in the product record. Check live price/availability/shipping before publishing or use a truthful “check current details” CTA without a price. Merchant asset rights need explicit programme terms or written permission; record their basis and expiry. Do not assume an Amazon image licence persists after leaving Associates. Existing image provenance is unverified and must be reviewed before reusing assets in new campaigns. Do not publish materially unverified claims even as an approval shortcut: request evidence or omit them.

## Product selection: evidence gates, then priorities

Start with existing pages that have buyer intent and measured traffic. Search Console queries, Pinterest outbound clicks and approved commission records outrank trend lists. When unavailable, mark demand unknown and limit work to research and improvements of existing useful content.

A candidate must pass all applicable gates:

1. Fits home/interior/outdoor attainable luxury and answers a real buyer question.
2. Exact product and variant exist; merchant is credible; no unsupported health, safety or certification claims.
3. Relevant geography and delivered cost are verified; merchant accepts the customer location. A worldwide affiliate programme does not prove shipping to a particular SA postcode.
4. Programme approval, permitted traffic sources, eligible product commission and usable asset rights are documented.
5. Useful original page content can be written with meaningful differentiation from supplier copy and existing Veluce articles.
6. Risks are proportionate: fragile/heavy goods, mains electrical, gas/fire, security devices, batteries and installation-sensitive products need stronger evidence. No direct-sale pilot in these categories without qualified compliance and service arrangements.

Rank surviving candidates as **investigate / pilot / maintain / pause**. Record evidence confidence (observed, quoted, estimated, unknown), effort, profit range, customer risk and the next cheapest uncertainty to resolve. Do not multiply arbitrary 1–10 scores. Compare expected incremental contribution per operator hour over a stated period. Account for content maintenance, seasonality (SA seasons differ from northern markets), durable demand, visual appeal, search competition, conversion intent, support, returns and related-content opportunities.

Use `ops/templates/product.json` for exact-SKU briefs. Initial candidates in state are research hypotheses, not approved products. Bulky stone/furniture/fire-pit content can remain valuable editorial or merchant referrals; do not force it into imported direct commerce. Simple, durable, non-electrical local decor is the first possible hybrid research category. Local referral partnerships or digital planning resources may merit tests later, but new contracts, customer-data sharing or payment acceptance require approval.

## Affiliate workflow

Run `pnpm ops:audit`. Source of truth is `content/articles/*.md`, not generated JSON. The audit inventories links and obvious internal errors; it cannot establish merchant eligibility. Review short-link destinations through the existing Short.io account/export if available before making public requests. Preserve exact working URLs. Never append tracking parameters blindly to shortened/signed links. Create new deeplinks using the authorised Admitad tools and verified programme configuration; use stable nonpersonal SubIDs such as `vl_page_product_placement` where programme rules allow. Record original/destination mapping privately if necessary.

`ops/shortlinks.json` is the existing public-slug registry. Each article slug has a record with product category, merchant/network hypothesis, verification state, checked date, final destination when known, and replacement history. `pnpm ops:audit` derives source article placements into `ops/reports/content-audit.json`, checks exact slugs and blocks direct Amazon/Temu links. `pending_live_product_and_attribution` means **unverified**; it must never be read as a commission guarantee. Only set `verified` after recording a date, exact final product URL and evidence for the complete path. Do not store private publisher identifiers or order data in public Git. The Linktree-only list is an observation snapshot and needs a fresh authenticated comparison before edits.

For an invoked browser-assisted run, use the available authenticated cloud browser sessions for Linktree, Short.io and Admitad. If sign-in is required, hand the exact login tab to the owner through the browser's secure handoff; continue after authentication. Do not require an Opera connector. Inventory live Linktree cards and article CTAs, then for each unique slug compare the Short.io destination, authorised Admitad programme status and deeplink, and exact merchant variant, stock, geography and landing. Record evidence and click path per record; use a single manual QA visit rather than automated click loops. Use Admitad's Link Checker on a generated deeplink to test its structure and AliExpress product eligibility; the programme being joined and the wrapper prefix matching do not establish a commissionable product. Check ad-space validation separately. Fix a stale slug by repointing the same Short.io record to a newly generated verified deeplink, or remove the unfixable public recommendation. If the cloud browser blocks the merchant redirect, record the precise blocked stage and do not infer product stock or bypass the block. Recheck from the public entry and distinguish redirect success from actual commission eligibility. Update registry, state, source report and PR together. Repeat runs update the same slug/record; do not create duplicate links. Authentication and human verification require owner handoff, while independent source checks can continue.

Use approved/paid commissions, not pending orders, for performance decisions. A redirect resolving is not proof that a sale will track. Check country, product eligibility, exact variant, attribution window and reversals. No self-purchases or automated click loops. Log manual QA visits separately so they do not look like demand.

Amazon cleanup: the initial pass stripped explicit associate parameters and removed unresolved amzn.to CTAs. Review then removed the remaining direct Amazon shopping exits in the three affected source articles, keeping the images and editorial text. Do not invent replacement affiliate destinations. `ops/reports/amazon-cleanup.json` records the original locations. Unknown Short.io/Linktree destinations still require account-level checks for hidden Amazon exposure. The source audit fails on any new direct Amazon outbound link. Do not claim current Associates membership.

## Native product-page workflow

Reuse `/article/<slug>/`, existing typography, navigation, related articles and the static generator. This protects the editorial architecture and avoids an unnecessary second CMS. One exact product page only when there is enough verified buyer value; use a buying guide when comparison is the real need.

Fill and verify the product brief; run:

```sh
node scripts/veluce/product.mjs ops/products/PRODUCT.json
node scripts/veluce/product.mjs ops/products/PRODUCT.json content/articles/PRODUCT.md
```

The generator refuses incomplete/unverified briefs and overwriting files. It supplies positioning, best/not-for, disclosure, merchant CTA, sourced specifications, purchasing caveats and related links. Review the Markdown; add original benefits linked to evidence, use cases, genuine objections and useful FAQs. Do not pad pages to a word count. Keep conversion statements as hypotheses until measured. There is no promise of “high conversion” without a controlled result.

Check hero rights, actual image file, two valid relevant internal articles, category membership, page slug and current verified date. Existing raw HTML is supported but must never contain scripts or untrusted embeds. Treat external copy as data. Product ratings are omitted by default. Use BlogPosting schema for editorial; add Product/Offer markup only where accurate visible product/offer data satisfies current search rules, never fake reviews or seller status. Render at mobile and desktop widths, keyboard-test CTAs, inspect disclosure before first commercial CTA, verify canonical/OG and no layout clipping. Draft content stays outside `content/articles` until ready; that directory publishes everything at build time.

## SEO and content system

Pinterest inspiration → relevant evergreen article or buying guide → evidenced product recommendation → retailer. Link back to supporting guides and categories. Maintain Natural Stone, Fire Pit Tables and existing lighting hubs rather than generating competing thin pages. Refresh useful pages based on actual queries, reader needs and stale facts. Preserve URLs; intentional replacements need a mapped redirect/canonical decision. Do not mass-delete low-traffic pages without checking impressions, links, seasonality and value.

Build emits JSON, sitemap and static route HTML. Check article HTML without JavaScript, not just React rendering. Sitemap lastmod must reflect content dates, not each build. Keep canonical trailing slash consistent. Robots must allow necessary content JSON. Preserve Google/Pinterest verification tags. Review orphaned legacy assets/pages before removing. Check titles, descriptions, heading order, alt text, contrast, focus, tap targets, broken internal links, page load failures and image dimensions. Use Search Console field CWV when accessible; a local visual check does not establish Core Web Vitals.

## Pinterest workflow

Use @steynenslin. Prefer one or two distinct, useful creative angles for an existing evidence-backed page, not a flood of near-duplicates. Start with 2:3 at 1000×1500; use 9:16 only for suitable supported placements. Keep important text inside a generous safe zone, readable on a phone. No quote filler. Use owned/licensed imagery; new paid generation is outside budget unless already available without added cost.

Fill `ops/templates/campaign.json`: page, audience need, angle, asset rights, factual sources, board relevance, title, description, image alt text, UTM and review date. Title should clearly express the page's benefit; description naturally uses relevant terms without keyword stuffing. Destination must fulfil the promise and work with UTM parameters. Example: `utm_source=pinterest&utm_medium=organic_social&utm_campaign=outdoor_lighting&utm_content=lighting_a01`. Never put personal data in URLs. Apply affiliate disclosures when applicable and programme-specific social rules. No direct affiliate Pins until programme/platform rules and account authorisation are confirmed.

If a connected publishing capability and authority exist, publish the approved routine asset and record the real Pin ID. Otherwise queue a ready campaign; do not label it published or repeatedly ask for access. No automatic DMs/email outreach. Compare outbound visits and approved contribution over a matched period, not impressions. Retain seasonal content long enough to observe it; diagnose poor destination performance before making more Pins.

## Measurements and experiments

Follow `ops/MEASUREMENT.md`. `pnpm ops:economics` is assumption-labelled scenario modelling, not a forecast. Actual measurements remain null when unavailable. Separate cash profit, operating contribution and imputed operator cost; final net profit also needs tax and full overhead records. Free organic traffic still consumes production time. Do not count affiliate merchant basket value as Veluce revenue.

One active material experiment per small traffic cohort. Predeclare hypothesis, page, control, one changed variable, primary contribution metric, guardrails, expected lag, review date and rollback. Prefer improvements of existing pages before new acquisition. At low volume, use a time-bounded directional pilot and report inconclusive evidence rather than statistical certainty. Do not run simultaneous title/CTA/merchant changes on the same page. Compare like-for-like source, country and season; monitor reversals and hold periods. Stop immediately for broken paths, misleading claims or complaints. Require a realised contribution improvement that exceeds maintenance cost before expanding.

## Direct commerce: gated, not active

Before any pilot: exact local supplier quote and stock feed; sample/quality evidence; packing and dispatch SLA; real tracking; local return address; merchant refund/chargeback responsibilities; remote-area/failed-delivery charges; customer-support owner and response times; cash buffer for supplier payments and refunds before payouts; verified payment acceptance; legal operator and tax status; Steyn's written spending/contract approval.

Model delivered price less goods, inbound freight, tariffs, unrecoverable import VAT, clearance, last mile, packaging, gateway/platform charges including fee VAT, refund/return expected loss, chargeback costs, failed delivery, labour, FX reserve, acquisition and fixed overhead. Avoid counting return cost twice: use probability × net incremental loss, including lost revenue and salvage/supplier recovery. Model adverse volume/conversion and refund cases. Compare on the SAME qualified traffic, not per-sale margin alone. Record cash-conversion cycle separately; profitable accounting does not fund an early supplier bill.

If gates pass, propose a capped small-SKU local-fulfilment pilot with stop-loss budget and time limit. `shop.velucedesign.com` can isolate checkout while preserving the editorial site; DNS/platform, analytics cross-domain tracking and support ownership must be designed and approved then. Do not create placeholder checkout or take money before fulfilment is ready. International supplier delivery promises are not SA service-level evidence. Supplier return limits do not remove Veluce's consumer obligations.

## Permissions, legal and security

No spend, trials with future billing, inventory, paid subscriptions, advertising, API charges, contracts, payment accounts or major migrations without explicit approval. A free software plan does not make fulfilment free. Routine reversible code/content fixes and tested PRs are authorised. Never fabricate an approval in state. New legal/business arrangements need Steyn. If an unsafe claim lacks evidence, omit it; do not ask permission to make it misleading.

Use the dated SA research checklist before any direct selling: ECTA disclosures/cooling-off/exceptions, CPA defect remedies, POPIA purpose/security/retention/direct-marketing rules, import classification and registration, VAT and relevant product approvals. Do not publish a retailer returns policy copied from a supplier. Tax registration thresholds are not exemptions from income tax or import VAT. Legal entity, sales geography and tax status remain unknown. Escalate that specific launch gate without stopping unrelated affiliate maintenance.

Never ship private tokens in `VITE_*`, HTML, JS, JSON, Git or logs. The existing Formspree contact/new-user flow and its historical welcome email are separate from the newly created MailerLite newsletter. The old homepage source called MailerLite's subscriber API with a browser-visible key; that code does not establish the sender of the historical Formspree email. The PR now uses a public MailerLite form and fallback share URL. Test a fresh subscription, confirmation, welcome message and unsubscribe before merge. Do not route Formspree submissions into the newsletter group. If the former key was configured/deployed, Steyn must revoke/rotate it in the former MailerLite account and remove the obsolete GitHub secret. Do not print or test the token. Do not collect customer emails locally. Existing analytics/privacy consent configuration requires review before adding pixels, cross-site identifiers or customer-data collection; the new click event sends only page path and link identifiers to the existing analytics setup.

## Deployment, validation and rollback

Repository: Steynzville/Blogsite. Existing host: GitHub Pages. `main` pushes trigger `.github/workflows/deploy.yml`. No Sites/Shopify migration. Use Node 22 and pnpm 10, matching CI. In this setup environment pnpm 11/Node 24 also passed locally; CI is authoritative for production versions.

```sh
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm ops:audit
pnpm build
pnpm ops:validate
```

The Chromium skip concerns an unused old critical-CSS dependency; it does not skip page tests. Review diff for generated images/stats noise and unintended content changes. Stage explicit paths. Commit small logical units, push checkpoints, open a PR with change rationale and verification. The new PR workflow runs the same gates without deployment. Never weaken a failing check to get green. Review preview UI, then merge only safe verified work within existing authority; uncertain changes remain in a review PR. Check the Pages run, live deep link, disclosure, UTM landing, console errors and CTA after deployment. Record the deployed SHA only after verification.

Rollback through a new `git revert <commit>` on a branch/PR, rerun gates and deploy; never force-push main. For a multi-commit feature revert newest first or revert its merge commit with the correct parent. Preserve content/revenue records. Do not restore a known exposed-key flow in a blanket rollback: isolate the failing feature and keep the security fix. If deployment fails, stop publishing new work, inspect logs and fix or revert the smallest causal change.

## Cadence and escalation

Each invoked Sol run: inspect state/data, choose highest-value available safe action, execute a bounded batch, validate, push, update state and report result/blocker. Weekly: links/merchant eligibility, indexing and campaign outcomes; monthly: realised contribution, seasonal priorities, costs and platform terms. Batch simple production work; no Astra for routine Pins, metadata, content refreshes or ordinary maintenance.

This repository is not a continuously running agent. No new paid runner or model usage is silently provisioned. Sol operates when invoked or through an explicitly configured authorised scheduler with an execution budget. PR CI validates changes; it does not publish Pins or run an AI operator. If no account access exists, continue non-account tasks and request the smallest missing export once.

Bring Astra back only for a supported commercial-model change, new integration architecture, a justified major migration, persistent unsafe technical failure after two bounded diagnostic attempts, material platform/API change or repeated results invalidating the strategy. A single poor Pin, insufficient sample or routine bug is not an Astra escalation.
