# BitsNPixs website

Redesign of [bitsnpixs.com](https://www.bitsnpixs.com) as a dark, interactive Next.js
site with its own visual identity: **"Pixels → Stitches"**, one glowing thread that runs
through every page, and a live digitizer that embroiders whatever the visitor types.
The concept, palette, sitemap and fonts are documented in [DESIGN_NOTES.md](./DESIGN_NOTES.md).

- Next.js 16 (App Router) · TypeScript · Tailwind CSS v4
- Framer Motion (reveals, hover, route curtain) · GSAP + ScrollTrigger (pinned story chapters, scroll-inked text)
- Three.js via `@react-three/fiber` + `@react-three/drei` (one lightweight hero element)
- Lenis smooth scrolling, synced to ScrollTrigger

## Getting started

Requires Node 20.19 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run typecheck` | Generates route types, then `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Vitest: content integrity, theme sync, utilities, contact form |
| `npm run verify` | typecheck + lint + test + build. Run before every commit |
| `npm run assets:pull` | Copies the old site's images into `public/images` |
| `npm run map:build` | Regenerates the dotted world map after editing `lib/content/markets.json` |

## Project structure

```
app/                    Routes only. Each page is three lines: metadata + <PageView>
  styles/tokens.css     THEME: every colour, radius, spacing and motion variable
  globals.css           Maps tokens onto Tailwind utilities; shared @utility classes
  fonts/                Self-hosted variable fonts (OFL)
components/
  ui/                   Presentational primitives (Button, Reveal, SiteImage, Marquee ...)
  layout/               Header, Footer, smooth scroll, route curtain, scroll thread
  sections/             Page sections. BlockRenderer maps content blocks to these
  three/                The hero's pixel-to-stitch field
lib/
  content.ts            Single entry point for ALL site content (typed)
  content/              ...split by domain: site, services, portfolio, products.json, pages/*
  stitch/               Stitch simulation behind the live digitizer (pure, tested)
  motion.ts             Framer Motion timings and variants
  hooks/                useGsap, useMagnetic, useRevealPhase, useNow, media/motion profile ...
  quote.ts, time.ts     Quote builder and delivery-clock logic (pure, tested)
  seo.ts, contact.ts, theme.ts, utils.ts
tests/                  Vitest suites
scripts/pull-assets.mjs Image download script
```

### How a page is built

Every page is **data**: a hero plus an ordered list of typed blocks in `lib/content/pages/*`.
`components/sections/PageView.tsx` renders the hero, and `BlockRenderer.tsx` maps each
block (`prose`, `story`, `features`, `portfolio`, `faq` ...) to its section component.

- **Edit copy:** change the text in `lib/content/`. No component changes.
- **Reorder or add sections on a page:** edit that page's `blocks` array.
- **Add a page:** add a `PageContent` entry, add it to `routes` and `pages` in
  `lib/content`, and create `app/<route>/page.tsx` (copy any existing one).
  The sitemap and the link tests pick it up automatically.
- **Add a block type:** add the type in `lib/content/types.ts`, build the section,
  register it in `BlockRenderer.tsx`. TypeScript fails the build until it is registered.

The four service pages are one template: three come from `app/services/[slug]`, and
`/software-development-service` reuses the same `PageView` at its original URL.

## Theming

Change the look in **one file**: `app/styles/tokens.css`.

1. **Brand** variables (`--brand-primary`, `--brand-slate` ...) hold the raw colours.
2. **Derived** variables (washes, glow, gradients) are computed from them with `color-mix()`.
3. **Semantic** variables (`--surface`, `--ink`, `--accent`, `--accent-text` ...) are what
   components use, through Tailwind utilities such as `bg-surface` and `text-accent-text`.

There are two themes, dark and light, switched by the toggle in the header. Sections pick
a surface with `data-surface="dark | tint | light"`, and each surface has a value in both
themes (the table at the top of layer 3 in `tokens.css` shows the mapping). The 3D field
and the digitizer's thread colours read the same variables at runtime.

**Dark and light mode**

- First visit: `DEFAULT_THEME` in `lib/theme.ts` decides. It is `"system"` (follow the
  device setting); set it to `"dark"` or `"light"` to force one.
- The visitor's choice from the toggle is saved in `localStorage` and always wins.
- A tiny script in `<head>` (`themeInitScript`) sets `<html data-theme>` before the page
  paints, so there is no flash of the wrong theme. It is unit tested.
- Where the browser supports view transitions, the new theme spreads out in a circle from
  the toggle; otherwise it switches instantly (and always instantly with reduced motion). Radii, section spacing, container width and the marquee
speed are tokens in the same file. Fonts are set in `lib/fonts.ts`.

`lib/theme.ts` mirrors five brand colours for places that cannot read CSS (the
`theme-color` meta tag, favicon and social image). `tests/theme.test.ts` fails if it
drifts from `tokens.css`, so update both when the brand colour changes.

## Images

Images are listed in `lib/content/image-manifest.json` and resolved by
`lib/content/images.ts`. The source is chosen with `NEXT_PUBLIC_ASSET_SOURCE`
(see `.env.example`):

| Value | Behaviour |
|---|---|
| `remote` (default) | Loads from the live Odoo site, so real images show immediately |
| `local` | Loads from `public/images` after `npm run assets:pull` |
| `none` | Renders `<ImagePlaceholder />` everywhere |

**Before the new site replaces the old one on the domain, run `npm run assets:pull`
and switch to `local`**, otherwise the remote URLs stop working. Any image that is
missing or fails to load falls back to `<ImagePlaceholder />` with the right aspect ratio.

## Contact form

`lib/contact.ts` posts the form as JSON to `NEXT_PUBLIC_CONTACT_ENDPOINT` when set.
Without it, submitting opens the visitor's email app with the message pre-filled to
`info@bitsnpixs.com`. Fields are configured in `lib/content/site.ts`.

## Motion and performance

- Only `transform` and `opacity` are animated.
- Server HTML is always visible: hero entrances are CSS, and scroll reveals only hide
  content that is below the fold once the page is interactive (`useRevealPhase`).
- The Three.js scene is a separate chunk (`next/dynamic`, `ssr: false`). Desktop loads it
  when the browser is idle; phones load it on first interaction. DPR is capped at 1.5,
  rendering pauses off screen, and reduced-motion users never download it.
- Pinned chapters, smooth scrolling and magnetic buttons run only on desktop
  fine-pointer devices without reduced motion; everyone else gets plain lists.
- All GSAP code goes through `useGsap` (`gsap.context()` + `revert()`).

Lighthouse on the production build (images disabled, headless Chrome): desktop
100 / 100 / 100 / 100 on the home page in both themes; mobile performance 90 to 96 on the
pages audited, with accessibility, best practices and SEO at 100 in both themes.
Re-measure with real images on your hosting.

## Responsive checks

Every page (plus the 404) was loaded at 360, 390, 768, 1024 and 1280 px wide and checked
for content wider than the screen and for tap targets under 24 px: none remain. On phones
the header keeps the logo, theme toggle and menu (Get a Quote moves into the menu), and
section spacing, eyebrows, the product gallery and quote cards are tightened.

## Shop and product pages

The shop is frontend-only: there is no cart, checkout or payment. A visitor configures a
product and **sends the order as a quote request**, which goes through the same delivery
as the contact form (`NEXT_PUBLIC_CONTACT_ENDPOINT`, or the visitor's email app).

- **Data:** `lib/content/products.json` holds the products, their prices and the option
  groups (format, size and so on, with any price extras). `lib/content/products.ts` is the
  only file that reads it, so the JSON can later be replaced by an API or CMS response of
  the same shape.
- **Pages:** `/shop` lists the catalog; every product gets `/shop/<slug>` from
  `app/shop/[slug]/page.tsx`, with metadata, a sitemap entry and Product structured data.
- **Add a product:** add an entry to `products.json` (and its image to
  `image-manifest.json`). The shop grid, product page, quote builder and sitemap pick it up.
- **Price:** (base price + extras of the chosen options) x quantity, computed in
  `lib/quote.ts` (tested). Rush turnaround has no published surcharge, so it adds nothing
  to the shown price; the note under the price says rush and bulk are quoted individually.
- **Shared ordering UI:** the product page and `/get-a-quote` use the same hook
  (`useQuoteRequest`) and parts (`components/sections/QuoteParts.tsx`).

## Interactive tools

| Tool | Where | Notes |
|---|---|---|
| Live digitizer | Home hero, `/stitch-lab` | `components/sections/StitchPad.tsx` draws on a canvas; stitch geometry is in `lib/stitch/engine.ts`. It is a visual simulation, and says so on the page. Thread colours are listed in `lib/stitch/threads.ts` |
| Quote builder | `/get-a-quote` | Starts from the same catalog as the shop (`lib/content/products.json`); the brief is sent through `lib/contact.ts` |
| Product configurator | `/shop/<slug>` | Options, quantity and live price, then contact details; sends the order as a quote request |
| Client reviews | Home, About | Each client is an embroidered patch (initials, its own thread colour); choosing one stitches the quote into the hoop. Advances on its own with a progress thread, pauses on hover, keyboard focus or the pause button, never with reduced motion; arrow keys and swipe work. `components/sections/TestimonialShowcase.tsx` |
| Portfolio samples | Home, service pages, `/portfolio` | Each before/after pair is one piece of work being made: the artwork is sewn into the result row by row when the card scrolls into view. An "Artwork / Stitched" switch (or a click or tap on the image) runs it either way, and on devices with a mouse an embroidery hoop follows the pointer and shows the other view through it. With reduced motion nothing plays on its own and the switch changes the view instantly. `components/ui/StitchReveal.tsx`; row order and timing are in `lib/stitch/reveal.ts`; the switch names are `views` on each category in `lib/content/portfolio.ts` |
| Machine and format finder | Home, Embroidery, `/file-formats` | Brand-to-format table is `machineFormats` in `lib/content/shared.ts` |
| Worldwide map and clocks | Home | Markets are in `lib/content/markets.json`; run `npm run map:build` after editing |

## New wording added in version 2 (please review)

The old site has no copy for the new tools, so these lines are new. Everything else is
still taken from the old site.

- **Live digitizer and Stitch Lab:** the input label, the note that it is a simulation
  and that real files are digitized by hand, the Stitch Lab headline and lead, and the
  three stitch-type descriptions (satin, fill, run).
- **Machine and format finder:** "Which machine do you run?", the helper line about DST,
  and the brand-to-format table. The table is general industry reference (Wilcom and
  Embird format lists), not a claim from your site. `T09` is not assigned to a brand.
- **Worldwide:** "Order now, ready by", "Local time" and the time-zone note. One
  representative city is shown for each market you name (New York, Toronto, London, Sydney).
- **Quote builder and product pages:** step names, questions and button labels
  ("Request a Quote", "Send My Quote Request"), the price note about rush and bulk
  orders, and the "File format" choice with an "Other" option. Product names, prices,
  size extras, size guidance, spacing values and "what you get" lists are from your shop.
- **Trust band and audience band:** assembled from figures already on your site
  (since 2011, 4.7/5, 5,000+ clients, free quotes in 2 to 24 hours, free edits within
  30 days). "Embroidery shops", "Apparel decorators" and "Distributors" come from your
  testimonials and vector page.
- **Calls to action:** "Get a Free Quote" replaces "Digitize Your Design" as the primary button.
- **Product page:** "Configure", "Your details", "Choose an option in each group to
  continue", "Sample" in the gallery, and the proof-point row (4.7/5 rating, 130+
  digitizers, 24/7 support: figures from your site). Gallery samples are your portfolio images.
- **Portfolio samples:** the switch names "Artwork" / "Stitched", and "Original" /
  "Vector" for vector samples.
- **Theme toggle:** its label, "Switch to light theme" / "Switch to dark theme".
- **Clients section:** "Client rating" under the 4.7/5 score, and the control labels
  ("Choose a client review", "Previous review", "Next review", "Pause reviews",
  "Play reviews"). Quotes, names and companies are unchanged from your site.

## Missing content and placeholders

Nothing was invented. These items were not available on the old site, or need a decision:

| Item | Current state | To finish |
|---|---|---|
| Vector logo | Typographic wordmark in `components/ui/Logo.tsx` (the old site only has a 230×60 raster) | Replace the component's markup with the SVG |
| Images | Loaded from the live site | `npm run assets:pull`, then `NEXT_PUBLIC_ASSET_SOURCE=local` |
| Social profile URLs | Old-site redirect links (`/website/social/...`) | Put the real profile URLs in `site.social` |
| Contact form delivery | Opens the email app | Set `NEXT_PUBLIC_CONTACT_ENDPOINT` |
| Shop checkout and cart | Replaced: products are ordered as quote requests from their own pages | Add payment later if wanted; the catalog JSON already has the prices |
| Sign-in and blog articles | Link to the existing Odoo site via `LEGACY_BASE` in `lib/content/site.ts` | Point `LEGACY_BASE` at Odoo's new address after the domain switch |
| Blog articles | `/blog` lists the 12 posts and links to the existing articles; bodies and cover images are not migrated | Migrate posts or keep the links |
| Live chat | Not included, but one FAQ answer still mentions it | Embed the chat widget or edit the answer in `lib/content/shared.ts` |
| Google Tag Manager (`GTM-5Z6NRWC`) | Not added | Add with `@next/third-parties` if wanted |
| Team profiles | None on the old site | Not shown |
| Portfolio titles, clients, descriptions | None on the old site | Samples are labelled by category and number |
| Open roles | The old `/jobs` page lists none | Career page invites spontaneous applications |
| Testimonial photos and (About page) companies | None on the old site | Names only |

Content decisions made during the rebuild:

- The header phone number `+1 555-555-5556` was a placeholder and is dropped.
- Coloreel Embroidery lists two different sets of size extras on the old shop: the option
  selector (+$10 / +$20 / +$30 for 8 / 12 / 16 inch) and a table in the description
  (+$12 / +$15 / +$25 for 8 / 10 / 18 inch). The selector values are used. Please confirm.
- The two vector products have no description on the old shop; theirs is taken from the
  vector service page.
- The home stats keep "13+ Years in Business"; body copy that says "10+ years" is kept as written. Pick one figure.
- "One of the biggest paymasters in the country" was removed from the Experienced Team blurb.
- Coloreel FAQ: the question whose answer did not match it was paired with the right
  question, and the store-style returns policy was left out.
- "Why our vector artwork service?" appeared on the embroidery page by mistake and is shown only on the vector page.
- Three home slider images, the footer banner and two small decorative images from the old site are not used.
- Short section labels (for example "Clients", "Offices", "Perks", "Method") were added as eyebrows; some long headings were lightly rephrased.
- Career moved from the header to the footer to make room for Stitch Lab; Sign in is in the footer.

Old URLs that need redirects at launch: `/embroidery-digitizing-portfolio` → `/portfolio`,
`/jobs` → `/career`, the old product URLs (for example `/shop/standard-embroidery-3` →
`/shop/standard-embroidery`), and `/web/login`, `/blog/*` → the Odoo address.

## Fonts

Bricolage Grotesque, Figtree and JetBrains Mono, all under the SIL Open Font License,
self-hosted from `app/fonts` through `next/font/local`.
