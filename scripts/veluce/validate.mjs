import fs from 'node:fs';
import path from 'node:path';
const errors=[];
const state=JSON.parse(fs.readFileSync('ops/state.json','utf8'));
if(state.spend_authorized!==false) errors.push('Zero-spend boundary changed: requires recorded explicit approval');
for(const key of ['next_actions','decisions','blocked','experiments','campaigns','products']) if(!Array.isArray(state[key]))errors.push('State missing '+key);
if(state.next_actions.length>12)errors.push('Keep next_actions at 12 or fewer');
for(const name of ['VELUCE_OPERATING_SYSTEM.md','SOL_OPERATOR_PROMPT.md'])if(!fs.existsSync(name))errors.push('Missing '+name);
const list=JSON.parse(fs.readFileSync('public/articles.json','utf8'));
for(const article of list){
 const file=path.join('dist/article',article.slug,'index.html');
 if(!fs.existsSync(file)){errors.push('Missing prerender '+article.slug);continue}
 const html=fs.readFileSync(file,'utf8');
 if(!html.includes(`<link rel="canonical" href="https://velucedesign.com/article/${article.slug}/"`))errors.push('Wrong canonical '+article.slug);
 if(!html.includes('property="og:image"'))errors.push('Missing static social image '+article.slug);
 if(/https?:\/\/(?:www\.)?amazon\.[^"\s<>]*[?&]tag=|https?:\/\/amzn\.to\//i.test(html))errors.push('Amazon tracking remains '+article.slug);
 if(!html.includes('Affiliate disclosure'))errors.push('Missing disclosure '+article.slug);
}
for(const file of fs.readdirSync('dist/js')){if(fs.readFileSync('dist/js/'+file,'utf8').includes('connect.mailerlite.com/api/subscribers'))errors.push('Private newsletter API in bundle')}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Operating state and ${list.length} prerendered article pages validated.`);
