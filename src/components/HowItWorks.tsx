import { motion } from 'framer-motion';
import { Wallet, KeyRound, Zap, ScrollText } from 'lucide-react';

const steps = [
  {
    icon: KeyRound,
    title: 'Patron proves npub',
    body: 'A single Nostr DM challenge — no email, no password, no KYC. The signed reply is the proof. Poison-keyed and persisted; survives operator restarts.',
  },
  {
    icon: Wallet,
    title: 'Patron pre-funds a credit balance',
    body: 'One Lightning invoice. Sats settle instantly into the patron\'s tranche. Tranches expire on a schedule you publish — never in arrears.',
  },
  {
    icon: Zap,
    title: 'Tool calls debit per use',
    body: 'Ad valorem or flat fares — your pricing model. The SDK gates the call against your constraint pipeline, debits the ledger, rolls back on failure. You write only the domain code.',
  },
  {
    icon: ScrollText,
    title: 'Authority certifies. Ledger anchors.',
    body: 'Every credit purchase is Schnorr-signed by a registered Authority. Ledgers are notarized to Bitcoin via OpenTimestamps — provably auditable, no trust required.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="border-t border-ink-400/30 bg-ink-700">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <h2 className="text-4xl sm:text-5xl font-light tracking-tight">
          How a paid tool call works.
        </h2>
        <p className="mt-4 text-ink-100 max-w-readable">
          Four moves, the same on every Operator. The wheel handles identity,
          billing, rollback, and audit — you write only the domain code.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-lg border border-ink-400/40 bg-ink-600/50 p-6 backdrop-blur-sm"
            >
              <step.icon className="text-brand-400 mb-4" size={28} />
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-ink-100 text-sm leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
