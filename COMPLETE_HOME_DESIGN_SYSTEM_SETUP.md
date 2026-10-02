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
- 67-page Complete Home Design System Master Guide
- 52-page Whole-Home AI Design Lab with 50 controlled prompts
- 17-sheet Complete Home Project Workbook
- 24-page Decision Gate Cards
- 11-page Flagship Bundle Map
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

When Paystack is ready, either:
1. build one master archive containing the five existing customer-pack ZIPs plus the flagship master ZIP; or
2. use a protected download page that exposes all six downloads only after purchase.

Do not place paid PDFs, workbooks, prompt libraries, customer ZIPs or offline Studios under `public/`.

## Branch stack

This branch is stacked on `product/room-procurement-system` (PR #10). Keep this PR draft and do not merge until the upstream product PR sequence is merged/retargeted and final Paystack checkout variables are ready.
