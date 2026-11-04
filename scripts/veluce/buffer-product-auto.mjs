/**
 * Unattended six-product VELUCE Pinterest rotation, no paid image APIs.
 * Reuses the verified editorial Buffer adapter and shared ledger.
 * Product images are user-approved, one image per post, no reuse.
 */
import {readFile, writeFile} from "node:fs/promises";
import {execFileSync} from "node:child_process";
import {pathToFileURL} from "node:url";
import {operations, graphql, scheduleVerified, validatePin, checkPersisted} from "./buffer-pinterest.mjs";
import {dimensions} from "./buffer-editorial-auto.mjs";

const MANIFEST="ops/buffer/product-assets.json";
const BOARDS="ops/buffer/boards.json";
const LEDGER="ops/buffer/ledger.json";
const STATE="ops/state.json";
const WORKFLOW="veluce_six_product_cover_rotation_v1";
const CHANNEL_NAME="steynenslin";
const BASE_URL="https://raw.githubusercontent.com/Steynzville/Blogsite/main/";
export const PRODUCT_ORDER=[
  "Outdoor Lighting Blueprint",
  "Luxury Outdoor Room Planner",
  "Designer Brief Builder",
  "Luxury Lighting Formula",
  "Room Procurement System",
  "Complete Home Design System"
];
const PRODUCT_PATHS=Object.fromEntries(PRODUCT_ORDER.map(n=>[n, "/"+n.toLowerCase().replaceAll(" ","-")+"/"]));
const ALLOWED_BOARDS={
  "Outdoor Lighting Blueprint":["Outdoor Lighting Ideas","Attainable Luxury Outdoor Lighting"],
  "Luxury Outdoor Room Planner":["Garden & Patio Ideas & Finds 🔥"],
  "Designer Brief Builder":["Modern Home Decor Ideas & Finds 🔥"],
  "Luxury Lighting Formula":["Modern Home Decor Ideas & Finds 🔥","Cozy Bedroom Ideas & Finds 🔥"],
  "Room Procurement System":["Modern Home Decor Ideas & Finds 🔥"],
  "Complete Home Design System":["Modern Home Decor Ideas & Finds 🔥","2026 Warm Organic Home Aesthetic"]
};
const uncertain=new Set(["reserved","buffer_submitted","needs_reconciliation"]);

export function localDay(now=new Date()){
  const parts=new Intl.DateTimeFormat("en-GB",{timeZone:"Africa/Johannesburg",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(now);
  const v=Object.fromEntries(parts.filter(p=>p.type!=="literal").map(p=>[p.type,p.value]));
  return v.year+"-"+v.month+"-"+v.day;
}
export function productActivityOnDay(ledger,state,day){
  const posts=(ledger.posts??[]).some(x=>x.workflow===WORKFLOW && (
    x.local_date===day ||
    ((x.recorded_at||x.sent_at||x.publish_at) && localDay(new Date(x.recorded_at||x.sent_at||x.publish_at))===day)
  ));
  const history=(state?.history??[]).some(x=>x.published_at && (
    /^\d{4}-\d{2}-\d{2}$/.test(x.published_at)
      ? x.published_at===day
      : localDay(new Date(x.published_at))===day
  ));
  return posts||history;
}
export function chooseProductAsset(assets,rotation,ledger){
  if(!rotation||!PRODUCT_ORDER.includes(rotation.next_product))throw Error("Product state has no valid next_product");
  const usedIds=new Set((ledger.posts??[]).map(x=>x.creative_id));
  const usedSha=new Set((ledger.posts??[]).map(x=>x.source_blob_sha).filter(Boolean));
  const usedUrls=new Set((ledger.posts??[]).map(x=>x.image_url));
  return assets.filter(a=>a.visually_verified && a.product===rotation.next_product &&
    !usedIds.has(creativeId(a)) && !usedSha.has(a.source_blob_sha) &&
    !usedUrls.has(BASE_URL+a.path))
    .sort((x,y)=>x.sequence-y.sequence)[0]??null;
}
export function creativeId(asset){
  return "veluce-product-"+asset.path.split("/").at(-1).replace(/\.jpg$/,"");
}
export function buildProductPin(asset,day){
  const pin={
    creative_id:creativeId(asset),workflow:WORKFLOW,product:asset.product,
    title:asset.title,description:asset.description,
    image_url:BASE_URL+asset.path,destination_url:asset.destination_url,
    board_service_id:String(asset.board_service_id),publish_at:"now",
    local_date:day,source_blob_sha:asset.source_blob_sha,source_path:asset.path
  };
  validatePin(pin);
  return pin;
}
export function advanceRotation(old,record){
  if((old.history??[]).some(x=>x.creative_id===record.creative_id))return old;
  const index=PRODUCT_ORDER.indexOf(record.product);
  if(index<0||old.next_product!==record.product)
    throw Error("Cannot advance rotation: saved next product differs from sent Buffer post");
  if(record.status!=="sent_buffer_confirmed"||!record.pinterest_url||!record.buffer_post_id||!record.sent_at)
    throw Error("Cannot advance rotation without confirmed sent status, Buffer ID, sentAt and Pinterest link");
  const completed=[...(old.completed_products??[])];
  if(!completed.includes(record.product))completed.push(record.product);
  const finished=index===PRODUCT_ORDER.length-1;
  return {...old,history:[...(old.history??[]),{
      creative_id:record.creative_id,workflow:WORKFLOW,product:record.product,cycle:old.cycle,
      submission_date:record.local_date,status:record.status,image_type:"owner-upload",
      image_dimensions:"1000x1500",image_filename:record.source_path.split("/").at(-1),
      image_url:record.image_url,hook:record.hook,title:record.title,description:record.description,
      destination_url:record.destination_url,board:record.board_name,
      board_service_id:record.board_service_id,buffer_post_id:record.buffer_post_id,
      published_at:record.local_date,published_at_timestamp:record.sent_at,
      pin_id:record.pinterest_url.split("/").filter(Boolean).at(-1),pin_url:record.pinterest_url,
      verification_status:"Buffer sentAt and Pinterest externalLink confirmed, exact product URL, title, board, and one image verified",
      product_page_verified:true,independent_clickthrough_verified:false,
      completed_products_this_cycle:completed,
      next_product:PRODUCT_ORDER[(index+1)%PRODUCT_ORDER.length]
    }],
    cycle:Number(old.cycle??1)+(finished?1:0),
    last_product:record.product,
    completed_products:finished?[]:completed,
    next_product:PRODUCT_ORDER[(index+1)%PRODUCT_ORDER.length]};
}
function git(args){
  return execFileSync("git",args,{encoding:"utf8",stdio:"pipe"}).trim();
}
async function persist(ledger,state,message){
  await writeFile(LEDGER,JSON.stringify(ledger,null,2)+"\n");
  if(state)await writeFile(STATE,JSON.stringify(state,null,2)+"\n");
  git(["add",LEDGER,...(state?[STATE]:[])]);
  if(!git(["diff","--cached","--name-only"]))return;
  git(["config","user.email","41898282+github-actions[bot]@users.noreply.github.com"]);
  git(["config","user.name","github-actions[bot]"]);
  git(["commit","-m",message]);
  git(["push","origin","HEAD:main"]);
}
export async function validateCatalogue(catalog,boards,readBytes=readFile,hashFile=path=>git(["hash-object",path])){
  if(catalog?.schema_version!==1||catalog.image_assets?.length!==36)
    throw Error("Expected exactly 36 individually reviewed product creatives");
  if(JSON.stringify(catalog.product_order)!==JSON.stringify(PRODUCT_ORDER))
    throw Error("Incorrect six-product order");
  const paths=new Set(),shas=new Set(),byProduct=new Map(PRODUCT_ORDER.map(p=>[p,[]]));
  const boardMap=new Map((boards?.boards??[]).map(b=>[String(b.id),b.name]));
  for(const a of catalog.image_assets){
    if(!a.visually_verified||!a.conversion_verified||a.origin!=="owner-upload"||
       a.conversion_visual_kind!=="headline-overlay")
      throw Error("Unapproved product creative: "+a.path);
    if(!/^assets\/pinterest-products\/[a-z0-9-]+\.jpg$/.test(a.path))
      throw Error("Product image path must be one direct JPEG under product directory");
    if(paths.has(a.path)||shas.has(a.source_blob_sha))throw Error("Duplicate asset/path "+a.path);
    paths.add(a.path);shas.add(a.source_blob_sha);
    if(!byProduct.has(a.product))throw Error("Unknown product "+a.product);
    byProduct.get(a.product).push(a);
    if(!Number.isInteger(a.sequence)||a.sequence<1||a.sequence>6)throw Error("Image sequence out of range");
    if(!a.visual_description||a.visual_description.length<25)throw Error("Image was not individually described");
    if(!a.hook.endsWith("?")||a.hook.length<25||!a.description.startsWith(a.hook)||a.description.length>500)
      throw Error("Missing image-specific click hook "+a.path);
    if(!a.description.includes("Veluce")||!a.description.includes(a.product))
      throw Error("Missing true product CTA "+a.path);
    if(a.title.length<20||a.title.length>100)throw Error("Pinterest SEO title invalid "+a.path);
    if(a.destination_url!=="https://velucedesign.com"+PRODUCT_PATHS[a.product])
      throw Error("Wrong product destination "+a.path);
    if(boardMap.get(String(a.board_service_id))!==a.board_name ||
      !(ALLOWED_BOARDS[a.product]??[]).includes(a.board_name))
      throw Error("Inactive or unrelated board "+a.path);
    if(a.board_name==="Cozy Bedroom Ideas & Finds 🔥"&&!a.path.includes("bedroom"))
      throw Error("Non-bedroom image assigned to bedroom board");
    const bytes=await readBytes(a.path),dim=dimensions(bytes);
    if(dim.width!==1000||dim.height!==1500||dim.mime!=="image/jpeg")
      throw Error("Wrong dimensions or MIME "+a.path);
    if(hashFile(a.path)!==a.source_blob_sha)
      throw Error("Image changed since visually approved "+a.path);
    buildProductPin(a,"2026-11-05");
  }
  for(const [product,items] of byProduct){
    if(items.length!==6 || new Set(items.map(x=>x.sequence)).size!==6)
      throw Error("Missing one or more image variants for "+product);
  }
  return {total:paths.size,by_product:Object.fromEntries([...byProduct].map(([k,v])=>[k,v.length]))};
}
async function checkChannel(board){
  if(!process.env.BUFFER_API_KEY||!process.env.BUFFER_CHANNEL_ID)
    throw Error("Missing existing GitHub Buffer API secret/channel variable");
  const ch=(await graphql(operations.channel,{id:process.env.BUFFER_CHANNEL_ID})).channel;
  if(!ch||String(ch.service).toLowerCase()!=="pinterest"||
     !String(ch.name+" "+ch.displayName).toLowerCase().includes(CHANNEL_NAME)||
     ch.isQueuePaused)
    throw Error("Configured Buffer channel is not the active @steynenslin Pinterest channel");
  if(!ch.metadata?.boards?.some(b=>String(b.serviceId)===String(board.board_service_id)&&b.name===board.board_name))
    throw Error("Selected Pinterest board not verified in authenticated Buffer account");
  return ch;
}
async function checkPublicUrl(url,image=false){
  const res=await fetch(url,{method:image?"HEAD":"GET",redirect:"follow",signal:AbortSignal.timeout(20000)});
  if(!res.ok)throw Error("Public link returned HTTP "+res.status);
  const type=res.headers.get("content-type")||"";
  if(image ? !type.startsWith("image/jpeg") : !type.includes("text/html"))
    throw Error("Public image/product page has unexpected MIME "+type);
  if(!image && new URL(res.url).hostname!=="velucedesign.com")
    throw Error("Product page unexpectedly redirected off Veluce");
  await res.body?.cancel();
}
async function bufferPost(id,pin){
  const post=(await graphql(operations.post,{id})).post;
  if(!post)throw Error("Buffer post missing "+id);
  checkPersisted(post,pin);
  if(post.status==="error")throw Error("Buffer post entered error status "+id);
  return post;
}
async function recordSent(item,post,ledger,state){
  if(post.status!=="sent"||!post.sentAt||!post.externalLink)
    throw Error("No Pinterest delivery confirmation");
  Object.assign(item,{status:"sent_buffer_confirmed",sent_at:post.sentAt,pinterest_url:post.externalLink});
  state.veluce_six_product_cover_rotation_v1=
    advanceRotation(state.veluce_six_product_cover_rotation_v1,item);
  await persist(ledger,state,"ops(buffer): confirm sent product Pin "+item.creative_id);
  console.log("PRODUCT PIN SENT "+item.pinterest_url+" next="+state.veluce_six_product_cover_rotation_v1.next_product);
}
async function reconcile(ledger,state){
  const pending=(ledger.posts??[]).filter(p=>p.workflow===WORKFLOW&&p.status==="buffer_submitted");
  for(const item of pending){
    if(!item.buffer_post_id)throw Error("Submitted product has no Buffer ID to reconcile");
    const post=await bufferPost(item.buffer_post_id,item);
    if(post.status==="sent"&&post.sentAt&&post.externalLink)
      await recordSent(item,post,ledger,state);
  }
}
async function probeDraft(pin,asset){
  const input={
    channelId:process.env.BUFFER_CHANNEL_ID,text:pin.description,
    schedulingType:"automatic",mode:"addToQueue",saveToDraft:true,aiAssisted:true,
    assets:[{image:{url:pin.image_url}}],
    metadata:{pinterest:{boardServiceId:String(pin.board_service_id),title:pin.title,url:pin.destination_url}}
  };
  let id,problem=null;
  try{
    const made=(await graphql(operations.create,{input})).createPost;
    id=made?.post?.id;
    if(!id)throw Error("Buffer temporary draft creation failed "+(made?.message||""));
    const post=await bufferPost(id,pin);
    if(!["draft","needs_approval"].includes(String(post.status).toLowerCase()))
      throw Error("Buffer test was not held as a private draft: "+post.status);
    console.log("Verified 1 image, correct product URL/title/board and text in a PRIVATE Buffer draft.");
  }catch(e){problem=e}finally{
    if(id){
      const d=(await graphql(operations.delete,{id})).deletePost;
      if(d?.id!==id)throw Error("URGENT: could not delete temporary Buffer draft "+id);
      console.log("Deleted private test draft "+id);
    }
  }
  if(problem)throw problem;
}
export async function run(mode="validate"){
  const catalog=JSON.parse(await readFile(MANIFEST,"utf8"));
  const boards=JSON.parse(await readFile(BOARDS,"utf8"));
  const result=await validateCatalogue(catalog,boards);
  const ledger=JSON.parse(await readFile(LEDGER,"utf8"));
  const state=JSON.parse(await readFile(STATE,"utf8"));
  const rotation=state.veluce_six_product_cover_rotation_v1;
  const day=localDay();
  const already=productActivityOnDay(ledger,rotation,day);
  const next=chooseProductAsset(catalog.image_assets,rotation,ledger);
  console.log(JSON.stringify({mode,local_day:day,catalogue:result.total,
    next_product:rotation.next_product,cycle:rotation.cycle,already_submitted_today:already,
    next_image:next?.path??null,remaining_approved:catalog.image_assets.filter(a=>
      !(ledger.posts??[]).some(p=>p.image_url===BASE_URL+a.path||p.source_blob_sha===a.source_blob_sha)).length}));
  if(mode==="validate")return;
  if(!["probe","publish","reconcile"].includes(mode))throw Error("Unsupported operation: "+mode);
  if(mode==="reconcile"){
    await reconcile(ledger,state);
    if((ledger.posts??[]).some(p=>p.workflow===WORKFLOW&&uncertain.has(p.status)))
      throw Error("Unresolved product submission; manual review required.");
    return;
  }
  if(!next){
    if(!already)console.log("::warning::No unused owner-approved image for next product. Upload another batch; never repeat old images.");
    return;
  }
  const pin=buildProductPin(next,day);
  const board=boards.boards.find(b=>String(b.id)===String(next.board_service_id)&&b.name===next.board_name);
  if(!board)throw Error("Unverified board "+next.board_name);
  if(mode==="probe"){
    await checkChannel(next);
    await checkPublicUrl(pin.destination_url,false);
    await checkPublicUrl(pin.image_url,true);
    await probeDraft(pin,next);
    return;
  }
  if(process.env.BUFFER_PUBLISH_ENABLED!=="true")
    throw Error("GitHub BUFFER_PUBLISH_ENABLED flag is not true");
  // Reconcile prior accepted Buffer posts before choosing a new asset.
  await reconcile(ledger,state);
  if((ledger.posts??[]).some(p=>p.workflow===WORKFLOW&&uncertain.has(p.status)))
    throw Error("Unresolved previous product submission; fail closed rather than duplicate");
  if(productActivityOnDay(ledger,state.veluce_six_product_cover_rotation_v1,day)){
    console.log("One product Pin already published or reserved today; no-op.");
    return;
  }
  // An update during reconciliation may change the next product.
  if(state.veluce_six_product_cover_rotation_v1.next_product!==next.product)
    throw Error("Rotation advanced during reconciliation; retry after checking current state");
  await checkChannel(next);
  await checkPublicUrl(pin.destination_url,false);
  await checkPublicUrl(pin.image_url,true);
  const item={...pin,hook:next.hook,board_name:next.board_name,
    source_blob_sha:next.source_blob_sha,source_path:next.path,
    status:"reserved",recorded_at:new Date().toISOString()};
  ledger.posts??=[];
  ledger.posts.push(item);
  await persist(ledger,null,"ops(buffer): reserve one owner-approved product Pin "+item.creative_id);
  try{
    const submitted=await scheduleVerified(graphql,pin,process.env.BUFFER_CHANNEL_ID);
    Object.assign(item,{buffer_post_id:submitted.id,status:"buffer_submitted",submitted_at:new Date().toISOString()});
    await persist(ledger,null,"ops(buffer): save product Buffer post ID "+submitted.id);
    for(let attempt=0;attempt<6;attempt++){
      const post=await bufferPost(submitted.id,pin);
      if(post.status==="sent"&&post.sentAt&&post.externalLink){
        await recordSent(item,post,ledger,state);
        return;
      }
      await new Promise(resolve=>setTimeout(resolve,4000));
    }
    console.log("::warning::Product Pin accepted by Buffer but not confirmed sent. Reservation preserved; reconcile later.");
  }catch(e){
    if(item.status==="reserved"){
      Object.assign(item,{status:"needs_reconciliation",error:String(e.message).slice(0,400)});
      await persist(ledger,null,"ops(buffer): hold uncertain product Pin for review");
    }
    throw e;
  }
}
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href)
  run(process.argv[2]||"validate").catch(e=>{console.error(e.stack||e.message);process.exitCode=1});
