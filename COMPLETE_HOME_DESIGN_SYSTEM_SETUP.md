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
- 9-page Complete Home Design System Master Guide
- 36-page Whole-Home AI Design Lab with all 50 controlled prompts
- 17-sheet Complete Home Project Workbook
- 13-page Decision Gate Cards containing 20 stop-or-go gates
- 6-page Flagship Bundle Map
- Offline Complete Home Studio
- Copy/paste Whole-Home AI Prompt Library
- README

The flagship purchase must also deliver the five existing customer-pack ZIPs. Paid files remain outside the public repository.

## Public website

Sales route:
- `/complete-home-design-system`

Thank-you route:
- `/thank-you/complete-home-design-system`

Checkout environment variable:
- `VITE_COMPLETE_HOME_CHECKOUT_URL`

Until a valid HTTPS checkout URL is configured the sales page shows **Coming soon**.

## Delivery recommendation

The flagship is the **bundle SKU**, not a sixth standalone product. Configure the R999 flagship purchase to deliver these six downloadable files:

1. Veluce_Outdoor_Lighting_Blueprint_CUSTOMER_PACK.zip
2. Veluce_Luxury_Outdoor_Room_Planner_CUSTOMER_PACK.zip
3. Veluce_Designer_Brief_Builder_CUSTOMER_PACK.zip
4. Veluce_Luxury_Lighting_Formula_CUSTOMER_PACK.zip
5. Veluce_Room_Procurement_System_CUSTOMER_PACK.zip
6. Veluce_Complete_Home_Design_System_MASTER_PACK.zip

**Veluce_Complete_Home_Design_System_MASTER_PACK.zip** is the bundle-only integration layer. It is included with the flagship purchase and is not sold separately. Attach all six files directly to the flagship product where the payment platform allows it.

Do not place paid PDFs, workbooks, prompt libraries, customer ZIPs or offline Studios under `public/`.

## Branch stack

This branch is stacked on `product/room-procurement-system` (PR #10). Keep this PR draft and do not merge until the upstream product PR sequence is merged/retargeted and final Paystack checkout variables are ready.
