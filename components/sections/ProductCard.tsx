import { Icon } from "@/components/ui/Icon";
import { SiteImage } from "@/components/ui/SiteImage";
import { SmartLink } from "@/components/ui/SmartLink";
import { catalog, productsLabels, type Product } from "@/lib/content";
import { formatPrice } from "@/lib/quote";

/** Linked product card for the shop grid and "more products" rows. */
export function ProductCard({ product, actionLabel }: { product: Product; actionLabel: string }) {
  return (
    <article
      data-spotlight
      className="spotlight group/card flex h-full flex-col overflow-hidden rounded-card border border-line bg-raised transition-[transform,box-shadow,border-color] duration-500 ease-brand hover:-translate-y-2 hover:border-accent hover:shadow-card"
    >
      <div className="overflow-hidden">
        <SiteImage
          image={product.image}
          ratio={4 / 3}
          sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 92vw"
          className="rounded-none transition-transform duration-700 ease-brand group-hover/card:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-7">
        <span className="font-mono text-xs tracking-widest text-accent-text uppercase">{product.category}</span>
        <h3 className="text-2xl font-semibold">
          <SmartLink href={product.path} className="after:absolute after:inset-0">
            {product.name}
          </SmartLink>
        </h3>
        <p className="mt-auto flex items-baseline gap-3 pt-2">
          <span className="text-sm text-muted">{productsLabels.fromLabel}</span>
          <span className="font-display text-4xl font-semibold tracking-tight text-strong">{formatPrice(product.price, catalog.currency)}</span>
          {product.compareAt ? (
            <s className="text-muted">
              <span className="sr-only">Previously </span>
              {formatPrice(product.compareAt, catalog.currency)}
            </s>
          ) : null}
        </p>
        <span aria-hidden="true" className="inline-flex items-center gap-2 font-semibold text-strong">
          {actionLabel}
          <Icon name="arrow" size={16} className="transition-transform duration-300 ease-brand group-hover/card:translate-x-1 group-hover/card:-translate-y-1" />
        </span>
      </div>
    </article>
  );
}
