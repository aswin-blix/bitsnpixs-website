import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getServices, type ServicesBlock } from "@/lib/content";
import { ServiceCard } from "./ServiceCard";

export function ServicesSection({ block }: { block: ServicesBlock }) {
  return (
    <Section surface={block.surface}>
      <SectionHeading eyebrow={block.eyebrow} title={block.title} lead={block.lead} />
      <RevealGroup as="ul" className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {getServices(block.serviceIds).map((service, index) => (
          <RevealItem as="li" key={service.id}>
            <ServiceCard service={service} index={index} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
