# Luxury Lighting Formula — commerce setup

The paid product files are intentionally **not stored under `public/` or committed to the public repository**. The website contains only the sales experience and public preview artwork. Paystack should deliver the customer files only after successful payment.

## Product

- Name: **The Veluce Luxury Lighting Formula — The Seven Signals of Expensive-Looking Light**
- Launch price: **R449**
- License: personal, non-transferable use
- Sales page: `/luxury-lighting-formula`
- Getting-started page: `/thank-you/luxury-lighting-formula`

## Customer pack

1. `Veluce_Luxury_Lighting_Formula_PREMIUM.pdf` — 77 pages
2. `Veluce_AI_Luxury_Lighting_Lab.pdf` — 30 pages / all 53 controlled photo-first prompts
3. `Veluce_Luxury_Lighting_Audit_Workbook.xlsx` — 13 editable sheets
4. `Veluce_Luxury_Lighting_Recipe_Cards.pdf` — 13 pages / all 20 interior + exterior recipes
5. `Veluce_Lighting_Diagnostic_Gallery.pdf` — 12 pages / all 18 common lighting mistakes
6. `Veluce_Night_Audit_Field_Cards.pdf` — 8 pages / all 10 after-dark checks
7. `Veluce_Luxury_Lighting_Atelier.html` — offline local-first workspace with Seven Signals scoring, scenes, AI prompt library, shopping brief, handoff, local saving and JSON backup/import
8. `Veluce_AI_Lighting_Prompt_Library.txt` — copy/paste prompt reference
9. `README-FIRST.txt`
10. Optional all-in-one customer ZIP

The five premium PDFs total **140 pages**.

## Positioning

Core promise:

> Make your home feel more expensive after dark — without filling it with more lights.

Core rule:

> Luxury light is not more light. It is more intention.

The Seven Signals are:

1. Hierarchy
2. Layers
3. Direction
4. Warmth
5. Shadow
6. Concealment
7. Scenes

Product #4 is intentionally distinct from Product #1. The Outdoor Lighting Blueprint focuses on outdoor planning, placement, specification and buying. The Luxury Lighting Formula is a visual/aesthetic diagnostic system spanning interior and exterior lighting.

## AI value layer

The AI Lab includes a master architecture-preservation lock and 53 prompts covering:

- audit and diagnosis
- hierarchy and layering
- direction and shadow
- warmth and material rendering
- concealment and glare
- scene generation
- exterior restraint
- critique, reality checks and handoff

Rule: **Photo → Preserve → Change one variable → Compare → Measure.**

## Price

Launch at **R449**.

This is intentionally a premium-tier product: 140 tightly edited PDF pages, a 13-sheet workbook, the complete 53-prompt AI Lab and an offline Atelier. It remains accessible relative to professional design services while clearly differentiated from smaller downloadable lighting guides.

## Paystack flow

Checkout reads:

`VITE_LUXURY_LIGHTING_FORMULA_CHECKOUT_URL`

Do not invent or hard-code a Product Link while Paystack compliance authentication is pending.

After Paystack enables the product flow:

1. Create Product #4 at **R449**.
2. Upload and verify all customer files.
3. Keep **Redirect after payment** blank so Paystack retains protected digital-download delivery.
4. Include the onboarding URL in the success message:
   `https://velucedesign.com/thank-you/luxury-lighting-formula`
5. Set the exact Product Link in GitHub Actions variable:
   `VITE_LUXURY_LIGHTING_FORMULA_CHECKOUT_URL`
6. Complete an end-to-end purchase/download test on mobile and desktop.
7. Retarget/rebase this PR to `main` only after Products #1, #2 and #3 have merged in sequence.
8. Confirm quality gates and desktop/mobile visual review before final merge.

## Public website assets

Only these previews belong under `public/images/`:

- `luxury-lighting-formula-hero.svg`
- `luxury-lighting-formula-cover.svg`
- `luxury-lighting-seven-signals.svg`
- `luxury-lighting-ai-flow.svg`

Do **not** publish the paid PDFs, XLSX, Atelier HTML, prompt library or ZIP under `public/`.

## Research basis

The editorial system is original Veluce material. General lighting principles were cross-checked against current sources including Lutron layered-lighting guidance and 2026 trend research, DarkSky outdoor luminaire guidance, Illuminating Engineering Society material on layered lighting, and Signify premium ambience references. The customer guide contains source URLs and keeps project-specific engineering/compliance decisions outside scope.

## Scope / safety

This is educational lighting-design and planning material. It does not replace electrical, engineering, code, emergency-lighting, fire, wet-area, accessibility, conservation or specialist control advice. Customers should use qualified professionals and applicable local requirements for installation and specialist decisions.

**Do not merge yet.**


## Final customer presentation

The final customer pack uses a premium editorial visual direction with category-appropriate interior evening imagery and functional working pages:

- the flagship premium guide has a photographic night-study cover instead of the earlier abstract cover treatment
- the offline Lighting Atelier opens with the same photographic night-study atmosphere
- the Atelier foregrounds three concise design truths:
  - **Luxury requires darkness**
  - **Look at the room, not the bulbs**
  - **Build more than one emotional setting**
- the public sales copy now reinforces those same principles


## Final PDF visual rebuild

After direct review of the paid Product #4 PDFs, the repeated generic placeholder-style lighting illustration was removed from the interior pages.

The final customer files preserve the **full original text and page counts**:

- Luxury Lighting Formula — **77 pages**
- AI Luxury Lighting Lab — **59 pages**
- Lighting Diagnostic Gallery — **20 pages**
- Luxury Lighting Recipe Cards — **22 pages**
- Night Audit Field Cards — **12 pages**

The revised visual system is lighting-specific and functional:

- Seven Signals visual framework
- hierarchy, layers, direction, warmth, shadow, concealment and scene diagrams
- 1–5 diagnostic scales for the Seven Signals
- before/after schematics for common lighting mistakes
- room- and exterior-specific layer maps
- material-under-light studies
- fixture beam/effect diagrams
- photo-first AI workflow diagrams
- controlled-test visuals in the Night Audit Field Cards

The repeated dark placeholder panel is no longer used as decorative filler.

The paid files remain outside the public repository. Only public sales/preview assets belong in GitHub.
