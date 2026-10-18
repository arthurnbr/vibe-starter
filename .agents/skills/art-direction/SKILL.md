---
name: art-direction
description: Give the app a distinct visual identity tied to its domain in under 5 minutes - palette, typography pairing, signature UI element, tone of voice, empty states - using the offline fonts and shadcn CSS variables already installed. Use right after kickoff, before building screens, and whenever the UI looks like a default gray admin template.
---

# Art direction (≤ 5 minutes, done once, then every screen inherits it)

A default shadcn gray admin says "generated". The reviewer remembers an app that **looks like it belongs to its
domain**. Decide once, encode it in `src/app/globals.css` + `layout.tsx`, then build screens.

## 1. Pick a direction from the domain (write 3 lines in SPEC.md)

- **Mood words** (3): e.g. hiking shop → "terrain, carnet de route, robuste"; bakery → "farine, matin, chaleureux";
  clinic → "calme, précis, rassurant"; logistics → "signalétique, contraste, efficace".
- **Reference object** from the users' world to borrow from: a topo map, a delivery slip, a chalkboard menu,
  a lab label, a train departure board, a field notebook.
- **Signature element**: ONE recurring visual idea derived from that object, used on every page
  (e.g. contour-line divider, ticket-stub cards with perforated edge, chalk-style handwritten numbers,
  status shown as a departure-board flap, stamp-style badges).

## 2. Encode it

- **Fonts** (offline, already installed via `@fontsource-variable/*`, import in `layout.tsx`):
  | family | character |
  |---|---|
  | Bricolage Grotesque | expressive display, friendly, quirky |
  | Fraunces | warm serif with personality, editorial |
  | Space Grotesk | technical, geometric |
  | Instrument Sans | crisp neutral body |
  | Manrope / DM Sans | soft, readable body |
  | JetBrains Mono | numbers, codes, IDs |
  Pair one **display** (headings, big numbers) with one **body**; mono for SKUs/codes/quantities.
  Set `--font-sans`, `--font-heading`, `--font-mono` in `globals.css` `@theme inline`, then use `font-heading` on titles.
- **Palette**: edit the `:root` and `.dark` OKLCH variables in `globals.css` (`--primary`, `--accent`, `--background`,
  `--card`, `--muted`, `--chart-1..5`, `--radius`). Pick a domain hue for primary, a warm or cool tinted background
  (never pure white/gray), one accent for "attention", and chart colors from the same family. Check contrast.
- **Shape & density**: `--radius` (sharp = precise/industrial, round = friendly), borders vs shadows, compact vs airy.
- **Signature element**: build it once as a small component in `src/components/brand/` and reuse it.
- **Logo**: a lucide icon or simple SVG in the brand color + the app name in the display font, in the sidebar header.

## 3. Voice

- Copy speaks the users' language, not the database's: "Ce qui sort ce soir" not "Mouvements de type sortie".
- Empty states and success messages carry personality and the next step ("Rien à préparer. Le prochain retrait est à 17h.").
- Numbers that matter are big, in the display font, with a unit and a comparison.

## Do not

- Ship the untouched default theme. A sober, neutral direction is fine when chosen on purpose (e.g. clinical, legal):
  then the identity comes from typography, density and one signature element.
- Add gradients, glassmorphism or emoji as a substitute for a direction.
- Spend more than 5 minutes: decide, encode, move on. Every later screen uses the tokens, never raw colors.
