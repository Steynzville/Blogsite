export const studioProducts = {
  outdoorLighting: {
    id: 'outdoor-lighting-blueprint',
    title: 'Outdoor Lighting Blueprint',
    method: 'The 4-Axis Nightscape System',
    href: '/outdoor-lighting-blueprint',
    price: 'R299',
    cta: 'Explore the Blueprint',
    body: 'Plan the nighttime effect, zones and priorities before you start buying fixtures.'
  },
  outdoorRoom: {
    id: 'luxury-outdoor-room-planner',
    title: 'Luxury Outdoor Room Planner',
    method: 'The 5-Layer Outdoor Room Method',
    href: '/luxury-outdoor-room-planner',
    price: 'R349',
    cta: 'Explore the Planner',
    body: 'Turn a patio, deck or pergola into a deliberate outdoor room with purpose, zones, flow, scale and atmosphere.'
  },
  designerBrief: {
    id: 'designer-brief-builder',
    title: 'Designer Brief Builder',
    method: 'The CLEAR Brief-to-Design System',
    href: '/designer-brief-builder',
    price: 'R349',
    cta: 'Explore the Brief Builder',
    body: 'Turn scattered ideas, real-space facts and inspiration into a brief a designer, contractor or AI tool can actually use.'
  },
  luxuryLighting: {
    id: 'luxury-lighting-formula',
    title: 'Luxury Lighting Formula',
    method: 'The Seven Signals of Expensive-Looking Light',
    href: '/luxury-lighting-formula',
    price: 'R449',
    cta: 'Explore the Formula',
    body: 'Diagnose flat or harsh lighting, rebuild hierarchy and scenes, and test changes before buying more light.'
  },
  procurement: {
    id: 'room-procurement-system',
    title: 'Room Procurement System',
    method: 'The SOURCE Method',
    href: '/room-procurement-system',
    price: 'R449',
    cta: 'Explore the Procurement System',
    body: 'Specify before shopping, compare on evidence, verify real cost and fit, then track the purchase through delivery and close-out.'
  },
  completeHome: {
    id: 'complete-home-design-system',
    title: 'Complete Home Design System',
    method: 'The Veluce Path',
    href: '/complete-home-design-system',
    price: 'R999',
    cta: 'Explore the Complete System',
    body: 'Connect brief, space, lighting, procurement and whole-home project control in one evidence-led homeowner system.'
  }
};

export const articleStudioRecommendations = {
  'outdoor-lighting-glare-night-audit': { product: 'outdoorLighting', hook: 'Turn your night-audit observations into a considered lighting plan before buying more fixtures.' },
  'fire-pit-tables-centerpiece': { product: 'outdoorRoom', hook: 'Planning the rest of the patio around a fire feature?' },
  'pergola-lighting-outdoor-room': { product: 'outdoorLighting', hook: 'Want the pergola to feel intentional after dark, not simply brighter?' },
  'upward-lighting-architectural-grazing': { product: 'outdoorLighting', hook: 'Planning a complete exterior lighting composition rather than one grazing detail?' },
  'hidden-uplighting-mature-trees': { product: 'outdoorLighting', hook: 'Want the tree to belong to a complete nightscape instead of becoming an isolated bright object?' },
  'led-strip-integration-modern-deck': { product: 'outdoorLighting', hook: 'Choosing the strip is only one part of the lighting plan.' },
  'discreet-security-cameras': { product: 'completeHome', hook: 'Integrating security without letting technology take over the design?' },
  'garden-pathway-lighting': { product: 'outdoorLighting', hook: 'Design the route, focal points and darkness before choosing pathway fixtures.' },
  'solar-pathway-lights-affordable': { product: 'outdoorLighting', hook: 'Before choosing individual solar lights, decide what the path should feel like after dark.' },
  'outdoor-fireplace-focal-point': { product: 'outdoorRoom', hook: 'A focal point works best when the rest of the outdoor room is planned around it.' },
  'moonlighting-tree-canopies': { product: 'outdoorLighting', hook: 'Moonlighting becomes stronger when it is part of a restrained whole-property nightscape.' },
  'natural-stone-materials': { product: 'procurement', hook: 'Comparing beautiful materials? Turn the preference into a verifiable buying specification.' },
  'invisible-hvac-design': { product: 'completeHome', hook: 'Hidden services work best when they are coordinated with the whole design, not solved in isolation.' },
  'kitchen-appliances-luxury': { product: 'procurement', hook: 'High-ticket appliances deserve a specification and comparison before the showroom decides for you.' },
  'kitchen-design-layout': { product: 'designerBrief', hook: 'Before choosing cabinetry and finishes, turn the kitchen requirements into a brief people can actually use.' },
  'layered-lighting-bedroom': { product: 'luxuryLighting', hook: 'Want to turn these bedroom layers into a complete evening lighting plan?' },
  'luxury-interior-design-principles': { product: 'designerBrief', hook: 'Turn the principles you like into a clear brief instead of a loose inspiration board.' },
  'natural-stone-countertops-guide': { product: 'procurement', hook: 'Stone selection gets easier when finish, maintenance, sample evidence and budget are compared in one system.' },
  'perimeter-monitoring': { product: 'completeHome', hook: 'Security, lighting and arrival design should work as one system at the property edge.' },
  'quartzite-vs-porcelain-countertops': { product: 'procurement', hook: 'When two materials can both work, make the trade-offs explicit before buying.' },
  'smart-access-control': { product: 'completeHome', hook: 'Access control is one decision inside a much larger arrival, security and home-design system.' },
  'smart-blinds-follow-sun': { product: 'completeHome', hook: 'Daylight, privacy, lighting and automation work better when planned as one whole-home experience.' },
  'smart-home-lighting-control': { product: 'luxuryLighting', hook: 'Scenes and controls are most useful after the lighting hierarchy itself is clear.' },
  'garden-pathway-moonlighting': { product: 'outdoorLighting', hook: 'Keep the moonlight effect subtle by planning the entire path, focal hierarchy and protected darkness.' },
  'modular-sectionals-entertaining': { product: 'outdoorRoom', hook: 'The sectional is easier to choose once the outdoor zones, circulation and scale are settled.' },
  'outdoor-rugs-defy-elements': { product: 'outdoorRoom', hook: 'A rug anchors the room best when the furniture zones and circulation are already deliberate.' },
  'copper-lanterns-age-with-grace': { product: 'outdoorLighting', hook: 'Choose the lantern as part of the nightscape, not as an isolated fixture.' }
};

export function getStudioRecommendation(slug) {
  const entry = articleStudioRecommendations[slug];
  if (!entry) return null;
  const product = studioProducts[entry.product];
  return product ? { ...product, hook: entry.hook } : null;
}

export function splitArticleHtml(html) {
  if (!html) return ['', ''];
  const matches = [...html.matchAll(/<h2\b/gi)].map(match => match.index).filter(index => typeof index === 'number');
  if (matches.length < 3) return [html, ''];
  const target = html.length * 0.58;
  let splitIndex = matches[1];
  let bestDistance = Math.abs(splitIndex - target);
  for (const index of matches.slice(1, -1)) {
    const distance = Math.abs(index - target);
    if (distance < bestDistance) {
      splitIndex = index;
      bestDistance = distance;
    }
  }
  if (splitIndex < html.length * 0.3 || splitIndex > html.length * 0.82) {
    splitIndex = matches[Math.min(matches.length - 2, Math.max(1, Math.floor(matches.length * 0.55)))];
  }
  return [html.slice(0, splitIndex), html.slice(splitIndex)];
}

export function renderStudioRecommendationHtml(slug, salesLive = false) {
  const recommendation = getStudioRecommendation(slug);
  if (!recommendation) return '';
  const status = salesLive ? recommendation.price : recommendation.price + ' · coming soon';
  const action = salesLive ? recommendation.cta : recommendation.cta.replace('Explore', 'Preview');
  return '<aside class="veluce-studio-recommendation" style="margin:3rem 0;padding:1.75rem;border:1px solid #d6c9b5;background:#f5efe4;color:#17120f">' +
    '<p style="margin:0 0 .7rem;font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;color:#9b7448;font-weight:700">Veluce Studio · Recommended for this article</p>' +
    '<p style="margin:0 0 .75rem;font-family:Georgia,serif;font-size:1.35rem;font-style:italic;color:#6c6257">' + recommendation.hook + '</p>' +
    '<h2 style="margin:.25rem 0 .4rem;font-family:Georgia,serif;font-size:1.75rem">' + recommendation.title + '</h2>' +
    '<p style="margin:0 0 .55rem;font-size:.78rem;text-transform:uppercase;letter-spacing:.12em;color:#9b7448">' + recommendation.method + '</p>' +
    '<p style="margin:0 0 1.25rem;line-height:1.65">' + recommendation.body + '</p>' +
    '<a href="' + recommendation.href + '" data-product-id="' + recommendation.id + '" data-placement="article-studio-module" style="display:inline-block;background:#17120f;color:#fff;padding:.85rem 1rem;text-decoration:none;font-weight:700;letter-spacing:.08em;text-transform:uppercase;font-size:.75rem">' + action + ' →</a>' +
    '<p style="margin:.8rem 0 0;color:#6c6257;font-size:.85rem">' + status + '</p>' +
    '</aside>';
}
