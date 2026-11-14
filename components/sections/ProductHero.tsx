import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Rise } from "@/components/ui/Rise";
import { SmartLink } from "@/components/ui/SmartLink";
import { catalog, getPortfolioItems, productsLabels, quoteLabels, routes, type Product } from "@/lib/content";
import { formatPrice } from "@/lib/quote";
import { ProductConfigurator } from "./ProductConfigurator";
import { ProductGallery } from "./ProductGallery";

/** Portfolio samples shown after the product shot. */
const GALLERY_SAMPLES = 3;

/** Top of a product page: gallery, summary and the ordering panel. */
export function ProductHero({ product }: { product: Product }) {
  const crumbs = [
    { label: "Home", href: routes.home },
    { label: productsLabels.shopCrumb, href: routes.shop },
  ];
  const gallery = [product.image, ...getPortfolioItems(product.portfolioCategory, GALLERY_SAMPLES).map((item) => item.after)];

  return (
    <section data-surface="dark" className="relative pt-(--header-height)">
      <div aria-hidden="true" className="brand-glow pointer-events-none absolute top-0 left-0 size-[48rem] -translate-x-1/3 -translate-y-1/4 opacity-40" />
      <div className="container-page relative py-10 lg:py-14">
        <Rise>
          <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs tracking-widest text-muted uppercase">
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((crumb) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <SmartLink href={crumb.href} className="link-stitch">
                    {crumb.label}
                  </SmartLink>
                  <span aria-hidden="true">/</span>
                </li>
              ))}
              <li aria-current="page" className="text-accent-text">
                {product.name}
              </li>
            </ol>
          </nav>
        </Rise>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <Rise index={1} className="lg:sticky lg:top-24">
            <ProductGallery images={gallery} label={productsLabels.galleryLabel} sampleLabel={productsLabels.sampleLabel} />
          </Rise>

          <div className="flex flex-col gap-7">
            <div className="flex flex-col items-start gap-4">
              <Rise index={1}>
                <Eyebrow>{product.category}</Eyebrow>
              </Rise>
              <Rise index={2} solid>
                <h1 className="text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.03em]">{product.name}</h1>
              </Rise>
              <Rise index={3}>
                <p className="flex flex-wrap items-baseline gap-3">
                  <span className="text-sm text-muted">{productsLabels.fromLabel}</span>
                  <span className="font-display text-3xl font-semibold text-strong">{formatPrice(product.price, catalog.currency)}</span>
                  {product.compareAt ? (
                    <s className="text-muted">
                      <span className="sr-only">Previously </span>
                      {formatPrice(product.compareAt, catalog.currency)}
                    </s>
                  ) : null}
                </p>
              </Rise>
              <Rise index={3} solid>
                <p className="max-w-xl text-lg text-ink">{product.summary}</p>
              </Rise>
              <Rise index={4}>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink">
                  {[product.tagline, ...productsLabels.highlights].map((highlight) => (
                    <li key={highlight} className="flex items-center gap-2">
                      <Icon name="check" size={15} className="text-accent-text" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </Rise>
            </div>
            <Rise index={5}>
              <ProductConfigurator productSlug={product.slug} labels={quoteLabels} />
            </Rise>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="stitch-x w-full text-accent opacity-40" />
    </section>
  );
}
