/**
 * Read-only weekly Pinterest review using the Buffer account already authorized
 * for Veluce publishing. Buffer's generic 'clicks' != Pinterest OUTBOUND_CLICK.
 * This script NEVER writes publishing configurations or selects winners.
 */
import {readFile, mkdir, writeFile} from "node:fs/promises";
import {pathToFileURL} from "node:url";
import {graphql, operations} from "./buffer-pinterest.mjs";

const LEDGER="ops/buffer/ledger.json";
const OUTPUT="ops/buffer/analytics-reviews/latest-buffer-review.json";
const ORGANIZATION_ID="6ad4ecd6607244fc7684d2bb";
const EXPECTED_CHANNEL_ID="6ad4eda5778b240e2f4a6312";
const DAY=86400000;
const POSTS_QUERY=String.raw`query ($org: OrganizationId!, $channel: ChannelId!, $after: String) {
  posts(first: 100, after: $after, input: {
    organizationId: $org,
    filter: {status: [sent], channelIds: [$channel]}
  }) {
    edges {
      node {
        id
        sentAt
        externalLink
        metrics { type value }
        metricsUpdatedAt
        metadata { ... on PinterestPostMetadata { url title board { serviceId } } }
      }
    }
    pageInfo { hasNextPage endCursor }
  }
}`;
export function summarize(posts, ledger, now=new Date()){
  const today=now.toISOString().slice(0,10);
  const cutoff=new Date(now.getTime()-28*DAY).toISOString();
  const known=new Map((ledger.posts??[]).filter(x=>x.buffer_post_id && 
    ["veluce_editorial","veluce_six_product_cover_rotation_v1"].includes(x.workflow))
    .map(x=>[x.buffer_post_id,x]));
  const groups=new Map();
  const included=[];
  let observed=0, missing=0;
  for(const post of posts){
    const original=known.get(post.id);
    if(!original || !post.sentAt || post.sentAt<cutoff || post.sentAt>now.toISOString())continue;
    if(!/^https:\/\/(?:www\.)?pinterest\.com\/pin\/\d+\/?$/.test(post.externalLink??""))continue;
    // Never attribute another destination's performance to a Veluce article.
    if(post.metadata?.url !== original.destination_url ||
       String(post.metadata?.board?.serviceId??"")!==String(original.board_service_id))continue;
    const metrics=Object.fromEntries((post.metrics??[]).filter(x=>
      Number.isFinite(x.value) && x.value>=0).map(x=>[x.type,x.value]));
    const impressions=Number.isFinite(metrics.impressions)?metrics.impressions:null;
    const clicks=Number.isFinite(metrics.clicks)?metrics.clicks:null;
    if(impressions!==null && clicks!==null)observed++;else missing++;
    const group=original.workflow==="veluce_editorial"
      ? "editorial/"+(original.topic??"unknown")
      : "product/"+(original.product??"unknown");
    let row=groups.get(group);
    if(!row){row={group,posts:0,impressions:0,buffer_clicks:0,observed_posts:0,
      missing_metric_posts:0,board_ids:[]};groups.set(group,row);}
    row.posts++;
    if(impressions!==null && clicks!==null){
      row.impressions+=impressions; row.buffer_clicks+=clicks;row.observed_posts++;
    }else row.missing_metric_posts++;
    if(!row.board_ids.includes(String(original.board_service_id)))row.board_ids.push(String(original.board_service_id));
    included.push({buffer_post_id:post.id,workflow:original.workflow,topic:original.topic??null,
      product:original.product??null,board_id:String(original.board_service_id),
      pinterest_pin_url:post.externalLink,posted_at:post.sentAt,
      metrics_updated_at:post.metricsUpdatedAt??null,impressions,buffer_clicks:clicks});
  }
  return {
    schema_version:1, review_date:today, period_days:28, window_start:cutoff.slice(0,10),
    window_end:today, source:"Buffer GraphQL personal-account post metrics + verified Veluce publishing ledger",
    metric_definitions:{
      impressions:"Buffer-reported post impressions",
      buffer_clicks:"Buffer-reported generic clicks; NOT validated Pinterest native outbound clicks",
      native_outbound_clicks:"unavailable in this source; native Pinterest authorized review required"
    },
    coverage:{verified_posts:included.length,with_impressions_and_clicks:observed,
      missing_impressions_or_clicks:missing},
    by_cohort:[...groups.values()].sort((a,b)=>a.group.localeCompare(b.group)),
    posts:included.sort((a,b)=>a.posted_at.localeCompare(b.posted_at)),
    guardrails:"Diagnostic only: NO automatic allocation changes, no zero imputation, no overfitting. For decisions use exact native OUTBOUND_CLICK and valid destination evidence."
  };
}
async function run(){
  if(!process.env.BUFFER_API_KEY)throw Error("BUFFER_API_KEY absent: cannot perform weekly Buffer analytics read");
  if(process.env.BUFFER_CHANNEL_ID && process.env.BUFFER_CHANNEL_ID!==EXPECTED_CHANNEL_ID)
    throw Error("Non-Veluce Buffer channel configured; refusing to read");
  const channel=(await graphql(operations.channel,{id:EXPECTED_CHANNEL_ID})).channel;
  if(String(channel?.service).toLowerCase()!=="pinterest"||
     !String(channel?.name??"").toLowerCase().includes("steynenslin"))
    throw Error("Authenticated Pinterest channel does not match Veluce");
  let after=null;const posts=[],seen=new Set();
  for(let page=0;page<20;page++){
    const data=(await graphql(POSTS_QUERY,{org:ORGANIZATION_ID,channel:EXPECTED_CHANNEL_ID,after})).posts;
    if(!data?.edges || !data?.pageInfo)throw Error("Buffer posts response incomplete");
    for(const edge of data.edges){
      if(edge?.node?.id && !seen.has(edge.node.id)){
        seen.add(edge.node.id);posts.push(edge.node);
      }
    }
    if(!data.pageInfo.hasNextPage){after=null;break}
    if(!data.pageInfo.endCursor||data.pageInfo.endCursor===after)
      throw Error("Buffer returned invalid pagination cursor");
    after=data.pageInfo.endCursor;
  }
  if(after)throw Error("Buffer pagination exceeded safe limit; do not write incomplete report");
  const report=summarize(posts,JSON.parse(await readFile(LEDGER,"utf8")));
  if(!report.coverage.with_impressions_and_clicks)
    throw Error("No verified posts with both impression and click metrics. Never replace an earlier healthy report with missing data.");
  await mkdir("ops/buffer/analytics-reviews",{recursive:true});
  await writeFile(OUTPUT,JSON.stringify(report,null,2)+"\n");
  console.log(JSON.stringify({status:"updated",path:OUTPUT,verified_posts:report.coverage.verified_posts,
    with_metrics:report.coverage.with_impressions_and_clicks,cohorts:report.by_cohort.length}));
}
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href){
  run().catch(err=>{console.error("::error::Pinterest review: "+err.message);process.exitCode=1});
}