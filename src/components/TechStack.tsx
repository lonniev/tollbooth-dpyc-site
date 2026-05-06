// Discreet "built on" strip — single muted row of brand logos served
// from the simple-icons CDN at a single muted color. FastMCP doesn't
// have a simple-icons entry; rendered as a text-styled wordmark in
// the same muted weight to keep the row visually consistent.
//
// Each logo links to the project's home. Hover lifts the opacity so
// the strip reads as decorative until the visitor hovers it.

const SUBTLE = '9CA3AF'; // ink-300 equivalent — kept low-contrast on purpose

const stack = [
  { name: 'Bitcoin', slug: 'bitcoin', url: 'https://bitcoin.org' },
  { name: 'Lightning Network', slug: 'lightningnetwork', url: 'https://lightning.network' },
  { name: 'BTCPay Server', slug: 'btcpayserver', url: 'https://btcpayserver.org' },
  { name: 'Wallet of Satoshi', slug: 'walletofsatoshi', url: 'https://walletofsatoshi.com' },
  { name: 'Nostr', slug: 'nostr', url: 'https://nostr.com' },
  { name: 'Python', slug: 'python', url: 'https://python.org' },
];

export default function TechStack() {
  return (
    <section className="border-t border-ink-400/30 bg-ink-800/40">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-xs uppercase tracking-widest text-ink-300 mb-6">
          Built on
        </p>
        <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
          {stack.map((item) => (
            <a
              key={item.slug}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              title={item.name}
              aria-label={item.name}
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              <img
                src={`https://cdn.simpleicons.org/${item.slug}/${SUBTLE}`}
                alt={item.name}
                className="h-6 w-auto"
                loading="lazy"
              />
            </a>
          ))}

          {/* FastMCP — wordmark fallback (no simple-icons entry). */}
          <a
            href="https://gofastmcp.com"
            target="_blank"
            rel="noreferrer"
            title="FastMCP"
            aria-label="FastMCP"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <span className="font-mono text-ink-200 text-sm tracking-tight">
              fastmcp
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
