import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const DAY_MS=86_400_000;

function isoDate(date){return date.toISOString().slice(0,10)}
function addDays(iso,days){return isoDate(new Date(new Date(`${iso}T12:00:00Z`).getTime()+days*DAY_MS))}

export function johannesburgDate(instant=new Date()){
  return new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Johannesburg',year:'numeric',month:'2-digit',day:'2-digit'}).format(instant);
}

export function precedingCompletedWeek(instant=new Date()){
  const localDate=johannesburgDate(instant);
  const weekday=new Date(`${localDate}T12:00:00Z`).getUTCDay();
  const daysSinceMonday=(weekday+6)%7;
  const currentMonday=addDays(localDate,-daysSinceMonday);
  const weekStart=addDays(currentMonday,-7);
  return {weekStart,weekEnd:addDays(weekStart,6),asOfDate:localDate};
}

function evidenceProblems(entry){
  const problems=[];
  if(!entry.articleSlug)problems.push('missing articleSlug');
  if(!entry.articleUrl?.startsWith('https://velucedesign.com/article/'))problems.push('invalid articleUrl');
  if(!Number.isInteger(entry.prNumber))problems.push('missing prNumber');
  if(!entry.mergeCommit)problems.push('missing mergeCommit');
  if(!entry.validation)problems.push('missing validation evidence');
  if(!entry.deployment)problems.push('missing deployment evidence');
  const explore=entry.exploreMoreAcceptance;
  if(!explore?.exactFinalSection)problems.push('Explore More not confirmed');
  if(explore?.shopUrl!=='https://tr.ee/Sp8jyc')problems.push('incorrect shop URL');
  if(explore?.pinterestUrl!=='https://www.pinterest.com/steynenslin/')problems.push('incorrect Pinterest URL');
  if(!entry.imageryAcceptance)problems.push('missing imagery acceptance');
  return problems;
}

export function reconcile(state,week){
  const weekly=state.weeklyArticleRefresh??{};
  const minimum=weekly.minimumPerWeek??3;
  const candidates=(weekly.history??[]).filter(entry=>entry.weekStart===week.weekStart&&entry.weekEnd===week.weekEnd&&entry.status==='completed');
  const seen=new Set();
  const entries=candidates.map(entry=>{
    const problems=evidenceProblems(entry);
    if(seen.has(entry.articleSlug))problems.push('duplicate articleSlug');
    seen.add(entry.articleSlug);
    const late=entry.completionTiming==='late catch-up'||Boolean(entry.refreshDate&&entry.refreshDate>week.weekEnd);
    return {articleSlug:entry.articleSlug,articleTitle:entry.articleTitle,articleUrl:entry.articleUrl,prNumber:entry.prNumber,mergeCommit:entry.mergeCommit,refreshDate:entry.refreshDate,late,problems};
  });
  const qualifying=entries.filter(entry=>entry.problems.length===0);
  return {...week,minimum,entries,qualifyingCount:qualifying.length,lateCatchUpCount:qualifying.filter(entry=>entry.late).length,meetsMinimum:qualifying.length>=minimum};
}

export function renderMarkdown(report){
  const lines=[
    `# Veluce weekly article refresh reconciliation`,
    '',
    `- Reporting week: ${report.weekStart} to ${report.weekEnd} (Africa/Johannesburg, Monday–Sunday)`,
    `- Reconciled on: ${report.asOfDate}`,
    `- Minimum required: ${report.minimum}`,
    `- Qualifying substantive refreshes recorded: ${report.qualifyingCount}`,
    `- Late catch-up completions: ${report.lateCatchUpCount}`,
    `- Result: ${report.meetsMinimum?'PASS':'INCOMPLETE'}`,
    '',
    '| Article | PR | Completion | Evidence |',
    '| --- | ---: | --- | --- |'
  ];
  if(report.entries.length===0)lines.push('| None recorded | — | — | Missing |');
  for(const entry of report.entries){
    lines.push(`| ${entry.articleSlug||'missing slug'} | #${entry.prNumber??'—'} | ${entry.refreshDate??'unknown'}${entry.late?' (late catch-up)':''} | ${entry.problems.length?entry.problems.join('; '):'complete'} |`);
  }
  lines.push('',report.meetsMinimum?'The repository state satisfies the weekly minimum.':'GitHub Actions cannot create substantive editorial refreshes without an authorized generation service. This report identifies the shortfall for a Work operator to complete and record.','');
  return lines.join('\n');
}

export function run({statePath='ops/state.json',outputDir='artifacts/weekly-refresh',instant=new Date(),enforce=false}={}){
  const state=JSON.parse(fs.readFileSync(statePath,'utf8'));
  const report=reconcile(state,precedingCompletedWeek(instant));
  fs.mkdirSync(outputDir,{recursive:true});
  fs.writeFileSync(path.join(outputDir,'report.json'),`${JSON.stringify(report,null,2)}\n`);
  fs.writeFileSync(path.join(outputDir,'report.md'),`${renderMarkdown(report)}\n`);
  if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,`${renderMarkdown(report)}\n`);
  if(enforce&&!report.meetsMinimum)process.exitCode=1;
  return report;
}

if(process.argv[1]===fileURLToPath(import.meta.url)){
  const value=name=>{const i=process.argv.indexOf(name);return i>=0?process.argv[i+1]:undefined};
  const instant=value('--as-of')?new Date(value('--as-of')):new Date();
  const report=run({statePath:value('--state')??'ops/state.json',outputDir:value('--output-dir')??'artifacts/weekly-refresh',instant,enforce:process.argv.includes('--enforce')});
  console.log(JSON.stringify({weekStart:report.weekStart,weekEnd:report.weekEnd,qualifyingCount:report.qualifyingCount,minimum:report.minimum,meetsMinimum:report.meetsMinimum}));
}
