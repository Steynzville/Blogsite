import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {TOPICS, CLICK_INTENT, CLICK_LEADS, creativeConversionReady, clickFocusedEditorialCopy} from "../scripts/veluce/buffer-editorial-auto.mjs";

test("every supported article topic has benefit-led click intent",()=>{
  assert.deepEqual(Object.keys(CLICK_INTENT).sort(),Object.keys(TOPICS).sort());
  assert.deepEqual(Object.keys(CLICK_LEADS).sort(),Object.keys(TOPICS).sort());
});
test("weak headlines gain an image-consistent planning hook",()=>{
  const copy=clickFocusedEditorialCopy({
    topic:"fire-pit",path:"assets/pinterest/courtyard.png",
    title:"A Sunken Brick Courtyard with a Round Fire Bowl",
    description:"Four chairs circle a fire bowl on a brick patio."
  });
  assert.match(copy.title,/Sunken Brick Courtyard/);
  assert.match(copy.title,/Plan the Seating First/);
  assert.match(copy.description,/^Will your fire-pit seating work for guests\? See Veluce's guide/);
  assert.equal(copy.copy_version,"veluce-click-v3");
});
test("already strong titles stay specific and generic CTA is replaced",()=>{
  const original="How to Layer Bedroom Lighting Without Harsh Ceiling Light";
  const copy=clickFocusedEditorialCopy({
    topic:"bedroom-layered",path:"assets/pinterest/bedroom.png",title:original,
    description:"Bedside task lighting and accent light each play a role. See Veluce's complete guide."
  });
  assert.equal(copy.title,original);
  assert.equal((copy.description.match(/guide/g)||[]).length,1);
  assert.ok(copy.description.indexOf("Veluce")<100);
  assert.ok(copy.description.length<=300);
});
test("every approved catalogue entry has a title and compelling article CTA within Pinterest limits",async()=>{
  const assets=JSON.parse(await readFile("ops/buffer/editorial-assets.json","utf8")).image_assets;
  for(const asset of assets.filter(a=>a.visually_verified)){
    const copy=clickFocusedEditorialCopy(asset);
    assert.ok(copy.title.length>=20&&copy.title.length<=100,asset.path);
    assert.ok(copy.description.length<=300,asset.path);
    assert.ok(copy.description.indexOf("Veluce")<120,asset.path);
    assert.match(copy.description,/Veluce/);
  }
});

test("new Work imagery cannot publish without proof of conversion-focused visual review",()=>{
  const older={origin:"work-generated",generated_at:"2026-11-03T12:12:00Z"};
  assert.equal(creativeConversionReady(older),true);
  const current={origin:"work-generated",generated_at:"2026-11-05T10:00:00Z"};
  assert.equal(creativeConversionReady(current),false);
  assert.equal(creativeConversionReady({...current,conversion_verified:true,conversion_visual_kind:"headline-overlay",conversion_hook:"PLAN THE VIEW"}),false);
  assert.equal(creativeConversionReady({...current,conversion_verified:true,conversion_visual_kind:"headline-overlay",conversion_hook:"Where Should Security Cameras Face?"}),true);
  assert.equal(creativeConversionReady({...current,conversion_verified:true,conversion_visual_kind:"image-only",conversion_hook:"A focused view of concealed lights marking each garden step"}),true);
});
test("all 27 topics start descriptions with a specific reason to visit the article",()=>{
  for(const topic of Object.keys(TOPICS)){
    const copy=clickFocusedEditorialCopy({
      topic,path:"assets/pinterest/draft.jpg",title:"How to Plan a Beautiful Home Detail",
      description:"A carefully selected material and lighting arrangement demonstrates the design."
    });
    assert.ok(copy.description.indexOf("Veluce")<115,topic);
    assert.ok(copy.description.length<=300,topic);
    assert.equal(copy.copy_version,"veluce-click-v3");
  }
});

test("reviewed image-specific security hooks retain a distinctive reason to click",()=>{
  const a=clickFocusedEditorialCopy({
    topic:"security-cameras",path:"assets/pinterest/home-security-02.jpg",
    title:"Where Should a Discreet Camera Face Along Your Front Entrance?",
    click_lead:"Does the camera see the approach or only the doormat? See Veluce's discreet-camera placement guide.",
    description:"Camera installed under the eave above the lit walkway. Check the camera sightline before installation."
  });
  assert.match(a.description,/^Does the camera see the approach or only the doormat\?/);
  assert.match(a.description,/Check the camera sightline/);
  assert.equal(a.copy_version,"veluce-click-v4");
  assert.equal(a.cta_style,"image-specific-question-and-early-cta");
  assert.throws(()=>clickFocusedEditorialCopy({
    topic:"security-cameras",path:"assets/pinterest/test.jpg",title:"How to Review Camera Coverage",
    click_lead:"Boost your home! Veluce guide.",description:"Camera on eave."
  }),/Image-specific CTA must start with a useful question/);
});

test("all 107 earlier owner-uploaded Pins now have unique image-specific click leads and valid v4 output",async()=>{
  const assets=JSON.parse(await readFile("ops/buffer/editorial-assets.json","utf8")).image_assets;
  const batchIds=["garden-pergola","fire-pit","tree-uplighting","luxury-interiors"].map(s=>"2026-11-04-"+s);
  const reviewed=assets.filter(asset=>batchIds.includes(asset.source_batch));
  assert.equal(reviewed.length,107);
  assert.equal(new Set(reviewed.map(x=>x.path)).size,107);
  assert.equal(new Set(reviewed.map(x=>x.click_lead)).size,107);
  for(const asset of reviewed){
    assert.equal(asset.origin,"owner-upload",asset.path);
    assert.ok(asset.click_lead.includes("?"),asset.path);
    assert.ok(asset.click_lead.includes("Veluce"),asset.path);
    assert.ok(asset.click_lead.length>=55&&asset.click_lead.length<=145,asset.path);
    assert.equal(asset.conversion_hook,asset.click_lead.split("?")[0]+"?",asset.path);
    assert.ok(asset.conversion_review_date,asset.path);
    const copy=clickFocusedEditorialCopy(asset);
    assert.equal(copy.copy_version,"veluce-click-v4",asset.path);
    assert.equal(copy.cta_style,"image-specific-question-and-early-cta",asset.path);
    assert.ok(copy.description.startsWith(asset.click_lead),asset.path);
    assert.ok(copy.description.length<=300,asset.path);
    assert.ok(copy.description.indexOf("Veluce")<=110,asset.path);
    assert.ok(copy.title.length<=100,asset.path);
  }
});

test("all 30 owner-uploaded patio decor Pins have unique click-v4 copy and subject-eligible boards",async()=>{
  const assets=JSON.parse(await readFile("ops/buffer/editorial-assets.json","utf8")).image_assets;
  const coverage=JSON.parse(await readFile("ops/buffer/editorial-board-coverage.json","utf8"));
  const boards=JSON.parse(await readFile("ops/buffer/boards.json","utf8")).boards;
  const liveIds=new Set(boards.map(b=>String(b.id)+"|"+b.name));
  const patio=assets.filter(a=>a.source_batch==="2026-11-04-patio-decor");
  assert.equal(patio.length,30);
  assert.equal(new Set(patio.map(a=>a.path)).size,30);
  assert.equal(new Set(patio.map(a=>a.click_lead)).size,30);
  const supported=new Set(["garden-patio-layout","outdoor-rugs","pergola","fire-pit","garden-fireplace"]);
  for(const item of patio){
    assert.ok(supported.has(item.topic),item.path);
    assert.ok(item.visually_verified && item.origin==="owner-upload",item.path);
    assert.equal(item.conversion_visual_kind,"image-only",item.path);
    assert.equal(item.conversion_verified,true,item.path);
    assert.ok(item.click_lead.includes("?") && item.click_lead.includes("Veluce"),item.path);
    assert.ok(item.click_lead.length>=55 && item.click_lead.length<=145,item.path);
    const acceptable=(coverage.boards||[]).filter(b=>b.eligible_topics.includes(item.topic) && liveIds.has(String(b.id)+"|"+b.name));
    assert.ok(acceptable.length>0,item.path);
    assert.ok(acceptable.every(b=>["Garden & Patio Ideas & Finds 🔥","2026 Warm Organic Home Aesthetic","Attainable Luxury Outdoor Lighting","Outdoor Lighting Ideas"].includes(b.name)),item.path);
    const copy=clickFocusedEditorialCopy(item);
    assert.equal(copy.copy_version,"veluce-click-v4",item.path);
    assert.ok(copy.description.startsWith(item.click_lead),item.path);
    assert.ok(copy.description.length<=300 && copy.title.length<=100,item.path);
  }
});

test("all 230 eligible Pins have unique individual click hooks and valid topic-specific Pinterest boards",async()=>{
  const assets=JSON.parse(await readFile("ops/buffer/editorial-assets.json","utf8")).image_assets;
  const coverage=JSON.parse(await readFile("ops/buffer/editorial-board-coverage.json","utf8"));
  const live=JSON.parse(await readFile("ops/buffer/boards.json","utf8")).boards;
  const liveIds=new Set(live.map(b=>String(b.id)+"|"+b.name));
  const published=assets.filter(a=>a.visually_verified);
  const held=assets.filter(a=>a.visually_verified!==true);
  assert.equal(assets.length,234);
  assert.equal(published.length,230);
  assert.equal(held.length,4);
  assert.equal(new Set(published.map(a=>a.click_lead)).size,230);
  for(const a of published){
    assert.ok(a.click_lead && a.click_lead.includes("?") && a.click_lead.includes("Veluce"),a.path);
    assert.ok(a.click_lead.length>=55 && a.click_lead.length<=145,a.path);
    assert.equal(a.conversion_verified,true,a.path);
    assert.equal(a.conversion_hook,a.click_lead.split("?")[0]+"?",a.path);
    assert.ok(["image-only","headline-overlay"].includes(a.conversion_visual_kind),a.path);
    const matching=coverage.boards.filter(b=>b.eligible_topics.includes(a.topic)&&liveIds.has(String(b.id)+"|"+b.name));
    assert.ok(matching.length>0,"No topic-eligible live Pinterest board for "+a.path);
    const copy=clickFocusedEditorialCopy(a);
    assert.equal(copy.copy_version,"veluce-click-v4",a.path);
    assert.ok(copy.description.startsWith(a.click_lead),a.path);
    assert.ok(copy.description.length<=300 && copy.title.length<=100,a.path);
  }
  for(const a of held){
    assert.equal(a.integrity_status,"rejected_truncated_png",a.path);
    assert.ok(!a.click_lead,"Quarantined corrupt asset must never be reactivated");
  }
});
test("legacy curated images remain independent and recent owner batches retain their hooks",async()=>{
  const assets=JSON.parse(await readFile("ops/buffer/editorial-assets.json","utf8")).image_assets;
  const recent=new Set(["garden-pergola","fire-pit","tree-uplighting","luxury-interiors","home-security","patio-decor"].map(x=>"2026-11-04-"+x));
  const earlier=assets.filter(a=>!recent.has(a.source_batch));
  assert.equal(earlier.length,73);
  assert.equal(earlier.filter(a=>a.visually_verified && a.click_lead && a.conversion_review_method).length,69);
  assert.equal(earlier.filter(a=>!a.visually_verified && a.integrity_status==="rejected_truncated_png").length,4);
  assert.equal(assets.filter(a=>recent.has(a.source_batch)&&a.visually_verified).length,161);
});
