import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {localDate,dimensions,chooseAsset,performanceScores,eligibleBoardsForTopic,chooseBoardPlacement,TOPICS} from "../scripts/veluce/buffer-editorial-auto.mjs";

test("South African local day is used for four daily slots",()=>{
  assert.equal(localDate(new Date("2026-10-18T22:30:00Z")),"2026-10-19");
  assert.equal(localDate(new Date("2026-10-19T21:30:00Z")),"2026-10-19");
});
test("PNG dimensions require a complete file, not just the IHDR",async()=>{
  const b=await readFile("assets/pinterest/studio-editorial-pergola-20261027-d4.png");
  assert.deepEqual(dimensions(b),{width:1024,height:1536,mime:"image/png"});
  assert.throws(()=>dimensions(b.subarray(0,786446)),/Truncated PNG/);
});
test("WebP VP8X dimensions read correctly",()=>{
  const b=Buffer.alloc(40);b.write("RIFF",0);b.writeUInt32LE(32,4);b.write("WEBP",8);b.write("VP8X",12);
  b.writeUIntLE(1023,24,3);b.writeUIntLE(1535,27,3);
  assert.deepEqual(dimensions(b),{width:1024,height:1536,mime:"image/webp"});
});
test("Unused topic must be legitimate and file must exist",()=>{
  const a={path:"assets/pinterest/a.png",topic:"pergola",visually_verified:true,sha:"111",title:"Test"};
  const b={path:"assets/pinterest/b.png",topic:"fire-pit",visually_verified:true,sha:"222",title:"Test"};
  assert.equal(chooseAsset([a,b],[],"2026-10-19",new Set([b.path])).path,b.path);
});
test("Matching GitHub content hash prevents renamed duplicate",()=>{
  const a={path:"assets/pinterest/a.png",topic:"pergola",visually_verified:true,sha:"duplicate-sha"};
  const b={path:"assets/pinterest/b.png",topic:"fire-pit",visually_verified:true,sha:"unique-sha"};
  const posts=[{source_blob_sha:"duplicate-sha",image_url:"https://elsewhere.invalid/old.png"}];
  assert.equal(chooseAsset([a,b],posts,"2026-10-19",new Set([a.path,b.path])).path,b.path);
});
test("Previously published image URL is never selected again",()=>{
  const a={path:"assets/pinterest/a.png",topic:"pergola",visually_verified:true,sha:"sha-one"};
  const p=[{image_url:"https://raw.githubusercontent.com/Steynzville/Blogsite/main/assets/pinterest/a.png"}];
  assert.equal(chooseAsset([a],p,"2026-10-19",new Set([a.path])),null);
});
test("Fair topic distribution avoids routing every Pin to the same board",()=>{
  const a={path:"assets/pinterest/a.png",topic:"pergola",visually_verified:true,sha:"a"};
  const b={path:"assets/pinterest/b.png",topic:"fire-pit",visually_verified:true,sha:"b"};
  const posts=[{workflow:"veluce_editorial",local_date:"2026-10-19",topic:"pergola",image_url:"different-image"}];
  assert.equal(chooseAsset([a,b],posts,"2026-10-19",new Set([a.path,b.path])).topic,"fire-pit");
});
test("Two curated topics use distinct genuine boards and published article slugs",()=>{
  assert.notEqual(TOPICS.pergola.board,TOPICS["fire-pit"].board);
  assert.match(TOPICS.pergola.path,/^\/article\/[a-z-]+\/$/);
  assert.match(TOPICS["fire-pit"].path,/^\/article\/[a-z-]+\/$/);
});
test("All curated assets refer to real repo source files and approved topics",async()=>{
  const manifest=JSON.parse(await readFile("ops/buffer/editorial-assets.json","utf8"));
  assert.ok(manifest.image_assets.length>=29);
  assert.equal(new Set(manifest.image_assets.map(v=>v.path)).size,manifest.image_assets.length);
  for(const v of manifest.image_assets){
    assert.ok(TOPICS[v.topic],v.path);
    if(v.integrity_status==="rejected_truncated_png"){
      assert.equal(v.visually_verified,false,`Damaged PNG was not quarantined: ${v.path}`);
      const rejected=await readFile(v.path);
      assert.throws(()=>dimensions(rejected),/Truncated PNG/);
      continue;
    }
    assert.equal(v.visually_verified,true,`Visual approval missing: ${v.path}`);
    assert.ok(v.visual_description?.length>25,`Subject annotation missing: ${v.path}`);
    assert.match(v.visual_review_date,/^20[0-9]{2}-[0-9]{2}-[0-9]{2}$/);
    assert.match(v.path,/^assets\/pinterest\/[a-z0-9-]+\.(png|webp|jpg)$/);
    const b=await readFile(v.path);
    const d=dimensions(b);
    assert.ok(d.width>600 && d.height>900,v.path);
    assert.ok(Math.abs(d.width/d.height-2/3)<0.045,v.path+" "+d.width+"x"+d.height);
    assert.ok(v.title.length>8 && v.title.length<=100);
  }
});

test("Unreviewed assets are never selected despite otherwise valid metadata",()=>{
  const bad={path:"assets/pinterest/unreviewed.png",topic:"fire-pit",sha:"unique",title:"Fire pit"};
  assert.equal(chooseAsset([bad],[],"2026-10-19",new Set([bad.path])),null);
});
test("First 20 owner upload IDs have explicit subject-verified classification, not batch labels",async()=>{
 const manifest=JSON.parse(await readFile("ops/buffer/editorial-assets.json","utf8"));
 const exact={
 "05f593a0":"fire-pit","26e41950":"fire-pit","4db6b7a0":"fire-pit","50e90140":"fire-pit",
 "5b3cfa50":"fire-pit","85ee0b50":"fire-pit","8e91ce40":"fire-pit","accb30f0":"fire-pit",
 "c57c2f90":"fire-pit","e9a144a0":"fire-pit",
 "03d492f0":"pergola","22ae5ee0":"pergola","4460e2c0":"pergola","552f19f0":"pergola",
 "5818d6f0":"pergola","8282d760":"pergola","9b7c5810":"pergola","b77400c0":"pergola",
 "f6b029e0":"pergola","fc5c30a0":"pergola"};
 const reviewed=manifest.image_assets.filter(x=>Object.hasOwn(exact,x.path.split("/").at(-1).slice(0,8)));
 assert.equal(reviewed.length,20);
 for(const item of reviewed){
   const prefix=item.path.split("/").at(-1).slice(0,8);
   assert.equal(item.topic,exact[prefix],item.path);
   assert.equal(item.visually_verified,true,item.path);
   assert.ok(item.visual_description && item.description);
 }
});

test("nine additional individually approved vertical assets target the correct editorial subjects",async()=>{
  const manifest=JSON.parse(await readFile("ops/buffer/editorial-assets.json","utf8"));
  const mapped={
   "14c45430":"tree-uplighting","707cf8a0":"tree-uplighting","883ee3b0":"tree-uplighting",
   "956d2d40":"pathway-lighting","ca48c0e0":"tree-uplighting",
   "d3c1be80":"pergola","d5e513b0":"pathway-lighting",
   "d76c01d0":"pergola","dae37550":"pergola"
  };
  const reviewed=manifest.image_assets.filter(item=>Object.hasOwn(mapped,item.path.split("/").at(-1).slice(0,8)));
  assert.equal(reviewed.length,9);
  for(const item of reviewed){
    const prefix=item.path.split("/").at(-1).slice(0,8);
    assert.equal(item.topic,mapped[prefix],item.path);
    assert.equal(item.visually_verified,true,item.path);
    assert.ok(item.visual_description.length>25);
  }
});
test("tree and pathway Pins use verified distinct live article paths",()=>{
  assert.equal(TOPICS["tree-uplighting"].path,"/article/hidden-uplighting-mature-trees/");
  assert.equal(TOPICS["pathway-lighting"].path,"/article/garden-pathway-lighting/");
  assert.equal(TOPICS["tree-uplighting"].board,"Outdoor Lighting Ideas");
  assert.equal(TOPICS["pathway-lighting"].board,"Outdoor Lighting Ideas");
  assert.notEqual(TOPICS["fire-pit"].board,TOPICS["tree-uplighting"].board);
});

test("Owner-uploaded approved images take precedence over generated stock",()=>{
 const files=new Set(["assets/pinterest/user.png","assets/pinterest/work.png"]);
 const entries=[
  {path:"assets/pinterest/work.png",topic:"pergola",sha:"one",visually_verified:true,origin:"work-generated"},
  {path:"assets/pinterest/user.png",topic:"fire-pit",sha:"two",visually_verified:true,origin:"owner-upload"}
 ];
 assert.equal(chooseAsset(entries,[],"2026-10-20",files).origin,"owner-upload");
});
test("Approved provenance is explicitly recorded for all curated source files",async()=>{
 const manifest=JSON.parse(await readFile("ops/buffer/editorial-assets.json","utf8"));
 for(const asset of manifest.image_assets){
   assert.ok(["owner-upload","work-generated"].includes(asset.origin),asset.path);
   if(asset.origin==="work-generated"){
     assert.ok(asset.visual_review_method && asset.visual_description && (asset.visually_verified || asset.integrity_status==="rejected_truncated_png"));
   }
 }
});

test("Additional article topics retain verified live slugs and subject boards",()=>{
  assert.equal(TOPICS["copper-lanterns"].path,"/article/copper-lanterns-age-with-grace/");
  assert.equal(TOPICS["led-deck-strips"].path,"/article/led-strip-integration-modern-deck/");
  assert.equal(TOPICS["tree-moonlighting"].path,"/article/moonlighting-tree-canopies/");
  for(const t of ["copper-lanterns","led-deck-strips","tree-moonlighting"])
    assert.equal(TOPICS[t].board,"Outdoor Lighting Ideas");
});
test("An unapproved creative cannot be selected regardless of outbound-click score",()=>{
  const p={path:"assets/pinterest/a.jpg",topic:"copper-lanterns",visually_verified:false,sha:"a"};
  assert.equal(chooseAsset([p],[],"2026-11-02",new Set([p.path]),{"copper-lanterns":0.9}),null);
});
test("Organic click evidence breaks ties but cannot override daily diversity or stale-data guard",async()=>{
  const data=JSON.parse(await readFile("ops/buffer/editorial-performance.json","utf8"));
  const scores=performanceScores(data,"2026-11-02");
  assert.ok(scores["copper-lanterns"]>scores.pergola);
  // Both sample Work images must pass the conversion gate; this test checks
  // click-score ranking, not rejection of unreviewed creative assets.
  const approvedWork={origin:"work-generated",visually_verified:true,
    generated_at:"2026-11-05T12:00:00Z",conversion_verified:true,
    conversion_visual_kind:"image-only",
    conversion_hook:"Clear, specific visual comparison of practical design choices"};
  const x=[
    {path:"assets/pinterest/a.jpg",topic:"copper-lanterns",sha:"a",...approvedWork},
    {path:"assets/pinterest/b.jpg",topic:"pergola",sha:"b",...approvedWork}
  ];
  const paths=new Set(x.map(p=>p.path));
  assert.equal(chooseAsset(x,[],"2026-11-02",paths,scores).topic,"copper-lanterns");
  assert.equal(chooseAsset(x,[{workflow:"veluce_editorial",local_date:"2026-11-02",topic:"copper-lanterns",image_url:"old"}],"2026-11-02",paths,scores).topic,"pergola");
  assert.deepEqual(performanceScores(data,"2027-01-15"),{});
  const corrupted=structuredClone(data);
  corrupted.topics["copper-lanterns"].impressions+=1000;
  assert.equal(performanceScores(corrupted,"2026-11-02")["copper-lanterns"],undefined);
});

test("Every one of 12 active Pinterest boards is inventoried; All Pins is not a board",async()=>{
  const data=JSON.parse(await readFile("ops/buffer/editorial-board-coverage.json","utf8"));
  const live=JSON.parse(await readFile("ops/buffer/boards.json","utf8")).boards;
  assert.equal(data.boards.length,12);
  assert.deepEqual(new Set(data.boards.map(x=>x.id)),new Set(live.map(x=>x.id)));
  assert.equal(data.boards.some(x=>x.name==="All Pins"),false);
  for(const board of data.boards){
    assert.equal(new Set(board.eligible_topics).size,board.eligible_topics.length);
    board.eligible_topics.forEach(t=>assert.ok(TOPICS[t],t));
  }
});
test("Broader editorial article topics include kitchens, bedrooms, security and interiors",()=>{
  for(const name of ["bedroom-layered","kitchen-layout","security-cameras","interior-design","smart-access"])
    assert.match(TOPICS[name].path,/^\/article\/[a-z0-9-]+\/$/);
});
test("Board rotation chooses least-served matching boards, not outdoor board always",async()=>{
  const coverage=JSON.parse(await readFile("ops/buffer/editorial-board-coverage.json","utf8"));
  const names=eligibleBoardsForTopic("pergola",coverage).map(x=>x.name);
  assert.ok(names.includes("Garden & Patio Ideas & Finds 🔥"));
  assert.ok(names.includes("Outdoor Lighting Ideas"));
  const a=chooseBoardPlacement("pergola",[],"2026-11-02",coverage);
  const prior=[{workflow:"veluce_editorial",local_date:"2026-11-01",topic:"pergola",board_service_id:a.id}];
  assert.notEqual(chooseBoardPlacement("pergola",prior,"2026-11-02",coverage).id,a.id);
  const firstBedroom=chooseBoardPlacement("bedroom-layered",[],"2026-11-02",coverage);
  assert.ok(eligibleBoardsForTopic("bedroom-layered",coverage).some(b=>b.name==="Cozy Bedroom Ideas & Finds 🔥"));
  assert.equal(chooseBoardPlacement("bedroom-layered",[{workflow:"veluce_editorial",local_date:"2026-11-01",board_service_id:firstBedroom.id}],"2026-11-02",coverage)?.name,"Cozy Bedroom Ideas & Finds 🔥");
  assert.equal(chooseBoardPlacement("security-cameras",[],"2026-11-02",coverage)?.name,"Home Security Ideas & Setups");
});
test("Living and dining room interior-design Pins cannot go to the Cozy Bedroom board",async()=>{
  const coverage=JSON.parse(await readFile("ops/buffer/editorial-board-coverage.json","utf8"));
  const bedroom=coverage.boards.find(b=>b.name==="Cozy Bedroom Ideas & Finds 🔥");
  assert.ok(bedroom);
  assert.equal(bedroom.eligible_topics.includes("interior-design"),false);
  assert.equal(bedroom.eligible_topics.includes("bedroom-layered"),true);
  assert.ok(eligibleBoardsForTopic("interior-design",coverage).every(b=>b.name!=="Cozy Bedroom Ideas & Finds 🔥"));
});
test("Every approved owner batch has at least one verified, topic-eligible Pinterest board",async()=>{
  const coverage=JSON.parse(await readFile("ops/buffer/editorial-board-coverage.json","utf8"));
  const live=JSON.parse(await readFile("ops/buffer/boards.json","utf8")).boards;
  const valid=new Set(live.map(b=>String(b.id)+"|"+b.name));
  const imageAssets=JSON.parse(await readFile("ops/buffer/editorial-assets.json","utf8")).image_assets;
  for(const asset of imageAssets.filter(a=>a.visually_verified && a.source_batch?.startsWith("2026-11-04"))){
    const options=eligibleBoardsForTopic(asset.topic,coverage).filter(b=>valid.has(String(b.id)+"|"+b.name));
    assert.ok(options.length>0,"No current eligible board for "+asset.path);
  }
});
test("Deleted Laundry/Closet board is absent from both active board lists",async()=>{
  const coverage=JSON.parse(await readFile("ops/buffer/editorial-board-coverage.json","utf8"));
  const boards=JSON.parse(await readFile("ops/buffer/boards.json","utf8"));
  const retired="296815500381471059";
  assert.ok(coverage.retired_board_ids.includes(retired));
  assert.ok(boards.retired_board_ids.includes(retired));
  assert.ok(coverage.boards.every(b=>String(b.id)!==retired));
  assert.ok(boards.boards.every(b=>String(b.id)!==retired));
  assert.equal(coverage.boards.reduce((n,b)=>n+b.sections.length,0),17);
  const amazon=coverage.boards.find(b=>b.name==="Attainable Luxury Outdoor Lighting")
    .sections.find(s=>s.name==="Amazon Finds");
  assert.deepEqual(amazon.eligible_topics,[]);
});
test("Board-section recommendation is marked advisory, never verified via Buffer",async()=>{
  const coverage=JSON.parse(await readFile("ops/buffer/editorial-board-coverage.json","utf8"));
  const selected=chooseBoardPlacement("outdoor-rugs",[],"2026-11-02",coverage);
  assert.equal(selected.name,"Garden & Patio Ideas & Finds 🔥");
  assert.equal(selected.suggested_section.name,"Garden & Patio Decor");
});
