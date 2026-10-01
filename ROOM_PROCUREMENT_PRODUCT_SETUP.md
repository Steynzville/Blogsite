# Room Procurement System — commerce setup

The paid product files are intentionally **not stored under `public/` or committed to the public repository**. Paystack should deliver customer files only after successful payment.

## Product

- Name: **The Veluce Room Procurement System — The SOURCE Method**
- Launch price: **R349**
- License: personal, non-transferable use
- Sales page: `/room-procurement-system`
- Getting-started page: `/thank-you/room-procurement-system`

## SOURCE Method

1. **S — Specify**
2. **O — Options**
3. **U — Understand**
4. **R — Reality-check**
5. **C — Commit**
6. **E — Execute**

Core rule: **Evidence beats memory. Specify before search. Verify before buy.**

## Customer pack

1. `Veluce_Room_Procurement_System_PREMIUM.pdf` — 94 pages
2. `Veluce_AI_Procurement_Lab.pdf` — 70 pages / 64 controlled AI prompts
3. `Veluce_Room_Procurement_Workbook.xlsx` — 17 editable sheets
4. `Veluce_Buying_Reality_Cards.pdf` — 25 pages / 24 product categories
5. `Veluce_Delivery_Receiving_Install_Pack.pdf` — 21 pages
6. `Veluce_Returns_Claims_Field_Pack.pdf` — 15 pages
7. `Veluce_Procurement_Atelier.html` — offline local-first workspace with room brief, comparison, cost/timing, reality checks, order record, AI prompt library, decision memo, handoff, local saving and JSON backup/import
8. `Veluce_AI_Procurement_Prompt_Library.txt`
9. `README-FIRST.txt`
10. Optional all-in-one customer ZIP

The five PDFs total **225 pages**.

## Distinction from Product #3

The Designer Brief Builder answers **what should this project become and how do I communicate it?**

The Room Procurement System answers **how do I turn that direction into verified products, orders and accepted deliveries?**

## AI value layer

The AI Lab includes a master no-invention instruction and 64 prompts covering:

- specification
- product-listing decoding
- quote extraction
- option comparison
- dimension and access checks using user-supplied measurements
- finish/material questions
- landed-cost structure
- lead-time risk
- supplier questions
- purchase checks
- order tracking
- receiving inspection
- damage/return/claim evidence
- decision coaching and cart red-team

AI never replaces supplier evidence, site measurement or specialist installation advice.

## Paystack

Checkout reads:

`VITE_ROOM_PROCUREMENT_CHECKOUT_URL`

While Paystack compliance authentication is pending, do not invent or hard-code a link.

After Paystack is ready:

1. Create Product #5 at **R349**.
2. Upload and verify all customer files.
3. Keep **Redirect after payment** blank so Paystack retains protected digital delivery.
4. Include:
   `https://velucedesign.com/thank-you/room-procurement-system`
   in the success message.
5. Set repository variable:
   `VITE_ROOM_PROCUREMENT_CHECKOUT_URL=<exact Paystack Product Link>`
6. Complete end-to-end purchase/download testing on mobile and desktop.
7. Retarget/rebase this PR to `main` only after Products #1–#4 are merged in sequence.
8. Confirm quality gates and visual review before final merge.

## Public assets only

- `room-procurement-hero.svg`
- `room-procurement-cover.svg`
- `room-procurement-source.svg`
- `room-procurement-workbook.svg`

Never put the paid PDFs, XLSX, Atelier, prompt library or ZIP under `public/`.

## Scope

Consumer procurement planning and record-keeping only. Not structural, electrical, plumbing, gas, waterproofing, code, fire, accessibility, specialist-installation or legal advice.

**Do not merge yet.**
