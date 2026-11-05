import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { installCommerceTracking } from '../src/lib/commerce.mjs';
import { studioProducts } from '../src/lib/studio-recommendations.mjs';

test('all six studio product pages have server-visible unique content and sitemap dates', () => {
  const generator = fs.readFileSync('scripts/generate-static.mjs', 'utf8');
  const products = Object.values(studioProducts);
  assert.equal(products.length, 6);
  for (const product of products) {
    assert.ok(generator.includes("'" + product.id + "': {"), 'crawler summary missing: ' + product.id);
    assert.ok(generator.includes("{ path: '/" + product.id + "', lastmod: '2026-11-05' }"), 'sitemap modification date missing: ' + product.id);
    assert.ok(generator.includes("path: '/" + product.id + "'"), 'static route missing: ' + product.id);
  }
  assert.match(generator, /renderCrawlerProductContent\(productSlug\)/);
  assert.match(generator, /<h2>What is included<\/h2>/);
  assert.match(generator, /<h2>Read related free guides<\/h2>/);
});

test('home page introduces both discovery routes without deleting existing cards', () => {
  const home = fs.readFileSync('src/pages/Home.tsx', 'utf8');
  assert.match(home, /id="studio-systems"/);
  assert.match(home, /href="#studio-systems"/);
  assert.match(home, /href="\/outdoor-lighting-blueprint"/);
  assert.match(home, /href="\/luxury-lighting-formula"/);
  assert.match(home, /<CompleteHomeProductCard\s*\/>/);
});

test('product exploration is measured separately from checkout and revenue', () => {
  const listeners = {};
  const doc = {addEventListener:(name,cb)=>listeners[name]=cb, removeEventListener:(name)=>delete listeners[name]};
  const calls = [];
  const win = {location:{pathname:'/article/led-strip-integration-modern-deck/'},gtag:(...parts)=>calls.push(parts)};
  const stop = installCommerceTracking(doc, win);
  listeners.click({target:{closest:()=>({
    href:'https://velucedesign.com/outdoor-lighting-blueprint',
    dataset:{productId:'outdoor-lighting-blueprint',placement:'article-studio-module'},
  })}});
  assert.deepEqual(calls.map(call=>call[1]), ['veluce_commercial_click','select_item']);
  assert.equal(calls[1][2].items[0].item_id,'outdoor-lighting-blueprint');
  assert.equal(calls.some(call=>call[1]==='purchase'||call[1]==='begin_checkout'), false);
  stop();
});

test('SPA product view instrumentation is scoped to recognised products', () => {
  const component = fs.readFileSync('src/components/ProductJourneyTracking.tsx','utf8');
  const app = fs.readFileSync('src/App.tsx','utf8');
  assert.match(component,/event', 'view_item'/);
  assert.match(component,/find\(item => item.id === slug\)/);
  assert.doesNotMatch(component,/event', 'purchase'/);
  assert.match(app,/<ProductJourneyTracking\s*\/>/);
});
