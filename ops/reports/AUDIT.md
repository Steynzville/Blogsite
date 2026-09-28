# Technical audit and validation — 28 September 2026

Baseline `ad95128316f1cb444a3c644e569c8fe7f3cf153b`, main. Source and live UI inspected. This report describes the prepared branch, not a deployed release.

## Findings

- React 19, Vite, TypeScript, Tailwind, Wouter, pure-static GitHub Pages. 26 Markdown source articles, seven categories. Runtime loads generated JSON. Build prerenders article bodies and 39 non-home routes. No checkout/order backend. Existing responsive images and local fonts retained.
- Homepage visually inspected live: serif editorial design, full-width architectural image, categories and article navigation load. No wholesale redesign justified. Field CWV, actual audience and mobile performance scores unavailable; no invented Lighthouse score.
- **Confirmed live defect:** opening `/article/upward-lighting-architectural-grazing/?utm_source=pinterest&utm_medium=organic_social` changes the URL to `/utm_source=pinterest&utm_medium=organic_social` and renders 404. Source consumes any query string as a redirect. Prepared explicit-marker/legacy-safe routing fix has regression tests.
- GA4 tag and Google/Pinterest verification exist. No dashboard credentials/exports, proven affiliate conversions, Short.io destination mappings or Pinterest publishing access. Pinterest identity in schema was incorrectly `/veluce`; prepared correction uses `/steynenslin/`.
- Amazon exposure: 18 explicit tagged link occurrences across three articles and seven amzn.to CTAs across two others; exact inventory in amazon-cleanup.json. Tagged links become ordinary same-product references; opaque short CTAs removed. Old Amazon membership/disclosure text corrected. No unverified substitute recommendations. Hidden redirects remain unresolved, not declared clean.
- 12 unique Short.io wrappers and two Linktree wrappers retained exactly. No mass redirect requests/self-purchases to distort tracking. Account export required to prove destinations/approval.
- Four broken internal-link occurrences found, repaired to relevant existing stone comparison and LED-deck guides. Audit now reports no issues in its defined scope. It is not a comprehensive external-link availability or rights audit.
- Generated `countertop-materials-guide.json` exists without Markdown source. Retained pending provenance/backlink review; do not delete it merely as cleanup. Source internal links now use an existing relevant article.
- Source newsletter sends a MailerLite private API key from `VITE_*`; deployment injects that variable. Prepared fix removes this path and the unverified “thousands” claim, uses optional public hosted signup URL, otherwise offers journal browsing. Exposure of an actually configured key was NOT inspected or proven. Owner should revoke/rotate if configured and remove the old secret.
- Prerendered metadata lacked per-page social image/title; prepared fix adds them, escapes metadata and adds upfront affiliate disclosure. Canonical trailing slash normalised in client; generated lastmod now uses real content dates. No fabricated current date for schema. False social profile/phone/search schema removed.
- Existing Wouter Link wrappers nested anchors. Prepared `asChild` correction preserves the anchors and styling. Search input receives an explicit accessible label. Browser acceptance still required.
- Build failures previously only logged by static generator; now exit nonzero. Deployment type checking is blocking. New PR workflow validates checks/tests/audit/build/state without deploying. Old critical-CSS dependency attempts an obsolete Chromium download despite feature being unused; installer skip is documented.

## Local validation

Baseline TypeScript check passed. Updated TypeScript, production build, Node regression suite and operating-state/prerender checks pass. Full build optimises images and Vite emits the site; no new runtime dependency or lockfile change. Regression suite covers UTM/legacy redirect correctness, open-redirect rejection, commercial tracking classification/no query data, nonblocking clicks, economics missing-input/downside handling and product verification/rendering gates. Product renderer is validated with synthetic test data only; no unverified live product page created.

`pnpm ops:audit` inventories 26 articles and 24 unique current external URLs, zero reported content issues. `pnpm ops:validate` checks state and 26 article HTML outputs. Build generates 39 non-home HTML routes. Local metrics are not proof of live GA4 receipt, mobile layout or realised conversion.

## Delivery blockers

Git clone/read succeeds. `git push` fails for absent HTTPS credentials. GitHub connected API reports repository push permission in metadata, but actual create-branch action returns 403 `Resource not accessible by integration`. Do not assume metadata grants effective write access. No remote branch/PR/deployment created.

Live browser works, but the review browser cannot reach localhost preview (`ERR_BLOCKED_BY_CLIENT`). Local Playwright runtime has no installed Chromium; no browser-based acceptance result is claimed. Complete desktop/mobile keyboard, overflow, CTA, theme, query landing and newsletter-fallback inspection in an accessible preview before merge. Production is unchanged.

## Deferred work

Owner-access key rotation/public hosted form; private analytics and affiliate exports; hidden shortlink destinations; image provenance; complete legacy claims/product compatibility audit; consent/retention configuration; field CWV; exact product experiments and Pinterest campaign production. These are explicit bounded Sol tasks in state, not completed results.
