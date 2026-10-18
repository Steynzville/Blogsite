# VELUCE: Buffer Pinterest replacement (free, gated)

**Status (18 October 2026): first real Buffer Pinterest Pin successfully published and reconciled.** Buffer returned status `sent`, pin https://www.pinterest.com/pin/296815431716330527 with matching article destination. An autonomous 06:00 SAST ChatGPT editorial publishing task is scheduled, using Buffer instead of Tailwind, with approved GitHub asset fallback. No paid subscriptions added; image generation/upload on future scheduled runs remains dependent on the capabilities actually available at runtime.

## Why Buffer
Buffer Free permits up to 10 **queued posts at a time per channel** (slots recycle), and includes API access. Unlike a shared browser, this uses Buffer's Pinterest connection. Docs: https://developers.buffer.com.

**Critical launch gate:** Buffer's public developer feedback has reported that Pinterest \`metadata.pinterest.url\` may be dropped. We **never** accept a linkless Pin. The adapter creates a *draft*, checks returned destination, title, board and image, schedules only if correct, re-reads, and deletes if validation fails. First live publication must also be inspected on Pinterest before considering unattended publishing. The draft/create/edit validation cannot guarantee Pinterest will preserve the link after delivery.


## Verified integration evidence — 18 October 2026

- GitHub Actions secret `BUFFER_API_KEY` exists; the API authenticated successfully (secret value never disclosed).
- Variable `BUFFER_CHANNEL_ID` configured for the live Pinterest channel; `BUFFER_PUBLISH_ENABLED=false` remains in force.
- `ops/buffer/boards.json` contains the 13 Buffer-discovered Pinterest boards and their genuine IDs.
- Read-only discovery succeeded: https://github.com/Steynzville/Blogsite/actions/runs/39147114314
- Temporary Pinterest Buffer draft probe succeeded: https://github.com/Steynzville/Blogsite/actions/runs/39147511688
- Probe confirmed exact title, description, image MIME type, Pinterest board and article click-through URL. The draft was **deleted**; no Pin was scheduled or published.
- **First successful live publication:** Buffer post `6ad50c9ca48c8f8371ac47ec`, Pinterest Pin `296815431716330527` (sent 2026-10-18T18:14:53Z), article metadata link matched. Publishing workflow run https://github.com/Steynzville/Blogsite/actions/runs/39153241596 . Direct Pinterest Visit site not separately tested; no browser bypass. Future runs may use freshly generated image bytes pushed to `assets/pinterest/` or unused approved assets there. No website image dependency. Separate ChatGPT task is scheduled daily at 06:00 SAST; its runtime must actually support image generation and GitHub transfer to produce a new creative.

## Android setup (only owner actions needed)
1. Create/sign in to **Buffer Free**: https://buffer.com/ . Do **not** upgrade.
2. Under Channels, connect Pinterest @steynenslin: https://account.buffer.com/channels . Ensure access to the correct boards.
3. Verify Buffer email; Settings → API → Personal Access → New Key: https://publish.buffer.com/settings/api . Use posts read/write and channel read permissions, ideally 1-year lifetime with renewal reminder.
4. **Never paste the key in chat or the repository**. On GitHub open **Steynzville/Blogsite → Settings → Secrets and variables → Actions → New repository secret**, name \`BUFFER_API_KEY\`. 
5. After installing the secret, run **Actions → Veluce Buffer Pinterest (gated) → Run workflow → discover**. Inspect that the username is @steynenslin and copy \`channel_id\` to **Actions variables** \`BUFFER_CHANNEL_ID\`; copy intended board \`id\` into each queue item.
6. Keep \`BUFFER_PUBLISH_ENABLED\` **unset** until a dry-run and first link validation are ready. To approve the *one-Pin test only*, set \`BUFFER_PUBLISH_ENABLED=true\`, add one unique fully prepared Pin to queue, and manually run **publish**.
7. Inspect queued Buffer item and (once sent) inspect the real Pinterest Pin on mobile: correct original 2:3 image, title, board, destination article link, AI disclosure as needed. If the destination is blank or wrong, **disable** publishing and escalate; do not silently retry.

## Preparing original article Pins
The AI creative agent still creates original 2:3 imagery and metadata; Buffer is only the **publisher**. Upload the reviewed image to this repo at \`public/pins/<original-id>.jpg\` (becomes \`https://velucedesign.com/pins/<original-id>.jpg\` after a successful website deploy). Add the matching entry in \`ops/buffer/queue.json\` with:
\`creative_id\` (unique), \`title\`, \`description\` (max 500 chars), \`image_url\` (direct public HTTPS image), \`destination_url\` (actual Veluce article), \`board_service_id\` (from Buffer discovery), \`publish_at\` (future ISO 8601 with timezone), \`status: "ready"\`. Original image should be clear and atmospheric with **no text overlays**, as owner requested. Avoid near-duplicate creatives and review existing campaigns in \`ops/state.json\`; do not repost Amazon affiliate links.

A separate \`ops/buffer/ledger.json\` records each verified scheduled Buffer ID, with status \`scheduled_verified\` (NOT proof Pinterest published). One Pin scheduled per run. Queue records with matching \`creative_id\` in ledger are skipped, preventing routine retries; if the workflow is interrupted between Buffer accepting the post and writing the ledger, check Buffer before re-running to avoid duplicates.

## Test and invoke
\`node --test tests/buffer-pinterest.test.mjs\`
\`node scripts/veluce/buffer-pinterest.mjs validate\` (offline; no network)
\`BUFFER_API_KEY=... node scripts/veluce/buffer-pinterest.mjs discover\` (read only)
\`BUFFER_PUBLISH_ENABLED=true BUFFER_CHANNEL_ID=... BUFFER_API_KEY=... node scripts/veluce/buffer-pinterest.mjs publish\` (creates a draft and schedules only after checks).

**A ChatGPT scheduled task is now configured daily at 06:00 Africa/Johannesburg to invoke Buffer through GitHub.** Buffer's post-status and destination have been checked against the first live Pinterest link; direct Pinterest Visit site browsing was not performed. Do not deactivate existing routines until timing and deduplication are reconciled, or double posting can occur. Repository CI is for tests; it is not a continuing AI-image generator. There are no new paid AI/image generation or hosting subscriptions in this implementation.
