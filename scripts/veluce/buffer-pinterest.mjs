/**
 * VELUCE -> Buffer Pinterest adapter. Standard Node 22 only.
 * Never schedules without an explicitly enabled switch, a vetted Pin and a verified destination link.
 * Docs: https://developers.buffer.com/guides/posts-and-scheduling.html
 */
import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const ENDPOINT = "https://api.buffer.com";
const QUEUE = "ops/buffer/queue.json";
const LEDGER = "ops/buffer/ledger.json";

export const operations = {
  organizations: `query { account { organizations { id name } } }`,
  channels: `query ($org: OrganizationId!) { channels(input: { organizationId: $org }) { id name displayName service isQueuePaused } }`,
  channel: `query ($id: ChannelId!) { channel(input: { id: $id }) { id name displayName service isQueuePaused metadata { ... on PinterestMetadata { boards { serviceId name } } } } }`,
  create: `mutation ($input: CreatePostInput!) { createPost(input: $input) { ... on PostActionSuccess { post { id } } ... on MutationError { message } } }`,
  edit: `mutation ($input: EditPostInput!) { editPost(input: $input) { ... on PostActionSuccess { post { id } } ... on MutationError { message } } }`,
  post: `query ($id: PostId!) { post(input: { id: $id }) { id status sentAt externalLink text assets { id mimeType } metadata { ... on PinterestPostMetadata { title url board { serviceId } } } } }`,
  delete: `mutation ($id: PostId!) { deletePost(input: { id: $id }) { ... on DeletePostSuccess { id } ... on VoidMutationError { message } } }`,
};

export function validatePin(pin) {
  if (!pin || typeof pin !== "object") throw new Error("Pin record missing");
  const { creative_id: id, title, description, image_url: image, destination_url: destination, board_service_id: board, publish_at: time } = pin;
  if (!/^[a-z0-9][a-z0-9-]{5,79}$/.test(id || "")) throw new Error("Invalid unique creative_id");
  if (!title || title.length > 100 || title.trim() !== title) throw new Error("Title must be 1-100 characters");
  if (!description || description.length > 500 || description.trim() !== description) throw new Error("Description must be 1-500 characters");
  if (!board || !/^[0-9]+$/.test(String(board))) throw new Error("Use a real numeric Pinterest board_service_id from Buffer discovery");
  let imageUrl, destinationUrl;
  try { imageUrl = new URL(image); destinationUrl = new URL(destination); } catch { throw new Error("Invalid Pin URL"); }
  if (imageUrl.protocol !== "https:" || !( (imageUrl.hostname === "velucedesign.com" && /^\/pins\/[a-z0-9/_-]+\.(png|jpe?g|webp)$/i.test(imageUrl.pathname)) || (imageUrl.hostname === "raw.githubusercontent.com" && /^\/Steynzville\/Blogsite\/main\/assets\/pinterest\/[a-z0-9-]+\.(png|jpe?g|webp)$/i.test(imageUrl.pathname)) ) || imageUrl.search || imageUrl.hash)
    throw new Error("Creative must be a publicly hosted VELUCE /pins/ image (not an affiliate or third-party image)");
  if (destinationUrl.protocol !== "https:" || destinationUrl.hostname !== "velucedesign.com" || !/^\/article\/[a-z0-9-]+\/$/.test(destinationUrl.pathname))
    throw new Error("Destination must be a published Veluce article URL");
  if (time !== "now" && (!time || Number.isNaN(Date.parse(time)) || !/[+-]\d{2}:\d{2}$|Z$/.test(time))) throw new Error("publish_at must be an offset-aware ISO 8601 datetime");
  return pin;
}

export function checkPersisted(post, pin) {
  const metadata = post?.metadata;
  if (!metadata || metadata.url !== pin.destination_url || metadata.title !== pin.title ||
      String(metadata.board?.serviceId ?? "") !== String(pin.board_service_id)) {
    throw new Error("Buffer Pinterest metadata mismatch: URL, title or board missing. Fail closed.");
  }
  if (!Array.isArray(post.assets) || post.assets.length !== 1 || !String(post.assets[0].mimeType).startsWith("image/"))
    throw new Error("Buffer did not persist the required single image.");
  if (post.text !== pin.description) throw new Error("Buffer altered the Pin description.");
}

function payload(result, key) {
  const item = result?.[key];
  if (!item || item.message || !item.post?.id) throw new Error(key + ": " + (item?.message || "unexpected response"));
  return item.post;
}

export async function scheduleVerified(api, pin, channelId) {
  validatePin(pin);
  if (pin.publish_at !== "now" && Date.parse(pin.publish_at) < Date.now() + 15 * 60_000) throw new Error("Publish time must be at least 15 minutes in the future");
  const input = {
    channelId, text: pin.description, schedulingType: "automatic", mode: "addToQueue", saveToDraft: true,
    aiAssisted: true,
    assets: [{image: {url: pin.image_url}}],
    metadata: {pinterest: {boardServiceId: String(pin.board_service_id), title: pin.title, url: pin.destination_url}},
  };
  const created = payload(await api(operations.create, {input}), "createPost");
  const id = created.id;
  let scheduled = false;
  try {
    const draft = (await api(operations.post, {id})).post;
    checkPersisted(draft, pin);
    const editInput = {
      id, schedulingType: "automatic", mode: pin.publish_at === "now" ? "shareNow" : "customScheduled",
      saveToDraft: false,
      text: pin.description,
      assets: input.assets,
      metadata: input.metadata,
      ...(pin.publish_at === "now" ? {} : {dueAt: new Date(pin.publish_at).toISOString()}),
    };
    payload(await api(operations.edit, {input: editInput}), "editPost");
    scheduled = true;
    const verified = (await api(operations.post, {id})).post;
    checkPersisted(verified, pin);
    return {id, status: pin.publish_at === "now" ? "submitted_now_verified" : "scheduled_verified", publish_at: editInput.dueAt ?? new Date().toISOString()};
  } catch (err) {
    // When Buffer drops the click-through URL, even a scheduled Pin must never remain queued.
    try {
      const outcome = (await api(operations.delete, {id})).deletePost;
      if (outcome?.message || outcome?.id !== id) throw new Error(outcome?.message || "delete not confirmed");
    } catch (cleanupErr) {
      throw new Error("URGENT: Buffer post " + id + " may remain " + (scheduled ? "scheduled" : "draft") +
        ". Delete it manually. Cause: " + err.message + "; cleanup failed: " + cleanupErr.message);
    }
    throw err;
  }
}

export async function graphql(query, variables = {}) {
  const key = process.env.BUFFER_API_KEY;
  if (!key) throw new Error("BUFFER_API_KEY missing. Set it as a GitHub Actions secret, never commit it.");
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {"Authorization": `Bearer ${key}`, "Content-Type": "application/json"},
    body: JSON.stringify({query, variables}),
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`Buffer HTTP ${res.status}`);
  const data = await res.json();
  if (data.errors?.length) throw new Error("Buffer GraphQL: " + data.errors.map(x => x.message).join("; "));
  if (!data.data) throw new Error("Buffer response missing data");
  return data.data;
}

export async function discover(api = graphql) {
  const orgs = (await api(operations.organizations)).account?.organizations ?? [];
  for (const org of orgs) {
    const channels = (await api(operations.channels, {org: org.id})).channels ?? [];
    for (const ch of channels.filter(x => String(x.service).toLowerCase() === "pinterest")) {
      const detail = (await api(operations.channel, {id: ch.id})).channel;
      console.log(JSON.stringify({
        organization: org.name, pinterest_user: detail?.name, channel_id: ch.id,
        paused: detail?.isQueuePaused,
        boards: detail?.metadata?.boards?.map(b => ({id: b.serviceId, name: b.name})) ?? [],
      }, null, 2));
    }
  }
}


/**
 * A private temporary Buffer draft used only to test the real Pinterest metadata path.
 * Never queues, schedules, or publishes a Pin. Deletes the draft in all cases.
 * Reuses a first-party website image for testing only; no new creative is posted.
 */
export async function probeDraft(api = graphql) {
  if (!process.env.BUFFER_CHANNEL_ID) throw new Error("BUFFER_CHANNEL_ID is not configured");
  const board = "296815500381477417"; // Discovered read-only: Outdoor Lighting Ideas.
  const input = {
    channelId: process.env.BUFFER_CHANNEL_ID,
    text: "VELUCE Buffer integration test — private draft only; do not publish.",
    schedulingType: "automatic",
    mode: "addToQueue",
    saveToDraft: true,
    aiAssisted: true,
    assets: [{ image: { url: "https://velucedesign.com/images/led-strip-hero.jpg" } }],
    metadata: { pinterest: {
      boardServiceId: board,
      title: "Veluce API Connectivity Test — Draft Only",
      url: "https://velucedesign.com/article/led-strip-integration-modern-deck/"
    } }
  };
  let postId, failure, verification = null;
  try {
    const created = payload(await api(operations.create, { input }), "createPost");
    postId = created.id;
    const post = (await api(operations.post, { id: postId })).post;
    const metadata = post?.metadata;
    verification = {
      draft_id: postId,
      title_ok: metadata?.title === input.metadata.pinterest.title,
      url_ok: metadata?.url === input.metadata.pinterest.url,
      board_ok: String(metadata?.board?.serviceId) === board,
      image_ok: Array.isArray(post?.assets) && post.assets.length === 1 &&
        String(post.assets[0]?.mimeType || "").startsWith("image/"),
      text_ok: post?.text === input.text
    };
    if (!verification.title_ok || !verification.url_ok || !verification.board_ok ||
        !verification.image_ok || !verification.text_ok)
      throw new Error("Buffer failed to persist Pinterest metadata or image (check draft probe results)");
  } catch (error) {
    failure = error;
  } finally {
    if (postId) {
      try {
        const deleted = (await api(operations.delete, { id: postId })).deletePost;
        if (deleted?.id !== postId) throw new Error(deleted?.message || "Delete not confirmed");
        console.log("Temporary Buffer draft deleted:", postId);
      } catch (cleanupError) {
        throw new Error("URGENT: temporary Buffer draft " + postId +
          " may remain. Please delete this draft in Buffer. " + cleanupError.message);
      }
    }
  }
  if (verification) console.log("Draft metadata verification:", JSON.stringify(verification, null, 2));
  if (failure) throw failure;
  return { status: "probe_passed_and_deleted", verification };
}

/** Reconcile accepted Buffer posts with delivery status before any new Pin is sent. */
export async function verifySent(api = graphql) {
  const ledger = JSON.parse(await readFile(LEDGER, "utf8"));
  let changed = false;
  for (const item of ledger.posts ?? []) {
    const post = (await api(operations.post, {id: item.buffer_post_id})).post;
    if (!post) throw new Error("Buffer post missing: " + item.buffer_post_id);
    if (post.status === "sent" && post.sentAt && post.externalLink) {
      if (post.metadata?.url !== item.destination_url) throw new Error("Sent post's destination URL differs from ledger: " + item.buffer_post_id);
      Object.assign(item, {status:"sent_buffer_confirmed", sent_at:post.sentAt, pinterest_url:post.externalLink});
      changed = true;
    } else if (post.status === "error") {
      Object.assign(item, {status:"error_requires_review"}); changed=true;
    }
    console.log(JSON.stringify({id:item.buffer_post_id,status:post.status,sentAt:post.sentAt,
      externalLink:post.externalLink,linkMatches:post.metadata?.url===item.destination_url}));
  }
  if(changed) await writeFile(LEDGER,JSON.stringify(ledger,null,2)+"\n");
}

export async function run(action, api = graphql) {
  const queue = JSON.parse(await readFile(QUEUE, "utf8"));
  const ledger = JSON.parse(await readFile(LEDGER, "utf8"));
  const ready = queue.pins?.filter(p => p.status === "ready") ?? [];
  const ids = new Set();
  for (const p of ready) {
    validatePin(p);
    if (ids.has(p.creative_id)) throw new Error("Repeated creative_id in queue: " + p.creative_id);
    ids.add(p.creative_id);
  }
  const submitted = new Set((ledger.posts ?? []).map(p => p.creative_id));
  const pending = ready.filter(p => !submitted.has(p.creative_id));
  console.log(JSON.stringify({ready: ready.length, already_scheduled: ready.length - pending.length, pending: pending.map(p => p.creative_id)}, null, 2));
  if (action === "validate" || !pending.length) return;
  if (action !== "publish") throw new Error("Unsupported action");
  if (process.env.BUFFER_PUBLISH_ENABLED !== "true") throw new Error("BUFFER_PUBLISH_ENABLED is not true: no writes performed");
  const channelId = process.env.BUFFER_CHANNEL_ID;
  if (!channelId) throw new Error("BUFFER_CHANNEL_ID missing");
  const channel = (await api(operations.channel, {id: channelId})).channel;
  if (!channel || String(channel.service).toLowerCase() !== "pinterest" ||
      ![channel.name, channel.displayName].some(n => String(n || "").toLowerCase().includes("steynenslin")) ||
      channel.isQueuePaused) throw new Error("Configured channel is not the active @steynenslin Pinterest channel");
  const pin = pending[0]; // One per run until a live click-through test establishes confidence.
  if (!channel.metadata?.boards?.some(b => String(b.serviceId) === String(pin.board_service_id)))
    throw new Error("Requested board not on this Pinterest account");
  // Validate the actual public image before creating a Buffer post.
  const media = await fetch(pin.image_url, {method: "HEAD", signal: AbortSignal.timeout(20000)});
  if (!media.ok || !String(media.headers.get("content-type") || "").startsWith("image/"))
    throw new Error("Image is not publicly reachable as an image: HTTP " + media.status + " " + media.headers.get("content-type"));
  const result = await scheduleVerified(api, pin, channelId);
  ledger.posts ??= [];
  ledger.posts.push({creative_id: pin.creative_id, title: pin.title, destination_url: pin.destination_url,
    image_url: pin.image_url, board_service_id: pin.board_service_id, buffer_post_id: result.id,
    publish_at: result.publish_at, status: result.status, recorded_at: new Date().toISOString()});
  await writeFile(LEDGER, JSON.stringify(ledger, null, 2) + "\n");
  console.log("Buffer queued a verified-link Pin:", result.id, "at", result.publish_at);
  console.log("IMPORTANT: Still verify the actual Pinterest Pin after its first publication.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const action = process.argv[2] ?? "validate";
  (action === "discover" ? discover() : action === "probe" ? probeDraft() : action === "verify" ? verifySent() : run(action)).catch(err => {
    console.error(err.message); process.exitCode = 1;
  });
}
