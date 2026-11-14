# Design notes: bitsnpixs.com redesign

Written before the build. Research sources: the live Odoo site (all nav and footer
pages) and its compiled CSS. The reference site xipidsports.com was used only for
high-level spirit (bold type hierarchy, generous whitespace, clear CTAs, purposeful
scroll motion). No layout, section order, component, visual or copy was taken from it.

## 1. Palette (exact values from the old site's CSS)

| Token | Hex | Old-site role |
|---|---|---|
| `--brand-primary` | `#6FAF2B` | `--primary`, accent buttons |
| `--brand-primary-deep` | `#588A22` | nav and text links |
| `--brand-primary-darkest` | `#2E4912` | links on tinted sections |
| `--brand-tint` | `#AEDF7B` | section wash (used at ~17% alpha), links on dark |
| `--brand-lime` | `#D9E89A` | panel backgrounds |
| `--brand-slate` | `#454D50` | `--secondary`, body text, default buttons |
| `--brand-night` | `#2C393E` | dark sections |
| `--brand-ink` | `#212529` | footer |
| `--brand-paper` / `--brand-mist` / `--brand-line` | `#FFFFFF` / `#F8F9FA` / `#E9ECEF` | surfaces and borders |

Rules built on it:

- Primary green is the dominant accent: fills, the thread motif, the 3D field, and
  text on dark surfaces. It is about 2.7:1 on white, so it is never used for small
  text on light surfaces; `--accent-text` (a darkened deep green) is used there.
- The dark "abyss" surface, tinted surfaces, glows and gradients are derived with
  `color-mix()` from the brand values, so one edit re-themes everything.
- The only non-brand colours are the six `--spectrum-*` thread colours, used
  solely in the Coloreel chapter, where "every colour on one thread" is the story.

All of this lives in `app/styles/tokens.css`.

## 2. Sitemap

| Route | Source page | Notes |
|---|---|---|
| `/` | Home | |
| `/about-us` | About Us | |
| `/services/embroidery-digitizing` | Service | shared service template |
| `/services/coloreel-embroidery-digitizing` | Service | shared service template |
| `/services/vector-artwork-conversion` | Service | shared service template |
| `/software-development-service` | Service | same template, old URL kept |
| `/portfolio` | Portfolio | 9 before/after pairs, 3 categories |
| `/career` | Career | "Apply" goes to Contact (the old /jobs page lists no openings) |
| `/contact-us` | Contact Us | 4 locations + form |
| `/blog` | Blogs (footer link) | index of the 12 posts, linking to the existing articles |
| `/shop` | Shop | product grid from `products.json` |
| `/shop/<slug>` | Shop product pages | product details with a configurator; orders are sent as quote requests |
| `/stitch-lab` | new | live digitizer playground |
| `/file-formats` | new | machine and format finder, accepted artwork types |
| `/get-a-quote` | new | three-step quote builder |

Not rebuilt (Odoo functionality, linked out instead): `/shop/cart`, `/web/login`,
individual blog posts, `/jobs`.

## 3. Concept: "Pixels → Stitches" (version 2: dark and interactive)

BitsNPixs turns pixels into stitches, so the site lets visitors **do** that instead of
reading about it. One motif runs through everything: **a single glowing thread.**

The first version was light and layout-led and read as an ordinary agency site. Version 2
is dark-led and built around tools a buyer can play with, informed by what leading
digitizing services worldwide put in front of customers (free quotes, format and
machine support, turnaround promises, proof points) but drawn in its own language.

- **Themes.** Dark ("machine room") and light ("fabric"), switched from the header with a
  circular reveal; first visits follow the device setting. Both palettes come from the
  same brand values, so the identity holds in either.
- **Surfaces.** A dark "machine room" is the default. `tint` is the same surface with
  thread colour bleeding in; `light` is the "fabric" surface, used only for contrast
  (portfolio, testimonials). The whole flip lives in `app/styles/tokens.css`.
- **The thread.** Dashed running-stitch lines: dividers, link underlines, the scroll
  thread, the cursor trail, map arcs, progress lines in pinned chapters.
- **Pixels.** A faint pixel grid behind heroes and placeholders; mono labels like a
  machine readout.
- **Type.** Very large, tight display headlines against small mono eyebrows.

### Interactions (each tied to real content)

| Where | Interaction | Content it carries |
|---|---|---|
| Home hero, Stitch Lab | **Live digitizer**: type a word and it is embroidered stitch by stitch (satin, fill or run; six thread colours; live stitch count) | The core idea of the business |
| Home hero | One Three.js point field: pixels that re-form into stitches on scroll | Background to the headline |
| Everywhere (desktop) | Thread cursor: a stitched trail that reels in when the pointer stops | |
| Home | Services index: oversized rows, preview image follows the cursor | The four services |
| Home | Pinned "how we do it" chapter | The 5 ordering steps |
| Home, Embroidery, File Formats | Machine and format finder: pick a machine brand, matching formats light up | The format list |
| Home | Worldwide: dotted map with stitched arcs, live market clocks, "order now, ready by" in the visitor's time zone | Markets, 24/7 support, 24 h and 2 to 12 h turnaround |
| Get a Quote | Three-step quote builder with a live brief | Products, sizes, embroidery types, published prices |
| Product pages | Configurator: options, quantity and a live price, then the order goes out as a quote request | The shop catalog |
| Portfolio | Category filter with layout animation; sliders sweep open on first view | Before / after pairs |
| Coloreel | Horizontal pinned chapter; the thread shifts through the spectrum | The 8 Coloreel steps |
| Software | Pinned method chapter | The 7 "How do we work" points |
| Embroidery | Placement picker on line-drawn garments | Cap, left chest, jacket back |
| Services | Standard / Rush turnaround toggle | 24 h vs 2 to 12 h |
| Home, About | Client reviews as embroidered patches: pick one and its quote stitches into the hoop; auto-advance with a progress thread; 4.7/5 rating with stars filled to the exact fraction | Testimonials, client rating |
| Cards | Cursor spotlight | |

### Pages added in version 2

`/stitch-lab`, `/file-formats` and `/get-a-quote` are new (the old site has no
equivalent). The header's primary action is now "Get a Quote"; Shop stays one click away.

## 4. Fonts

The old site uses Gilroy (commercial licence). Replacements, all OFL and self-hosted
through `next/font/local`:

- **Display:** Bricolage Grotesque (variable): characterful, tight, confident.
- **Body:** Figtree (variable): the closest free match to Gilroy's geometric warmth.
- **Labels:** JetBrains Mono (variable): eyebrows, step numbers, file formats.

## 5. Architecture decisions

- **Content is data.** `lib/content.ts` (backed by `lib/content/*`) holds every
  string, typed. Pages are described as a hero plus a list of typed blocks, and one
  `BlockRenderer` maps blocks to section components. This keeps pages thin, makes
  the four service pages one template, and is ready for a CMS later.
- **Layers.** `components/ui` (presentational primitives) → `components/sections`
  (compose primitives, receive data via props) → `app/*` (routes only assemble).
- **Motion in one place.** `lib/motion.ts` (Framer variants, timings) and
  `lib/hooks/*` (`useGsap` with `gsap.context()` + `revert()`, `useMagnetic`,
  media/reduced-motion hooks). No section re-implements animation plumbing.
- **Performance.** Only transform/opacity are animated; the Three.js canvas is a
  dynamically imported client chunk (`ssr: false`) that starts when the browser is idle
  (desktop) or on first interaction (phones), caps DPR at 1.5, pauses off screen and is
  replaced by a static pixel grid for reduced-motion users. Server HTML is always
  visible: hero entrances are CSS and scroll reveals only hide below-the-fold content. Pinned
  chapters fall back to plain lists on small screens and with reduced motion.

## 6. Content decisions and gaps

See the "Missing content and placeholders" section of `README.md` for the full list.
Key calls: the placeholder header phone number is dropped; the two testimonial sets
stay on their own pages; mismatched Coloreel FAQ entries are omitted; no team,
case-study names or open roles are invented.
