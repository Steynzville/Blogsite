import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
export function validateProduct(p, now = new Date()) {
 const errors=[];
 for(const k of ['id','title','category','excerpt','positioning','bestFor','notFor','heroImage','imageRights','affiliateUrl','merchant','verifiedAt','reviewer']) if(typeof p[k]!=='string'||!p[k].trim())errors.push('Missing '+k);
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.id||''))errors.push('Invalid id');
 if(p.model!=='affiliate')errors.push('Only approved affiliate architecture is enabled');
 if(p.status!=='verified')errors.push('Product is not verified');
 if(p.programApproved!==true)errors.push('Merchant/program approval required');
 if(!p.imageRights?.startsWith('https://')&&!p.imageRights?.startsWith('owned:'))errors.push('Record rights evidence URL or owned: record');
 const age=(now-new Date(p.verifiedAt))/86400000;
 if(!Number.isFinite(age)||age<0||age>30)errors.push('Verification must be within 30 days');
 try{const u=new URL(p.affiliateUrl);if(u.protocol!=='https:'||/(^|\.)(amazon\.[a-z.]+|amzn\.to)$/.test(u.hostname))errors.push('Unsupported affiliate URL')}catch{errors.push('Invalid affiliate URL')}
 if(!Array.isArray(p.claims)||!p.claims.length)errors.push('At least one sourced material claim required');
 for(const c of p.claims||[])if(!c.text||!/^https:\/\//.test(c.source||'')||!c.checkedAt)errors.push('Unsourced claim');
 if(!Array.isArray(p.related)||p.related.length<2)errors.push('Two useful internal links required');
 for(const slug of p.related||[])if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))errors.push('Invalid related slug');
 if(p.heroImage && (!p.heroImage.startsWith('/images/') || p.heroImage.includes('..')))errors.push('Use a licensed local image in /images/');
 for(const c of p.claims||[]){const age=(now-new Date(c.checkedAt))/86400000;if(!Number.isFinite(age)||age<0||age>30)errors.push('Stale or invalid claim verification')}
 return errors;
}
const html=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function renderProduct(p){
 const errors=validateProduct(p);if(errors.length)throw Error(errors.join('; '));
 const text=s=>html(s).replace(/([\\`*_\[\]])/g,'\\$1');
 return `---\ntitle: ${JSON.stringify(p.title)}\nexcerpt: ${JSON.stringify(p.excerpt)}\ncategory: ${JSON.stringify(p.category)}\nheroImage: ${JSON.stringify(p.heroImage)}\npublishedAt: ${JSON.stringify(p.verifiedAt)}\nfeatured: false\n---\n\n${text(p.positioning)}\n\n**Best for:** ${text(p.bestFor)}\n\n**Consider another option if:** ${text(p.notFor)}\n\nWe may earn a commission through this link. The retailer handles the sale, delivery and returns.\n\n<a href="${html(p.affiliateUrl)}" rel="sponsored nofollow noopener noreferrer" target="_blank" data-product-id="${html(p.id)}" data-placement="hero">Check current details at ${html(p.merchant)}</a>\n\n## Verified features and specifications\n\n${p.claims.map(c=>`- ${text(c.text)} ([source](${encodeURI(c.source)}), checked ${text(c.checkedAt)})`).join('\n')}\n\n## Before buying\n\nConfirm the exact variant, dimensions, compatibility, total delivered price, availability, delivery to your address and the retailer’s current returns policy. We have not independently tested this product unless explicitly stated.\n\n## Continue exploring\n\n${p.related.map(s=>`- [${text(s.replaceAll('-',' '))}](/article/${s})`).join('\n')}\n`;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const p=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
 const errors=validateProduct(p);if(errors.length){console.error(errors.join('\n'));process.exit(1)}
 if(!fs.existsSync('public'+p.heroImage))throw Error('Hero image file missing');
 for(const slug of p.related)if(!fs.existsSync('content/articles/'+slug+'.md'))throw Error('Related article missing: '+slug);
 const categories=JSON.parse(fs.readFileSync('public/categories.json'));if(!categories.some(c=>c.name===p.category))throw Error('Unknown category');
 const output=process.argv[3];if(!output)console.log('Valid product brief');else fs.writeFileSync(output,renderProduct(p),{flag:'wx'});
}
