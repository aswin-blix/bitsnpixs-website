<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project rules (bitsnpixs-website)

Read `README.md` (structure, theming, how pages are built) and `DESIGN_NOTES.md`
(concept and palette) before changing anything.

- **Content is data.** All copy lives in `lib/content/` and is imported only through
  `@/lib/content`. Never hard-code site copy in a component. Use only content from
  the client's site; do not invent facts, stats or testimonials. Wording added for the
  interactive tools is listed in README ("New wording added in version 2"); keep that
  list current.
- **Layers.** `components/ui` (primitives) → `components/sections` (compose primitives,
  take a content block as props) → `app/*` (routes only render `PageView`).
  New page sections are registered in `components/sections/BlockRenderer.tsx`.
- **Theme by variables.** Colours, radii, spacing and motion tokens live in
  `app/styles/tokens.css`. Components use the semantic utilities (`bg-surface`,
  `text-ink`, `text-accent-text` ...), never raw hex values.
- **Motion.** Animate only transform and opacity. Framer variants and timings come from
  `lib/motion.ts`; GSAP goes through `useGsap`; scroll reveals through `Reveal`.
  Server HTML must stay visible without JavaScript. Respect `useMotionProfile`.
- **Reuse first.** Check `components/ui` and `lib/hooks` before adding anything.
- **Before every commit:** `npm run verify` (typecheck, lint, tests, build), update
  README/DESIGN_NOTES if behaviour or structure changed, and review the full diff.
