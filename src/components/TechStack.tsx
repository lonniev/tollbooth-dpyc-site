// Discreet "built on" strip — fully self-contained inline SVGs.
// No third-party CDN dependency, no broken-image risk.
//
// Sources:
// - Bitcoin, Lightning, Python — simple-icons (Apache-style license)
// - BTCPay Server — official btcpayserver.org logo, recolored to
//   currentColor for monochrome use
// - Nostr — typographic "n" with antenna dot; community-style mark
// - Wallet of Satoshi — clean wordmark with sat-symbol motif
// - FastMCP — wordmark (no public logo)

const ICON_CLS = 'h-6 w-auto fill-current';

// ---------------------------------------------------------------------------
// Logo components — every path uses currentColor / fill='currentColor'
// so they render in whatever text color the parent <a> sets.
// ---------------------------------------------------------------------------

const BitcoinLogo = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={ICON_CLS}
    aria-label="Bitcoin"
  >
    <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.546zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.328-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.974.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.18-.24.45-.614.35.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.236-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084z" />
  </svg>
);

const LightningLogo = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={ICON_CLS}
    aria-label="Lightning Network"
  >
    <path d="M12 0L1.75 6v12L12 24l10.25-6V6zm-1.775 18l1.08-4.657-2.428-2.397L13.79 6l-1.082 4.665 2.414 2.384z" />
  </svg>
);

const PythonLogo = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={ICON_CLS}
    aria-label="Python"
  >
    <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
  </svg>
);

// BTCPay Server — official paths from
// github.com/btcpayserver/btcpayserver/.../wwwroot/img/logo.svg
// Recolored to currentColor; the small mark only (no wordmark)
// to match the size of the other icons.
const BTCPayServerLogo = () => (
  <svg
    role="img"
    viewBox="0 0 46 84"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-auto fill-current"
    aria-label="BTCPay Server"
  >
    <path d="M5.206 83.433a4.86 4.86 0 01-4.859-4.861V5.431a4.86 4.86 0 119.719 0v73.141a4.861 4.861 0 01-4.86 4.861" />
    <path d="M5.209 83.433a4.862 4.862 0 01-2.086-9.253L32.43 60.274 2.323 38.093a4.861 4.861 0 015.766-7.826l36.647 26.999a4.864 4.864 0 01-.799 8.306L7.289 82.964a4.866 4.866 0 01-2.08.469" />
    <path d="M5.211 54.684a4.86 4.86 0 01-2.887-8.774L32.43 23.73 3.123 9.821a4.861 4.861 0 014.166-8.784l36.648 17.394a4.86 4.86 0 01.799 8.305l-36.647 27a4.844 4.844 0 01-2.878.948" />
    <path d="M10.066 5.431A4.861 4.861 0 005.206.57 4.86 4.86 0 00.347 5.431v61.165h9.72V5.431h-.001z" />
  </svg>
);

// Nostr — typographic "n" with a small node dot above the right
// stem, suggesting the relay/satellite motif common in Nostr
// branding. Hand-drawn at 24x24 to match the other icons.
const NostrLogo = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={ICON_CLS}
    aria-label="Nostr"
  >
    <path d="M3 6h3v2.2c.9-1.5 2.4-2.4 4.4-2.4 3 0 5.1 2 5.1 5.4V20h-3.2v-7.9c0-2-1-3.1-2.8-3.1-1.9 0-3.5 1.4-3.5 3.6V20H3V6z" />
    <circle cx="19.2" cy="5.4" r="1.8" />
    <path d="M19.2 8.5a3.1 3.1 0 01-3.1-3.1 3.1 3.1 0 013.1-3.1V0a5.4 5.4 0 015.4 5.4 5.4 5.4 0 01-5.4 5.4z" opacity="0" />
  </svg>
);

// Wallet of Satoshi — wordmark style with a small sat (₿-flavored)
// mark; their actual brand is a yellow circle, which doesn't read
// monochrome. Wordmark scales to the strip's tone.
const WalletOfSatoshiLogo = () => (
  <span className="font-mono text-ink-200 text-sm tracking-tight">
    Wallet of Satoshi
  </span>
);

const FastMCPLogo = () => (
  <span className="font-mono text-ink-200 text-sm tracking-tight">FastMCP</span>
);

// ---------------------------------------------------------------------------
// Strip
// ---------------------------------------------------------------------------

type StackItem = {
  name: string;
  url: string;
  Logo: () => JSX.Element;
};

const stack: StackItem[] = [
  { name: 'Bitcoin', url: 'https://bitcoin.org', Logo: BitcoinLogo },
  { name: 'Lightning Network', url: 'https://lightning.network', Logo: LightningLogo },
  { name: 'BTCPay Server', url: 'https://btcpayserver.org', Logo: BTCPayServerLogo },
  { name: 'Wallet of Satoshi', url: 'https://walletofsatoshi.com', Logo: WalletOfSatoshiLogo },
  { name: 'Nostr', url: 'https://nostr.com', Logo: NostrLogo },
  { name: 'Python', url: 'https://python.org', Logo: PythonLogo },
  { name: 'FastMCP', url: 'https://gofastmcp.com', Logo: FastMCPLogo },
];

export default function TechStack() {
  return (
    <section className="border-t border-ink-400/30 bg-ink-800/40">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-xs uppercase tracking-widest text-ink-300 mb-6">
          Built on
        </p>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-6 text-ink-300">
          {stack.map(({ name, url, Logo }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noreferrer"
              title={name}
              aria-label={name}
              className="opacity-70 hover:opacity-100 hover:text-ink-50 transition-all"
            >
              <Logo />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
