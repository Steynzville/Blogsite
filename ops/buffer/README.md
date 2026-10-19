# Veluce Pinterest — automated editorial publishing through Buffer

## Current verified setup (19 October 2026)

The **GitHub Actions runner** `.github/workflows/veluce-buffer-editorial-auto.yml` automatically attempts **one organic editorial Pin** at each of the following South African local times: **06:00, 10:00, 16:00, 20:00**. These are GitHub cron schedules at 04:00, 08:00, 14:00 and 18:00 UTC; execution can be delayed by GitHub. Four per local calendar day is a hard submission limit, not a guarantee if services fail.

This replaces the unreliable ChatGPT 06:00 task, which remains **disabled**. It does not change the independent **14:00 six-product cover rotation** or other workflows.

**First independent live proof:** 19 October: [Fire-pit Pin 296815431716334391](https://www.pinterest.com/pin/296815431716334391) — Buffer status `sent`, real Pinterest external link, destination `https://velucedesign.com/article/fire-pit-tables-centerpiece/`, genuine **Garden & Patio Ideas & Finds 🔥** board ID. The GitHub-native workflow and all tests passed. Run: https://github.com/Steynzville/Blogsite/actions/runs/39204929415

**First Buffer API proof:** 18 October: [Pergola Pin 296815431716330527](https://www.pinterest.com/pin/296815431716330527) with correct article outbound link, confirmed by the owner.

### Unattended, no daily ChatGPT repository write

- `scripts/veluce/buffer-editorial-auto.mjs` chooses the next **unused curated owner-approved image** from `ops/buffer/editorial-assets.json`, preferring balance across related topics and boards.
- Current catalogue contains **29 individually visually inspected native 2:3 uploads**: 10 fire-pit, 13 pergola/covered-patio, 4 tree-uplighting and 2 garden-pathway creatives. Unique SEO titles and descriptions and actual visual annotations are stored for each. A past batch-label swap was corrected on 19 October; ALL incoming images must be individually visually reviewed rather than classified by upload batch. Unreviewed images are **excluded**.
- File bytes are served directly from `https://raw.githubusercontent.com/Steynzville/Blogsite/main/assets/pinterest/<filename>`. **An image need never appear on the website or in a website article.** The separate outbound destination must be a verified, matching published Veluce article.
- Registered topic-to-board mapping: **pergola lighting, tree uplighting and pathway lighting → Outdoor Lighting Ideas**, and **fire-pit tables → Garden & Patio Ideas & Finds 🔥**. Actual board ID is looked up in `ops/buffer/boards.json` and checked against Buffer's authenticated Pinterest account on every submission.
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


## Visual audit and quality-control correction — 19 October

All 29 curated GitHub originals were inspected as images, rather than inferred from their filenames or upload batches. The first ten items initially marked “pergola” actually showed fire pits; the next ten initially marked “fire pit” showed pergolas/covered patios. Nine more vertical garden and patio images were individually reviewed and added; ten landscape (3:2 or 16:9) article images were excluded instead of stretched/cropped.

Mandatory `visually_verified: true` is enforced inside the publisher's asset selector and the catalogue includes per-photo factual descriptions, review dates and suitable live article topics; the tests explicitly lock these mappings to prevent regressions.

**Known historic publication mismatches:** [18 Oct original test](https://www.pinterest.com/pin/296815431716330527) shows a *fire pit* but was published with a pergola title/link/board. It is flagged in the ledger as needing a direct native Pinterest metadata edit (Buffer cannot repair a delivered Pinterest Pin). [19 Oct Evening Escape](https://www.pinterest.com/pin/296815431716334391) shows a *covered patio/pool*, not a fire pit; its title, destination and board were corrected in Pinterest by the owner and recorded as owner-reported, not independently re-read. Preserve original Buffer submission metadata as historical evidence and do not re-post either source image.

**Audit proof:** [GitHub validation](https://github.com/Steynzville/Blogsite/actions/runs/39233197339) passed 24 tests, zero failures. The revised runner's first reviewed-image publication [Fire Pit Pin](https://www.pinterest.com/pin/296815431716335304) was successfully sent via Buffer with matching fire-pit article and Garden & Patio board, [run evidence](https://github.com/Steynzville/Blogsite/actions/runs/39233309754). 26 approved images remain unused after three known publications as of this audit.

`EDITORIAL_PUBLISH_ENABLED=true` is the dedicated editorial gate; it was enabled after a successful validation run. The product rotation's separate settings and time remain unchanged.



## Work-powered automatic editorial image replenishment (19 October 2026)

The **14:00 SAST six-product Work task** has a new, strictly secondary refill instruction. It first completes and verifies the day's ONE product Pin, using its already-proven ChatGPT Work original 2:3 image generation, binary upload to GitHub and Buffer publishing. Its primary product rotation and separate `assets/pinterest-products/` remain intact.

Only *after* the product is safely completed does it count unused visually reviewed editorial images in `ops/buffer/editorial-assets.json`, excluding submitted/used images by URL or Git blob SHA. If more than 8 remain, no new editorial images are generated. At 8 or fewer, it attempts to create and upload up to 4 original 2:3 editorial images per day to `assets/pinterest/`, inspecting image subject before assignment to one of four live matched article+board topics (fire pit, pergola, tree uplighting, pathway lighting). It registers each image individually as `visually_verified:true`, `origin:"work-generated"`, with factual image description, unique SEO title/description, actual image URL and review date. A successful image upload and repository commit are prerequisites for becoming eligible.

The GitHub Actions editorial publisher **always prefers** verified `origin:"owner-upload"` entries until exhausted, then automatically chooses verified `origin:"work-generated"` images from the same catalogue. Thus the fresh Work images are generated ahead of stockout but not published before user-provided assets. The product Work task must NEVER directly publish editorial Pins or adjust the four-daily editorial scheduling.

**Validation:** https://github.com/Steynzville/Blogsite/actions/runs/39269004624 — 26 tests passed, 0 failed, including owner-first image priority. **Caveat:** Work's new conditional second-stage generation/upload has not yet executed, since 26 approved existing editorial assets remained at validation. Image generation capacity and GitHub permissions in future scheduled Work runs can vary; report a real blocker rather than spend money or claim a generated image was uploaded. The GitHub publisher itself has no native image-generation model.
