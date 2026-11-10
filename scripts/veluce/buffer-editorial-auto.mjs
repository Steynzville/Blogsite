/**
 * Unattended Veluce editorial publisher. GitHub Actions owns the scheduling,
 * reservation ledger, Buffer API submission and confirmation.
 * Does not depend on a ChatGPT scheduled agent or paid image generation.
 */
import {readFile, readdir, stat, writeFile} from "node:fs/promises";
import {execFileSync} from "node:child_process";
import {pathToFileURL} from "node:url";
import {operations, graphql, scheduleVerified} from "./buffer-pinterest.mjs";

const LEDGER="ops/buffer/ledger.json";
const MANIFEST="ops/buffer/editorial-assets.json";
const BOARDS="ops/buffer/boards.json";
const STATE="ops/state.json";
const PERFORMANCE="ops/buffer/editorial-performance.json";
const BOARD_COVERAGE="ops/buffer/editorial-board-coverage.json";
const EDITORIAL="veluce_editorial";
const LIMIT=4;
const URL_BASE="https://raw.githubusercontent.com/Steynzville/Blogsite/main/";
export function editorialAssetImageUrl(asset){
  // Encode names with spaces (e.g. an owner's "(2)" variant), without changing
  // the Git-tracked source filename or giving Buffer an invalid raw URL.
  return new URL(asset.path.split("/").map(encodeURIComponent).join("/"),URL_BASE).href;
}
export const TOPICS={
  "tree-uplighting":{
    path:"/article/hidden-uplighting-mature-trees/",
    board:"Outdoor Lighting Ideas",
    description:"Discover thoughtful ways to use concealed outdoor spotlights to illuminate mature garden trees, texture and canopy without glare. See Veluce's tree uplighting guide."
  },
  "pathway-lighting":{
    path:"/article/garden-pathway-lighting/",
    board:"Outdoor Lighting Ideas",
    description:"Create a softly glowing garden route with considered spacing, low-level illumination and comfortable visibility after dark. See Veluce's garden pathway lighting guide."
  },
  pergola:{
    path:"/article/pergola-lighting-outdoor-room/",
    board:"Outdoor Lighting Ideas",
    description:"Explore warm ambient pergola lighting, balanced light layers, comfortable outdoor seating and glare-free evening atmosphere. Read Veluce's practical pergola lighting guide for ideas you can plan around."
  },
  "fire-pit":{
    path:"/article/fire-pit-tables-centerpiece/",
    board:"Garden & Patio Ideas & Finds 🔥",
    description:"A thoughtfully placed fire pit table can bring seating, warmth and conversation together. Explore practical patio layout, furniture spacing and fire pit design ideas in Veluce's outdoor living guide."
  },
  "copper-lanterns":{path:"/article/copper-lanterns-age-with-grace/",board:"Outdoor Lighting Ideas",description:"Compare copper lantern patina, maintenance, material choices and buying considerations in Veluce's outdoor lighting guide."},
  "led-deck-strips":{path:"/article/led-strip-integration-modern-deck/",board:"Outdoor Lighting Ideas",description:"Compare outdoor LED strip placement, 12V/24V, weather exposure and glare before deciding what to install around your deck."},
  "tree-moonlighting":{path:"/article/moonlighting-tree-canopies/",board:"Outdoor Lighting Ideas",description:"See how controlled tree moonlighting creates gentle, useful garden lighting without harsh or exposed beams."},
  "bedroom-layered":{path:"/article/layered-lighting-bedroom/",board:"Cozy Bedroom Ideas & Finds 🔥",description:"See how ambient, bedside and accent lighting work together to make a bedroom comfortable without relying on a harsh ceiling light."},
  "smart-blinds":{path:"/article/smart-blinds-follow-sun/",board:"Smart Home Ideas & Gadgets 🔥",description:"Planning daylight control? Compare how smart blinds manage glare, privacy and light across a normal day."},
  "kitchen-layout":{path:"/article/kitchen-design-layout/",board:"Kitchen Organization Ideas",description:"Explore practical kitchen layout, workflow, storage and circulation decisions before choosing cabinetry and appliances."},
  "kitchen-essentials":{path:"/article/everyday-kitchen-essentials-organization/",board:"Kitchen Essentials & Must-Haves 🔥",description:"Organise the everyday kitchen with practical pantry, utensil drawer, prep counter, coffee station, cookware and under-sink storage ideas. See Veluce's kitchen-essentials guide."},
  "kitchen-appliances":{path:"/article/kitchen-appliances-luxury/",board:"Kitchen Essentials & Must-Haves 🔥",description:"Learn what matters when comparing kitchen appliance functions, space requirements and design integration."},
  "kitchen-countertops":{path:"/article/natural-stone-countertops-guide/",board:"Kitchen Essentials & Must-Haves 🔥",description:"Choosing kitchen counters? Compare natural-stone performance and care before committing to a material."},
  "quartzite-porcelain":{path:"/article/quartzite-vs-porcelain-countertops/",board:"Kitchen Essentials & Must-Haves 🔥",description:"Compare quartzite and porcelain countertop durability, appearance and upkeep before choosing a finish."},
  "natural-stone":{path:"/article/natural-stone-materials/",board:"Modern Home Decor Ideas & Finds 🔥",description:"Learn how limestone, marble and travertine affect the look, feel and ongoing care of an interior."},
  "interior-design":{path:"/article/luxury-interior-design-principles/",board:"Modern Home Decor Ideas & Finds 🔥",description:"Explore restrained interior styling, real material choices and a clear focal point for a coherent room."},
  "garden-patio-layout":{path:"/article/how-to-arrange-patio-furniture/",board:"Garden & Patio Ideas & Finds 🔥",description:"Plan patio seating zones, circulation and furniture scale for an outdoor space that is easy to enjoy."},
  "outdoor-rugs":{path:"/article/outdoor-rugs-defy-elements/",board:"Garden & Patio Ideas & Finds 🔥",description:"Compare outdoor rug materials and sizes that define a seating zone and stand up to the conditions."},
  "modular-sectionals":{path:"/article/modular-sectionals-entertaining/",board:"Garden & Patio Ideas & Finds 🔥",description:"Use modular seating to make entertaining layouts flexible without blocking movement through your patio."},
  "garden-fireplace":{path:"/article/outdoor-fireplace-focal-point/",board:"Garden & Patio Ideas & Finds 🔥",description:"Plan seating, clearances and visual focus around an outdoor fireplace before arranging the room."},
  "garden-pathway-moonlighting":{path:"/article/garden-pathway-moonlighting/",board:"Garden & Patio Ideas & Finds 🔥",description:"Explore soft garden moonlighting that balances natural shadows with safe pathway visibility."},
  "outdoor-wall-grazing":{path:"/article/upward-lighting-architectural-grazing/",board:"Outdoor Lighting Ideas",description:"Learn how architectural wall grazing and wall washing create different effects on exterior materials."},
  "outdoor-glare":{path:"/article/outdoor-lighting-glare-night-audit/",board:"Outdoor Lighting Ideas",description:"Check garden lighting from the actual seating area to reduce uncomfortable glare while keeping ambience."},
  "solar-pathway":{path:"/article/solar-pathway-lights-affordable/",board:"Attainable Luxury Outdoor Lighting",description:"Compare solar pathway lighting placement, power tradeoffs and realistic outdoor performance."},
  "security-cameras":{path:"/article/discreet-security-cameras/",board:"Home Security Ideas & Setups",description:"Plan where home security cameras can monitor useful areas without spoiling the look of a home."},
  "perimeter-security":{path:"/article/perimeter-monitoring/",board:"Smart Home Security Systems",description:"Explore perimeter awareness, camera coverage and practical home-security system planning."},
  "smart-access":{path:"/article/smart-access-control/",board:"Smart Home Security Systems",description:"Compare smart entry options, access routines and practical security considerations for modern homes."},
  "smart-home-planning":{path:"/article/smart-home-planning-by-room/",board:"Smart Home Ideas & Gadgets 🔥",description:"Plan connected living by room: useful lighting scenes, climate and energy, nursery comfort, smart kitchens, outdoor spaces and reliable manual fallbacks. Read Veluce's practical smart-home planning guide."},
  "smart-lighting":{path:"/article/smart-home-lighting-control/",board:"Smart Home Ideas & Gadgets 🔥",description:"See how smart lighting scenes and controls can adapt a room for practical everyday activities."}
};
export const CLICK_INTENT={
  "tree-uplighting": {
    "hook": "How to Avoid Glare",
    "goal": "position concealed tree uplights without harsh glare"
  },
  "pathway-lighting": {
    "hook": "How to Light the Route",
    "goal": "plan path-light spacing and comfortable nighttime visibility"
  },
  "pergola": {
    "hook": "How to Layer the Light",
    "goal": "combine pergola ambient, task and accent lighting"
  },
  "fire-pit": {
    "hook": "Plan the Seating First",
    "goal": "plan fire-pit seating, circulation and lighting"
  },
  "copper-lanterns": {
    "hook": "What to Know Before Buying",
    "goal": "compare copper-lantern patina, care and material choices"
  },
  "led-deck-strips": {
    "hook": "What to Check Before Installing",
    "goal": "compare LED deck-strip placement, voltage and weather protection"
  },
  "tree-moonlighting": {
    "hook": "How to Get Soft Downlight",
    "goal": "create restrained overhead tree lighting"
  },
  "bedroom-layered": {
    "hook": "How to Avoid Harsh Ceiling Light",
    "goal": "layer bedroom ambient, bedside and accent lighting"
  },
  "smart-blinds": {
    "hook": "What to Check Before Choosing",
    "goal": "compare daylight control, glare and privacy with smart blinds"
  },
  "kitchen-layout": {
    "hook": "What to Check Before Cabinetry",
    "goal": "plan kitchen work zones, landing space and movement"
  },
  "kitchen-essentials": {
    "hook": "Organize What You Use",
    "goal": "organise useful countertop, pantry, utensil and everyday kitchen task zones"
  },
  "kitchen-appliances": {
    "hook": "What Matters Before You Buy",
    "goal": "compare appliance functions, dimensions and kitchen fit"
  },
  "kitchen-countertops": {
    "hook": "What to Know Before Choosing",
    "goal": "compare natural-stone countertops and care needs"
  },
  "quartzite-porcelain": {
    "hook": "Which Surface Fits Your Kitchen?",
    "goal": "compare quartzite and porcelain countertop trade-offs"
  },
  "natural-stone": {
    "hook": "Which Stone Works for Your Room?",
    "goal": "compare limestone, travertine and marble finishes"
  },
  "interior-design": {
    "hook": "What Makes a Room Feel Cohesive?",
    "goal": "plan interior focal points, material choices and visual balance"
  },
  "garden-patio-layout": {
    "hook": "What to Measure Before Buying",
    "goal": "arrange outdoor furniture, circulation and seating zones"
  },
  "outdoor-rugs": {
    "hook": "How to Choose the Right One",
    "goal": "choose outdoor rug materials, sizes and care"
  },
  "modular-sectionals": {
    "hook": "How to Arrange Flexible Seating",
    "goal": "plan practical modular seating for entertaining"
  },
  "garden-fireplace": {
    "hook": "What to Plan Around the Fire",
    "goal": "plan outdoor fireplace seating, safety and focal points"
  },
  "garden-pathway-moonlighting": {
    "hook": "How to Keep Paths Comfortable",
    "goal": "combine garden moonlighting and pathway visibility"
  },
  "outdoor-wall-grazing": {
    "hook": "Grazing or Washing: Which Works?",
    "goal": "compare architectural wall grazing and wall washing"
  },
  "outdoor-glare": {
    "hook": "Check the Glare Before Installing",
    "goal": "audit outdoor lighting glare from actual seating positions"
  },
  "solar-pathway": {
    "hook": "What to Check Before Buying",
    "goal": "assess solar pathway light placement and performance"
  },
  "security-cameras": {
    "hook": "Check the Sightlines First",
    "goal": "plan discreet security-camera placement and coverage"
  },
  "perimeter-security": {
    "hook": "Where Are Your Blind Spots?",
    "goal": "plan perimeter monitoring and camera coverage"
  },
  "smart-access": {
    "hook": "What to Check Before Choosing",
    "goal": "compare smart access options and secure entry routines"
  },
  "smart-home-planning": {
    "hook": "Plan the Room Before the App",
    "goal": "plan reliable room-based smart-home routines, safety, privacy, compatibility and fallback controls"
  },
  "smart-lighting": {
    "hook": "How to Set Up Useful Scenes",
    "goal": "plan smart lighting scenes for daily activities"
  }
};

// A publishing-time safeguard independent of image-catalogue wording.
// Keep original visual specificity, improve soft titles, and give each Pin
// a clear, truthful reason to open its matching live Veluce article.
const TITLE_HOOK=/\b(how|why|what|which|where|when|before|without|avoid|mistakes?|versus|vs\.?|compare|choose|check|guide|tips?|ideas|planning|plan|that|should|need)\b|\?/i;
export const CLICK_LEADS={
  "tree-uplighting": "Where should tree uplights go? See Veluce's guide to concealed positioning and glare control.",
  "pathway-lighting": "Does your path feel too bright at night? See Veluce's guide to spacing low garden lights.",
  "pergola": "Want a pergola that feels welcoming after dark? Explore Veluce's layered lighting guide.",
  "fire-pit": "Will your fire-pit seating work for guests? See Veluce's guide to layout and circulation.",
  "copper-lanterns": "Copper or another finish? Read Veluce's guide to copper lantern patina and upkeep.",
  "led-deck-strips": "Planning LED strips on your deck? Explore Veluce's placement and weatherproofing guide.",
  "tree-moonlighting": "Want soft garden moonlight without visible glare? See Veluce's tree-canopy lighting guide.",
  "bedroom-layered": "Tired of one harsh bedroom ceiling light? See Veluce's guide to three distinct lighting layers.",
  "smart-blinds": "Unsure where smart blinds help most? Read Veluce's guide to daylight, glare and privacy.",
  "kitchen-layout": "Choosing kitchen cabinetry? Check Veluce's guide to working aisles and prep flow first.",
  "kitchen-essentials": "Tired of crowded kitchen counters? See Veluce's guide to useful pantry, drawer and prep zones.",
  "kitchen-appliances": "Planning appliance purchases? Explore Veluce's guide to kitchen fit, function and layout.",
  "kitchen-countertops": "Which natural stone belongs in your kitchen? Compare countertop trade-offs with Veluce.",
  "quartzite-porcelain": "Quartzite or porcelain? See Veluce's guide to countertop appearance and upkeep.",
  "natural-stone": "Marble, limestone or travertine? Read Veluce's guide to texture, patina and care before choosing.",
  "interior-design": "What makes a room feel cohesive? Explore Veluce's guide to focal points and material balance.",
  "garden-patio-layout": "Buying patio furniture? Check Veluce's guide to seating zones and walking space first.",
  "outdoor-rugs": "What size outdoor rug works? See Veluce's guide to materials, scale and maintenance.",
  "modular-sectionals": "Will a sectional fit your patio? Explore Veluce's guide to flexible modular seating.",
  "garden-fireplace": "Planning an outdoor fireplace? Read Veluce's guide to seating and clearances.",
  "garden-pathway-moonlighting": "Need navigable garden paths after dark? See Veluce's guide to moonlighting and visibility.",
  "outdoor-wall-grazing": "Wall grazing or wall washing? Compare the effects in Veluce's exterior-lighting guide.",
  "outdoor-glare": "Are garden lights blinding you from the patio? Try Veluce's outdoor glare-check guide.",
  "solar-pathway": "Buying solar path lights? See Veluce's guide to placement and realistic performance first.",
  "security-cameras": "Could your camera miss the approach? See Veluce's guide to discreet placement and sightlines.",
  "perimeter-security": "Where might security coverage miss an approach? Read Veluce's perimeter planning guide.",
  "smart-access": "Smart lock or another entry setup? Compare options with Veluce's access-control guide.",
  "smart-home-planning": "Not sure what to automate first? See Veluce's room-by-room guide to practical smart-home planning.",
  "smart-lighting": "Want lighting scenes that suit everyday tasks? Explore Veluce's smart-control guide."
};

const GENERATION_QUALITY_GATE_START="2026-11-05";
export function creativeConversionReady(asset){
  // Owner-approved and older Work stock retains its existing approval:
  // only newly generated Work material must meet the stricter visual brief.
  if(asset.origin!=="work-generated")return true;
  const day=String(asset.generated_at||asset.visual_review_date||"").slice(0,10);
  if(day && day<GENERATION_QUALITY_GATE_START)return true;
  if(asset.conversion_verified!==true)return false;
  if(!["headline-overlay","image-only"].includes(asset.conversion_visual_kind))return false;
  const hook=String(asset.conversion_hook||"").trim();
  if(hook.length<20||hook.length>180)return false;
  if(asset.conversion_visual_kind==="headline-overlay" &&
    /^(plan the view|layer the light|elevate your space|be inspired|design ideas|look closer|style it up|beautiful homes)$/i.test(hook))return false;
  return true;
}

const FRESH_POST_IMAGE_GATE_START="2026-11-09";
export function freshPostSpecificWorkImage(asset,day){
  // From the owner-directed cutover onward, reserve catalogues and prior uploads
  // are never eligible. A Work-generated image must have been made for exactly
  // one future Pin, fully reviewed, and registered no more than seven days ago.
  if(day<FRESH_POST_IMAGE_GATE_START)return true;
  if(asset.origin!=="work-generated"||asset.post_specific!==true)return false;
  if(!String(asset.generation_batch_id||"").trim()||
     !String(asset.generation_prompt||"").trim()||
     !String(asset.source_blob_sha||"").match(/^[0-9a-f]{40}$/i))return false;
  const generated=String(asset.generated_at||"");
  const reviewed=String(asset.visual_review_date||"");
  if(!/^\d{4}-\d{2}-\d{2}T/.test(generated)||!/^\d{4}-\d{2}-\d{2}/.test(reviewed))return false;
  const age=(Date.parse(day+"T23:59:59Z")-Date.parse(generated))/86400000;
  return Number.isFinite(age)&&age>=0&&age<=7;
}

export function clickFocusedEditorialCopy(asset){
  const topic=TOPICS[asset.topic],intent=CLICK_INTENT[asset.topic];
  if(!topic||!intent)throw new Error("Missing approved topic/click intent: "+asset.topic);
  let title=String(asset.title||"").replace(/\s+/g," ").trim();
  if(!title)throw new Error("Editorial image has no accurate title: "+asset.path);
  const hadHook=TITLE_HOOK.test(title);
  if(!hadHook){
    const ending=": "+intent.hook;
    if(title.length+ending.length>100)
      title=title.slice(0,100-ending.length).replace(/\s+\S*$/,"").replace(/[\s:;,.!?-]+$/,"");
    title+=ending;
  }
  if(title.length>100)throw new Error("Pinterest headline exceeds 100 characters: "+asset.path);
  // Owner-reviewed assets may supply an image-specific CTA rather than repeating
  // one generic opening line for every Pin in the same editorial topic.
  const customLead=String(asset.click_lead||"").replace(/\s+/g," ").trim();
  const lead=customLead||CLICK_LEADS[asset.topic];
  if(!lead||!lead.includes("Veluce")||lead.length>145||lead.indexOf("Veluce")>110)
    throw new Error("Missing concise article-specific lead CTA: "+asset.topic);
  if(customLead&&(customLead.length<55||!customLead.includes("?")))
    throw new Error("Image-specific CTA must start with a useful question: "+asset.path);
  const raw=String(asset.description||topic.description||"").replace(/\s+/g," ").trim();
  if(!raw)throw new Error("Editorial image has no truthful description: "+asset.path);
  const sentences=raw.split(/(?<=[.!?])\s+/).filter(s=>
    !/\b(read|see|explore|discover|visit|learn)\b.*\b(Veluce|guide|article)\b/i.test(s));
  const supporting=sentences.join(" ").replace(/\s+/g," ").trim();
  const room=300-lead.length-1;
  let detail=supporting.slice(0,room);
  if(detail.length<supporting.length)
    detail=detail.replace(/\s+\S*$/,"").replace(/[\s,;:.!?-]+$/,"")+".";
  const description=lead+(detail?" "+detail:"");
  if(description.length>300||description.indexOf("Veluce")>115)
    throw new Error("Front-loaded CTA quality check failed: "+asset.path);
  return {title,description,hook_style:hadHook?"original-benefit":"improved-topic-benefit",
    cta_style:customLead?"image-specific-question-and-early-cta":"early-article-specific",copy_version:customLead?"veluce-click-v4":"veluce-click-v3"};
}
export function localDate(now=new Date()){
  const p=new Intl.DateTimeFormat("en-GB",{timeZone:"Africa/Johannesburg",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(now);
  const t=Object.fromEntries(p.filter(i=>i.type!=="literal").map(i=>[i.type,i.value]));
  return t.year+"-"+t.month+"-"+t.day;
}
export function dimensions(b){
  if(b.length<30) throw new Error("Image too small");
  if(b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) {
    // A valid signature and IHDR do not prove that the PNG was fully uploaded.
    // Check every chunk boundary and require IDAT plus the final IEND chunk.
    // On 2026-10-28 four uploads were cut off at ~786 KB while their IDAT
    // chunks declared 2.4–3.4 MB. Pinterest accepted them as grey placeholders.
    let offset=8,hasIdat=false,hasIend=false,first=true;
    while(offset<b.length){
      if(offset+12>b.length)throw new Error("Truncated PNG: incomplete chunk header");
      const size=b.readUInt32BE(offset);
      const type=b.toString("ascii",offset+4,offset+8);
      if(size>b.length-offset-12)throw new Error("Truncated PNG: "+type+" chunk extends past end of file");
      if(first && (type!=="IHDR" || size!==13))throw new Error("Invalid PNG IHDR");
      first=false;
      if(type==="IDAT")hasIdat=true;
      offset+=size+12;
      if(type==="IEND"){
        if(size!==0 || offset!==b.length)throw new Error("Invalid PNG IEND or trailing bytes");
        hasIend=true;break;
      }
    }
    if(!hasIdat || !hasIend)throw new Error("Truncated PNG: missing IDAT or IEND");
    return {width:b.readUInt32BE(16),height:b.readUInt32BE(20),mime:"image/png"};
  }
  if(b.toString("ascii",0,4)==="RIFF" && b.toString("ascii",8,12)==="WEBP"){
    if(b.readUInt32LE(4)+8!==b.length)throw new Error("Truncated WebP: RIFF size mismatch");
    const kind=b.toString("ascii",12,16);
    if(kind==="VP8X")return {width:1+b.readUIntLE(24,3),height:1+b.readUIntLE(27,3),mime:"image/webp"};
    if(kind==="VP8L")return {
      width:1+(((b[22]&0x3f)<<8)|b[21]),
      height:1+(((b[24]&0x0f)<<10)|(b[23]<<2)|((b[22]&0xc0)>>6)),mime:"image/webp"};
    if(kind==="VP8 " && b.length>30)return {width:b.readUInt16LE(26)&0x3fff,height:b.readUInt16LE(28)&0x3fff,mime:"image/webp"};
    throw new Error("Unsupported WebP subtype: "+kind);
  }
  if(b[0]===255&&b[1]===216){
    if(b[b.length-2]!==255 || b[b.length-1]!==217)throw new Error("Truncated JPEG: missing end marker");
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

// Only truthful, recent, sampled Pinterest organic clicks on the exact VELUCE
// article qualify. Invalid or stale evidence must not block publishing.
export function performanceScores(data,day){
  if(!data || !/^\d{4}-\d{2}-\d{2}$/.test(data.window_end??""))return {};
  const age=(Date.parse(day+"T00:00:00Z")-Date.parse(data.window_end+"T00:00:00Z"))/86400000;
  if(!Number.isFinite(age)||age<0||age>35)return {};
  const scores={};
  for(const [topic,row] of Object.entries(data.topics??{})){
    if(!TOPICS[topic]||!Array.isArray(row.pins)||row.pins.length===0)continue;
    if(!Number.isSafeInteger(row.impressions)||row.impressions<1000||
       !Number.isSafeInteger(row.outbound_clicks)||row.outbound_clicks<3||
       row.outbound_clicks>row.impressions)continue;
    if(row.pins.some(p=>{
      try{
        const u=new URL(p.destination_url);
        return u.hostname!=="velucedesign.com"||
          u.pathname.replace(/\/?$/,"/")!==TOPICS[topic].path||
          !/^https:\/\/www\.pinterest\.com\/pin\/\d+\/?$/.test(p.pin_url)||
          !Number.isSafeInteger(p.impressions)||p.impressions<0||
          !Number.isSafeInteger(p.outbound_clicks)||p.outbound_clicks<0;
      }catch{return true}
    }))continue;
    if(row.pins.reduce((n,p)=>n+p.impressions,0)!==row.impressions||
       row.pins.reduce((n,p)=>n+p.outbound_clicks,0)!==row.outbound_clicks)continue;
    // Bayesian smoothing toward account-wide 0.06% baseline.
    scores[topic]=(row.outbound_clicks+3)/(row.impressions+5000);
  }
  return scores;
}


export function eligibleBoardsForTopic(topic,coverage){
  return (coverage?.boards??[]).filter(b=>b?.eligible_topics?.includes(topic)&&/^\d+$/.test(String(b.id))&&b.name);
}
export function chooseBoardPlacement(topic,ledger,day,coverage,asset=null){
  let eligible=eligibleBoardsForTopic(topic,coverage);
  // Topic-level board eligibility is not enough for scene-specific images:
  // e.g. a smart living-room Pin must not land on Cozy Bedroom just because
  // both have topic smart-lighting. Owner-reviewed assets can narrow it.
  if(asset?.allowed_board_service_ids){
    if(!Array.isArray(asset.allowed_board_service_ids)||
      !asset.allowed_board_service_ids.length ||
      asset.allowed_board_service_ids.some(id=>!/^[0-9]+$/.test(String(id))))
      throw new Error("Invalid image-specific Pinterest board allowlist: "+asset.path);
    const permitted=new Set(asset.allowed_board_service_ids.map(String));
    eligible=eligible.filter(b=>permitted.has(String(b.id)));
  }
  if(!eligible.length)return null;
  const recentCutoff=new Date(Date.parse(day+"T00:00:00Z")-27*86400000).toISOString().slice(0,10);
  const recent=ledger.filter(p=>p.workflow===EDITORIAL&&p.local_date>=recentCutoff&&p.local_date<=day);
  const lastWeekCutoff=new Date(Date.parse(day+"T00:00:00Z")-6*86400000).toISOString().slice(0,10);
  const week=recent.filter(p=>p.local_date>=lastWeekCutoff);
  const last=[...ledger].reverse().find(p=>p.workflow===EDITORIAL)?.board_service_id;
  eligible.sort((a,b)=>{
    const counts=(arr,board)=>arr.filter(p=>String(p.board_service_id)===String(board.id)).length;
    return (counts(week,a)-counts(week,b))||
      (counts(recent,a)-counts(recent,b))||
      ((String(a.id)===String(last)?1:0)-(String(b.id)===String(last)?1:0))||
      a.name.localeCompare(b.name);
  });
  const board=eligible[0];
  // Buffer supports boards but NOT boardSectionId: these are recommendations
  // only, and must never be logged as a confirmed Pinterest section.
  const sections=(board.sections??[]).filter(s=>s.eligible_topics?.includes(topic));
  const suggested=sections.length?sections[0]:null;
  return {id:String(board.id),name:board.name,
    suggested_section:suggested?{id:String(suggested.id),name:suggested.name}:null};
}

export function chooseAsset(items,ledger,day,validPaths,performance={},coverage=null){
  const historical=new Set(ledger.map(x=>x.source_blob_sha).filter(Boolean));
  const images=new Set(ledger.map(x=>x.image_url).filter(Boolean));
  const pending=new Set(ledger.map(x=>x.creative_id).filter(Boolean));
  const candidate=items.filter(x=>{
    if(x.visually_verified!==true || !TOPICS[x.topic] || !validPaths.has(x.path) ||
       !creativeConversionReady(x) || !freshPostSpecificWorkImage(x,day))return false;
    const imageUrl=editorialAssetImageUrl(x);
    if(images.has(imageUrl)||historical.has(x.sha))return false;
    if(pending.has(x.creative_id))return false;
    return true;
  });
  const today=ledger.filter(x=>x.workflow===EDITORIAL && x.local_date===day);
  // Controlled 25%-of-four daily exposure test for the popular LED-strip article:
  // prefer exactly one unused, approved LED creative per local publishing day;
  // leave the other three daily slots to the existing multi-topic rotation.
  // Excludes later LED candidates when other vetted topics are available.
  // Exhausted LED stock falls back safely; never reuse a creative or exceed 4/day.
  const ledToday=today.some(p=>p.topic==="led-deck-strips");
  const ledCandidates=candidate.filter(x=>x.topic==="led-deck-strips");
  const otherCandidates=candidate.filter(x=>x.topic!=="led-deck-strips");
  const pool=!ledToday && ledCandidates.length?ledCandidates:
    ledToday && otherCandidates.length?otherCandidates:candidate;
  const count=new Map(Object.keys(TOPICS).map(k=>[k,today.filter(x=>x.topic===k).length]));
  const last=[...ledger].reverse().find(x=>x.workflow===EDITORIAL)?.topic;
  const cutoff=new Date(Date.parse(day+"T00:00:00Z")-6*86400000).toISOString().slice(0,10);
  const recent=ledger.filter(x=>x.workflow===EDITORIAL && x.local_date>=cutoff && x.local_date<=day);
  const weekCount=new Map(Object.keys(TOPICS).map(k=>[k,recent.filter(x=>x.topic===k).length]));
  // User-supplied, individually approved artwork always publishes before Work-generated reserves.
  const priority=x=>x.origin==="owner-upload"?0:x.origin==="work-generated"?1:2;
  pool.sort((a,b)=>(priority(a)-priority(b))||
    ((count.get(a.topic)??0)-(count.get(b.topic)??0))||
    (a.topic===last?1:0)-(b.topic===last?1:0)||
    ((weekCount.get(a.topic)??0)-(weekCount.get(b.topic)??0))||
    ((coverage?(()=>{const x=chooseBoardPlacement(a.topic,ledger,day,coverage,a);const y=chooseBoardPlacement(b.topic,ledger,day,coverage,b);const used=t=>ledger.filter(p=>p.workflow===EDITORIAL&&p.local_date>=new Date(Date.parse(day+"T00:00:00Z")-27*86400000).toISOString().slice(0,10)&&String(p.board_service_id)===String(t?.id)).length;return used(x)-used(y);})():0))||
    ((performance[b.topic]??0)-(performance[a.topic]??0))||
    a.path.localeCompare(b.path));
  return pool[0]??null;
}
function git(args){return execFileSync("git",args,{stdio:"pipe",encoding:"utf8"}).trim()}
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
export function quarantineConfirmedLocalPreflight(item){
  // This exact exception originates in validatePin(), which scheduleVerified()
  // calls BEFORE its first Buffer createPost API request. No remote post can exist
  // from this attempt. Other ambiguous failures must remain blocking.
  if(item?.workflow!==EDITORIAL || item.status!=="needs_reconciliation" ||
    item.buffer_post_id || item.error!==
      "Image must be an approved public direct Veluce or Blogsite GitHub Pinterest image URL")
    return false;
  item.status="rejected_before_buffer_request";
  item.reconciliation_note="Local validatePin rejected image URL before createPost; no Buffer submission was attempted.";
  item.reconciled_at=new Date().toISOString();
  return true;
}
async function reconcile(ledger){
  let touched=false;
  for(const item of ledger.posts??[]){
    if(quarantineConfirmedLocalPreflight(item)){touched=true;continue;}
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
  const coverage=JSON.parse(await readFile(BOARD_COVERAGE,"utf8"));
  let performance={};
  try {
    performance=performanceScores(JSON.parse(await readFile(PERFORMANCE,"utf8")),today);
  }catch(e){console.log("Optional click evidence unavailable; retaining safe rotation: "+e.message)}
  const entries=[];
  for(const v of manifest){
    if(!v.visually_verified)continue;
    if(!paths.has(v.path))continue;
    const bytes=await readFile(v.path);
    let dim;try{dim=dimensions(bytes)}catch(e){console.log("Skipping image: "+v.path+" ("+e.message+")");continue}
    if(Math.abs(dim.width/dim.height-2/3)>0.045){
      console.log("Skipping non-2:3 image: "+v.path+" "+dim.width+"x"+dim.height);continue;
    }
    const sha=git(["hash-object",v.path]);
    if(v.source_blob_sha && sha!==v.source_blob_sha){
      console.log("Skipping changed or unapproved source image: "+v.path);
      continue;
    }
    entries.push({...v,...dim,sha});
  }
  let todayCount=(ledger.posts??[]).filter(x=>x.workflow===EDITORIAL && x.local_date===today).length;
  const selected=chooseAsset(entries,ledger.posts??[],today,new Set(entries.map(x=>x.path)),performance,coverage);
  console.log(JSON.stringify({mode,local_date:today,already_reserved_or_sent:todayCount,
    remaining:entries.filter(x=>!(ledger.posts??[]).some(p=>p.image_url===editorialAssetImageUrl(x))).length,
    conversion_quality_holds:entries.filter(x=>!creativeConversionReady(x)).length,
    recent_click_evidence_topics:Object.keys(performance),
    next:selected?{path:selected.path,topic:selected.topic,board:chooseBoardPlacement(selected.topic,ledger.posts??[],today,coverage,selected)?.name}:null}));
  if(mode==="validate")return;
  if(mode!=="publish")throw new Error("Unsupported mode "+mode);
  if(process.env.EDITORIAL_PUBLISH_ENABLED!=="true") {console.log("Editorial publishing held: uploaded image-to-topic mapping awaiting visual audit.");return;}
  if(process.env.BUFFER_PUBLISH_ENABLED!=="true")throw new Error("BUFFER_PUBLISH_ENABLED is not true");
  if(!process.env.BUFFER_API_KEY || !process.env.BUFFER_CHANNEL_ID)throw new Error("Buffer credentials/channel missing");
  await reconcile(ledger);
  // Any uncertain reservation must be recovered before starting more automatic submissions.
  if((ledger.posts??[]).some(x=>x.workflow===EDITORIAL && ["reserved","needs_reconciliation"].includes(x.status)))
    throw new Error("Earlier unresolved reservation: resolve by Buffer post ID before another post");
  todayCount=(ledger.posts??[]).filter(x=>x.workflow===EDITORIAL&&x.local_date===today).length;
  if(todayCount>=LIMIT){console.log("Four editorial Pin submissions already reserved today.");return}
  const used=new Set((ledger.posts??[]).map(x=>x.image_url));
  const asset=chooseAsset(entries,ledger.posts??[],today,new Set(entries.map(x=>x.path)),performance,coverage);
  if(!asset){console.log("::warning::No individually visually verified unused images available. Do not post based on unverified batch labels.");return}
  const topic=TOPICS[asset.topic];
  const boardData=JSON.parse(await readFile(BOARDS,"utf8"));
  const placement=chooseBoardPlacement(asset.topic,ledger.posts??[],today,coverage,asset);
  if(!placement)throw new Error("No semantically appropriate board for topic: "+asset.topic);
  const mapped=boardData.boards.find(x=>x.name===placement.name&&String(x.id)===placement.id);
  if(!mapped)throw new Error("Selected board is absent from authenticated Buffer discovery: "+placement.name);
  const channel=(await graphql(operations.channel,{id:process.env.BUFFER_CHANNEL_ID})).channel;
  if(!channel||String(channel.service).toLowerCase()!=="pinterest"||
    !String(channel.name+" "+channel.displayName).toLowerCase().includes("steynenslin")||
    channel.isQueuePaused)throw new Error("Pinterest channel missing, paused, or mismatched");
  if(!channel.metadata?.boards?.some(b=>String(b.serviceId)===String(mapped.id) && b.name===mapped.name))
    throw new Error("Chosen board isn't present on actual Pinterest channel: "+mapped.name);
  const id="veluce-auto-"+today.replaceAll("-","")+"-"+asset.sha.slice(0,12);
  const url=editorialAssetImageUrl(asset);
  const destination="https://velucedesign.com"+topic.path;
  const copy=clickFocusedEditorialCopy(asset);
  const pin={creative_id:id,workflow:EDITORIAL,title:copy.title,description:copy.description,
    image_url:url,destination_url:destination,board_service_id:mapped.id,publish_at:"now",status:"ready"};
  if(used.has(url))throw new Error("Creative was already used: "+url);
  await verifiedUrl(url,true);await verifiedUrl(destination,false);
  const item={...pin,local_date:today,topic:asset.topic,board_name:mapped.name,
    ...(placement.suggested_section?{suggested_section:placement.suggested_section,section_status:"advisory_only_buffer_has_no_section_target"}:{}),
    source_blob_sha:asset.sha,source_path:asset.path,
    copy_version:copy.copy_version,hook_style:copy.hook_style,cta_style:copy.cta_style,status:"reserved",
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
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href)run(requested).catch(e=>{console.error(e.stack||e.message);process.exitCode=1});
