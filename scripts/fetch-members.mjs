// Build-time fetch: pulls the live DPYC community registry into:
//   - src/data/operators.json — consumed by the LiveOperators component
//   - public/llms.txt — served at /llms.txt for AI agents that read llms.txt
//     to discover MCP endpoints they can connect to (https://llmstxt.org/)
//
// Runs at `npm run build` (and on demand via `npm run fetch:members`).
// Failure is non-fatal — falls back to whatever is already on disk so
// the build doesn't break when GitHub is having a moment.
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUT_JSON = resolve(__dirname, '..', 'src', 'data', 'operators.json');
const OUT_LLMS = resolve(__dirname, '..', 'public', 'llms.txt');
const URL =
  'https://raw.githubusercontent.com/lonniev/dpyc-community/main/members/read-only-lookup-cache.json';

function buildLlmsTxt(members, registryUpdatedAt) {
  const lines = [];
  lines.push('# Tollbooth DPYC™');
  lines.push('');
  lines.push(
    '> MCP Monetization for BTC Entrepreneurs. Sound-money commerce without KYC or KYT. Pre-funded Bitcoin Lightning balances at the MCP tool layer.',
  );
  lines.push('');
  lines.push(
    'This file lists DPYC Authorities and Operators registered in the community',
  );
  lines.push(
    'registry — MCP servers that AI agents can connect to. Each endpoint follows',
  );
  lines.push(
    'the Model Context Protocol over SSE / streamable-HTTP and accepts pre-funded',
  );
  lines.push('credit balances paid via Bitcoin Lightning.');
  lines.push('');

  const active = (members || []).filter((m) => m.status === 'active');
  const byRole = (role) => active.filter((m) => m.role === role);
  const formatEntry = (svc, displayName) =>
    `- [${displayName ?? svc.name ?? 'unnamed'}](${svc.url}): ${svc.description ?? ''}`.trim();

  const authorities = [...byRole('prime_authority'), ...byRole('authority')];
  if (authorities.length) {
    lines.push('## Authorities');
    for (const m of authorities) {
      for (const svc of m.services ?? []) {
        if (svc.url) lines.push(formatEntry(svc, m.display_name));
      }
    }
    lines.push('');
  }

  const operators = byRole('operator');
  if (operators.length) {
    lines.push('## Operators');
    for (const m of operators) {
      for (const svc of m.services ?? []) {
        if (svc.url) lines.push(formatEntry(svc, m.display_name));
      }
    }
    lines.push('');
  }

  const advocates = byRole('advocate');
  if (advocates.length) {
    lines.push('## Advocates (community utility services)');
    for (const m of advocates) {
      for (const svc of m.services ?? []) {
        if (svc.url) lines.push(formatEntry(svc, m.display_name));
      }
    }
    lines.push('');
  }

  lines.push('## How to connect');
  lines.push(
    'Each server in this list speaks MCP. To call a paid tool on any of them:',
  );
  lines.push('');
  lines.push('1. Identify yourself with a Nostr `npub` (public key).');
  lines.push(
    '2. Establish ownership via `request_npub_proof` / `receive_npub_proof` — a Nostr DM challenge bound to your application session.',
  );
  lines.push(
    '3. Pre-fund a credit balance via `purchase_credits` — pay the returned Lightning invoice.',
  );
  lines.push(
    '4. Invoke any tool, passing the `proof_token` from step 2 as the `proof` parameter.',
  );
  lines.push('');
  lines.push(
    'Free tools (`session_status`, `check_balance`, `check_oauth_status`, `check_proof_status`, `request_npub_proof`, `receive_npub_proof`, `purchase_credits`, `check_payment`) never require credits.',
  );
  lines.push('');

  lines.push('## Source');
  lines.push(
    '- https://github.com/lonniev/tollbooth-dpyc — the SDK (Apache-2.0, Patent Pending)',
  );
  lines.push('- https://github.com/lonniev/dpyc-community — community registry');
  lines.push(
    '- https://github.com/lonniev/tollbooth-sample — reference Operator implementation',
  );
  lines.push(
    '- https://github.com/lonniev/tollbooth-pricing-studio — iPadOS pricing workbench',
  );
  lines.push('');
  lines.push('## Site');
  lines.push('- https://tollbooth-dpyc.com');
  if (registryUpdatedAt) {
    lines.push(`- Registry updated ${registryUpdatedAt}`);
  }
  lines.push(`- Snapshot taken ${new Date().toISOString()}`);
  lines.push('');

  return lines.join('\n');
}

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
    writeFileSync(OUT_JSON, JSON.stringify(payload, null, 2));
    console.log(`Fetched ${members.length} members → ${OUT_JSON}`);

    writeFileSync(OUT_LLMS, buildLlmsTxt(members, data.updated_at ?? null));
    console.log(`Wrote llms.txt → ${OUT_LLMS}`);
  } catch (err) {
    if (existsSync(OUT_JSON)) {
      const cached = JSON.parse(readFileSync(OUT_JSON, 'utf-8'));
      console.warn(
        `Members fetch failed (${err.message}). Using cached snapshot from ${cached.fetched_at ?? 'unknown'}.`,
      );
      // Regenerate llms.txt from the cache so it stays in sync with the JSON.
      writeFileSync(
        OUT_LLMS,
        buildLlmsTxt(cached.members ?? [], cached.registry_updated_at ?? null),
      );
    } else {
      console.warn(
        `Members fetch failed (${err.message}). No cache; LiveOperators will render empty.`,
      );
      writeFileSync(
        OUT_JSON,
        JSON.stringify({ fetched_at: null, members: [] }, null, 2),
      );
      writeFileSync(OUT_LLMS, buildLlmsTxt([], null));
    }
  }
}

main();
