import { Eyebrow } from "@/components/ui/Eyebrow";
import { Rise } from "@/components/ui/Rise";
import { SiteImage } from "@/components/ui/SiteImage";
import { SmartLink } from "@/components/ui/SmartLink";
import { productsLabels, quoteLabels, routes, type Product } from "@/lib/content";
import { ProductConfigurator } from "./ProductConfigurator";

/** Top of a product page: image, summary and the ordering panel. */
export function ProductHero({ product }: { product: Product }) {
  const crumbs = [
    { label: "Home", href: routes.home },
    { label: productsLabels.shopCrumb, href: routes.shop },
  ];

  return (
    <section data-surface="tint" className="relative overflow-hidden pt-(--header-height)">
      <div aria-hidden="true" className="pixel-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)] opacity-60" />
      <div className="container-page relative py-12 lg:py-16">
        <Rise>
          <nav aria-label="Breadcrumb" className="mb-10 font-mono text-xs tracking-widest text-muted uppercase">
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

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Rise index={1} className="relative mx-auto w-full max-w-md lg:sticky lg:top-28 lg:self-start">
            <span aria-hidden="true" className="absolute -inset-3 rounded-card border border-dashed border-accent" />
            <SiteImage image={product.image} sizes="(min-width: 1024px) 34vw, 90vw" eager className="rounded-card" />
          </Rise>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-start gap-5">
              <Rise index={1}>
                <Eyebrow>{product.category}</Eyebrow>
              </Rise>
              <Rise index={2} solid>
                <h1 className="text-[clamp(2.4rem,5vw,4.5rem)] leading-none font-semibold tracking-[-0.03em]">{product.name}</h1>
              </Rise>
              <Rise index={3}>
                <p className="rounded-control border border-line px-4 py-1.5 font-mono text-xs tracking-widest text-accent-text uppercase">
                  {product.tagline}
                </p>
              </Rise>
              <Rise index={4} solid>
                <p className="max-w-2xl text-lg text-ink">{product.summary}</p>
              </Rise>
            </div>
            <Rise index={5}>
              <ProductConfigurator productSlug={product.slug} labels={quoteLabels} />
            </Rise>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="stitch-x w-full text-accent opacity-60" />
    </section>
  );
}
