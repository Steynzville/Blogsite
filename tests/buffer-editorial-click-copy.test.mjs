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
test("all supported topics start descriptions with a specific reason to visit the article",()=>{
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

test("all verified Pins have unique individual click hooks and valid topic-specific Pinterest boards",async()=>{
  const assets=JSON.parse(await readFile("ops/buffer/editorial-assets.json","utf8")).image_assets;
  const coverage=JSON.parse(await readFile("ops/buffer/editorial-board-coverage.json","utf8"));
  const live=JSON.parse(await readFile("ops/buffer/boards.json","utf8")).boards;
  const liveIds=new Set(live.map(b=>String(b.id)+"|"+b.name));
  const published=assets.filter(a=>a.visually_verified);
  const held=assets.filter(a=>a.visually_verified!==true);
  // New, genuinely verified Work-generated images increase the catalogue over time.
  // Protect the original quality baseline without freezing inventory counts.
  assert.ok(assets.length>=320,"Previously approved image inventory shrank");
  assert.ok(published.length>=316,"Previously verified image inventory shrank");
  assert.equal(held.length,4);
  assert.equal(new Set(assets.map(a=>a.path)).size,assets.length,"Every image needs a unique file path");
  assert.equal(new Set(published.map(a=>a.click_lead)).size,published.length);
  for(const a of published){
    assert.ok(a.click_lead && a.click_lead.includes("?") && a.click_lead.includes("Veluce"),a.path);
    assert.ok(a.click_lead.length>=55 && a.click_lead.length<=145,a.path);
    // Earlier owner-approved batches store review provenance without the newer
    // conversion_verified flag. The latest home-security image hook is descriptive,
    // while its actual customer-facing question is in click_lead.
    assert.ok(a.conversion_verified===true || Boolean(a.conversion_review_date),a.path);
    assert.ok(typeof a.conversion_hook==="string" && a.conversion_hook.length>=15,a.path);
    assert.ok(["image-only","headline-overlay"].includes(a.conversion_visual_kind) ||
      Boolean(a.conversion_review_date),a.path);
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
  // This is a frozen *legacy* cohort; fresh single-use Work-generated assets
  // are not part of it and must not break its historical assertions.
  const earlier=assets.filter(a=>!(a.origin==="work-generated" && a.post_specific===true) && !recent.has(a.source_batch) && !["2026-11-05-kitchen-essentials","2026-11-05-smart-home","2026-11-05-led-landscape-boost"].includes(a.source_batch));
  assert.equal(earlier.length,73);
  assert.equal(earlier.filter(a=>a.visually_verified && a.click_lead && a.conversion_review_method).length,69);
  assert.equal(earlier.filter(a=>!a.visually_verified && a.integrity_status==="rejected_truncated_png").length,4);
  assert.equal(assets.filter(a=>recent.has(a.source_batch)&&a.visually_verified).length,161);
});

test("28 kitchen essentials Pins must match source bytes, the dedicated guide and two genuine kitchen boards",async()=>{
  const {execFileSync}=await import("node:child_process");
  const {dimensions,TOPICS,clickFocusedEditorialCopy,eligibleBoardsForTopic}=await import("../scripts/veluce/buffer-editorial-auto.mjs");
  const assets=JSON.parse(await readFile("ops/buffer/editorial-assets.json","utf8")).image_assets;
  const coverage=JSON.parse(await readFile("ops/buffer/editorial-board-coverage.json","utf8"));
  const boards=JSON.parse(await readFile("ops/buffer/boards.json","utf8")).boards;
  const article=await readFile("content/articles/everyday-kitchen-essentials-organization.md","utf8");
  const kitchen=assets.filter(a=>a.source_batch==="2026-11-05-kitchen-essentials");
  assert.equal(kitchen.length,28);
  assert.equal(new Set(kitchen.map(a=>a.path)).size,28);
  assert.equal(new Set(kitchen.map(a=>a.source_blob_sha)).size,28);
  assert.equal(new Set(kitchen.map(a=>a.click_lead)).size,28);
  assert.equal(kitchen.filter(a=>a.origin==="owner-upload"&&a.visually_verified&&a.conversion_verified).length,28);
  assert.match(article,/slug:\s*"everyday-kitchen-essentials-organization"/);
  assert.match(article,/pantry jars/i);
  assert.match(article,/under-sink/i);
  assert.match(article,/## Explore More/);
  assert.match(article,/https:\/\/tr.ee\/Sp8jyc/);
  assert.equal(TOPICS["kitchen-essentials"].path,"/article/everyday-kitchen-essentials-organization/");
  const liveIds=new Set(boards.map(b=>String(b.id)+"|"+b.name));
  const eligible=eligibleBoardsForTopic("kitchen-essentials",coverage).filter(b=>liveIds.has(String(b.id)+"|"+b.name));
  assert.deepEqual(eligible.map(b=>b.name).sort(),["Kitchen Essentials & Must-Haves 🔥","Kitchen Organization Ideas"].sort());
  for(const a of kitchen){
    assert.equal(a.topic,"kitchen-essentials");
    assert.match(a.path,/^assets\/pinterest\/kitchen-essentials-[a-z0-9-]+\.jpg$/);
    assert.equal(a.conversion_visual_kind,"image-only");
    assert.equal(a.conversion_hook,a.click_lead.split("?")[0]+"?");
    assert.ok(a.click_lead.includes("Veluce")&&a.click_lead.length>=55&&a.click_lead.length<=145);
    const buf=await readFile(a.path);
    assert.deepEqual(dimensions(buf),{width:1000,height:1500,mime:"image/jpeg"},a.path);
    assert.equal(execFileSync("git",["hash-object",a.path],{encoding:"utf8"}).trim(),a.source_blob_sha,a.path);
    const copy=clickFocusedEditorialCopy(a);
    assert.equal(copy.copy_version,"veluce-click-v4",a.path);
    assert.equal(copy.cta_style,"image-specific-question-and-early-cta",a.path);
    assert.ok(copy.description.startsWith(a.click_lead),a.path);
    assert.ok(copy.description.length<=300&&copy.title.length<=100,a.path);
  }
});

test("30 smart-home owner JPGs have unique SEO copy, accurate article topics, safe image URLs and exact hashes",async()=>{
  const {execFileSync}=await import("node:child_process");
  const {TOPICS,dimensions,clickFocusedEditorialCopy,editorialAssetImageUrl}=await import("../scripts/veluce/buffer-editorial-auto.mjs");
  const data=JSON.parse(await readFile("ops/buffer/editorial-assets.json","utf8")).image_assets;
  const items=data.filter(x=>x.source_batch==="2026-11-05-smart-home");
  const article=await readFile("content/articles/smart-home-planning-by-room.md","utf8");
  assert.equal(items.length,30);
  assert.equal(new Set(items.map(x=>x.path)).size,30);
  assert.equal(new Set(items.map(x=>x.source_blob_sha)).size,30);
  assert.equal(new Set(items.map(x=>x.click_lead)).size,30);
  assert.match(article,/slug:\s*"smart-home-planning-by-room"/);
  assert.match(article,/Wi-Fi|offline/i);
  assert.match(article,/privacy/i);
  assert.match(article,/nursery/i);
  assert.match(article,/energy/i);
  assert.match(article,/## Explore More/);
  assert.match(article,/https:\/\/tr.ee\/Sp8jyc/);
  assert.equal(TOPICS["smart-home-planning"].path,"/article/smart-home-planning-by-room/");
  const validTopics=new Set(["smart-home-planning","smart-blinds","smart-lighting","smart-access","security-cameras","perimeter-security"]);
  const expected={
    "smart-access":3,"smart-blinds":4,"smart-lighting":7,"smart-home-planning":13,
    "security-cameras":1,"perimeter-security":2
  };
  assert.deepEqual(Object.fromEntries(Object.entries(expected).map(([k,v])=>[k,items.filter(x=>x.topic===k).length])),expected);
  for(const a of items){
    assert.ok(validTopics.has(a.topic),a.path);
    assert.equal(a.origin,"owner-upload",a.path);
    assert.equal(a.conversion_verified,true,a.path);
    assert.equal(a.visually_verified,true,a.path);
    assert.equal(a.conversion_visual_kind,"image-only",a.path);
    assert.match(a.path,/^assets\/pinterest\/smart-home[-a-z0-9 ()]+\.jpg$/);
    assert.ok(a.click_lead.startsWith(a.conversion_hook) && a.click_lead.includes("Veluce"),a.path);
    assert.ok(a.click_lead.length>=55 && a.click_lead.length<=145,a.path);
    assert.ok(a.allowed_board_service_ids?.length>=1,a.path);
    const img=await readFile(a.path);
    assert.deepEqual(dimensions(img),{width:1000,height:1500,mime:"image/jpeg"},a.path);
    assert.equal(execFileSync("git",["hash-object",a.path],{encoding:"utf8"}).trim(),a.source_blob_sha,a.path);
    const pin=clickFocusedEditorialCopy(a);
    assert.equal(pin.copy_version,"veluce-click-v4",a.path);
    assert.equal(pin.cta_style,"image-specific-question-and-early-cta",a.path);
    assert.ok(pin.description.startsWith(a.click_lead) && pin.description.length<=300,a.path);
    assert.ok(pin.title.length<=100,a.path);
    const url=editorialAssetImageUrl(a);
    assert.ok(url.startsWith("https://raw.githubusercontent.com/Steynzville/Blogsite/main/assets/pinterest/"),a.path);
    assert.ok(!url.includes(" "),a.path);
  }
  const unusual=items.find(x=>x.path.endsWith("smart-home-04-connected-kitchen (2).jpg"));
  assert.ok(unusual);
  assert.match(editorialAssetImageUrl(unusual),/connected-kitchen%20\(2\)\.jpg$/);
});
test("smart-home Pins are restricted to real scene-relevant boards (no living room on bedroom board)",async()=>{
  const {chooseBoardPlacement}=await import("../scripts/veluce/buffer-editorial-auto.mjs");
  const assets=JSON.parse(await readFile("ops/buffer/editorial-assets.json","utf8")).image_assets;
  const coverage=JSON.parse(await readFile("ops/buffer/editorial-board-coverage.json","utf8"));
  const boards=JSON.parse(await readFile("ops/buffer/boards.json","utf8")).boards;
  const liveById=new Map(boards.map(b=>[String(b.id),b.name]));
  const batch=assets.filter(x=>x.source_batch==="2026-11-05-smart-home");
  const available=new Set([
    "Smart Home Ideas & Gadgets 🔥","Cozy Bedroom Ideas & Finds 🔥",
    "Modern Home Decor Ideas & Finds 🔥","Smart Home Security Systems",
    "Home Security Ideas & Setups"
  ]);
  const used=new Set();
  for(const a of batch){
    for(const id of a.allowed_board_service_ids){
      assert.ok(liveById.has(String(id))&&available.has(liveById.get(String(id))),a.path);
    }
    const selection=chooseBoardPlacement(a.topic,[],"2026-11-05",coverage,a);
    assert.ok(selection,a.path);
    assert.ok(a.allowed_board_service_ids.includes(selection.id),a.path);
    assert.equal(liveById.get(selection.id),selection.name,a.path);
    used.add(selection.name);
    const isBedroom=/bedroom/.test(a.path);
    if(!isBedroom)assert.notEqual(selection.name,"Cozy Bedroom Ideas & Finds 🔥",a.path);
    if(a.topic==="smart-home-planning")assert.deepEqual(a.allowed_board_service_ids,["296815500381472108"],a.path);
    if(a.topic==="smart-lighting")assert.ok(!a.allowed_board_service_ids.includes("296815500381470761"),a.path);
  }
  const cinema=batch.find(a=>a.path.endsWith("smart-home-05-cinema-lighting.jpg"));
  const bedroom=batch.find(a=>a.path.endsWith("smart-home-pinterest-04-bedroom.jpg"));
  assert.ok(cinema && bedroom);
  assert.equal(cinema.allowed_board_service_ids.includes("296815500381470761"),false);
  assert.equal(bedroom.allowed_board_service_ids.includes("296815500381470761"),true);
  assert.throws(()=>chooseBoardPlacement(cinema.topic,[],"2026-11-05",coverage,{...cinema,allowed_board_service_ids:["NOT_A_BOARD"]}),/Invalid image-specific Pinterest board allowlist/);
});

test("all 28 landscape lighting images have unique CTR hooks and accurate LED or pathway article destinations",async()=>{
  const {execFileSync}=await import("node:child_process");
  const {dimensions,chooseBoardPlacement,clickFocusedEditorialCopy,editorialAssetImageUrl}=await import("../scripts/veluce/buffer-editorial-auto.mjs");
  const assets=JSON.parse(await readFile("ops/buffer/editorial-assets.json","utf8")).image_assets;
  const coverage=JSON.parse(await readFile("ops/buffer/editorial-board-coverage.json","utf8"));
  const active=JSON.parse(await readFile("ops/buffer/boards.json","utf8")).boards;
  const batch=assets.filter(a=>a.source_batch==="2026-11-05-led-landscape-boost");
  assert.equal(batch.length,28);
  assert.equal(new Set(batch.map(a=>a.path)).size,28);
  assert.equal(new Set(batch.map(a=>a.source_blob_sha)).size,28);
  assert.equal(new Set(batch.map(a=>a.click_lead)).size,28);
  assert.equal(batch.filter(a=>a.topic==="led-deck-strips").length,19);
  assert.equal(batch.filter(a=>a.topic==="pathway-lighting").length,9);
  const byId=new Map(active.map(b=>[String(b.id),b.name]));
  for(const a of batch){
    assert.equal(a.origin,"owner-upload",a.path);
    assert.equal(a.visually_verified,true,a.path);
    assert.equal(a.conversion_verified,true,a.path);
    assert.ok(a.click_lead.startsWith(a.conversion_hook),a.path);
    assert.ok(a.click_lead.includes("Veluce") && a.click_lead.length>=65 && a.click_lead.length<=145,a.path);
    assert.match(a.path,/^assets\/pinterest\/landscape-lighting-\d\d\.jpg$/,a.path);
    assert.ok(["image-only","headline-overlay"].includes(a.conversion_visual_kind),a.path);
    const bytes=await readFile(a.path);
    assert.deepEqual(dimensions(bytes),{width:1000,height:1500,mime:"image/jpeg"},a.path);
    assert.equal(execFileSync("git",["hash-object",a.path],{encoding:"utf8"}).trim(),a.source_blob_sha,a.path);
    const boards=a.allowed_board_service_ids;
    assert.ok(Array.isArray(boards) && boards.length>=2,a.path);
    for(const id of boards){
      assert.ok(byId.has(String(id)),a.path);
      assert.ok(["Outdoor Lighting Ideas","Attainable Luxury Outdoor Lighting","Garden & Patio Ideas & Finds 🔥"].includes(byId.get(String(id))),a.path);
      assert.ok(coverage.boards.some(b=>String(b.id)===String(id) && b.eligible_topics.includes(a.topic)),a.path);
      assert.notEqual(byId.get(String(id)),"AliExpress Attainable Luxury Lighting",a.path);
    }
    const selected=chooseBoardPlacement(a.topic,[],"2026-11-05",coverage,a);
    assert.ok(selected && boards.includes(selected.id),a.path);
    const expected=a.topic==="led-deck-strips"?
      "/article/led-strip-integration-modern-deck/":"/article/garden-pathway-lighting/";
    assert.equal(TOPICS[a.topic].path,expected,a.path);
    const pin=clickFocusedEditorialCopy(a);
    assert.equal(pin.copy_version,"veluce-click-v4",a.path);
    assert.equal(pin.cta_style,"image-specific-question-and-early-cta",a.path);
    assert.ok(pin.description.startsWith(a.click_lead) && pin.description.length<=300,a.path);
    assert.ok(pin.title.length<=100,a.path);
    assert.ok(editorialAssetImageUrl(a).endsWith(a.path),a.path);
  }
  for(const n of [18,19]){
    const name="landscape-lighting-"+n+".jpg";
    assert.equal(batch.find(a=>a.path.endsWith(name))?.conversion_visual_kind,"headline-overlay",name);
  }
});
