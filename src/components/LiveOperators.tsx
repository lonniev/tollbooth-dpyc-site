import { motion } from 'framer-motion';
import operatorsData from '../data/operators.json';

type Service = {
  name?: string;
  url?: string;
  description?: string;
};

type Member = {
  npub?: string;
  role?: string;
  status?: string;
  display_name?: string;
  member_since?: string;
  services?: Service[];
  notes?: string;
};

const { fetched_at, registry_updated_at, members } = operatorsData as {
  fetched_at: string | null;
  registry_updated_at?: string | null;
  members: Member[];
};

// Show the public-facing roles only; persona-non-grata and non-active members
// are filtered out at render time so we never accidentally promote a banned npub.
const VISIBLE_ROLES = new Set([
  'prime_authority',
  'authority',
  'operator',
  'advocate',
]);

const ROLE_LABEL: Record<string, string> = {
  prime_authority: 'Prime Authority',
  authority: 'Authority',
  operator: 'Operator',
  advocate: 'Advocate',
};

function formatTime(iso: string | null | undefined): string {
  if (!iso) return 'never';
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function LiveOperators() {
  const visible = members.filter(
    (m) => m.status === 'active' && m.role && VISIBLE_ROLES.has(m.role),
  );

  return (
    <section id="operators" className="border-t border-ink-400/30 bg-ink-800">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <h2 className="text-4xl sm:text-5xl font-light tracking-tight">
          {/* [section headline TBD] */}
          Live on the Honor Chain.
        </h2>
        <p className="mt-4 text-ink-100 max-w-readable">
          {/* [section subhead TBD] */}
          Members currently registered with the DPYC community registry. Click any to see
          its services or the live MCP endpoint.
        </p>

        {visible.length === 0 ? (
          <p className="mt-12 text-ink-200 italic">
            No active members in the registry snapshot. Run{' '}
            <code className="text-brand-300">npm run fetch:members</code> to refresh.
          </p>
        ) : (
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((m, i) => {
              const primary = m.services?.[0];
              const href = primary?.url;
              const Card = href ? motion.a : motion.div;
              return (
                <Card
                  key={m.npub ?? i}
                  {...(href ? { href, target: '_blank', rel: 'noreferrer' } : {})}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.4) }}
                  className={`rounded-lg border border-ink-400/40 bg-ink-700/60 p-5 transition-colors ${
                    href ? 'hover:border-brand-400 hover:bg-ink-600/60' : ''
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-semibold">{m.display_name ?? 'unnamed'}</h3>
                    {m.role && (
                      <span className="text-xs uppercase tracking-wide text-brand-300">
                        {ROLE_LABEL[m.role] ?? m.role}
                      </span>
                    )}
                  </div>
                  {primary?.description && (
                    <p className="text-sm text-ink-100 leading-relaxed">
                      {primary.description}
                    </p>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        <p className="mt-8 text-xs text-ink-300">
          Registry last updated {formatTime(registry_updated_at)}; site snapshot taken{' '}
          {formatTime(fetched_at)}. Refreshed at every site build.
        </p>
      </div>
    </section>
  );
}
