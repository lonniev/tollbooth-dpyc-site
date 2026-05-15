import { motion } from 'framer-motion';
import {
  KeyRound,
  Zap,
  ShoppingCart,
  Database,
  FileText,
} from 'lucide-react';

const prerequisites = [
  {
    icon: KeyRound,
    title: 'Nostr keypair',
    body: 'Your secure DPYC identity (npub / nsec). Generate with `nak key generate` or any Nostr client.',
  },
  {
    icon: Zap,
    title: 'Lightning wallet',
    body: 'Receive sats from your patrons. Alby, Zeus, Phoenix, or any BOLT11 wallet. No node required.',
  },
  {
    icon: ShoppingCart,
    title: 'BTCPay credentials',
    body: 'Create Lightning invoices for credit purchases. Self-hosted or provisioned by your sponsor Authority.',
  },
  {
    icon: Database,
    title: 'Neon Postgres database',
    body: 'Provisioned by your sponsor Authority — a per-operator schema with its own LOGIN role. Your ad valorem fee on each credit purchase compensates the Authority for this persistence service.',
  },
];

const steps = [
  {
    title: 'Generate a Nostr keypair.',
    body: 'Save both halves. The npub goes into the community registry; the nsec becomes the TOLLBOOTH_NOSTR_OPERATOR_NSEC env var on your deployment. The npub is your secure DPYC identity — no email, no password, no KYC.',
  },
  {
    title: 'Find a sponsor Authority.',
    body: 'Authorities certify Operators and collect a small ad valorem fee (default 2%, minimum 10 sats) on credit purchases. Ask the DPYC Oracle for an active Authority. Your sponsor registers your npub in the community registry, provisions your per-operator Neon schema with its own LOGIN role, optionally provisions a BTCPay store, and hands you the env vars you need.',
  },
  {
    title: 'Clone tollbooth-sample, swap your env vars.',
    body: 'The sample is the canonical reference — a working Open-Meteo weather MCP that wires every piece (OperatorRuntime, register_standard_tools, NeonVault, Secure Courier, Authority client) the way the wheel expects. Copy it, replace the domain logic, paste the values your Authority handed you (NEON_DATABASE_URL, BTCPAY_HOST, BTCPAY_API_KEY, BTCPAY_STORE_ID), and add your own TOLLBOOTH_NOSTR_OPERATOR_NSEC.',
  },
  {
    title: 'Deploy to FastMCP Cloud.',
    body: 'Push to GitHub, connect at app.fastmcp.cloud, paste env vars in the dashboard. Your MCP service is live with a stable URL within a minute. Self-hosted (Docker, systemd, bare metal) works the same — the env vars are the only contract.',
  },
  {
    title: 'Onboard your first patron.',
    body: 'Patrons exchange credentials with your service via Secure Courier — encrypted Nostr DMs. Patron calls request_credential_channel with their npub, replies to the welcome DM with their credentials, calls receive_credentials to activate. From then on, every paid tool call silently debits their pre-funded balance — no popups, no interruptions.',
  },
];

const roles = [
  {
    role: 'Citizen (patron)',
    registers_with: 'Operator',
    pays_fees_to: 'Operator (per tool call)',
    registers_others: '—',
  },
  {
    role: 'Operator (you)',
    registers_with: 'Authority',
    pays_fees_to: 'Authority (cert fee)',
    registers_others: 'Citizens',
  },
  {
    role: 'Authority',
    registers_with: 'Prime Authority',
    pays_fees_to: 'Prime (cert fee)',
    registers_others: 'Operators',
  },
];

export default function GettingStarted() {
  return (
    <section id="getting-started" className="border-t border-ink-400/30 bg-ink-800">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-brand-300 text-sm font-semibold tracking-widest uppercase mb-4">
            Getting Started
          </p>
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight">
            Ship a monetized MCP service before lunch.
          </h2>
          <p className="mt-6 text-ink-100 leading-relaxed max-w-readable">
            Five steps from zero to a live, Lightning-monetized MCP service.
            No middleware to integrate, no payments SDK to wire, no KYC flows
            to vet. The wheel handles identity, billing, rollback, and audit
            — you bring the domain code and four env vars.
          </p>

          {/* Prerequisites grid */}
          <h3 className="mt-14 text-2xl font-semibold">What you need</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {prerequisites.map((p) => (
              <div
                key={p.title}
                className="rounded-lg border border-ink-400/40 bg-ink-700/50 p-5 backdrop-blur-sm"
              >
                <p.icon className="text-brand-400 mb-3" size={24} />
                <h4 className="font-semibold mb-2">{p.title}</h4>
                <p className="text-sm text-ink-100 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>

          {/* Numbered steps */}
          <h3 className="mt-16 text-2xl font-semibold">Five steps</h3>
          <ol className="mt-6 space-y-6">
            {steps.map((s, idx) => (
              <li
                key={s.title}
                className="rounded-lg border border-ink-400/40 bg-ink-700/40 p-6 flex gap-5"
              >
                <div className="flex-shrink-0 flex items-start">
                  <span className="font-mono text-3xl font-light text-brand-400 leading-none">
                    {idx + 1}
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">{s.title}</h4>
                  <p className="mt-2 text-ink-100 leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Cert fee cascade callout */}
          <div className="mt-12 rounded-lg border border-brand-400/40 bg-ink-700/60 p-6">
            <h3 className="text-lg font-semibold mb-2 text-brand-300">
              The certification fee cascade
            </h3>
            <p className="text-sm text-ink-100 leading-relaxed">
              When a patron buys credits, your service auto-requests a
              certificate from your Authority over MCP. The Authority deducts
              its ad valorem fee (default 2%, min 10 sats) from{' '}
              <em>its own</em> pre-funded balance with the Prime Authority and
              returns a signed certificate. Your service then creates a BTCPay
              invoice for the <strong>full</strong> amount the patron requested.
              Patrons pay exactly what they asked for — the fee is an
              Operator cost, paid silently behind the scenes. That fee is what
              compensates the Authority for the services they provide you:
              your per-operator Neon schema, certificate signing, BTCPay
              hosting (when offered), and the registry membership that makes
              your service discoverable.
            </p>
          </div>

          {/* Roles matrix */}
          <h3 className="mt-12 text-2xl font-semibold">Roles at a glance</h3>
          <div className="mt-6 overflow-x-auto rounded-lg border border-ink-400/40">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-ink-700/60 text-left text-brand-300">
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 font-semibold">Registers with</th>
                  <th className="px-4 py-3 font-semibold">Pays fees to</th>
                  <th className="px-4 py-3 font-semibold">Registers others</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-400/30">
                {roles.map((r) => (
                  <tr key={r.role} className="bg-ink-700/30">
                    <td className="px-4 py-3 font-semibold">{r.role}</td>
                    <td className="px-4 py-3 text-ink-100">{r.registers_with}</td>
                    <td className="px-4 py-3 text-ink-100">{r.pays_fees_to}</td>
                    <td className="px-4 py-3 text-ink-100">{r.registers_others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA: full guide */}
          <div className="mt-12 rounded-lg border border-ink-400/40 bg-ink-700/60 p-6 flex items-start gap-4">
            <FileText className="text-brand-400 flex-shrink-0 mt-0.5" size={28} />
            <div>
              <h3 className="font-semibold mb-1 text-lg">
                The full operator playbook
              </h3>
              <p className="text-sm text-ink-100 leading-relaxed">
                Every step expanded — env-var reference, Authority discovery,
                self-hosted vs sponsor BTCPay, deploying to FastMCP Cloud,
                onboarding patrons via Secure Courier, the full role / fee /
                registration matrix.{' '}
                <a
                  href="https://github.com/lonniev/tollbooth-sample/blob/main/GETTING-STARTED.md"
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-300 hover:text-brand-200 underline underline-offset-4"
                >
                  Read GETTING-STARTED.md →
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
