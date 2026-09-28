import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { commercialKind } from '../../src/lib/commerce.mjs';
const root = path.resolve(import.meta.dirname, '../..');
const files = fs.readdirSync(path.join(root,'content/articles')).filter(f=>f.endsWith('.md')).sort();
const slugs = new Set(files.map(f=>f.slice(0,-3)));
const shortlinks = JSON.parse(fs.readFileSync(path.join(root,'ops/shortlinks.json'),'utf8'));
const knownShortlinks = new Set(shortlinks.article_slugs);
const records = new Map((shortlinks.records || []).map(record=>[record.slug,record]));
const report = {article_count:files.length, links:[], issues:[]};
if((shortlinks.records || []).length!==knownShortlinks.size || records.size!==knownShortlinks.size)
 report.issues.push({kind:'registry_mismatch',message:'Every article slug needs exactly one distinct record'});
for(const slug of knownShortlinks) if(!records.has(slug)) report.issues.push({kind:'missing_registry_record',slug});
for(const [slug,record] of records) {
 if(!knownShortlinks.has(slug) || record.public_url!==`https://${shortlinks.domain}/${slug}`)
  report.issues.push({kind:'invalid_registry_record',slug});
 if(record.verification==='verified' && (!record.last_verified_at || !record.final_destination || !record.evidence))
  report.issues.push({kind:'unsupported_verified_claim',slug});
}
for (const file of files) {
 const raw=fs.readFileSync(path.join(root,'content/articles',file),'utf8');
 const {data,content}=matter(raw);
 for (const key of ['title','excerpt','category','publishedAt','heroImage']) if(!data[key]) report.issues.push({file,kind:'missing_metadata',key});
 if(data.heroImage?.startsWith('/')&&!fs.existsSync(path.join(root,'public',data.heroImage))) report.issues.push({file,kind:'missing_hero',value:data.heroImage});
 for (const match of content.matchAll(/https?:\/\/[^\s<>"')]+/g)) {
  const url=match[0]; let parsed; try{parsed=new URL(url)}catch{continue}
  const host=parsed.hostname;
  const kind= /(^|\.)(amazon\.[a-z.]+|amzn\.to|amzn\.eu)$/.test(host)?'amazon':commercialKind(url)||'external';
  report.links.push({file,url,kind,line:raw.slice(0,raw.indexOf(url)).split('\n').length});
  if(kind==='amazon' || /(^|\.)(temu\.com)$/.test(host)) report.issues.push({file,kind:'unsupported_merchant',url});
  if(host===shortlinks.domain && !knownShortlinks.has(parsed.pathname.slice(1))) report.issues.push({file,kind:'unmapped_shortlink',url});
 }
 for(const m of content.matchAll(/(?:href=["']|\]\()\/article\/([a-z0-9-]+)/g)) if(!slugs.has(m[1])) report.issues.push({file,kind:'missing_internal_article',slug:m[1]});
}
report.links = [...new Map(report.links.map(l=>[l.file+' '+l.url,l])).values()];
report.commercial = [...knownShortlinks].map(slug=>({
 slug, sources:[...new Set(report.links.filter(l=>l.url===`https://${shortlinks.domain}/${slug}`).map(l=>l.file))],
 verification:records.get(slug)?.verification || 'not_recorded',
 merchant:records.get(slug)?.merchant || null,
 last_verified_at:records.get(slug)?.last_verified_at || null
}));
const output=JSON.stringify(report,null,2)+'\n';
if(process.argv.includes('--write')) fs.writeFileSync(path.join(root,'ops/reports/content-audit.json'),output);
console.log(JSON.stringify({articles:report.article_count,unique_urls:new Set(report.links.map(l=>l.url)).size,issues:report.issues},null,2));
if(report.issues.length) process.exitCode=1;
