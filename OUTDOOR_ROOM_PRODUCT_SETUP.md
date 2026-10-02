# Luxury Outdoor Room Planner — commerce setup

The paid product files are intentionally **not stored under `public/`**. The website contains only the sales experience and public preview imagery. Paystack should deliver the customer files only after successful payment.

## Product

- Name: Veluce Luxury Outdoor Room Planner — The 5-Layer Outdoor Room Method
- Launch price: R299
- License: personal, non-transferable use
- Sales page: `/luxury-outdoor-room-planner`
- Getting-started page: `/thank-you/luxury-outdoor-room-planner`

## Customer pack

1. `Veluce_Luxury_Outdoor_Room_Planner_PREMIUM.pdf` — 48 pages
2. `Veluce_AI_Outdoor_Room_Visualization_Lab.pdf` — 45 pages, 37 photo-first prompts
3. `Veluce_Outdoor_Room_Project_Planner.xlsx` — includes AI Iteration Lab
4. `Veluce_Outdoor_Room_Layout_Recipe_Cards.pdf` — 10 pages
5. `Veluce_Outdoor_Room_Visual_Direction_Gallery.pdf` — 10 pages, eight visual studies with planning lessons and photo-first prompt directions
6. `Veluce_Outdoor_Room_Studio.html` — enhanced offline Studio with room brief, zone allocation, furniture-load check, budget, weighted product scorecard, all 37 prompts, controlled prompt builder, local iteration log and before-you-buy checklist
7. `Veluce_Outdoor_Room_Planning_Sheets.pdf` — 8 pages
8. `README-FIRST.txt`
9. Optional all-in-one ZIP for convenience

Editable Canva owner sources have also been created for **Veluce Outdoor Room Planning Sheets** (design ID `DAHWnesYGdQ`) and **Veluce AI Outdoor Room Prompt Cards** (design ID `DAHWn710Rnk`). The customer PDFs and offline Studio have since been enhanced with the strongest material from the Grok concept build, including the 37-prompt library, visual-direction studies, five-layer judging rubric and expanded Studio tools. Keep Canva edit links as owner assets rather than exposing owner-edit access to customers.

## Paystack flow

Once Paystack digital-product uploads are enabled:

1. Create the digital product at **R299**.
2. Upload the individual customer files above. The ZIP may be added as a convenience download if the file limit allows.
3. Keep delivery address and delivery note disabled unless Paystack requires otherwise.
4. Leave **Redirect after payment** blank so the buyer remains in Paystack's protected digital-download flow.
5. In the Paystack **Success message**, include:

   `https://velucedesign.com/thank-you/luxury-outdoor-room-planner`

6. Copy the exact Paystack Product Link.
7. In GitHub → Settings → Secrets and variables → Actions → Variables, set:

   `VITE_OUTDOOR_ROOM_PLANNER_CHECKOUT_URL=<exact Paystack Product Link>`

The sales page fails safely to **Checkout opening shortly** until the variable contains an HTTPS URL.

## Test before merge / launch

Complete one end-to-end Test Mode purchase and confirm:

- checkout price is R299
- Paystack displays its protected download page
- the receipt contains the return link to that download page
- every customer file downloads and opens correctly
- the Veluce getting-started URL is visible in the success message
- the getting-started page works on mobile and desktop
- no paid customer file is accessible under a public website URL

## Public website assets

Only product-preview artwork should be committed to `public/images/`:

- `outdoor-room-planner-hero.svg`
- `outdoor-room-planner-cover.svg`
- `outdoor-room-layout-recipe.svg`
- `outdoor-room-planner-workbook.svg`

Do **not** commit the paid PDFs, XLSX, HTML Studio Tool or ZIP to `public/`.
