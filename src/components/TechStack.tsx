// Discreet "built on" strip. Mixes simple-icons CDN logos for the
// projects that have entries (Bitcoin, Lightning, Python) with text
// wordmarks for those that don't (BTCPay Server, Wallet of Satoshi,
// Nostr, FastMCP). Uniform muted gray, opacity lifts on hover.

const SUBTLE = '9CA3AF'; // ink-300 equivalent — kept low-contrast on purpose

type StackItem =
  | { kind: 'icon'; name: string; slug: string; url: string }
  | { kind: 'wordmark'; name: string; label: string; url: string };

// simple-icons slugs verified against cdn.simpleicons.org;
// the rest fall back to a wordmark in matching weight/color.
const stack: StackItem[] = [
  { kind: 'icon', name: 'Bitcoin', slug: 'bitcoin', url: 'https://bitcoin.org' },
  { kind: 'icon', name: 'Lightning', slug: 'lightning', url: 'https://lightning.network' },
  { kind: 'wordmark', name: 'BTCPay Server', label: 'BTCPay Server', url: 'https://btcpayserver.org' },
  { kind: 'wordmark', name: 'Wallet of Satoshi', label: 'Wallet of Satoshi', url: 'https://walletofsatoshi.com' },
  { kind: 'wordmark', name: 'Nostr', label: 'Nostr', url: 'https://nostr.com' },
  { kind: 'icon', name: 'Python', slug: 'python', url: 'https://python.org' },
  { kind: 'wordmark', name: 'FastMCP', label: 'FastMCP', url: 'https://gofastmcp.com' },
];

export default function TechStack() {
  return (
    <section className="border-t border-ink-400/30 bg-ink-800/40">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-xs uppercase tracking-widest text-ink-300 mb-6">
          Built on
        </p>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
          {stack.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              title={item.name}
              aria-label={item.name}
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              {item.kind === 'icon' ? (
                <img
                  src={`https://cdn.simpleicons.org/${item.slug}/${SUBTLE}`}
                  alt={item.name}
                  className="h-6 w-auto"
                  loading="lazy"
                />
              ) : (
                <span className="font-mono text-ink-200 text-sm tracking-tight">
                  {item.label}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
