# Veluce Complete Home Design System — Product Setup

## Commercial position

Flagship price: **R999**

Standalone price ladder on this branch:

- Outdoor Lighting Blueprint — **R299**
- Luxury Outdoor Room Planner — **R349**
- Designer Brief Builder — **R349**
- Luxury Lighting Formula — **R449**
- Room Procurement System — **R449**
- Standalone total — **R1,895**

The flagship includes all five products plus the new master layer. The bundle is deliberately priced below the standalone total while preserving credible standalone pricing.

## Flagship master layer

Customer master ZIP:
- 9-page rebuilt premium Complete Home Design System Master Guide
- 36-page rebuilt premium Whole-Home AI Design Lab with 50 controlled prompts
- 17-sheet Complete Home Project Workbook
- 13-page Decision Gate Cards containing 20 stop-or-go gates
- 6-page rebuilt premium Flagship Bundle Map
- Offline Complete Home Studio
- Copy/paste Whole-Home AI Prompt Library
- README + delivery manifest

The flagship purchase must also deliver the five existing customer-pack ZIPs. Paid files remain outside the public repository.

## Public website

Sales route:
- `/complete-home-design-system`

Thank-you route:
- `/thank-you/complete-home-design-system`

Checkout environment variable:
- `VITE_COMPLETE_HOME_CHECKOUT_URL`

Until a valid HTTPS checkout URL is configured the sales page shows **Checkout opening shortly**.

## Delivery recommendation

Final flagship delivery target is **Veluce_Complete_Home_Design_System_FLAGSHIP_CUSTOMER_PACK.zip**. Once all five final standalone customer ZIPs are available together, it should contain:

1. Veluce_Outdoor_Lighting_Blueprint_PREMIUM_CUSTOMER_PACK.zip
2. Veluce_Luxury_Outdoor_Room_Planner_PREMIUM_CUSTOMER_PACK.zip
3. Veluce_Designer_Brief_Builder_CUSTOMER_PACK.zip
4. Veluce_Luxury_Lighting_Formula_CUSTOMER_PACK_FINAL.zip
5. Veluce_Room_Procurement_System_CUSTOMER_PACK_FINAL.zip
6. Veluce_Complete_Home_Design_System_MASTER_PACK.zip

The rebuilt master-layer archive **Veluce_Complete_Home_Design_System_MASTER_PACK.zip** is complete. For Paystack, deliver the single outer flagship archive where file-size limits permit. A protected download page listing the same six component ZIPs is the fallback.

Do not place paid PDFs, workbooks, prompt libraries, customer ZIPs or offline Studios under `public/`.

## Branch stack

This branch is stacked on `product/room-procurement-system` (PR #10). Keep this PR draft and do not merge until the upstream product PR sequence is merged/retargeted and final Paystack checkout variables are ready.
