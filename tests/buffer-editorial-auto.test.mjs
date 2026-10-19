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
  const a={path:"assets/pinterest/a.png",topic:"pergola",sha:"111",title:"Test"};
  const b={path:"assets/pinterest/b.png",topic:"fire-pit",sha:"222",title:"Test"};
  assert.equal(chooseAsset([a,b],[],"2026-10-19",new Set([b.path])).path,b.path);
});
test("Matching GitHub content hash prevents renamed duplicate",()=>{
  const a={path:"assets/pinterest/a.png",topic:"pergola",sha:"duplicate-sha"};
  const b={path:"assets/pinterest/b.png",topic:"fire-pit",sha:"unique-sha"};
  const posts=[{source_blob_sha:"duplicate-sha",image_url:"https://elsewhere.invalid/old.png"}];
  assert.equal(chooseAsset([a,b],posts,"2026-10-19",new Set([a.path,b.path])).path,b.path);
});
test("Previously published image URL is never selected again",()=>{
  const a={path:"assets/pinterest/a.png",topic:"pergola",sha:"sha-one"};
  const p=[{image_url:"https://raw.githubusercontent.com/Steynzville/Blogsite/main/assets/pinterest/a.png"}];
  assert.equal(chooseAsset([a],p,"2026-10-19",new Set([a.path])),null);
});
test("Fair topic distribution avoids routing every Pin to the same board",()=>{
  const a={path:"assets/pinterest/a.png",topic:"pergola",sha:"a"};
  const b={path:"assets/pinterest/b.png",topic:"fire-pit",sha:"b"};
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
  assert.equal(manifest.image_assets.length,20);
  assert.equal(new Set(manifest.image_assets.map(v=>v.path)).size,20);
  for(const v of manifest.image_assets){
    assert.ok(TOPICS[v.topic],v.path);
    assert.match(v.path,/^assets\/pinterest\/[a-z0-9-]+\.(png|webp|jpg)$/);
    const b=await readFile(v.path);
    const d=dimensions(b);
    assert.ok(d.width>600 && d.height>900,v.path);
    assert.ok(Math.abs(d.width/d.height-2/3)<0.045,v.path+" "+d.width+"x"+d.height);
    assert.ok(v.title.length>8 && v.title.length<=100);
  }
});
