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


## Grok-enhanced refinement

The user's Grok concept build was reviewed selectively rather than imported wholesale.

Verification showed:

- the flagship guide, AI Lab, workbook, prompt library and offline Atelier were **byte-for-byte identical** to the existing Product #5 files
- the Buying Reality Cards, Delivery/Receiving pack and Returns/Claims pack had different PDF file hashes, but render comparison showed **zero changed pages** and identical extracted text, so those differences were PDF encoding/compression only
- the meaningful Grok contribution was the **photographic collector's-edition presentation** and sharper editorial framing

The refined Product #5 experience now incorporates those strengths:

- photographic living-room cover for the 94-page flagship guide
- photographic opening inside the offline Procurement Atelier
- photographic public sales hero
- stronger editorial principles:
  - **A blank is not neutral**
  - **Price is a field; cost is the whole consequence**
  - **Ordered is not finished**
- the customer ZIP retains the complete existing method and tools

The Grok public chapter-by-chapter application and its Vercel/auth/database scaffolding were intentionally **not** adopted. Publishing the method, cards, prompts and claims content as public routes would expose too much of the paid product and add unnecessary hosting/account complexity. Paystack-protected delivery and the local-first offline Atelier remain the intended architecture.


## Final PDF visual rebuild

After reviewing the customer PDFs directly, the repeated generic vector/filler illustration treatment was removed from the paid PDF set.

The final customer files preserve the **full original substance and page counts**:

- Room Procurement System — **94 pages**
- AI Procurement Lab — **70 pages**
- Buying Reality Cards — **25 pages**
- Delivery, Receiving & Install Pack — **21 pages**
- Returns & Claims Field Pack — **15 pages**

The revised art direction uses the Grok concept pass selectively:

- editorial photography only on covers and selected section openers
- no repeated decorative image on every page
- functional SOURCE diagrams for Specify / Options / Understand / Reality-check / Commit / Execute
- option-comparison grids, landed-cost stacks, approval gates and execution timelines
- category-specific checkbox layouts in the Buying Reality Cards
- field-record layouts for delivery/receiving pages
- structured claim records and claim-message anatomy
- AI prompt pages designed around the actual prompt, input discipline and output verification

The paid files remain outside the public repository. Only the public sales/preview experience belongs in GitHub.
