# VELUCE Studio — six-product Pinterest image library

This is the product-only Pinterest creative library. Editorial article images stay in `assets/pinterest/` and are published by the independent four-daily-Pin workflow.

## GitHub-owned publishing (from November 2026)

- The replacement GitHub Action is `.github/workflows/veluce-buffer-product-auto.yml`, scheduled once daily at **14:00 Africa/Johannesburg (12:00 UTC)**. GitHub Actions may delay exact start times.
- Registered, individually inspected product images are in `ops/buffer/product-assets.json`. The initial batch contains **36 distinct 1000×1500 JPEGs**, **six per product**, with visible exact product-name typography and distinct benefit-led SEO titles, description hooks, matching product-specific destinations and verified Pinterest boards.
- Each run follows the canonical order and **current saved next_product/cycle** from `ops/state.json` -> `veluce_six_product_cover_rotation_v1`. Do not restart at the first product. At migration, the next product is **Room Procurement System** (cycle 5).
- Exactly **one** new product Pin may be submitted per Johannesburg calendar day, including manual runs. Existing same-day posts, reserved uncertain Buffer submissions and reused image content are blocked. The system appends a durable ledger reservation before Buffer submission, then confirms `sent` + `sentAt` + Pinterest external link and exact one-image/title/board/destination metadata before advancing the state.
- The source image is hosted directly by the GitHub repository via `raw.githubusercontent.com`, not republished on the website. The outbound link must go to the **matching live product-specific Veluce page**.
- The publisher checks the live authenticated @steynenslin Buffer Pinterest account, real registered board IDs, working product destination and public image MIME before posting.
- The repo retains existing GitHub Actions secret `BUFFER_API_KEY` and variables `BUFFER_CHANNEL_ID` and `BUFFER_PUBLISH_ENABLED`; **never** commit the secret. Both product and editorial workflows share `veluce-buffer-pinterest` concurrency to protect the ledger.
- No paid generation, old-image reuse, video, image collage or invented replacement creatives. When a product has used all six approved images, publishing stops safely until its owner-approved catalogue is replenished. The initial batch gives up to 36 product posting days.
- `node scripts/veluce/buffer-product-auto.mjs validate` performs local validation only; `probe` creates/verifies/deletes **one private draft** in Buffer without publishing; `publish` submits at most one genuine product Pin; `reconcile` checks ambiguous prior accepted submissions. On the first merge to main, a push-triggered **probe** provides an unattended integration test. A future scheduled run performs live publication.
- Buffer does **not** support selecting a specific Pinterest section through this adapter. Board targeting is real; any section recommendation is advisory only.
- The former ChatGPT scheduled task should be disabled only after replacement code, tests, Buffer connectivity and GitHub workflow are verified. Its secondary editorial-image replenishment does not migrate automatically; the owner supplies approved editorial image batches separately.

## Uploading the next batch

Upload individual approved JPEGs to:
https://github.com/Steynzville/Blogsite/upload/main/assets/pinterest-products

Keep clear, unique filenames by exact product. Register each new file in `ops/buffer/product-assets.json` with independently verified visual content, genuine Git blob SHA, title, owner-approved image, conversion-focused copy, product link and eligible board. An image that is merely uploaded is not automatically publishable.
