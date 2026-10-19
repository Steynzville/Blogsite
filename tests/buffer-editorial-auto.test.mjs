import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {localDate,dimensions,chooseAsset,TOPICS} from "../scripts/veluce/buffer-editorial-auto.mjs";

test("South African local day is used for four daily slots",()=>{
  assert.equal(localDate(new Date("2026-10-18T22:30:00Z")),"2026-10-19");
  assert.equal(localDate(new Date("2026-10-19T21:30:00Z")),"2026-10-19");
});
test("PNG dimensions are validated from actual pixels",()=>{
  const b=Buffer.alloc(40);
  Buffer.from([137,80,78,71,13,10,26,10]).copy(b);
  b.writeUInt32BE(1024,16);b.writeUInt32BE(1536,20);
  assert.deepEqual(dimensions(b),{width:1024,height:1536,mime:"image/png"});
});
test("WebP VP8X dimensions read correctly",()=>{
  const b=Buffer.alloc(40);b.write("RIFF",0);b.write("WEBP",8);b.write("VP8X",12);
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
     assert.ok(asset.visual_review_method && asset.visual_description && asset.visually_verified);
   }
 }
});
