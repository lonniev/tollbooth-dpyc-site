# Pricing Studio screenshots

Static WebP images served at `/pricing-studio/<file>` and pulled into
the carousel via the manifest at
`src/data/pricing-studio-screens.json`.

## How it works

- **What's shown, in what order, with what captions** → edit
  `src/data/pricing-studio-screens.json`. Component code doesn't change.
- **The actual image bytes** → drop WebPs in this directory matching the
  `src` paths in the manifest.
- The carousel falls back to a "drop a screenshot here" placeholder
  if a referenced file is missing — handy as a checklist while you
  capture.

## Capture + convert recipe

On the iPad: full-screen the Studio, take a screenshot (Top button +
Volume Up, or Home + Lock for older models). AirDrop the PNGs to your
Mac, drop them in this directory, then convert each to WebP:

```bash
cd public/pricing-studio
for f in *.png *.PNG; do
  [ -e "$f" ] || continue
  cwebp -q 85 -quiet "$f" -o "${f%.*}.webp"
done
rm *.png *.PNG  # after confirming the WebPs look right
```

`brew install webp` if `cwebp` isn't on your path.

## Naming convention

Filenames include the build number that produced the screenshots,
e.g. `Studio Network_Topology 1.7.57.webp`. When you re-capture for a
new build, name the new files with the new build number, update the
`build` field in the manifest, and update the `src` paths to match.
The old WebPs can stay or be deleted as you choose.

## Manifest shape

```json
{
  "build": "1.7.57",
  "captured": "2026-05-07",
  "screens": [
    {
      "src": "/pricing-studio/<filename>.webp",
      "alt": "Accessibility description",
      "caption": "Marketing caption visible on screen"
    }
  ]
}
```

`alt` is read by screen readers and shown if the image fails to load.
`caption` appears in the gradient overlay at the bottom of each
frame. Order in the array dictates carousel order.

## Aspect ratio

The iPad mockup expects landscape (`aspect-[4/3]`). Capture in
landscape — the actual orientation Pricing Studio is used in. If you
ever need portrait, flip the class on the carousel container in
`src/components/PricingStudioCarousel.tsx` and adjust the iPad mockup
in `PricingStudio.tsx` to match.
