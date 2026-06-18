declare const __APP_VERSION__: string;

const repos = [
  { label: 'tollbooth-dpyc', url: 'https://github.com/lonniev/tollbooth-dpyc' },
  { label: 'dpyc-community', url: 'https://github.com/lonniev/dpyc-community' },
  { label: 'tollbooth-sample', url: 'https://github.com/lonniev/tollbooth-sample' },
  { label: 'tollbooth-pricing-studio', url: 'https://github.com/lonniev/tollbooth-pricing-studio' },
  { label: 'tollbooth-authority', url: 'https://github.com/lonniev/tollbooth-authority' },
  { label: 'dpyc-oracle', url: 'https://github.com/lonniev/dpyc-oracle' },
  { label: 'cypher-mcp', url: 'https://github.com/lonniev/cypher-mcp' },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-ink-400/30 bg-ink-800">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-200">
          {repos.map((l) => (
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

        <div className="mt-8 space-y-2 text-xs text-ink-300 leading-relaxed">
          <p>
            <strong className="text-ink-100">Tollbooth DPYC™</strong>,{' '}
            <strong className="text-ink-100">DPYC™</strong>, and{' '}
            <strong className="text-ink-100">Don't Pester Your Customer™</strong>{' '}
            are common-law trademarks of Lonnie VanZandt.
          </p>
          <p>
            Open source —{' '}
            <a
              href="https://github.com/lonniev/tollbooth-dpyc/blob/main/LICENSE"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-brand-300"
            >
              Apache-2.0 licensed
            </a>
            .{' '}
            <a
              href="https://patentcenter.uspto.gov/applications/64045999"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-brand-300"
            >
              Patent Pending — U.S. Provisional App. No. 64/045,999
            </a>
            . Site v{__APP_VERSION__}.
          </p>
        </div>
      </div>
    </footer>
  );
}
