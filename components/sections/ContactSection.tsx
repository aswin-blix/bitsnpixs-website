import { Card } from "@/components/ui/Card";
import { Counter } from "@/components/ui/Counter";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SiteImage } from "@/components/ui/SiteImage";
import { SmartLink } from "@/components/ui/SmartLink";
import { site, studios, type ContactBlock } from "@/lib/content";
import { ContactForm } from "./ContactForm";
import { StudioMap } from "./StudioMap";

/** Contact page body: the form, direct contact details and the studio route. */
export function ContactSection({ block }: { block: ContactBlock }) {
  return (
    <>
      <Section surface={block.surface}>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal className="flex flex-col gap-10">
            <div>
              <p className="font-display text-[clamp(3.5rem,8vw,7rem)] leading-none font-semibold tracking-tight text-accent-text">
                <Counter value={block.stat.value} suffix={block.stat.suffix} />
              </p>
              <p className="mt-3 font-mono text-xs tracking-[0.16em] text-muted uppercase">{block.stat.label}</p>
            </div>
            <ul className="flex flex-col gap-4 text-lg">
              <li className="flex items-center gap-3">
                <Icon name="mail" className="shrink-0 text-accent-text" />
                <SmartLink href={`mailto:${site.email}`} className="link-stitch text-strong">
                  {site.email}
                </SmartLink>
              </li>
              {site.phones.map((phone) => (
                <li key={phone.href} className="flex items-center gap-3">
                  <Icon name="phone" className="shrink-0 text-accent-text" />
                  <SmartLink href={phone.href} className="link-stitch text-strong">
                    {phone.display}
                  </SmartLink>
                  <span className="text-sm text-muted">({phone.region})</span>
                </li>
              ))}
            </ul>
            {block.image ? (
              <SiteImage image={block.image} sizes="(min-width: 1024px) 32vw, 90vw" className="rounded-card" />
            ) : null}
          </Reveal>

          <Reveal>
            <Card className="p-7 sm:p-10">
              {block.title ? <h2 className="mb-8 text-3xl font-semibold sm:text-4xl">{block.title}</h2> : null}
              <ContactForm />
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section surface="tint">
        <Reveal className="mb-12 flex flex-col gap-5">
          <Eyebrow>Offices</Eyebrow>
          <h2 className="text-4xl font-semibold sm:text-5xl">Corporate office and design centers</h2>
        </Reveal>
        <Reveal>
          <StudioMap studios={studios} />
        </Reveal>
      </Section>
    </>
  );
}
