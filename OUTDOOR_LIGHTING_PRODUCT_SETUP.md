# Outdoor Lighting Blueprint — commerce setup

The paid product is intentionally **not stored under `public/`**. The website contains only the sales experience. The customer files must be delivered by the checkout/digital-delivery provider after payment.

## Product

- Name: Veluce Outdoor Lighting Blueprint — The 4-Axis Nightscape System
- Launch price: US$27
- Customer file: `Veluce_Outdoor_Lighting_Blueprint_PREMIUM_CUSTOMER_PACK.zip`
- License: personal, non-transferable use

The customer ZIP contains:

1. 48-page premium Blueprint PDF with clickable Veluce article links
2. Editable Excel calculator and weighted fixture scorecard
3. 25-prompt AI visualization PDF
4. Offline interactive Studio Tools HTML
5. Quick-start/read-me file

## Checkout wiring

1. Create the digital product in the chosen checkout provider and upload the customer ZIP there.
2. Configure the provider to deliver the ZIP only after successful payment.
3. Copy the provider's HTTPS checkout URL.
4. In the Cloudflare Pages build environment set:

   `VITE_OUTDOOR_LIGHTING_CHECKOUT_URL=<secure checkout URL>`

5. Set Paystack's **Redirect after payment** URL to:

   `https://velucedesign.com/thank-you/outdoor-lighting-blueprint`

6. Redeploy the site.

Until this environment variable contains an HTTPS URL, the sales page intentionally renders **Checkout opening shortly** instead of exposing a broken or insecure purchase link.

## Security rule

Do not commit the customer ZIP, PDF, calculator, AI prompt PDF or Studio Tools to `public/`. A public static asset URL is not purchase protection.

## Routes

- Sales page: `/outdoor-lighting-blueprint`
- Post-purchase redirect: `/thank-you/outdoor-lighting-blueprint` (intentionally noindex and excluded from the sitemap)
- Homepage: promotional product card links to the sales page
- Sitemap/prerender: the product route is generated like other static Veluce pages

## Legal/privacy

The Terms and Privacy pages now include generic digital-product and third-party checkout language. Once a provider is selected, replace the generic provider wording with the provider name and privacy/terms links if appropriate.
