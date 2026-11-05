import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { formatApproxUsd, parseZarAmount, REFERENCE_ZAR_TO_USD, REFERENCE_RATE_DATE } from '../src/lib/price-usd.mjs';
import { studioProducts, renderStudioRecommendationHtml } from '../src/lib/studio-recommendations.mjs';

const productPages = [
  ['OutdoorLightingBlueprint', 'outdoor-lighting-blueprint', 299],
  ['LuxuryOutdoorRoomPlanner', 'luxury-outdoor-room-planner', 349],
  ['DesignerBriefBuilder', 'designer-brief-builder', 349],
  ['LuxuryLightingFormula', 'luxury-lighting-formula', 449],
  ['RoomProcurementSystem', 'room-procurement-system', 449],
  ['CompleteHomeDesignSystem', 'complete-home-design-system', 999],
];

test('USD reference conversion remains explicitly approximate and preserves amounts', () => {
  assert.equal(REFERENCE_RATE_DATE, '2026-11-05');
  assert.equal(REFERENCE_ZAR_TO_USD, 0.06122);
  assert.equal(formatApproxUsd('R299'), '≈ US$18');
  assert.equal(formatApproxUsd('R349'), '≈ US$21');
  assert.equal(formatApproxUsd('R449'), '≈ US$27');
  assert.equal(formatApproxUsd('R999'), '≈ US$61');
  assert.equal(formatApproxUsd('R1,895'), '≈ US$116');
  assert.equal(formatApproxUsd('R299',0.06), '≈ US$18');
  assert.equal(parseZarAmount('R1,895'),1895);
  assert.equal(formatApproxUsd('not-an-amount'),'USD estimate unavailable');
  assert.equal(formatApproxUsd(299,0),'USD estimate unavailable');
});

test('all product checkout buttons preserve their existing ZAR transaction values', () => {
  for(const [file,slug,value] of productPages) {
    const s=fs.readFileSync('src/pages/'+file+'.tsx','utf8');
    assert.match(s,new RegExp('data-product-id="'+slug+'"'));
    assert.match(s,new RegExp('data-value="'+value+'" data-currency="ZAR"'));
    assert.match(s, /<CheckoutCurrencyNotice\s*\/>/, file+' lacks a visible checkout currency disclosure');
  }
});

test('primary customer-visible product price shows USD only with a currency disclosure',()=>{
  const component=fs.readFileSync('src/components/ZarPrice.tsx','utf8');
  assert.match(component, /formatApproxUsd\(value, approximateRate\)/);
  assert.doesNotMatch(component, /\{zarLabel\}/);
  assert.match(component, /Checkout is charged in South African rand|checkout is charged in South African rand|charged in South African rand/i);
  const notice=fs.readFileSync('src/components/CheckoutCurrencyNotice.tsx','utf8');
  assert.match(notice, /Paystack checkout charges ZAR/);
  assert.match(notice, /final USD conversion/);
});

test('server-visible product and article prices are USD estimates, not raw rand labels',()=>{
  const studio=fs.readFileSync('src/lib/studio-recommendations.mjs','utf8');
  const generator=fs.readFileSync('scripts/generate-static.mjs','utf8');
  assert.match(studio,/formatApproxUsd\(recommendation.price\)/);
  assert.match(generator,/formatApproxUsd\(product.price\)/);
  assert.doesNotMatch(generator,/escapeHtml\(product.price\)/);
  const html=renderStudioRecommendationHtml('led-strip-integration-modern-deck',true);
  assert.match(html,/≈ US\$18/);
  assert.match(html,/checkout charges ZAR/);
  assert.doesNotMatch(html,/R299/);
  for(const item of Object.values(studioProducts))assert.match(item.price,/^R[0-9]/); // transaction source remains ZAR
});

test('complete-home bundle and homepage have no hard-coded visible rand price',()=>{
  const bundle=fs.readFileSync('src/pages/CompleteHomeDesignSystem.tsx','utf8');
  const home=fs.readFileSync('src/pages/Home.tsx','utf8');
  assert.doesNotMatch(bundle,/Why R999/);
  assert.match(home,/Displayed US dollar prices are approximate conversions/);
  assert.match(home,/charges South African rand/);
});
