import test from "node:test";
import assert from "node:assert/strict";
import {summarize} from "../scripts/veluce/pinterest-insights-review.mjs";

const now=new Date("2026-11-07T12:00:00Z");
const base={
 id:"post-1",sentAt:"2026-11-05T11:00:00Z",
 externalLink:"https://www.pinterest.com/pin/296815431716477194/",
 metadata:{url:"https://velucedesign.com/article/smart-home-lighting-control/",board:{serviceId:"123"}},
 metrics:[{type:"impressions",value:2000},{type:"clicks",value:7}],
 metricsUpdatedAt:"2026-11-06T22:00:00Z"
};
const ledger={posts:[{
 buffer_post_id:"post-1",workflow:"veluce_editorial",topic:"smart-lighting",
 destination_url:base.metadata.url,board_service_id:"123"
}]};
test("requires verified same destination and board",()=>{
 const r=summarize([base,{...base,id:"random"},{...base,metadata:{url:"https://other.site/",board:{serviceId:"123"}}}],ledger,now);
 assert.equal(r.coverage.verified_posts,1);
 assert.equal(r.by_cohort[0].buffer_clicks,7);
});
test("missing values stay missing, not fabricated zero",()=>{
 const r=summarize([{...base,metrics:[{type:"impressions",value:10}]}],ledger,now);
 assert.equal(r.coverage.missing_impressions_or_clicks,1);
 assert.equal(r.posts[0].buffer_clicks,null);
 assert.equal(r.by_cohort[0].observed_posts,0);
});
test("rejects unconfirmed pins, stale and future metrics",()=>{
 const r=summarize([{...base,externalLink:null},{...base,sentAt:"2026-09-01T00:00:00Z"},
 {...base,sentAt:"2026-11-08T00:00:00Z"}],ledger,now);
 assert.equal(r.coverage.verified_posts,0);
});
test("never calls Buffer clicks Pinterest native outbound clicks",()=>{
 const r=summarize([base],ledger,now);
 assert.match(r.metric_definitions.buffer_clicks,/NOT validated Pinterest native outbound/);
 assert.equal(typeof r.by_cohort[0].buffer_clicks,"number");
});
