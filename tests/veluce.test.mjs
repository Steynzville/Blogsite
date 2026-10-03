import {test} from 'node:test';
import assert from 'node:assert/strict';
import {redirectPath} from '../src/lib/redirect.mjs';
import {commercialKind,commercialEvent,installCommerceTracking} from '../src/lib/commerce.mjs';
import {economics} from '../scripts/veluce/economics.mjs';
import {validateProduct,renderProduct} from '../scripts/veluce/product.mjs';
import {articleStudioRecommendations,getStudioRecommendation,renderStudioRecommendationHtml,splitArticleHtml} from '../src/lib/studio-recommendations.mjs';
import fs from 'node:fs';
test('UTM, Pinterest and query parameters do not become routes',()=>{for(const q of ['?utm_source=pinterest&utm_campaign=lighting','?epik=abc','?q=lighting'])assert.equal(redirectPath(q),null)});
test('explicit and legacy Pages redirects preserve destination query',()=>{assert.equal(redirectPath('?__veluce_path=%2Farticle%2Ftest%3Futm_source%3Dpinterest%23faq'),'/article/test?utm_source=pinterest#faq');assert.equal(redirectPath('?article/test&utm_source=pinterest~and~utm_medium=organic'),'/article/test?utm_source=pinterest&utm_medium=organic');assert.equal(redirectPath('?__veluce_path=https%3A%2F%2Fevil.test'),null);assert.equal(redirectPath('?__veluce_path=%2F%2Fevil.test'),null)});
test('tracking distinguishes unknown shortlinks and excludes ordinary references',()=>{assert.equal(commercialKind('https://steynenslin.s.gy/Rug'),'unverified_shortlink');assert.equal(commercialKind('https://www.amazon.com/dp/test'),null);assert.equal(commercialKind('https://evilaliexpress.com/a'),null);assert.equal(commercialKind('javascript:alert(1)'),null);const e=commercialEvent({href:'https://steynenslin.s.gy/Rug?email=secret',dataset:{}},'/article/a');assert.ok(!JSON.stringify(e).includes('secret'))});
test('tracking never blocks navigation and works without analytics',()=>{const events={};const doc={addEventListener:(k,v)=>events[k]=v,removeEventListener:k=>delete events[k]};const calls=[];const win={location:{pathname:'/article/a'},gtag:(...a)=>calls.push(a)};const stop=installCommerceTracking(doc,win);events.click({target:{closest:()=>({href:'https://steynenslin.s.gy/Rug',dataset:{}})}});assert.equal(calls.length,1);delete win.gtag;assert.doesNotThrow(()=>events.click({target:{closest:()=>null}}));stop();assert.equal(Object.keys(events).length,0)});
test('solar pathway CTAs preserve cylinder and lantern product mappings',()=>{
 const article=fs.readFileSync('content/articles/solar-pathway-lights-affordable.md','utf8');
 assert.ok(article.includes('[→ Shop Modern Cylinder Solar Lights](https://steynenslin.s.gy/solar-lantern-lights)'));
 assert.ok(article.includes('[→ Shop Traditional Solar Lantern Lights](https://steynenslin.s.gy/solar-ball-lights)'));
 assert.ok(!article.includes('[→ Shop Modern Cylinder Solar Lights](https://steynenslin.s.gy/solar-ball-lights)'));
 assert.ok(!article.includes('[→ Shop Traditional Solar Lantern Lights](https://steynenslin.s.gy/solar-lantern-lights)'));
});
test('economics includes downside and rejects missing rates',()=>{const scenarios=JSON.parse(fs.readFileSync('ops/economics-scenarios.json'));const base=economics(scenarios[0]);assert.ok(base.affiliateRevenue>0);assert.ok(economics(scenarios[2]).contributionPerOrder<base.contributionPerOrder);assert.throws(()=>economics({...scenarios[0],paymentRate:null}));assert.throws(()=>economics({...scenarios[0],approvalRate:2}))});
test('unverified drafts cannot generate commercial pages',()=>{assert.ok(validateProduct({}).length>0);assert.ok(validateProduct(JSON.parse(fs.readFileSync('ops/templates/product.json'))).includes('Product is not verified'))});

test('verified brief renders into existing Markdown pipeline without fabricated ratings', async()=>{
 const {default: MarkdownIt}=await import('markdown-it');
 const {default: matter}=await import('gray-matter');
 const date=new Date().toISOString().slice(0,10);
 const p={id:'test-decor',status:'verified',model:'affiliate',title:'Decor & light',category:'Patio Decor',excerpt:'A test fixture',positioning:'Suitable for a small room',bestFor:'Small spaces',notFor:'Outdoor use',heroImage:'/images/test.jpg',imageRights:'owned:test-fixture',affiliateUrl:'https://example.com/item?a=1&b=2',merchant:'Test merchant',programApproved:true,verifiedAt:date,reviewer:'test',claims:[{text:'20 cm wide',source:'https://example.com/spec',checkedAt:date}],related:['article-one','article-two']};
 assert.deepEqual(validateProduct(p),[]);
 const rendered=new MarkdownIt({html:true}).render(matter(renderProduct(p)).content);
 assert.ok(rendered.includes('data-product-id="test-decor"'));
 assert.ok(rendered.includes('sponsored nofollow noopener noreferrer'));
 assert.ok(rendered.includes('Check current details'));
 assert.ok(!rendered.includes('AggregateRating'));
 assert.ok(validateProduct({...p,related:['../escape','valid']}).includes('Invalid related slug'));
});

test('all published articles have exactly one contextual Studio product',()=>{
 const articleSlugs=fs.readdirSync('content/articles').filter(name=>name.endsWith('.md')).map(name=>name.slice(0,-3)).sort();
 const mapped=Object.keys(articleStudioRecommendations).sort();
 assert.ok(articleSlugs.length >= 26, 'Established editorial library is preserved');
 assert.deepEqual(mapped,articleSlugs);
 for(const slug of articleSlugs){
   const recommendation=getStudioRecommendation(slug);
   assert.ok(recommendation?.id);
   assert.ok(recommendation?.href?.startsWith('/'));
   assert.ok(recommendation?.price?.startsWith('R'));
 }
});

test('Studio recommendation splits only at a heading boundary and is measurable',()=>{
 const html='<h2>A</h2><p>one</p><h2>B</h2><p>two</p><h2>C</h2><p>three</p><h2>D</h2><p>four</p>';
 const [before,after]=splitArticleHtml(html);
 assert.ok(before.endsWith('</p>'));
 assert.ok(after.startsWith('<h2'));
 assert.equal(before+after,html);
 const module=renderStudioRecommendationHtml('layered-lighting-bedroom',false);
 assert.ok(module.includes('Luxury Lighting Formula'));
 assert.ok(module.includes('data-product-id="luxury-lighting-formula"'));
 assert.ok(module.includes('data-placement="article-studio-module"'));
 assert.ok(module.includes('coming soon'));
});
