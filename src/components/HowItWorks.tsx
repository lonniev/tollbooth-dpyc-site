import { motion } from 'framer-motion';
import {
  KeyRound,
  Wallet,
  Send,
  Layers,
  SlidersHorizontal,
  BadgeCheck,
} from 'lucide-react';

const steps = [
  {
    icon: KeyRound,
    title: 'Identity is a secure npub. Nothing more.',
    body: 'A Nostr public key, plus a signed challenge to prove it. No email, no password, no KYC. The npub is the only thing the Operator ever sees.',
  },
  {
    icon: Wallet,
    title: 'Payment is an out-of-band Lightning invoice.',
    body: 'One Lightning invoice tops up the Patron\'s credit balance. The Tollbooth never sees fiat, never holds a card, never wires money. Sats settle directly between Patron and Operator wallet.',
  },
  {
    icon: Send,
    title: 'Credentials travel by Secure Courier.',
    body: 'API keys, OAuth tokens, account selections — anything sensitive — move between Patron and Operator over Nostr-encrypted DMs. No web forms, no plaintext email, no shared password vault.',
  },
  {
    icon: Layers,
    title: 'The Tollbooth stores no money.',
    body: 'Credit balances are accounting entries against sats already in the Operator\'s wallet. The protocol carries no custody and no settlement risk. The SDK is a ledger, not a payment processor.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Operators set their own tool fees.',
    body: 'Per-tool flat fees, ad valorem rates, surge windows, happy-hour discounts, supply caps — your pricing model, your constraint pipeline. No platform takes a cut from above.',
  },
  {
    icon: BadgeCheck,
    title: 'Authorities earn ad valorem for network support.',
    body: 'A small percentage of every credit purchase flows to the registering Authority — the entity that vouched for the Operator and provides certificate signing, registry maintenance, and dispute resolution. Stake aligned with reliability.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="border-t border-ink-400/30 bg-ink-700">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <h2 className="text-4xl sm:text-5xl font-light tracking-tight">
          Generate Profit from your MCP without KYC
        </h2>
        <p className="mt-4 text-ink-100 max-w-readable">
          Six rules, encoded in the wheel. The same on every Tollbooth —
          you write only the domain code.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
