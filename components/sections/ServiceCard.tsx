import { Icon } from "@/components/ui/Icon";
import { SiteImage } from "@/components/ui/SiteImage";
import { SmartLink } from "@/components/ui/SmartLink";
import type { ServiceSummary } from "@/lib/content";
import { padIndex } from "@/lib/utils";

/** Linked card for one service. The whole card is the click target. */
export function ServiceCard({ service, index }: { service: ServiceSummary; index: number }) {
  return (
    <article className="group/card relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-raised transition-[transform,box-shadow,border-color] duration-500 ease-brand hover:-translate-y-2 hover:border-accent hover:shadow-card">
      {service.image ? (
        <div className="overflow-hidden">
          <SiteImage
            image={service.image}
            ratio={16 / 9}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="rounded-none transition-transform duration-700 ease-brand group-hover/card:scale-105"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-4 p-7">
        <span aria-hidden="true" className="font-mono text-xs tracking-widest text-accent-text">
          {padIndex(index)}
        </span>
        <h3 className="text-2xl font-semibold">
          <SmartLink href={service.path} className="after:absolute after:inset-0">
            {service.name}
          </SmartLink>
        </h3>
        <p className="text-muted">{service.summary}</p>
        <span aria-hidden="true" className="mt-auto inline-flex items-center gap-2 pt-4 font-semibold text-strong">
          Read More
          <Icon name="arrow" size={16} className="transition-transform duration-300 ease-brand group-hover/card:translate-x-1 group-hover/card:-translate-y-1" />
        </span>
      </div>
    </article>
  );
}
