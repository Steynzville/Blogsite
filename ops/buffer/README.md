# VELUCE: Buffer Pinterest replacement (free, gated)

**Status: code prepared, NOT connected, NOT automatically publishing.** The current Pinterest/Tailwind routines are untouched. No new paid services. API credentials and the first real test are required before enabling.

## Why Buffer
Buffer Free permits up to 10 **queued posts at a time per channel** (slots recycle), and includes API access. Unlike a shared browser, this uses Buffer's Pinterest connection. Docs: https://developers.buffer.com.

**Critical launch gate:** Buffer's public developer feedback has reported that Pinterest \`metadata.pinterest.url\` may be dropped. We **never** accept a linkless Pin. The adapter creates a *draft*, checks returned destination, title, board and image, schedules only if correct, re-reads, and deletes if validation fails. First live publication must also be inspected on Pinterest before considering unattended publishing. The draft/create/edit validation cannot guarantee Pinterest will preserve the link after delivery.

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

**Do not turn on a recurring GitHub schedule yet.** Confirm one successful end-to-end Pinterest click-through first. Do not deactivate existing routines until timing and deduplication are reconciled, or double posting can occur. Repository CI is for tests; it is not a continuing AI-image generator. There are no new paid AI/image generation or hosting subscriptions in this implementation.
