// Build-time fetch: pulls the live DPYC community registry into a static
// JSON file the LiveOperators component reads at module import. Runs at
// `npm run build` (and on demand via `npm run fetch:members`). Failure
// is non-fatal — falls back to whatever is already on disk so the build
// doesn't break when GitHub is having a moment.
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUT = resolve(__dirname, '..', 'src', 'data', 'operators.json');
const URL =
  'https://raw.githubusercontent.com/lonniev/dpyc-community/main/members/read-only-lookup-cache.json';

async function main() {
  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    // The community cache wraps members[] in {version, updated_at, members}.
    // Pass through the upstream updated_at when available so the page can
    // show "registry updated <X>" rather than just "fetched at <Y>".
    const members = Array.isArray(data.members) ? data.members : [];
    const payload = {
      fetched_at: new Date().toISOString(),
      registry_updated_at: data.updated_at ?? null,
      members,
    };
    writeFileSync(OUT, JSON.stringify(payload, null, 2));
    console.log(`Fetched ${members.length} members → ${OUT}`);
  } catch (err) {
    if (existsSync(OUT)) {
      const cached = JSON.parse(readFileSync(OUT, 'utf-8'));
      console.warn(
        `Members fetch failed (${err.message}). Using cached snapshot from ${cached.fetched_at ?? 'unknown'}.`,
      );
    } else {
      console.warn(`Members fetch failed (${err.message}). No cache; LiveOperators will render empty.`);
      writeFileSync(OUT, JSON.stringify({ fetched_at: null, members: [] }, null, 2));
    }
  }
}

main();
