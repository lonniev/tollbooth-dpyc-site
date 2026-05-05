import { motion } from 'framer-motion';
import { Wallet, KeyRound, Zap, ScrollText } from 'lucide-react';

const steps = [
  {
    icon: KeyRound,
    title: 'Patron proves npub',
    body: 'Single Nostr-DM challenge — no email, no password, no KYC. Proof is poison-keyed and persists across operator restarts.',
  },
  {
    icon: Wallet,
    title: 'Patron pre-funds a balance',
    body: 'One Lightning invoice for an arbitrary number of satoshis. Funds settle instantly to your operator vault.',
  },
  {
    icon: Zap,
    title: 'Tool calls debit per use',
    body: 'Ad-valorem or flat-rate fares — your pricing model. The wheel handles billing, rollback, and constraint evaluation. You write only domain code.',
  },
  {
    icon: ScrollText,
    title: 'Authority certifies, ledger anchors',
    body: 'Every purchase is Schnorr-signed by an Authority. Ledgers are notarized to Bitcoin via OpenTimestamps — auditable forever.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="border-t border-ink-400/30 bg-ink-700">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <h2 className="text-4xl sm:text-5xl font-light tracking-tight">
          {/* [section headline TBD] */}
          How the toll booth works.
        </h2>
        <p className="mt-4 text-ink-100 max-w-readable">
          {/* [section subhead TBD] */}
          Four moves, same on every operator. The DPYC SDK does the heavy lifting.
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
