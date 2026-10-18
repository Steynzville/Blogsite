import test from "node:test";
import assert from "node:assert/strict";
import { validatePin, checkPersisted, scheduleVerified, probeDraft, operations } from "../scripts/veluce/buffer-pinterest.mjs";

const pin = {
  creative_id: "original-garden-glow-01", title: "Warm Garden Pathway Lighting Ideas",
  description: "Discover thoughtful outdoor lighting ideas for beautiful garden paths.",
  image_url: "https://velucedesign.com/pins/garden-glow-01.jpg",
  destination_url: "https://velucedesign.com/article/garden-pathway-lighting/",
  board_service_id: "123456", publish_at: "2030-01-01T19:00:00Z", status: "ready",
};
function post(link = pin.destination_url) {
  return {id: "p1", text: pin.description, assets: [{id:"a1", mimeType:"image/jpeg"}],
    metadata: {url:link, title:pin.title, board:{serviceId:pin.board_service_id}}};
}
test("allows valid, uniquely identified first-party editorial Pin", () => {
  assert.equal(validatePin(pin), pin);
  assert.doesNotThrow(() => checkPersisted(post(), pin));
});
test("rejects affiliate links, external assets and missing destinations", () => {
  assert.throws(() => validatePin({...pin,destination_url:"https://amzn.to/abc"}));
  assert.throws(() => validatePin({...pin,image_url:"https://example.com/img.jpg"}));
  assert.throws(() => checkPersisted(post(null),pin),/mismatch/);
});
test("draft link lost -> delete draft; never schedule", async () => {
  const calls = [];
  async function api(query) {
    calls.push(query);
    if(query===operations.create) return {createPost:{post:{id:"p1"}}};
    if(query===operations.post) return {post:post(null)};
    if(query===operations.delete) return {deletePost:{id:"p1"}};
    throw new Error("edit must not be called");
  }
  await assert.rejects(() => scheduleVerified(api,pin,"channel1"),/mismatch/);
  assert.deepEqual(calls,[operations.create,operations.post,operations.delete]);
});
test("valid draft -> schedule -> re-check link and image", async () => {
  const calls=[];
  async function api(query) {
    calls.push(query);
    if(query===operations.create) return {createPost:{post:{id:"p1"}}};
    if(query===operations.post) return {post:post()};
    if(query===operations.edit) return {editPost:{post:{id:"p1"}}};
    throw new Error("unexpected request");
  }
  const result=await scheduleVerified(api,pin,"channel1");
  assert.equal(result.status,"scheduled_verified");
  assert.deepEqual(calls,[operations.create,operations.post,operations.edit,operations.post]);
});
test("lost link after scheduling -> deletes scheduled post", async () => {
  let read=0, deleted=false;
  async function api(query) {
    if(query===operations.create) return {createPost:{post:{id:"p1"}}};
    if(query===operations.post) return {post:post(++read===1?pin.destination_url:null)};
    if(query===operations.edit) return {editPost:{post:{id:"p1"}}};
    if(query===operations.delete){deleted=true;return {deletePost:{id:"p1"}};}
    throw new Error("unexpected request");
  }
  await assert.rejects(() => scheduleVerified(api,pin,"channel1"),/mismatch/);
  assert.equal(deleted,true);
});

test("temporary Buffer Pinterest draft is read, checked and deleted without scheduling", async () => {
  const old = process.env.BUFFER_CHANNEL_ID;
  process.env.BUFFER_CHANNEL_ID = "buffer-channel";
  const calls = [];
  const mock = async (query) => {
    calls.push(query);
    if (query === operations.create) return {createPost: {post: {id: "test-draft"}}};
    if (query === operations.post) return {post: {
      text: "VELUCE Buffer integration test — private draft only; do not publish.",
      assets: [{mimeType: "image/jpeg"}],
      metadata: {
        title: "Veluce API Connectivity Test — Draft Only",
        url: "https://velucedesign.com/article/led-strip-integration-modern-deck/",
        board: {serviceId: "296815500381477417"}
      }
    }};
    if (query === operations.delete) return {deletePost: {id: "test-draft"}};
    throw new Error("Unexpected operation");
  };
  try {
    const out = await probeDraft(mock);
    assert.equal(out.status, "probe_passed_and_deleted");
    assert.deepEqual(calls, [operations.create, operations.post, operations.delete]);
  } finally {
    if (old === undefined) delete process.env.BUFFER_CHANNEL_ID;
    else process.env.BUFFER_CHANNEL_ID = old;
  }
});

test("share-now uses guarded draft-first flow before Buffer shareNow edit", async () => {
  const nowPin={...pin, publish_at:"now"};
  const calls=[];
  async function api(query,vars) {
    calls.push({query,vars});
    if(query===operations.create) return {createPost:{post:{id:"p1"}}};
    if(query===operations.post) return {post:post()};
    if(query===operations.edit) return {editPost:{post:{id:"p1"}}};
    throw new Error("unexpected request");
  }
  const outcome=await scheduleVerified(api,nowPin,"channel1");
  assert.equal(outcome.status,"submitted_now_verified");
  assert.equal(calls[2].vars.input.mode,"shareNow");
  assert.equal(calls[2].vars.input.dueAt,undefined);
  assert.equal(calls[2].vars.input.text,nowPin.description);
  assert.deepEqual(calls[2].vars.input.assets,[{image:{url:nowPin.image_url}}]);
  assert.equal(calls[2].vars.input.metadata.pinterest.url,nowPin.destination_url);
});
test("allows only Veluce or exact Blogsite raw first-party images",()=>{
  assert.doesNotThrow(()=>validatePin({...pin,image_url:"https://raw.githubusercontent.com/Steynzville/Blogsite/main/assets/pinterest/50e90140-668f-11f1-9181-2778cad0ff11.png"}));
  assert.throws(()=>validatePin({...pin,image_url:"https://raw.githubusercontent.com/other/repo/main/assets/pinterest/50e90140.png"}));
});

test("six product destinations are supported only for matching named product rotation", () => {
 const m = {
  "Outdoor Lighting Blueprint":"/outdoor-lighting-blueprint",
  "Luxury Outdoor Room Planner":"/luxury-outdoor-room-planner",
  "Designer Brief Builder":"/designer-brief-builder",
  "Luxury Lighting Formula":"/luxury-lighting-formula",
  "Room Procurement System":"/room-procurement-system",
  "Complete Home Design System":"/complete-home-design-system",
 };
 for (const [product,path] of Object.entries(m)) {
   const p = {...pin,workflow:"veluce_six_product_cover_rotation_v1",product,
    image_url:"https://raw.githubusercontent.com/Steynzville/Blogsite/main/assets/pinterest-products/studio-product-"+product.toLowerCase().replaceAll(" ","-")+"-c3.png",
    destination_url:"https://velucedesign.com"+path};
   assert.doesNotThrow(() => validatePin(p),product);
   assert.doesNotThrow(() => validatePin({...p,destination_url:p.destination_url+"/"}),product);
   assert.throws(()=>validatePin({...p,destination_url:"https://velucedesign.com/article/"+path.slice(1)+"/"}),/product page/i);
   assert.throws(()=>validatePin({...p,destination_url:"https://velucedesign.com/another-product/"}),/product page/i);
 }
});

test("product and editorial Pins cannot swap image source folders or destinations",()=>{
 const product={...pin, workflow:"veluce_six_product_cover_rotation_v1",product:"Room Procurement System",
  image_url:"https://raw.githubusercontent.com/Steynzville/Blogsite/main/assets/pinterest-products/studio-product-room-procurement-system-c3.png",
  destination_url:"https://velucedesign.com/room-procurement-system/"};
 assert.doesNotThrow(()=>validatePin(product));
 assert.throws(()=>validatePin({...pin,destination_url:product.destination_url}),/article/i);
 assert.throws(()=>validatePin({...pin,image_url:product.image_url}),/asset folders/i);
 assert.throws(()=>validatePin({...product,image_url:"https://raw.githubusercontent.com/Steynzville/Blogsite/main/assets/pinterest/editorial-creative.png"}),/asset folders/i);
 assert.throws(()=>validatePin({...product,product:"Complete Home Design System"}),/product page/i);
 assert.throws(()=>validatePin({...product,destination_url:"https://velucedesign.com/room-procurement-system/?utm_source=pinterest"}),/product page/i);
 assert.throws(()=>validatePin({...product,workflow:"unknown"}),/article|workflow|asset folders/i);
});

test("product posts still use draft-first shareNow and keep exact product URL",async()=>{
 const p={...pin,workflow:"veluce_six_product_cover_rotation_v1",product:"Outdoor Lighting Blueprint",
 image_url:"https://raw.githubusercontent.com/Steynzville/Blogsite/main/assets/pinterest-products/studio-product-outdoor-lighting-blueprint-c3.png",
 destination_url:"https://velucedesign.com/outdoor-lighting-blueprint",publish_at:"now"};
 const calls=[];
 async function api(query,variables){
  calls.push({query,variables});
  if(query===operations.create) return {createPost:{post:{id:"p-product"}}};
  if(query===operations.post) return {post:{
    id:"p-product",text:p.description,assets:[{mimeType:"image/png"}],
    metadata:{title:p.title,url:p.destination_url,board:{serviceId:p.board_service_id}}
  }};
  if(query===operations.edit) return {editPost:{post:{id:"p-product"}}};
  throw new Error("unexpected Buffer operation");
 }
 const outcome=await scheduleVerified(api,p,"channel1");
 assert.equal(outcome.status,"submitted_now_verified");
 assert.equal(calls[2].variables.input.metadata.pinterest.url,p.destination_url);
 assert.equal(calls[2].variables.input.mode,"shareNow");
 assert.equal(calls[2].variables.input.assets[0].image.url,p.image_url);
});
