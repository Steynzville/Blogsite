import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {validateCatalogue,PRODUCT_ORDER,localDay,productActivityOnDay,chooseProductAsset,advanceRotation,buildProductPin,creativeId} from "../scripts/veluce/buffer-product-auto.mjs";
async function load(){
  const paths=["ops/buffer/product-assets.json","ops/buffer/boards.json","ops/buffer/ledger.json","ops/state.json"];
  const [catalog,boards,ledger,state]=await Promise.all(paths.map(async path=>JSON.parse(await readFile(path,"utf8"))));
  return {catalog,boards,ledger,state};
}
test("All 36 product JPGs have exact Git bytes, correct dimensions, true URLs and eligible boards",async()=>{
  const {catalog,boards}=await load();
  const result=await validateCatalogue(catalog,boards);
  assert.equal(result.total,36);
  assert.deepEqual(catalog.product_order,PRODUCT_ORDER);
  assert.deepEqual(Object.values(result.by_product).sort(),[6,6,6,6,6,6]);
  assert.equal(new Set(catalog.image_assets.map(a=>a.hook)).size,36);
  for(const a of catalog.image_assets){
    assert.equal(a.destination_url,"https://velucedesign.com/"+a.product.toLowerCase().replaceAll(" ","-")+"/");
    assert.ok(a.description.startsWith(a.hook));
    assert.ok(a.description.includes("Veluce Studio"));
    assert.ok(a.description.length<=500&&a.title.length<=100);
    assert.ok(creativeId(a).length<=80);
  }
});
test("Next product follows confirmed history, not a restarted six-product loop",async()=>{
  const {catalog,ledger,state}=await load();
  const rot=state.veluce_six_product_cover_rotation_v1;
  assert.equal(rot.next_product,"Room Procurement System");
  const chosen=chooseProductAsset(catalog.image_assets,rot,ledger);
  assert.match(chosen.path,/room-procurement-system-01-materials-living-room\.jpg$/);
  const pin=buildProductPin(chosen,"2026-11-05");
  assert.equal(pin.destination_url,"https://velucedesign.com/room-procurement-system/");
  assert.equal(pin.board_service_id,"296815500381467884");
});
test("Existing November 4 product Pin prevents a second one, even on manual runs",async()=>{
  const {ledger,state}=await load();
  const rot=state.veluce_six_product_cover_rotation_v1;
  assert.equal(productActivityOnDay(ledger,rot,"2026-11-04"),true);
  assert.equal(productActivityOnDay(ledger,rot,"2026-11-05"),false);
  assert.equal(localDay(new Date("2026-11-04T22:45:00Z")),"2026-11-05");
  assert.equal(localDay(new Date("2026-11-04T19:45:00Z")),"2026-11-04");
});
test("Creative IDs, image URLs and source hashes each independently prevent duplicates",async()=>{
  const {catalog,ledger,state}=await load();
  const chosen=chooseProductAsset(catalog.image_assets,state.veluce_six_product_cover_rotation_v1,ledger);
  const pin=buildProductPin(chosen,"2026-11-05");
  for(const used of [{creative_id:pin.creative_id},{image_url:pin.image_url},{source_blob_sha:chosen.source_blob_sha}]){
    const next=chooseProductAsset(catalog.image_assets,state.veluce_six_product_cover_rotation_v1,{posts:[...ledger.posts,used]});
    assert.match(next.path,/room-procurement-system-02-curated-samples-flatlay\.jpg$/);
  }
});
test("Only a confirmed sent Pin advances state, preserving previous cycle history",async()=>{
  const {catalog,ledger,state}=await load();
  const old=state.veluce_six_product_cover_rotation_v1;
  const chosen=chooseProductAsset(catalog.image_assets,old,ledger);
  const p={...buildProductPin(chosen,"2026-11-05"),source_path:chosen.path,board_name:chosen.board_name,hook:chosen.hook,
    status:"sent_buffer_confirmed",buffer_post_id:"test-buffer",sent_at:"2026-11-05T12:08:00Z",pinterest_url:"https://www.pinterest.com/pin/123"};
  assert.throws(()=>advanceRotation(old,{...p,status:"reserved"}),/confirmed sent/);
  const after=advanceRotation(old,p);
  assert.equal(after.next_product,"Complete Home Design System");
  assert.equal(after.cycle,old.cycle);
  assert.equal(after.history.length,old.history.length+1);
  assert.equal(advanceRotation(after,p).history.length,after.history.length);
  const final={...p,product:"Complete Home Design System",creative_id:"complete-home-test",source_path:"assets/pinterest-products/complete-home-design-system-01-coastal-open-plan.jpg"};
  const done=advanceRotation(after,final);
  assert.equal(done.cycle,old.cycle+1);
  assert.equal(done.next_product,"Outdoor Lighting Blueprint");
  assert.deepEqual(done.completed_products,[]);
  assert.equal(done.history.length,old.history.length+2);
});
test("Tampered content hashes and unrelated board choices are rejected",async()=>{
  const {catalog,boards}=await load();
  const a=structuredClone(catalog);
  a.image_assets[0].board_name="Smart Home Security Systems";
  await assert.rejects(validateCatalogue(a,boards),/Inactive or unrelated board/);
  const b=structuredClone(catalog);
  b.image_assets[0].source_blob_sha="0000000000000000000000000000000000000000";
  await assert.rejects(validateCatalogue(b,boards),/changed since visually approved/);
});
