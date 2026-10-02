# Designer Brief Builder — commerce setup

The paid product files are intentionally **not stored under `public/` or committed to the public repository**. The website contains only the sales experience and public preview artwork. Paystack should deliver the customer files only after successful payment.

## Product

- Name: **Veluce Designer Brief Builder — The CLEAR Brief-to-Design System**
- Launch price: **R349**
- License: personal, non-transferable use
- Sales page: `/designer-brief-builder`
- Getting-started page: `/thank-you/designer-brief-builder`

## Customer pack

1. `Veluce_Designer_Brief_Builder_PREMIUM.pdf` — 34-page core system
2. `Veluce_AI_Brief_Architect_Lab.pdf` — 42 controlled AI prompts + preservation lock
3. `Veluce_Designer_Brief_Workbook.xlsx` — 10 editable planning sheets
4. `Veluce_Style_Decoder_Cards.pdf` — 14 pages / 12 photographic visual directions with palette cues and photo-first prompt seeds
5. `Veluce_Designer_Handoff_Pack.pdf` — 10-page printable handoff companion
6. `Veluce_Designer_Brief_Studio.html` — enhanced offline local-first Brief Atelier with CLEAR, Space, Decoder, Priorities, Budget, Rooms, Decisions, AI Lab, full 42-prompt library, Handoff, readiness tracking and JSON backup/import
7. `Veluce_AI_Prompt_Copy_Paste_Library.txt` — fast prompt reference
8. `README-FIRST.txt`
9. Optional `Veluce_Designer_Brief_Builder_CUSTOMER_PACK.zip` for convenience

## Positioning

Core promise:

> Turn scattered ideas into a brief people can use.

The product uses the **CLEAR** method:

- **C — Context**
- **L — Lifestyle**
- **E — Essentials**
- **A — Aesthetic**
- **R — Reality**

AI is a value-add throughout the product, but the workflow deliberately keeps real measurements, constraints and human decisions in control. The core AI rule is:

> Start with reality. Preserve reality. Change one variable. Compare. Decide.

## Paystack flow

Do not guess or hard-code a Product Link while the account is awaiting compliance authentication.

Once Paystack digital-product delivery is available:

1. Create Product #3 at **R349**.
2. Upload and verify the customer files above.
3. Keep **Redirect after payment** blank so Paystack retains its protected digital-download flow.
4. In the Paystack **Success message**, include:
   `https://velucedesign.com/thank-you/designer-brief-builder`
5. Copy the exact Paystack Product Link.
6. In GitHub → Settings → Secrets and variables → Actions → Variables, set:
   `VITE_DESIGNER_BRIEF_CHECKOUT_URL=<exact Paystack Product Link>`
7. Complete one end-to-end purchase/download test.
8. Confirm all files open on mobile and desktop.
9. Only merge Product #3 after Product #1 and Product #2 have been merged in sequence and this branch has been retargeted/rebased cleanly to `main`.

The sales page fails safely to **Checkout opening shortly** until the environment variable contains a valid HTTPS URL.

## Public website assets

Only public product-preview artwork should be committed:

- `designer-brief-hero.svg`
- `designer-brief-cover.svg`
- `designer-brief-workbook.svg`
- `designer-brief-ai-flow.svg`

The Product #3 sales copy and customer experience were refined from the user-supplied Grok concept direction, while the existing lightweight public preview-art approach and private paid-file delivery model are retained.

Do **not** commit the paid PDF, XLSX, offline Studio HTML, prompt library, README or ZIP to `public/`.

## Scope / safety

The product is educational design-planning and communication material. It does not replace architectural, structural, electrical, gas, fire, waterproofing, accessibility, pool-safety, engineering, contractor or regulatory advice. The customer should route specialist questions to appropriately qualified people and applicable local requirements.
