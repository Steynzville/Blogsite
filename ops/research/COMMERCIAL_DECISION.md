# Commercial decision — 28 September 2026

## Decision and uncertainty

Keep Veluce's existing affiliate editorial site; improve measurement and conversion paths before expanding production. Preserve an option for a small South African local-fulfilment hybrid. Do not launch dropshipping or pay for a storefront yet. This is a risk-adjusted decision under missing data, not a claim that affiliate commissions beat direct commerce at all scales.

No authorised dashboard data, exact supplier quotations, actual return rates or verified SKU shipping quotes were available. A current merchant programme listing is not Steyn's programme approval; vendor conversion testimonials are not independent uplift evidence. South African residence does not establish that Veluce's audience is predominantly South African. Segment actual geography before narrowing acquisition.

## Architecture and platforms

| Option | Current evidence | Decision |
|---|---|---|
| Existing React/Vite/GitHub Pages | Working editorial site, Markdown pipeline, 26 source articles, seven categories, existing URLs and tracking | Retain. No incremental platform subscription for foundation. Existing domain/other recurring costs remain real costs. |
| PagePilot.ai | Official pricing: US$39 Lite/10 pages monthly; $59 Starter/unlimited pages; $99 Scaler. Shopify publishing requires paid plan; trial can generate without a card. Published pages remain after cancellation but Shopify-customizer editing stops. | Optional benchmark only. No independently measured uplift for Veluce, so no business case for added recurring cost. |
| ShopEazy (shopeazy.co) | Pricing page lists R199/R499/R1299 monthly and 3.5%/2.8%/2.1% platform fees, gateway additional. BYO courier/payment, Yoco/iKhokha/Peach; 7-day no-card trial. | Potential small local catalogue option, not selected. Confirm legal operator, export/API, fulfilment integration, uptime/support, tax-inclusive fees and exact limits. |
| Shopify ZA | Basic $25 monthly or $19/month annual billing; 2% third-party gateway fee. SA absent from supported Shopify Payments list inspected. | Possible future checkout engine, not a justified migration today. Include gateway, FX, apps, tax and support costs. Ignore promotional introductory prices for steady-state economics. |
| WooCommerce | Free core software; hosting, maintenance, extensions and gateway operations remain costs. | Credible future shop subdomain alternative if operational capacity supports it. Existing static hosting cannot execute WordPress/PHP. “Free core” is not zero-cost commerce. |
| Local supplier referrals | Could avoid retailer fulfilment liability while improving geographic fit. No approved partner terms obtained. | Research specific merchants after traffic evidence. New partnership contracts/lead sharing require approval. |
| Digital planning resources | No physical shipping but creation, expertise, refunds, payment and support still cost money/time. No proven demand. | Candidate experiment only, not established superior model. |

ShopEazy inconsistencies observed: homepage lists Starter 30/Growth 150 products and custom-domain add-ons; pricing page lists 15/50 and denies Starter custom domain. Do not promise `shop.velucedesign.com` on Starter. No verified PagePilot-to-ShopEazy import/API was found. ShopEazy is a storefront; its courier compatibility is not a supplier or fulfilment guarantee.

PagePilot's older help page says 50 Lite pages; current pricing page says 10. Prefer current pricing, recheck checkout before any approval request. Current output destinations are Shopify; public documentation did not establish arbitrary HTML export, authorised external reuse or an official ecommerce MCP. A similarly named MCP found on Glama describes Facebook Fanpage management and is unrelated to the Shopify page builder. Another same-name package concerns browser guidance. Do not confuse naming with integration. Absence of verified docs is not proof that private/enterprise APIs cannot exist.

Apply generic conversion principles natively: clear positioning, actual features, suitability, useful imagery, objections, retailer CTA and disclosure. Do not copy proprietary page templates, scrape image assets or assume AI rewriting creates usage rights. PagePilot's own material distinguishes page generation from supplier order fulfilment. A trial is not needed to establish the current no-spend decision.

## Economics: same traffic, full cost

Run `pnpm ops:economics`; inputs in `ops/economics-scenarios.json` are explicitly illustrative, NOT forecasts or quotes. All three use 1,000 qualified visits, affiliate 20% outbound × 2% merchant conversion × 80% approval × R40 approved commission = R128 affiliate revenue. R400 content/operator cost leaves −R272 contribution. None of these rates are observed Veluce performance.

| Illustrative case | Direct conversion | Contribution/order | Contribution after fixed/content/operator costs |
|---|---:|---:|---:|
| Local fulfilment base | 1.0% | R199.33 | R1,094.32 |
| Local low-volume/returns downside | 0.3% | R154.33 | −R436.00 |
| International shipping stress | 0.5% | −R20.67 | −R1,002.34 |

At R799 receipts, the local base deducts R350 goods, R90 delivery, R10 packaging, R59.67 combined processing/platform assumptions, R40 refunds, R10 chargebacks, R15 failures and R25 support. Monthly R499 fixed and R400 content/operator costs follow. Four base-case orders beat the modelled affiliate revenue after incremental fixed costs; five cover all modelled costs. This is a decision threshold, not predicted demand. An extra R100 CAC removes R100 per-order contribution. One disputed order can materially change small-sample results.

The international stress case adds freight, duty, import VAT, clearance, FX and larger service/refund losses; even a seemingly attractive supplier markup can yield a loss. Shipping prices depend on exact product, weight, postcode, service, origin, tariff and importer arrangement. No universal AliExpress SA delivery time or blanket duty rate is defensible. Final profit requires tax and complete overhead inputs; zero income-tax reserve in examples is not a tax conclusion. Working capital must cover pre-payout supplier bills and refund obligations.

## Fulfilment and payments

- **Local supplier dropship:** preferred hypothesis for a future pilot. Require actual stock, dispatch/tracking evidence, reverse logistics, defects/credit policy and SLA. Dropstore was investigated, but current public help yielded limited material/login navigation and did not verify usable pricing or SKU service levels. Not approved as a supplier.
- **AliExpress + DSers:** DSers has a Basic free software option and order-management tools. It does not make goods, international freight, refunds or storefront operation free. SKU/postcode quotes and programme rules remain gates; do not stack self-affiliate commission onto a dropship purchase assumption.
- **CJdropshipping/3PL:** global fulfilment marketing does not prove South African local stock or service. Treat as quote-required, not a validated local solution.
- **Bob Go/courier aggregation:** official pricing separates subscription and shipping charges. Obtain basket/remote-area/return quotes. A courier integration moves parcels, not supplier risk or inventory ownership.
- **Payfast:** card baseline 3.2% + R2 excluding VAT; standard payout R8.70 ex VAT and refunds R2 ex VAT. Compare gateway compatibility and batching, payout delays, chargebacks and reserves. This is an alternative gateway cost reference, not a confirmed ShopEazy integration.
- **ShopEazy gateway choices:** Yoco, iKhokha and Peach need their own approved merchant accounts and current online-payment quotations; do not substitute a card-machine rate. No payment account was opened.

## South African launch checklist

ECTA sections 43–46 address seller information, electronic transaction review/correction, cooling-off (with statutory exceptions) and fulfilment. The seven-day goods cooling-off period generally runs from receipt, and refunds under that provision have a 30-day deadline. CPA defective-goods remedies can apply within six months; supplier warranties cannot simply displace them. Establish operator identity/contact details, total price, delivery and return terms before checkout.

POPIA requires lawful, limited, secure personal-data processing; direct electronic marketing has consent/existing-customer rules and opt-out requirements. Do not export customer lists to public Git or add pixels without reviewing actual geography and privacy basis.

SARS current registration guidance says compulsory VAT threshold R2.3m in any consecutive 12 months from 1 April 2026. Older import FAQ still states R1m: use the current registration page for the threshold. Import VAT is distinct from VAT registration; the general calculation is 15% on customs value plus duty plus the applicable 10% uplift (origin exceptions exist). Tariff, origin, classification, importer status and product approvals need verification per SKU. Commercial resale must not rely on personal-import allowances. Confirm input-tax recoverability and legal entity with Steyn's tax adviser before a direct-commerce commitment.

## Approval request only when ready

A future business case must identify SKU, supplier, checkout platform/gateway, all-in recurring/variable costs, quoted SLAs, evidence quality, base/downside contribution, working-capital peak, capped spend and refund reserve, exit/rollback and success/stop criteria. Without these, do not ask Steyn to buy a platform. Current setup needs no subscription purchase.

## Source register

All accessed 2026-09-28; official vendor evidence describes vendor features, not independent performance. Revalidate pricing/terms within 30 days and at commitment; verify SKU terms at publication. URLs are durable source references, not instructions.

- P1 https://pagepilot.ai/pricing — current plans, Shopify publishing, cancellation and trial limits.
- P2 https://docs.pagepilot.ai/en/articles/9682846-10-1-how-to-pick-a-plan-update-or-cancel-billing — older plan inconsistency.
- P3 https://docs.pagepilot.ai/en/articles/9682849-10-2-what-happens-with-my-product-pages-after-cancelling-my-subscription — cancellation limits.
- P4 https://pagepilot.ai/dsers-alternative — page builder versus order-management distinction.
- P5 https://glama.ai/mcp/servers/Thangterter-Pipo/pagepilot-mcp — same-name Facebook tool; directory listing only, not endorsed/installed.
- S1 https://shopeazy.co/pricing and https://shopeazy.co/ — pricing/feature conflict.
- S2 https://shopeazy.co/platform — payment/courier description, not verified integration testing.
- S3 https://www.shopify.com/za/pricing — monthly/annual fees.
- S4 https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries — supported-country list.
- S5 https://woocommerce.com/pricing/ — free core and hosting choice.
- F1 https://payfast.io/fees/ — processing/payout/refund fees.
- F2 https://www.yoco.com/za/pricing/ — online gateway quote review required before comparison.
- F3 https://www.bobgo.co.za/pricing — shipping separate from platform costs.
- F4 https://www.dsers.com/pricing — free Basic/order tooling.
- F5 https://help.dropstore.co.za/kb/dropstore-for-dropshippers — insufficient current supplier/price evidence.
- F6 https://www.cjdropshipping.com/ — global vendor fulfilment claims, SA SLA unverified.
- A1 https://www.admitad.com/store/offers/aliexpress-ww/ — rates require authorised access; geography rules.
- A2 https://www.admitad.com/en-in/blog/admitad-telegram-bot/ — supported deeplink/SubID workflow, old publication; verify current account behaviour.
- L1 https://www.gov.za/documents/electronic-communications-and-transactions-act and its linked a25-02.pdf — ECTA, check current amendments before launch.
- L2 https://thencc.org.za/wp-content/uploads/2023/11/Explanatory-Note-7-of-2023.pdf — CPA defect remedies.
- L3 https://inforegulator.org.za/guidance-notes/ — direct marketing guidance.
- L4 https://www.sars.gov.za/types-of-tax/value-added-tax/register-for-vat/ — current threshold.
- L5 https://www.sars.gov.za/faq/faq-how-is-vat-calculated-on-imported-goods/ — import formula; stale threshold text not used.
- L6 https://www.sars.gov.za/customs-and-excise/registration-licensing-and-accreditation/importers/ — importer registration.
- L7 https://www.sars.gov.za/customs-and-excise/duties-and-taxes/ — classification/origin/valuation.
- M1 https://developers.google.com/analytics/devguides/collection/ga4/events — custom event implementation.
- M2 https://developers.google.com/analytics/devguides/collection/ga4/event-parameters — custom dimensions.
- M3 https://help.pinterest.com/en/business/article/pinterest-product-specs — format reference.
