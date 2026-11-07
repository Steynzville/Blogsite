import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {validateCatalogue,PRODUCT_ORDER,localDay,productActivityOnDay,chooseProductAsset,advanceRotation,buildProductPin,creativeId} from "../scripts/veluce/buffer-product-auto.mjs";
async function load(){
  const paths=["ops/buffer/product-assets.json","ops/buffer/boards.json","ops/buffer/ledger.json","ops/state.json"];
  const [catalog,boards,ledger,state]=await Promise.all(paths.map(async path=>JSON.parse(await readFile(path,"utf8"))));
  return {catalog,boards,ledger,state};
}
function rotationFixture(nextProduct="Room Procurement System"){
  const index=PRODUCT_ORDER.indexOf(nextProduct);
  assert.notEqual(index,-1,"fixture product must be in the rotation");
  return {
    cycle:42,
    last_product:PRODUCT_ORDER[(index-1+PRODUCT_ORDER.length)%PRODUCT_ORDER.length],
    completed_products:PRODUCT_ORDER.slice(0,index),
    next_product:nextProduct,
    history:[{creative_id:"fixture-history",product:"Designer Brief Builder",published_at:"2030-01-01"}]
  };
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
test("Production rotation state follows the confirmed six-product history",async()=>{
  const {state}=await load();
  const rot=state.veluce_six_product_cover_rotation_v1;
  const lastIndex=PRODUCT_ORDER.indexOf(rot.last_product);
  assert.notEqual(lastIndex,-1);
  assert.equal(rot.next_product,PRODUCT_ORDER[(lastIndex+1)%PRODUCT_ORDER.length]);
  const nextIndex=PRODUCT_ORDER.indexOf(rot.next_product);
  assert.deepEqual(rot.completed_products,nextIndex===0?[]:PRODUCT_ORDER.slice(0,nextIndex));
  assert.equal(rot.history.at(-1).product,rot.last_product);
  assert.equal(rot.history.at(-1).next_product,rot.next_product);
});
test("Next product selection follows supplied rotation state",async()=>{
  const {catalog}=await load();
  const rot=rotationFixture();
  const chosen=chooseProductAsset(catalog.image_assets,rot,{posts:[]});
  assert.match(chosen.path,/room-procurement-system-01-materials-living-room\.jpg$/);
  const pin=buildProductPin(chosen,"2030-01-02");
  assert.equal(pin.destination_url,"https://velucedesign.com/room-procurement-system/");
  assert.equal(pin.board_service_id,"296815500381467884");
});
test("Existing same-day product activity prevents a second Pin, even on manual runs",()=>{
  const ledger={posts:[{workflow:"veluce_six_product_cover_rotation_v1",local_date:"2030-01-02"}]};
  const rot={history:[{published_at:"2030-01-03"}]};
  assert.equal(productActivityOnDay(ledger,rot,"2030-01-02"),true);
  assert.equal(productActivityOnDay(ledger,rot,"2030-01-03"),true);
  assert.equal(productActivityOnDay(ledger,rot,"2030-01-04"),false);
  assert.equal(localDay(new Date("2026-11-04T22:45:00Z")),"2026-11-05");
  assert.equal(localDay(new Date("2026-11-04T19:45:00Z")),"2026-11-04");
});
test("Creative IDs, image URLs and source hashes each independently prevent duplicates",async()=>{
  const {catalog}=await load();
  const rot=rotationFixture();
  const chosen=chooseProductAsset(catalog.image_assets,rot,{posts:[]});
  const pin=buildProductPin(chosen,"2030-01-02");
  for(const used of [{creative_id:pin.creative_id},{image_url:pin.image_url},{source_blob_sha:chosen.source_blob_sha}]){
    const next=chooseProductAsset(catalog.image_assets,rot,{posts:[used]});
    assert.match(next.path,/room-procurement-system-02-curated-samples-flatlay\.jpg$/);
  }
});
test("Only a confirmed sent Pin advances state, preserving previous cycle history",async()=>{
  const {catalog}=await load();
  const old=rotationFixture();
  const chosen=chooseProductAsset(catalog.image_assets,old,{posts:[]});
  const p={...buildProductPin(chosen,"2030-01-02"),source_path:chosen.path,board_name:chosen.board_name,hook:chosen.hook,
    status:"sent_buffer_confirmed",buffer_post_id:"test-buffer",sent_at:"2030-01-02T12:08:00Z",pinterest_url:"https://www.pinterest.com/pin/123"};
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
