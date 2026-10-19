# Veluce Pinterest — automated editorial publishing through Buffer

## Current verified setup (19 October 2026)

The **GitHub Actions runner** `.github/workflows/veluce-buffer-editorial-auto.yml` automatically attempts **one organic editorial Pin** at each of the following South African local times: **06:00, 10:00, 16:00, 20:00**. These are GitHub cron schedules at 04:00, 08:00, 14:00 and 18:00 UTC; execution can be delayed by GitHub. Four per local calendar day is a hard submission limit, not a guarantee if services fail.

This replaces the unreliable ChatGPT 06:00 task, which remains **disabled**. It does not change the independent **14:00 six-product cover rotation** or other workflows.

**First independent live proof:** 19 October: [Fire-pit Pin 296815431716334391](https://www.pinterest.com/pin/296815431716334391) — Buffer status `sent`, real Pinterest external link, destination `https://velucedesign.com/article/fire-pit-tables-centerpiece/`, genuine **Garden & Patio Ideas & Finds 🔥** board ID. The GitHub-native workflow and all tests passed. Run: https://github.com/Steynzville/Blogsite/actions/runs/39204929415

**First Buffer API proof:** 18 October: [Pergola Pin 296815431716330527](https://www.pinterest.com/pin/296815431716330527) with correct article outbound link, confirmed by the owner.

### Unattended, no daily ChatGPT repository write

- `scripts/veluce/buffer-editorial-auto.mjs` chooses the next **unused curated owner-approved image** from `ops/buffer/editorial-assets.json`, preferring balance across related topics and boards.
- Current catalogue contains 20 validated native vertical 2:3 uploads (10 pergola and 10 fire-pit), including the 18 October test source. Unique titles and descriptions are assigned per creative. Other unknown topic assets are **not** published with guessed labels.
- File bytes are served directly from `https://raw.githubusercontent.com/Steynzville/Blogsite/main/assets/pinterest/<filename>`. **An image need never appear on the website or in a website article.** The separate outbound destination must be a verified, matching published Veluce article.
- Registered topic-to-board mapping: **pergola lighting → Outdoor Lighting Ideas** and **fire-pit tables → Garden & Patio Ideas & Finds 🔥**. Actual board ID is looked up in `ops/buffer/boards.json` and checked against Buffer's authenticated Pinterest account on every submission.
- Real file signature, dimensions, image URL MIME, article URL and Buffer metadata are verified. A content SHA prevents reposting the same file under another name.
- The runner commits a durable `reserved` entry to `ops/buffer/ledger.json` **before** contacting Buffer. This is fail-closed: a crash cannot silently retry/reuse an image. It records the Buffer post ID, confirms `sent` plus `sentAt` and `externalLink`, checks destination/board/title and appends the result to `ops/state.json`. Ambiguous posts need reconciliation and are not blindly reposted.
- The Buffer API key stays in the GitHub Actions secret `BUFFER_API_KEY`. Channel ID is in `BUFFER_CHANNEL_ID`. The publishing variable `BUFFER_PUBLISH_ENABLED=true` must stay enabled for automatic posting. Never put credentials in source code or chat.

### What happens when supplied images run out?

**No automatic image-generation API is configured in the free GitHub Actions runner.** When all approved, curated, unused assets are depleted, the runner logs a warning and stops rather than reusing images or fabricating new AI pictures. This keeps spending at zero. It does **not** currently fulfil unattended *new AI creative generation* after depletion; a separately verified image-generation/replenishment capability is still required.

New approved uploads may be added to `assets/pinterest/`. To be used safely, each new item also needs a matching visually confirmed topic, distinct SEO title/description and correct article/board mapping in `ops/buffer/editorial-assets.json`. Arbitrary opaque filenames cannot prove a pictured topic. Do not mark the catalogue replenished merely by uploading unknown images.

### Testing

- Safe non-publishing validation: [GitHub Actions → Veluce Four Editorial Pins - GitHub Auto](https://github.com/Steynzville/Blogsite/actions/workflows/veluce-buffer-editorial-auto.yml), **Run workflow → validate**.
- `node --test tests/buffer-editorial-auto.test.mjs tests/buffer-pinterest.test.mjs`
- `node scripts/veluce/buffer-editorial-auto.mjs validate`
- `workflow_dispatch` mode `publish` submits only one approved unique image and counts toward the daily four; do not use as an extra unscheduled batch.

### Related legacy publisher

`.github/workflows/veluce-buffer-pinterest.yml` remains available for one-at-a-time manual operations and for the independent six-product workflow. Both workflows use the same repository-wide concurrency group to avoid competing Buffer ledger writes. The independent 14:00 product rotation remains unchanged.

No Tailwind credits, ads, paid AI/image APIs, subscriptions or new hosting are required for this asset-first schedule.
