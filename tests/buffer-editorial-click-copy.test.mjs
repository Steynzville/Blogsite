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
