# Veluce affiliate catalogue

`ops/shortlinks.json` is the machine-readable source of truth for affiliate links available to article workflows.

## Automated NEW and REFRESH article rule

1. Read `catalogue_slugs` and resolve each slug to its object in `records`.
2. Exclude every slug in `nonaffiliate_slugs`, even if the public Short.io redirect still opens.
3. Use only records whose `catalogue_status` is `available_for_new_and_refresh_articles` and whose `verification` is `verified_admitad_link_checker_and_shortio_destination`.
4. Match `recommended_topics`, `product_category` and `power_type` to the reader's actual problem. Do not add a product merely to increase link count.
5. Link only to `public_url`; never expose the underlying Admitad wrapper in article copy.
6. At placement time, re-check the current listing, exact variant, stock, price, delivery eligibility, returns information and any electrical or weather-rating claim. Link Checker status proves programme/deeplink eligibility at the recorded date, not product quality or availability.
7. Add the normal affiliate disclosure and use sponsored/nofollow link attributes where raw HTML is used.
8. Record the article placement in the normal state/history. If a product is unavailable or fails Admitad Link Checker, move its slug to `nonaffiliate_slugs`, do not reuse it, and select another verified catalogue record.

## 15 November 2026 audit

- All 53 Short.io slugs present in current article source existed in the authenticated dashboard and retained Admitad `rzekl.com` destinations.
- Admitad Link Checker classified 38 as Active and 15 as **nonaffiliate**. The 15 are recorded in `nonaffiliate_slugs`; their redirects can still open, but purchases through them are not currently commissionable.
- Twenty new Veluce-relevant products were checked individually. For each, the SteynEnslin ad space, AliExpress WW programme, URL and deeplink were Active. Their branded Short.io links were then created and recorded in `catalogue_slugs`.
- This audit did not prove stock, the buyer's selected variant, delivery to a specific address, or a credited sale.
