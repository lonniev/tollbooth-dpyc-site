declare const __APP_VERSION__: string;

const links = [
  { label: 'tollbooth-dpyc', url: 'https://github.com/lonniev/tollbooth-dpyc' },
  { label: 'dpyc-community', url: 'https://github.com/lonniev/dpyc-community' },
  { label: 'tollbooth-sample', url: 'https://github.com/lonniev/tollbooth-sample' },
  { label: 'dpyc-oracle', url: 'https://dpyc-oracle.fastmcp.app/mcp' },
  { label: 'Pricing Studio', url: 'https://github.com/lonniev/pricing-studio' },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-ink-400/30 bg-ink-800">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-wrap gap-6 text-sm text-ink-200">
          {links.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-300"
            >
              {l.label}
            </a>
          ))}
        </div>
        <p className="mt-6 text-xs text-ink-300">
          Tollbooth DPYC™ · Don't Pester Your Customer™ · Bitcoin Lightning at the
          MCP tool layer · site v{__APP_VERSION__}
        </p>
      </div>
    </footer>
  );
}
