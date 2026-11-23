import {test} from 'node:test';
import assert from 'node:assert/strict';
import {precedingCompletedWeek,reconcile,renderMarkdown} from '../scripts/veluce/weekly-refresh-reconcile.mjs';

const evidence=(slug,pr,refreshDate,completionTiming)=>({
  weekStart:'2026-11-16',weekEnd:'2026-11-22',status:'completed',refreshDate,completionTiming,
  articleSlug:slug,articleTitle:slug,articleUrl:`https://velucedesign.com/article/${slug}/`,prNumber:pr,mergeCommit:`sha-${pr}`,
  validation:'all gates passed',deployment:'live verified',imageryAcceptance:{heroImage:`/${slug}.jpg`},
  exploreMoreAcceptance:{exactFinalSection:true,shopUrl:'https://tr.ee/Sp8jyc',pinterestUrl:'https://www.pinterest.com/steynenslin/'}
});

test('Monday reconciliation selects the preceding Johannesburg Monday-Sunday week',()=>{
  assert.deepEqual(precedingCompletedWeek(new Date('2026-11-23T05:30:00Z')), {weekStart:'2026-11-16',weekEnd:'2026-11-22',asOfDate:'2026-11-23'});
});

test('three distinct evidenced refreshes pass and late catch-up is separate',()=>{
  const state={weeklyArticleRefresh:{minimumPerWeek:3,history:[evidence('a',1,'2026-11-21','on-time'),evidence('b',2,'2026-11-23','late catch-up'),evidence('c',3,'2026-11-23','late catch-up')]}};
  const report=reconcile(state,{weekStart:'2026-11-16',weekEnd:'2026-11-22',asOfDate:'2026-11-23'});
  assert.equal(report.meetsMinimum,true);
  assert.equal(report.qualifyingCount,3);
  assert.equal(report.lateCatchUpCount,2);
  assert.match(renderMarkdown(report),/Result: PASS/);
});

test('duplicate slugs and incomplete acceptance evidence do not qualify',()=>{
  const first=evidence('same',1,'2026-11-21','on-time');
  const duplicate=evidence('same',2,'2026-11-21','on-time');
  const incomplete={...evidence('other',3,'2026-11-21','on-time'),deployment:''};
  const report=reconcile({weeklyArticleRefresh:{minimumPerWeek:3,history:[first,duplicate,incomplete]}},{weekStart:'2026-11-16',weekEnd:'2026-11-22',asOfDate:'2026-11-23'});
  assert.equal(report.meetsMinimum,false);
  assert.equal(report.qualifyingCount,1);
  assert.ok(report.entries.some(entry=>entry.problems.includes('duplicate articleSlug')));
  assert.ok(report.entries.some(entry=>entry.problems.includes('missing deployment evidence')));
});
