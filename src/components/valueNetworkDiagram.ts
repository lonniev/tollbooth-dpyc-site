// Draws the Tollbooth DPYC value network into an <svg>: every actor, the
// flows of sats, dollars, MCP calls, certificates and hosting between them,
// and dots that travel each flow. Colors come from CSS custom properties on
// `host` (--vn-btc, --vn-fiat, …). Returns a cleanup that stops the motion.

type Attrs = Record<string, string | number>;

const NS = 'http://www.w3.org/2000/svg';
const VW = 1600;
const VH = 980;
const NAVY = '#061230';
const FLOW_KINDS = ['btc', 'fiat', 'mcp', 'cert', 'chain', 'build'] as const;

const ICON: Record<string, string> = {
  bank: 'M3 10h18L12 4z M5 10v8 M9.5 10v8 M14.5 10v8 M19 10v8 M3 20.5h18',
  bolt: 'M13 2L4.5 13.5h6.5l-1 8.5 9-12h-6.5z',
  person: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5',
  booth: 'M12 2l9 5v10l-9 5-9-5V7z M8 12h8 M12 8v8',
  shield: 'M12 2.5l8 3v6c0 5-3.4 8.8-8 10.5-4.6-1.7-8-5.5-8-10.5v-6z M8.5 12l2.5 2.5 4.5-5',
  idea: 'M9 18h6 M10 21h4 M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z',
  code: 'M8 7l-5 5 5 5 M16 7l5 5-5 5 M13.5 4l-3 16',
  relay: 'M12 13a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M8 7.5a6 6 0 0 0 0 8 M16 7.5a6 6 0 0 1 0 8 M5 4.5a10 10 0 0 0 0 14 M19 4.5a10 10 0 0 1 0 14',
  rocket: 'M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2 M9 15l-3-3c1.5-4.5 5.5-9 13-9 0 7.5-4.5 11.5-9 13z M14.5 9.5h.01',
  chat: 'M4 5h16v11H10l-5 4v-4H4z M8 10.5h8',
  cloud: 'M7 18a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 8.5a4.5 4.5 0 0 1 0 9.5z',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M3 12h18 M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z',
};

const MAP = [
  '................................................................',
  '.........######.......####..........#############...............',
  '....###############..######.....######################..........',
  '..#################...####....#########################.###.....',
  '....###############..........##..###################....#.......',
  '.....#############..........#####.##################............',
  '......##########............########################............',
  '.......#######.............#####...################.............',
  '........####...............######...#######.#######.............',
  '.........###..............##########...###...#####..............',
  '..........####...........############...#.....###...............',
  '...........######.........###########..........##..#............',
  '............########.......#########............#..##...........',
  '.............########.......#######..............######.........',
  '..............#######........######.............#########.......',
  '...............######........######.............##########......',
  '...............#####.........#####...............########.......',
  '...............####...........###.................#....##.......',
  '...............###............##...........................##...',
  '...............##.......................................#.......',
];

interface Edge {
  d: string;
  k: string;
  step?: number;
  label?: string | string[];
  lx?: number;
  ly?: number;
  anchor?: 'start' | 'middle' | 'end';
  both?: boolean;
  own?: boolean;
  w?: number;
}

const EDGES: Edge[] = [
  { d: 'M280 765L398 765', k: 'build', step: 1, label: 'builds with', lx: 340, ly: 698 },
  { d: 'M620 765L760 765Q780 765 780 745L780 552', k: 'build', label: 'deploys', lx: 826, ly: 690 },
  { d: 'M960 550L960 585L1346 585', k: 'build', step: 1, label: 'hosted on', lx: 1170, ly: 585 },
  { d: 'M1000 215L1346 215', k: 'build', w: 3, label: 'runs on EC2', lx: 1180, ly: 215 },
  { d: 'M1320 450L1330 450L1330 405L1346 405', k: 'build' },
  { d: 'M1220 820L1220 834L1334 834L1334 795L1346 795', k: 'build', step: 1, label: 'bundled into front-ends', lx: 1215, ly: 834 },
  { d: 'M1346 740L1330 740L1330 625L1060 625L1060 535L1002 535', k: 'mcp', both: true, step: 6, label: 'front-end ⇄ MCP back-end', lx: 1195, ly: 625 },
  { d: 'M1000 462L1118 462', k: 'btc', step: 2, label: 'pre-funds', lx: 1060, ly: 440 },
  { d: 'M620 195L758 195', k: 'btc', step: 4, label: 'pays invoice', lx: 690, ly: 175 },
  { d: 'M760 230L622 230', k: 'btc', step: 7, label: 'payout sweep', lx: 690, ly: 252 },
  { d: 'M880 265L880 408', k: 'btc', step: 5, label: ['invoice settled', 'api_sats credited'], lx: 894, ly: 318, anchor: 'start' },
  { d: 'M280 195L398 195', k: 'fiat', step: 3, label: 'buy sats', lx: 340, ly: 175 },
  { d: 'M400 230L282 230', k: 'fiat', step: 7, label: 'sell sats', lx: 340, ly: 252 },
  { d: 'M170 155L170 84L1456 84L1456 102', k: 'fiat', step: 7, label: 'hosting bills, paid in dollars', lx: 812, ly: 84 },
  { d: 'M280 465L738 465', k: 'mcp', step: 6, label: 'tool call · fare debited in api_sats', lx: 510, ly: 444 },
  { d: 'M740 500L282 500', k: 'mcp', step: 6, label: 'the answer', lx: 510, ly: 522 },
  { d: 'M1120 500L1002 500', k: 'cert', step: 5, label: 'certifies', lx: 1060, ly: 522 },
  { d: 'M940 710L940 552', k: 'cert', both: true, label: ['npub proofs', 'with Patrons'], lx: 952, ly: 672, anchor: 'start' },
  { d: 'M1080 710L1080 662L1170 662L1170 549', k: 'cert', both: true, label: 'npub proofs', lx: 1182, ly: 646, anchor: 'start' },
  { d: 'M1000 820L1000 846L40 846L40 627L56 627', k: 'cert', both: true, label: 'Nostr DMs · npub proofs · Secure Courier', lx: 470, ly: 846 },
  { d: 'M170 545L170 597', k: 'cert', own: true },
  { d: 'M170 413L170 267', k: 'fiat', own: true },
  { d: 'M262 413L428 267', k: 'btc', own: true },
  { d: 'M790 265L790 298Q790 314 774 314L716 314Q700 314 700 330L700 884', k: 'chain', label: ['channels open', '& close on-chain'], lx: 688, ly: 372, anchor: 'end' },
  { d: 'M880 550L880 884', k: 'chain', label: ['ledgers notarized', 'via OpenTimestamps'], lx: 866, ly: 606, anchor: 'end' },
];

interface Node {
  x: number;
  y: number;
  w: number;
  h: number;
  k: string;
  art: 'holo' | 'phone' | 'tower' | 'laptop' | 'cube' | 'monitor' | 'cyl';
  g?: string;
  kick: string;
  title: string;
  sub: string[];
  badge?: { t: string; k: string };
  compact?: boolean;
  hero?: boolean;
}

const NODES: Node[] = [
  { x: 170, y: 210, w: 220, h: 110, k: 'fiat', art: 'holo', g: 'bank', kick: 'TRADFI', title: 'BANK', sub: ['dollar accounts', 'on- and off-ramps'], badge: { t: 'KYC', k: 'kyc' } },
  { x: 510, y: 210, w: 220, h: 110, k: 'btc', art: 'phone', g: 'bolt', kick: 'LIGHTNING', title: 'WALLET', sub: ['Phoenix and friends', 'self-custody sats'] },
  { x: 880, y: 210, w: 240, h: 110, k: 'btc', art: 'tower', g: 'bolt', kick: "OPERATOR'S TILL", title: 'BTCPAY', sub: ['+ LND Lightning node', 'runs on AWS EC2'], badge: { t: 'DPYC™ · NO KYC', k: 'btc' } },
  { x: 170, y: 627, w: 220, h: 56, k: 'cert', art: 'phone', g: 'chat', kick: "PATRON'S NOSTR APPS", title: '0xchat · Pricing Studio', sub: [], compact: true },
  { x: 170, y: 480, w: 220, h: 126, k: 'mcp', art: 'laptop', g: 'person', kick: 'CUSTOMER', title: 'PATRON', sub: ['an npub identity', 'pays from a bank', 'or a Lightning wallet'] },
  { x: 870, y: 480, w: 260, h: 140, k: 'mcp', art: 'cube', g: 'booth', kick: 'TOLLBOOTH', title: 'OPERATOR', sub: ['an MCP server', 'meters each fare', 'in api_sats'], hero: true },
  { x: 1220, y: 480, w: 200, h: 126, k: 'cert', art: 'cube', g: 'shield', kick: 'TOLLBOOTH', title: 'AUTHORITY', sub: ['sells api_sats', 'certifies every sale', 'Schnorr-signed'] },
  { x: 170, y: 765, w: 220, h: 110, k: 'build', art: 'monitor', g: 'idea', kick: 'FOUNDER', title: 'ENTREPRENEUR', sub: ['conceives a service', 'an MCP tool can sell'] },
  { x: 510, y: 765, w: 220, h: 110, k: 'build', art: 'cube', g: 'code', kick: 'SHARED SDK', title: 'TOLLBOOTH-DPYC', sub: ['pricing · vault', 'auth · audit'] },
  { x: 1220, y: 765, w: 200, h: 110, k: 'build', art: 'cube', g: 'globe', kick: 'NPM MODULE', title: 'WEB LIBRARIES', sub: ['@tollbooth-dpyc/web', 'for Cloudflare front-ends'] },
  { x: 1000, y: 765, w: 200, h: 110, k: 'cert', art: 'holo', g: 'relay', kick: 'IDENTITY', title: 'NOSTR', sub: ['relays carry proofs', 'and Secure Courier'] },
  { x: 1456, y: 225, w: 212, h: 100, k: 'build', art: 'tower', kick: 'AWS', title: 'EC2', sub: ['runs BTCPay + LND'] },
  { x: 1456, y: 405, w: 212, h: 110, k: 'build', art: 'cyl', kick: 'DATABASE', title: 'NEON', sub: ['ledgers and vaults', 'set up by Authority'] },
  { x: 1456, y: 585, w: 212, h: 110, k: 'build', art: 'holo', g: 'rocket', kick: 'FASTMCP', title: 'HORIZON', sub: ['hosts Operators', '(or Spin on Akamai)'] },
  { x: 1456, y: 765, w: 212, h: 100, k: 'build', art: 'holo', g: 'cloud', kick: 'EDGE', title: 'CLOUDFLARE', sub: ['web front-ends, DNS'] },
];

export function drawValueNetwork(svg: SVGSVGElement, host: HTMLElement): () => void {
  svg.replaceChildren();
  const css = getComputedStyle(host);
  const C = (k: string) => css.getPropertyValue('--vn-' + k).trim();
  const el = <K extends keyof SVGElementTagNameMap>(tag: K, a: Attrs = {}, p: Element = svg) => {
    const e = document.createElementNS(NS, tag);
    for (const k in a) e.setAttribute(k, String(a[k]));
    p.appendChild(e);
    return e;
  };
  const txt = (s: string | number, a: Attrs, p: Element = svg) => {
    const t = el('text', a, p);
    t.textContent = String(s);
    return t;
  };

  // ---------- defs ----------
  const defs = el('defs');
  const glow = (id: string, sd: number) => {
    const f = el('filter', { id, filterUnits: 'userSpaceOnUse', x: 0, y: 0, width: VW, height: VH }, defs);
    el('feGaussianBlur', { stdDeviation: sd, result: 'b' }, f);
    const m = el('feMerge', {}, f);
    el('feMergeNode', { in: 'b' }, m);
    el('feMergeNode', { in: 'SourceGraphic' }, m);
  };
  glow('vn-glow', 2.6);
  glow('vn-glowBig', 6);
  const lg = (id: string, stops: [number, string, number?][]) => {
    const g = el('linearGradient', { id, x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    stops.forEach(([o, c, op = 1]) => el('stop', { offset: o, 'stop-color': c, 'stop-opacity': op }, g));
  };
  lg('vn-fT', [[0, '#7fe0ff'], [1, '#2f86d8']]);
  lg('vn-fL', [[0, '#2468b8'], [1, '#0c2a5e']]);
  lg('vn-fR', [[0, '#2f7bd0'], [1, '#11387a']]);
  lg('vn-scr', [[0, '#123e86'], [1, '#071a40']]);
  lg('vn-metal', [[0, '#3a6fb8'], [1, '#16376e']]);
  lg('vn-gold', [[0, '#ffe08a'], [1, '#c98a1c']]);
  lg('vn-card', [[0, '#0f2a5c', 0.82], [1, '#071634', 0.88]]);
  for (const k of FLOW_KINDS) {
    const mk = el('marker', { id: 'vn-ar-' + k, viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' }, defs);
    el('path', { d: 'M0 0L10 5L0 10z', fill: C(k) }, mk);
  }
  const GLOW = 'url(#vn-glow)';
  const GLOW_BIG = 'url(#vn-glowBig)';

  // ---------- backdrop: dotted world map + circuit traces ----------
  const mapG = el('g', { fill: '#4a8fe8', 'fill-opacity': 0.16 });
  MAP.forEach((row, r) =>
    [...row].forEach((ch, c) => {
      if (ch === '#') el('circle', { cx: 12 + c * 25, cy: 150 + r * 34, r: 2.4 }, mapG);
    }),
  );
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const circ = el('g', { stroke: '#2f7fe0', 'stroke-opacity': 0.22, 'stroke-width': 1.4, fill: 'none' });
  for (let i = 0; i < 34; i++) {
    const side = i % 4;
    let x: number, y: number, dx: number, dy: number;
    if (side === 0) [x, y, dx, dy] = [0, 120 + rnd() * 720, 1, 0];
    else if (side === 1) [x, y, dx, dy] = [VW, 120 + rnd() * 720, -1, 0];
    else if (side === 2) [x, y, dx, dy] = [60 + rnd() * 1480, 0, 0, 1];
    else [x, y, dx, dy] = [60 + rnd() * 1480, VH, 0, -1];
    const a = 20 + rnd() * 50;
    const b = 20 + rnd() * 60;
    const s = rnd() < 0.5 ? 1 : -1;
    const x1 = x + dx * a, y1 = y + dy * a;
    const x2 = x1 + (dx || s) * b, y2 = y1 + (dy || s) * b;
    const x3 = x2 + dx * a * 0.6, y3 = y2 + dy * a * 0.6;
    el('path', { d: `M${x} ${y}L${x1} ${y1}L${x2} ${y2}L${x3} ${y3}` }, circ);
    el('circle', { cx: x3, cy: y3, r: 3, fill: '#3fa8ff', 'fill-opacity': 0.35, stroke: 'none' }, circ);
  }

  // ---------- title ----------
  const tg = el('g');
  const titleT = txt('TOLLBOOTH DPYC™ VALUE NETWORK', { x: 800, y: 46, 'text-anchor': 'middle', 'font-family': 'Oswald,Arial Narrow,sans-serif', 'font-weight': 700, 'font-size': 32, 'letter-spacing': '1.5', fill: '#f2f8ff', stroke: '#06102a', 'stroke-width': 5, 'paint-order': 'stroke', filter: GLOW }, tg);
  const tdots = [538, 1062].map((x) => el('circle', { cx: x, cy: 35, r: 5, fill: C('mcp'), filter: GLOW_BIG }, tg));
  el('line', { x1: 560, y1: 58, x2: 1040, y2: 58, stroke: C('mcp'), 'stroke-opacity': 0.5, 'stroke-width': 1.4, filter: GLOW }, tg);

  // ---------- illustration kit ----------
  const glyph = (p: Element, name: string, cx: number, cy: number, size: number, col = '#bff4ff', sw = 1.8) => {
    const s = size / 24;
    const g = el('g', { transform: `translate(${cx - 12 * s},${cy - 12 * s}) scale(${s})`, filter: GLOW }, p);
    el('path', { d: ICON[name], fill: 'none', stroke: col, 'stroke-width': sw, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
  };
  const lock = (p: Element, cx: number, cy: number, s: number) => {
    el('path', { d: `M${cx - s * 0.11} ${cy}v${-s * 0.1}a${s * 0.11} ${s * 0.11} 0 0 1 ${s * 0.22} 0v${s * 0.1}`, fill: 'none', stroke: '#ffd77a', 'stroke-width': s * 0.045 }, p);
    el('rect', { x: cx - s * 0.17, y: cy, width: s * 0.34, height: s * 0.26, rx: s * 0.04, fill: 'url(#vn-gold)', stroke: '#7a4d0a', 'stroke-width': s * 0.015 }, p);
    el('circle', { cx, cy: cy + s * 0.11, r: s * 0.035, fill: '#5a3505' }, p);
  };
  const chainLine = (p: Element, x1: number, y1: number, x2: number, y2: number, s: number) => {
    const n = 9;
    const ang = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n, x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t;
      el('ellipse', { cx: x, cy: y, rx: i % 2 ? s * 0.08 : s * 0.1, ry: i % 2 ? s * 0.025 : s * 0.05, transform: `rotate(${ang} ${x} ${y})`, fill: 'none', stroke: '#e8b54a', 'stroke-width': s * 0.03 }, p);
    }
  };
  const cube = (p: Element, cx: number, cy: number, s: number, o: { chain?: boolean; glyph?: string; gc?: string; lock?: boolean } = {}) => {
    const g = el('g', {}, p);
    const k = 0.866 * s;
    el('polygon', { points: `${cx - k},${cy - s / 2} ${cx},${cy} ${cx},${cy + s} ${cx - k},${cy + s / 2}`, fill: 'url(#vn-fL)' }, g);
    el('polygon', { points: `${cx},${cy} ${cx + k},${cy - s / 2} ${cx + k},${cy + s / 2} ${cx},${cy + s}`, fill: 'url(#vn-fR)' }, g);
    el('polygon', { points: `${cx},${cy - s} ${cx + k},${cy - s / 2} ${cx},${cy} ${cx - k},${cy - s / 2}`, fill: 'url(#vn-fT)' }, g);
    for (let i = 0; i < 4; i++) {
      const t = 0.3 + i * 0.16;
      el('line', { x1: cx + k * 0.15, y1: cy + s * t - s * 0.075, x2: cx + k * (0.45 + (i % 2) * 0.3), y2: cy + s * t - s * (0.225 + (i % 2) * 0.15), stroke: '#9fe9ff', 'stroke-opacity': 0.45, 'stroke-width': Math.max(0.8, s * 0.03) }, g);
    }
    el('path', { d: `M${cx - k} ${cy - s / 2}L${cx} ${cy - s}L${cx + k} ${cy - s / 2}L${cx + k} ${cy + s / 2}L${cx} ${cy + s}L${cx - k} ${cy + s / 2}Z M${cx - k} ${cy - s / 2}L${cx} ${cy}L${cx + k} ${cy - s / 2} M${cx} ${cy}L${cx} ${cy + s}`, fill: 'none', stroke: '#9ff0ff', 'stroke-width': Math.max(1, s * 0.035), 'stroke-linejoin': 'round', filter: GLOW }, g);
    if (o.chain) {
      chainLine(g, cx - k * 0.92, cy - s * 0.05, cx + k * 0.92, cy + s * 0.55, s);
      chainLine(g, cx - k * 0.92, cy + s * 0.55, cx + k * 0.92, cy - s * 0.05, s);
    }
    if (o.glyph) {
      el('circle', { cx, cy: cy + s * 0.18, r: s * 0.3, fill: '#06163a', stroke: o.gc || '#9ff0ff', 'stroke-width': Math.max(1, s * 0.04), filter: GLOW }, g);
      glyph(g, o.glyph, cx, cy + s * 0.18, s * 0.38, o.gc || '#bff4ff');
    } else if (o.lock !== false) lock(g, cx, cy + s * 0.05, s);
    return g;
  };
  const screen = (p: Element, x: number, y: number, w: number, h: number, o: { glyph?: string; gc?: string }) => {
    el('rect', { x, y, width: w, height: h, rx: 3, fill: 'url(#vn-scr)', stroke: '#8fe6ff', 'stroke-width': 1.6, filter: GLOW }, p);
    if (o.glyph) glyph(p, o.glyph, x + w / 2, y + h / 2, Math.min(w, h) * 0.62, o.gc);
    else for (let i = 0; i < 3; i++) cube(p, x + w * (0.22 + i * 0.28), y + h * 0.42, Math.min(w, h) * 0.17, { lock: false });
  };
  const laptop = (p: Element, cx: number, cy: number, s: number, o: { glyph?: string; gc?: string }) => {
    const g = el('g', {}, p);
    screen(g, cx - 0.8 * s, cy - 0.8 * s, 1.6 * s, 1.0 * s, o);
    el('polygon', { points: `${cx - 0.82 * s},${cy + 0.24 * s} ${cx + 0.82 * s},${cy + 0.24 * s} ${cx + 1.02 * s},${cy + 0.42 * s} ${cx - 1.02 * s},${cy + 0.42 * s}`, fill: 'url(#vn-metal)', stroke: '#8fe6ff', 'stroke-width': 1.2 }, g);
  };
  const monitor = (p: Element, cx: number, cy: number, s: number, o: { glyph?: string; gc?: string }) => {
    const g = el('g', {}, p);
    screen(g, cx - 0.85 * s, cy - 0.82 * s, 1.7 * s, 1.15 * s, o);
    el('rect', { x: cx - 0.1 * s, y: cy + 0.33 * s, width: 0.2 * s, height: 0.25 * s, fill: 'url(#vn-metal)' }, g);
    el('ellipse', { cx, cy: cy + 0.6 * s, rx: 0.5 * s, ry: 0.1 * s, fill: 'url(#vn-metal)', stroke: '#8fe6ff', 'stroke-width': 1 }, g);
  };
  const phone = (p: Element, cx: number, cy: number, s: number, o: { glyph?: string; gc?: string }) => {
    const g = el('g', {}, p);
    el('rect', { x: cx - 0.45 * s, y: cy - 0.8 * s, width: 0.9 * s, height: 1.6 * s, rx: 0.14 * s, fill: 'url(#vn-metal)', stroke: '#8fe6ff', 'stroke-width': 1.4, filter: GLOW }, g);
    el('rect', { x: cx - 0.36 * s, y: cy - 0.66 * s, width: 0.72 * s, height: 1.3 * s, rx: 0.05 * s, fill: 'url(#vn-scr)' }, g);
    if (o.glyph) glyph(g, o.glyph, cx, cy, 0.55 * s, o.gc);
  };
  const tower = (p: Element, cx: number, cy: number, s: number, o: { glyph?: string; gc?: string }) => {
    const g = el('g', {}, p);
    for (let i = 0; i < 3; i++) {
      const y = cy - 0.8 * s + i * 0.55 * s;
      el('rect', { x: cx - 0.65 * s, y, width: 1.3 * s, height: 0.46 * s, rx: 3, fill: 'url(#vn-metal)', stroke: '#8fe6ff', 'stroke-width': 1.3, filter: GLOW }, g);
      for (let j = 0; j < 3; j++) el('circle', { cx: cx - 0.45 * s + j * 0.14 * s, cy: y + 0.23 * s, r: 0.045 * s, fill: j === 0 ? '#4dffb0' : '#3fe4ff' }, g);
      el('line', { x1: cx + 0.02 * s, y1: y + 0.23 * s, x2: cx + 0.5 * s, y2: y + 0.23 * s, stroke: '#9fe9ff', 'stroke-opacity': 0.55, 'stroke-width': 1.4 }, g);
    }
    if (o.glyph) {
      el('circle', { cx: cx + 0.62 * s, cy: cy - 0.78 * s, r: 0.3 * s, fill: '#06163a', stroke: o.gc ?? '#bff4ff', 'stroke-width': 1.4, filter: GLOW }, g);
      glyph(g, o.glyph, cx + 0.62 * s, cy - 0.78 * s, 0.38 * s, o.gc);
    }
  };
  const cylinder = (p: Element, cx: number, cy: number, s: number) => {
    const g = el('g', {}, p);
    const rx = 0.7 * s, ry = 0.22 * s, top = cy - 0.7 * s, bot = cy + 0.7 * s;
    el('path', { d: `M${cx - rx} ${top}V${bot}A${rx} ${ry} 0 0 0 ${cx + rx} ${bot}V${top}`, fill: 'url(#vn-fR)', stroke: '#8fe6ff', 'stroke-width': 1.4, filter: GLOW }, g);
    for (const y of [top + 0.47 * s, top + 0.94 * s]) el('path', { d: `M${cx - rx} ${y}A${rx} ${ry} 0 0 0 ${cx + rx} ${y}`, fill: 'none', stroke: '#8fe6ff', 'stroke-opacity': 0.7, 'stroke-width': 1.2 }, g);
    el('ellipse', { cx, cy: top, rx, ry, fill: 'url(#vn-fT)', stroke: '#bff4ff', 'stroke-width': 1.4 }, g);
  };
  const holo = (p: Element, cx: number, cy: number, s: number, o: { glyph?: string; gc?: string }) => {
    const g = el('g', {}, p);
    const py = cy + 0.55 * s;
    el('ellipse', { cx, cy: py, rx: 0.85 * s, ry: 0.24 * s, fill: 'url(#vn-metal)', stroke: '#8fe6ff', 'stroke-width': 1.4, filter: GLOW }, g);
    el('ellipse', { cx, cy: py - 0.04 * s, rx: 0.55 * s, ry: 0.14 * s, fill: 'none', stroke: o.gc || '#3fe4ff', 'stroke-opacity': 0.8, 'stroke-width': 1.2 }, g);
    el('path', { d: `M${cx - 0.5 * s} ${py - 0.04 * s}L${cx - 0.7 * s} ${cy - 0.7 * s}H${cx + 0.7 * s}L${cx + 0.5 * s} ${py - 0.04 * s}Z`, fill: o.gc || '#3fe4ff', 'fill-opacity': 0.07 }, g);
    if (o.glyph) glyph(g, o.glyph, cx, cy - 0.18 * s, 1.0 * s, o.gc || '#bff4ff', 1.6);
  };

  // ---------- hosting panel + blockchain band ----------
  el('rect', { x: 1338, y: 102, width: 236, height: 732, rx: 14, fill: '#081a40', 'fill-opacity': 0.5, stroke: C('build'), 'stroke-opacity': 0.5, 'stroke-dasharray': '3 6' });
  txt('HOSTING · PAID IN USD', { x: 1456, y: 132, 'text-anchor': 'middle', 'font-family': 'Oswald,sans-serif', 'font-weight': 600, 'font-size': 14, 'letter-spacing': '2.5', fill: C('build') });

  const chainG = el('g');
  for (let i = 0; i < 15; i++) {
    const x = 62 + i * 106, y = 916;
    if (i < 14) {
      el('line', { x1: x + 24, y1: y + 6, x2: x + 80, y2: y + 6, stroke: C('chain'), 'stroke-width': 2, 'stroke-opacity': 0.8, 'marker-end': 'url(#vn-ar-chain)', filter: GLOW }, chainG);
      if (i % 3 === 1) txt('PREV HASH', { x: x + 53, y: y - 4, 'text-anchor': 'middle', 'font-family': 'Oswald,sans-serif', 'font-weight': 600, 'font-size': 10, 'letter-spacing': '1', fill: C('chain'), 'fill-opacity': 0.85 }, chainG);
    }
    cube(chainG, x, y, 21, { chain: true });
  }
  txt('BITCOIN BLOCKCHAIN · FINAL SETTLEMENT', { x: 1000, y: 872, 'font-family': 'Oswald,sans-serif', 'font-weight': 700, 'font-size': 15, 'letter-spacing': '2.5', fill: C('chain'), stroke: NAVY, 'stroke-width': 4, 'paint-order': 'stroke', filter: GLOW });

  // ---------- edges ----------
  interface Label { e: Edge; pill: SVGRectElement; texts: SVGTextElement[]; badge?: SVGGElement; n: number }
  const edgeG = el('g');
  const dotNodeG = el('g');
  const labelG = el('g');
  const flows: { p: SVGPathElement; k: string }[] = [];
  const labels: Label[] = [];
  const makeLabel = (e: Edge): Label => {
    const g = el('g', {}, labelG);
    const lines = (Array.isArray(e.label) ? e.label : [e.label ?? '']).map((s) => s.toUpperCase());
    const col = C(e.k);
    const pill = el('rect', { rx: 6, fill: NAVY, 'fill-opacity': 0.92, stroke: col, 'stroke-opacity': 0.55, 'stroke-width': 1 }, g);
    const texts = lines.map((s, i) => txt(s, { 'font-family': 'Oswald,sans-serif', 'font-weight': 600, 'font-size': 12.5, 'letter-spacing': '.6', fill: col, y: (e.ly ?? 0) + 4.5 + i * 15 }, g));
    let badge: SVGGElement | undefined;
    if (e.step) {
      badge = el('g', {}, g);
      el('circle', { r: 11, fill: col, 'fill-opacity': 0.25 }, badge);
      el('circle', { r: 8.5, fill: col }, badge);
      txt(e.step, { 'text-anchor': 'middle', y: 4, 'font-family': 'JetBrains Mono,monospace', 'font-weight': 700, 'font-size': 10.5, fill: NAVY }, badge);
    }
    return { e, pill, texts, badge, n: lines.length };
  };
  for (const e of EDGES) {
    const col = C(e.k);
    el('path', { d: e.d, fill: 'none', stroke: col, 'stroke-width': 6, 'stroke-opacity': 0.1, 'stroke-linecap': 'round' }, edgeG);
    const p = el('path', { d: e.d, fill: 'none', stroke: col, 'stroke-width': e.w || 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', filter: GLOW, class: e.own ? '' : 'vn-pulse', 'stroke-dasharray': e.own ? '3 6' : 'none', 'stroke-opacity': e.own ? 0.75 : 1 }, edgeG);
    if (e.both) p.setAttribute('marker-start', `url(#vn-ar-${e.k})`);
    if (!e.own) {
      p.setAttribute('marker-end', `url(#vn-ar-${e.k})`);
      flows.push({ p, k: e.k });
    }
    const m = e.d.match(/^M(\d+) (\d+)/);
    if (m) {
      el('circle', { cx: m[1], cy: m[2], r: 9, fill: col, 'fill-opacity': 0.18 }, dotNodeG);
      el('circle', { cx: m[1], cy: m[2], r: 4, fill: col, filter: GLOW_BIG }, dotNodeG);
    }
    if (e.label) labels.push(makeLabel(e));
  }
  const layoutLabels = () => {
    for (const L of labels) {
      const { e } = L;
      const w = Math.max(...L.texts.map((t) => t.getComputedTextLength()));
      const bw = L.badge ? 22 : 0;
      const tot = w + bw;
      const an = e.anchor || 'middle';
      const lx = e.lx ?? 0, ly = e.ly ?? 0;
      const left = an === 'middle' ? lx - tot / 2 : an === 'start' ? lx : lx - tot;
      L.texts.forEach((t) => t.setAttribute('x', String(left + bw)));
      L.badge?.setAttribute('transform', `translate(${left + 9},${ly})`);
      const h = 19 + (L.n - 1) * 15;
      Object.entries({ x: left - 7, y: ly - 9.5, width: tot + 14, height: h }).forEach(([k, v]) => L.pill.setAttribute(k, String(v)));
    }
  };

  // ---------- nodes: every actor ----------
  const nodeG = el('g');
  const FIT: [SVGTextElement, number][] = [];
  const badgeFits: (() => void)[] = [];
  for (const n of NODES) {
    const L = n.x - n.w / 2, T = n.y - n.h / 2, col = C(n.k);
    const g = el('g', {}, nodeG);
    if (n.hero) el('rect', { x: L - 8, y: T - 8, width: n.w + 16, height: n.h + 16, rx: 16, fill: 'none', stroke: col, 'stroke-opacity': 0.4, filter: GLOW_BIG, class: 'vn-pulse' }, g);
    el('rect', { x: L, y: T, width: n.w, height: n.h, rx: 10, fill: 'url(#vn-card)', stroke: col, 'stroke-opacity': 0.75, 'stroke-width': n.hero ? 2.2 : 1.4, filter: GLOW }, g);
    const b = 12;
    el('path', { d: `M${L} ${T + b}V${T}H${L + b} M${L + n.w - b} ${T}H${L + n.w}V${T + b} M${L + n.w} ${T + n.h - b}V${T + n.h}H${L + n.w - b} M${L + b} ${T + n.h}H${L}V${T + n.h - b}`, fill: 'none', stroke: col, 'stroke-width': 2.6, filter: GLOW }, g);
    const ax = L + (n.compact ? 30 : n.hero ? 64 : 50);
    const ay = n.y + (n.compact ? 0 : 4);
    const s = n.compact ? 17 : n.hero ? 46 : 31;
    const o = { glyph: n.g, gc: col };
    if (n.art === 'cube') cube(g, ax, ay - s * 0.15, s, { chain: n.hero, ...o });
    else if (n.art === 'laptop') laptop(g, ax, ay + 4, s * 0.95, o);
    else if (n.art === 'monitor') monitor(g, ax, ay, s * 0.92, o);
    else if (n.art === 'phone') phone(g, ax, ay, n.compact ? 26 : s * 1.15, o);
    else if (n.art === 'tower') tower(g, ax - (n.g ? 4 : 0), ay + 6, s * 0.95, o);
    else if (n.art === 'cyl') cylinder(g, ax, ay, s * 0.95);
    else holo(g, ax, ay - 2, s * 0.95, o);
    const tx = L + (n.compact ? 56 : n.hero ? 124 : 96);
    const avail = L + n.w - tx - 10;
    if (n.compact) {
      txt(n.kick, { x: tx, y: T + 22, 'font-family': 'JetBrains Mono,monospace', 'font-size': 9.5, 'letter-spacing': '1.4', fill: col }, g);
      FIT.push([txt(n.title, { x: tx, y: T + 42, 'font-family': 'Oswald,sans-serif', 'font-weight': 600, 'font-size': 15, fill: '#f2f8ff' }, g), avail]);
    } else {
      txt(n.kick, { x: tx, y: T + 24, 'font-family': 'JetBrains Mono,monospace', 'font-size': 9.5, 'letter-spacing': '1.4', fill: col }, g);
      FIT.push([txt(n.title, { x: tx, y: T + 47, 'font-family': 'Oswald,sans-serif', 'font-weight': 700, 'font-size': n.hero ? 24 : 19, 'letter-spacing': '.5', fill: '#f2f8ff', stroke: NAVY, 'stroke-width': 3, 'paint-order': 'stroke' }, g), avail]);
      n.sub.forEach((t, i) => FIT.push([txt(t, { x: tx, y: T + (n.hero ? 76 : 68) + i * 17, 'font-family': 'Oswald,sans-serif', 'font-size': 13, fill: '#a9c6f0' }, g), avail]));
    }
    if (n.badge) {
      const bc = C(n.badge.k);
      const bg = el('g', {}, g);
      const r = el('rect', { rx: 4, fill: NAVY, stroke: bc, 'stroke-width': 1.6, filter: GLOW }, bg);
      const bt = txt(n.badge.t, { 'text-anchor': 'end', x: L + n.w - 12, y: T + 4, 'font-family': 'JetBrains Mono,monospace', 'font-weight': 700, 'font-size': 10.5, 'letter-spacing': '1.4', fill: bc }, bg);
      badgeFits.push(() => {
        const w = bt.getComputedTextLength();
        Object.entries({ x: L + n.w - 20 - w, y: T - 8, width: w + 16, height: 17 }).forEach(([k, v]) => r.setAttribute(k, String(v)));
      });
    }
  }
  svg.appendChild(dotNodeG);
  svg.appendChild(labelG);

  let alive = true;
  const fitAll = () => {
    if (!alive) return;
    for (const [t, avail] of FIT) {
      t.removeAttribute('textLength');
      if (t.getComputedTextLength() > avail) {
        t.setAttribute('textLength', String(avail));
        t.setAttribute('lengthAdjust', 'spacingAndGlyphs');
      }
    }
    const tw = titleT.getComputedTextLength();
    tdots[0].setAttribute('cx', String(800 - tw / 2 - 22));
    tdots[1].setAttribute('cx', String(800 + tw / 2 + 22));
    badgeFits.forEach((f) => f());
    layoutLabels();
  };
  fitAll();
  document.fonts?.ready.then(fitAll);

  // ---------- moving sats ----------
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {
      alive = false;
    };
  }
  const dotG = el('g', { filter: GLOW });
  svg.insertBefore(dotG, nodeG);
  const dots = flows.flatMap(({ p, k }) => {
    const len = p.getTotalLength();
    const n = Math.max(1, Math.round(len / 200));
    return Array.from({ length: n }, (_, i) => ({ c: el('circle', { r: 3, fill: C(k) }, dotG), p, len, off: (i / n) * len + Math.random() * 40, sp: k === 'chain' ? 40 : 85 }));
  });
  let last = performance.now();
  let frame = 0;
  const tick = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    for (const d of dots) {
      d.off = (d.off + d.sp * dt) % d.len;
      const pt = d.p.getPointAtLength(d.off);
      d.c.setAttribute('cx', String(pt.x));
      d.c.setAttribute('cy', String(pt.y));
      d.c.setAttribute('opacity', Math.min(1, d.off / 20, (d.len - d.off) / 20).toFixed(2));
    }
    frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
  return () => {
    alive = false;
    cancelAnimationFrame(frame);
  };
}
