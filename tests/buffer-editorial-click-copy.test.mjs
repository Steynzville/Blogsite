import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {TOPICS, CLICK_INTENT, clickFocusedEditorialCopy} from "../scripts/veluce/buffer-editorial-auto.mjs";

test("every supported article topic has benefit-led click intent",()=>{
  assert.deepEqual(Object.keys(CLICK_INTENT).sort(),Object.keys(TOPICS).sort());
});
test("weak headlines gain an image-consistent planning hook",()=>{
  const copy=clickFocusedEditorialCopy({
    topic:"fire-pit",path:"assets/pinterest/courtyard.png",
    title:"A Sunken Brick Courtyard with a Round Fire Bowl",
    description:"Four chairs circle a fire bowl on a brick patio."
  });
  assert.match(copy.title,/Sunken Brick Courtyard/);
  assert.match(copy.title,/Plan the Seating First/);
  assert.match(copy.description,/Read Veluce's full guide to plan fire-pit seating/);
  assert.equal(copy.copy_version,"veluce-click-v2");
});
test("already strong titles stay specific and generic CTA is replaced",()=>{
  const original="How to Layer Bedroom Lighting Without Harsh Ceiling Light";
  const copy=clickFocusedEditorialCopy({
    topic:"bedroom-layered",path:"assets/pinterest/bedroom.png",title:original,
    description:"Bedside task lighting and accent light each play a role. See Veluce's complete guide."
  });
  assert.equal(copy.title,original);
  assert.equal((copy.description.match(/guide/g)||[]).length,1);
  assert.ok(copy.description.length<=500);
});
test("every approved catalogue entry has a title and compelling article CTA within Pinterest limits",async()=>{
  const assets=JSON.parse(await readFile("ops/buffer/editorial-assets.json","utf8")).image_assets;
  for(const asset of assets.filter(a=>a.visually_verified)){
    const copy=clickFocusedEditorialCopy(asset);
    assert.ok(copy.title.length>=20&&copy.title.length<=100,asset.path);
    assert.ok(copy.description.length<=500,asset.path);
    assert.match(copy.description,/Read Veluce's full guide to/);
  }
});
