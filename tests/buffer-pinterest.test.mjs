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
