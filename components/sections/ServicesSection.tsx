import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getServices, type ServicesBlock } from "@/lib/content";
import { ServiceCard } from "./ServiceCard";
import { ServicesIndex } from "./ServicesIndex";

export function ServicesSection({ block }: { block: ServicesBlock }) {
  const services = getServices(block.serviceIds);
  return (
    <Section surface={block.surface}>
      <SectionHeading eyebrow={block.eyebrow} title={block.title} lead={block.lead} />
      {block.layout === "index" ? (
        <Reveal>
          <ServicesIndex services={services} />
        </Reveal>
      ) : (
        <RevealGroup as="ul" className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <RevealItem as="li" key={service.id}>
              <ServiceCard service={service} index={index} />
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </Section>
  );
}
