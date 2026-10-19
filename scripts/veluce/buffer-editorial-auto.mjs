/**
 * Unattended Veluce editorial publisher. GitHub Actions owns the scheduling,
 * reservation ledger, Buffer API submission and confirmation.
 * Does not depend on a ChatGPT scheduled agent or paid image generation.
 */
import {readFile, readdir, stat, writeFile} from "node:fs/promises";
import {execFileSync} from "node:child_process";
import {basename} from "node:path";
import {operations, graphql, scheduleVerified} from "./buffer-pinterest.mjs";

const LEDGER="ops/buffer/ledger.json";
const MANIFEST="ops/buffer/editorial-assets.json";
const BOARDS="ops/buffer/boards.json";
const STATE="ops/state.json";
const EDITORIAL="veluce_editorial";
const LIMIT=4;
const URL_BASE="https://raw.githubusercontent.com/Steynzville/Blogsite/main/";
export const TOPICS={
  pergola:{
    path:"/article/pergola-lighting-outdoor-room/",
    board:"Outdoor Lighting Ideas",
    description:"Explore warm ambient pergola lighting, balanced light layers, comfortable outdoor seating and glare-free evening atmosphere. Read Veluce's practical pergola lighting guide for ideas you can plan around."
  },
  "fire-pit":{
    path:"/article/fire-pit-tables-centerpiece/",
    board:"Garden & Patio Ideas & Finds 🔥",
    description:"A thoughtfully placed fire pit table can bring seating, warmth and conversation together. Explore practical patio layout, furniture spacing and fire pit design ideas in Veluce's outdoor living guide."
  }
};
export function localDate(now=new Date()){
  const p=new Intl.DateTimeFormat("en-GB",{timeZone:"Africa/Johannesburg",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(now);
  const t=Object.fromEntries(p.filter(i=>i.type!=="literal").map(i=>[i.type,i.value]));
  return t.year+"-"+t.month+"-"+t.day;
}
export function dimensions(b){
  if(b.length<30) throw new Error("Image too small");
  if(b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) {
    return {width:b.readUInt32BE(16),height:b.readUInt32BE(20),mime:"image/png"};
  }
  if(b.toString("ascii",0,4)==="RIFF" && b.toString("ascii",8,12)==="WEBP"){
    const kind=b.toString("ascii",12,16);
    if(kind==="VP8X")return {width:1+b.readUIntLE(24,3),height:1+b.readUIntLE(27,3),mime:"image/webp"};
    if(kind==="VP8L")return {
      width:1+(((b[22]&0x3f)<<8)|b[21]),
      height:1+(((b[24]&0x0f)<<10)|(b[23]<<2)|((b[22]&0xc0)>>6)),mime:"image/webp"};
    if(kind==="VP8 " && b.length>30)return {width:b.readUInt16LE(26)&0x3fff,height:b.readUInt16LE(28)&0x3fff,mime:"image/webp"};
    throw new Error("Unsupported WebP subtype: "+kind);
  }
  if(b[0]===255&&b[1]===216){
    let pos=2;while(pos<b.length-9){
      if(b[pos]!==255){pos++;continue}
      const marker=b[pos+1],len=b.readUInt16BE(pos+2);
      if([0xc0,0xc1,0xc2,0xc3].includes(marker))
        return {width:b.readUInt16BE(pos+7),height:b.readUInt16BE(pos+5),mime:"image/jpeg"};
      if(len<2)break;pos+=2+len;
    }
  }
  throw new Error("Unsupported or invalid image");
}
export function chooseAsset(items,ledger,day,validPaths){
  const historical=new Set(ledger.map(x=>x.source_blob_sha).filter(Boolean));
  const images=new Set(ledger.map(x=>x.image_url).filter(Boolean));
  const pending=new Set(ledger.map(x=>x.creative_id).filter(Boolean));
  const candidate=items.filter(x=>{
    if(!TOPICS[x.topic] || !validPaths.has(x.path))return false;
    const imageUrl=URL_BASE+x.path;
    if(images.has(imageUrl)||historical.has(x.sha))return false;
    if(pending.has(x.creative_id))return false;
    return true;
  });
  const today=ledger.filter(x=>x.workflow===EDITORIAL && x.local_date===day);
  const count=new Map(Object.keys(TOPICS).map(k=>[k,today.filter(x=>x.topic===k).length]));
  const last=[...ledger].reverse().find(x=>x.workflow===EDITORIAL)?.topic;
  candidate.sort((a,b)=>((count.get(a.topic)??0)-(count.get(b.topic)??0))||
    (a.topic===last?1:0)-(b.topic===last?1:0)||
    a.path.localeCompare(b.path));
  return candidate[0]??null;
}
function git(args){return execFileSync("git",args,{stdio:"pipe",encoding:"utf8"}).trim()}
export function saveLedger(ledger,description,includeState=false){
  throw new Error("saveLedger may only be used in the workflow runtime");
}
async function persist(ledger,message,withState=false){
  await writeFile(LEDGER,JSON.stringify(ledger,null,2)+"\n");
  git(["add",LEDGER,...(withState?[STATE]:[])]);
  if(!git(["diff","--cached","--name-only"]))return;
  git(["config","user.email","41898282+github-actions[bot]@users.noreply.github.com"]);
  git(["config","user.name","github-actions[bot]"]);
  git(["commit","-m",message]);
  git(["push","origin","HEAD:main"]);
}
async function verifiedUrl(url,image=false){
  const res=await fetch(url,{method:image?"HEAD":"GET",signal:AbortSignal.timeout(20000),redirect:"follow"});
  if(!res.ok)throw new Error("URL returned "+res.status+": "+url);
  const type=res.headers.get("content-type")||"";
  if(image&&!type.startsWith("image/"))throw new Error("Media MIME type is not image: "+type);
  if(!image && (!res.url.startsWith("https://velucedesign.com/article/")||!type.includes("text/html")))
    throw new Error("Article redirected unexpectedly or not HTML: "+res.url);
  if(res.body)await res.body.cancel();
}
async function checkBuffer(postId,pin){
  const data=await graphql(operations.post,{id:postId});
  const post=data.post;
  if(!post)throw new Error("Buffer post not found "+postId);
  if(post.metadata?.url!==pin.destination_url||post.metadata?.title!==pin.title||
      String(post.metadata?.board?.serviceId)!==String(pin.board_service_id))
    throw new Error("Buffer click-through, title or board mismatch for "+postId);
  if(post.status==="error")throw new Error("Buffer reports an error for "+postId);
  return post;
}
async function recordCampaign(item){
  const state=JSON.parse(await readFile(STATE,"utf8"));
  state.campaigns??=[];
  if(!state.campaigns.some(x=>x.pin_url===item.pinterest_url)){
    state.campaigns.push({
      pin_url:item.pinterest_url,pin_id:item.pinterest_url.split("/").filter(Boolean).at(-1),
      published_at:item.sent_at,workflow:EDITORIAL,status:"sent",
      destination:item.destination_url,media_url:item.image_url,
      title:item.title,description:item.description,
      board:item.board_name,board_id:item.board_service_id,
      buffer_post_id:item.buffer_post_id,
      publication_verification:"Buffer sentAt + externalLink + exact persisted destination, title and board"
    });
    await writeFile(STATE,JSON.stringify(state,null,2)+"\n");
  }
}
async function reconcile(ledger){
  let touched=false;
  for(const item of ledger.posts??[]){
    if(item.workflow!==EDITORIAL || item.status!=="buffer_submitted")continue;
    const post=await checkBuffer(item.buffer_post_id,item);
    if(post.status==="sent" && post.externalLink && post.sentAt){
      Object.assign(item,{status:"sent_buffer_confirmed",sent_at:post.sentAt,pinterest_url:post.externalLink});
      await recordCampaign(item);
      touched=true;
    }
  }
  if(touched)await persist(ledger,"ops(buffer): reconcile confirmed automatic Pins",true);
}
async function run(mode){
  const ledger=JSON.parse(await readFile(LEDGER,"utf8"));
  const manifest=JSON.parse(await readFile(MANIFEST,"utf8")).image_assets;
  const discovered=await readdir("assets/pinterest");
  const paths=new Set(discovered.map(n=>"assets/pinterest/"+n));
  const today=localDate();
  const entries=[];
  for(const v of manifest){
    if(!paths.has(v.path))continue;
    const bytes=await readFile(v.path);
    let dim;try{dim=dimensions(bytes)}catch(e){console.log("Skipping image: "+v.path+" ("+e.message+")");continue}
    if(Math.abs(dim.width/dim.height-2/3)>0.045){
      console.log("Skipping non-2:3 image: "+v.path+" "+dim.width+"x"+dim.height);continue;
    }
    entries.push({...v,...dim,sha:git(["hash-object",v.path])});
  }
  let todayCount=(ledger.posts??[]).filter(x=>x.workflow===EDITORIAL && x.local_date===today).length;
  const selected=chooseAsset(entries,ledger.posts??[],today,new Set(entries.map(x=>x.path)));
  console.log(JSON.stringify({mode,local_date:today,already_reserved_or_sent:todayCount,
    remaining:entries.filter(x=>!(ledger.posts??[]).some(p=>p.image_url===URL_BASE+x.path)).length,
    next:selected?{path:selected.path,topic:selected.topic,board:TOPICS[selected.topic].board}:null}));
  if(mode==="validate")return;
  if(mode!=="publish")throw new Error("Unsupported mode "+mode);
  if(process.env.BUFFER_PUBLISH_ENABLED!=="true")throw new Error("BUFFER_PUBLISH_ENABLED is not true");
  if(!process.env.BUFFER_API_KEY || !process.env.BUFFER_CHANNEL_ID)throw new Error("Buffer credentials/channel missing");
  await reconcile(ledger);
  // Any uncertain reservation must be recovered before starting more automatic submissions.
  if((ledger.posts??[]).some(x=>x.workflow===EDITORIAL && ["reserved","needs_reconciliation"].includes(x.status)))
    throw new Error("Earlier unresolved reservation: resolve by Buffer post ID before another post");
  todayCount=(ledger.posts??[]).filter(x=>x.workflow===EDITORIAL&&x.local_date===today).length;
  if(todayCount>=LIMIT){console.log("Four editorial Pin submissions already reserved today.");return}
  const used=new Set((ledger.posts??[]).map(x=>x.image_url));
  const asset=chooseAsset(entries,ledger.posts??[],today,new Set(entries.map(x=>x.path)));
  if(!asset){console.log("::warning::Approved curated assets depleted; no paid AI-image generator configured. No duplicate will be posted.");return}
  const topic=TOPICS[asset.topic];
  const boardData=JSON.parse(await readFile(BOARDS,"utf8"));
  const mapped=boardData.boards.find(x=>x.name===topic.board);
  if(!mapped)throw new Error("Topic-specific board mapping absent: "+topic.board);
  const channel=(await graphql(operations.channel,{id:process.env.BUFFER_CHANNEL_ID})).channel;
  if(!channel||String(channel.service).toLowerCase()!=="pinterest"||
    !String(channel.name+" "+channel.displayName).toLowerCase().includes("steynenslin")||
    channel.isQueuePaused)throw new Error("Pinterest channel missing, paused, or mismatched");
  if(!channel.metadata?.boards?.some(b=>String(b.serviceId)===String(mapped.id) && b.name===mapped.name))
    throw new Error("Chosen board isn't present on actual Pinterest channel: "+mapped.name);
  const id="veluce-auto-"+today.replaceAll("-","")+"-"+asset.sha.slice(0,12);
  const url=URL_BASE+asset.path;
  const destination="https://velucedesign.com"+topic.path;
  const pin={creative_id:id,workflow:EDITORIAL,title:asset.title,description:topic.description,
    image_url:url,destination_url:destination,board_service_id:mapped.id,publish_at:"now",status:"ready"};
  if(used.has(url))throw new Error("Creative was already used: "+url);
  await verifiedUrl(url,true);await verifiedUrl(destination,false);
  const item={...pin,local_date:today,topic:asset.topic,board_name:mapped.name,
    source_blob_sha:asset.sha,source_path:asset.path,status:"reserved",
    recorded_at:new Date().toISOString(),github_run_id:process.env.GITHUB_RUN_ID||null};
  ledger.posts??=[];ledger.posts.push(item);
  // Persist reservation BEFORE contacting Buffer. A crash cannot silently republish this source.
  await persist(ledger,"ops(buffer): reserve distinct editorial asset "+id);
  try{
    const result=await scheduleVerified(graphql,pin,process.env.BUFFER_CHANNEL_ID);
    Object.assign(item,{status:"buffer_submitted",buffer_post_id:result.id,submitted_at:new Date().toISOString()});
    await persist(ledger,"ops(buffer): save Buffer post ID "+result.id);
    let sent=null;
    for(let n=0;n<6;n++){
      const post=await checkBuffer(result.id,pin);
      if(post.status==="sent" && post.sentAt && post.externalLink){sent=post;break}
      await new Promise(resolve=>setTimeout(resolve,4000));
    }
    if(sent){
      Object.assign(item,{status:"sent_buffer_confirmed",sent_at:sent.sentAt,pinterest_url:sent.externalLink});
      await recordCampaign(item);
      await persist(ledger,"ops(buffer): confirm published Pinterest Pin "+id,true);
      console.log("PINTEREST SENT "+sent.externalLink+" -> "+destination+" | "+mapped.name);
    }else{
      console.log("::warning::Buffer accepted the post but did not yet confirm delivery. It is reserved; next slot will reconcile it.");
    }
  }catch(e){
    // Never blindly retry on an ambiguous Buffer/API result.
    if(item.status==="reserved"){
      Object.assign(item,{status:"needs_reconciliation",error:e.message.slice(0,400)});
      await persist(ledger,"ops(buffer): hold uncertain post for reconciliation");
    }
    throw e;
  }
}
const requested=process.argv[2]||"validate";
if(import.meta.url==="file://"+process.argv[1])run(requested).catch(e=>{console.error(e.stack||e.message);process.exitCode=1});
