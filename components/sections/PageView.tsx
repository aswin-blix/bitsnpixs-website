import type { PageContent } from "@/lib/content";
import { BlockRenderer } from "./BlockRenderer";
import { Hero } from "./Hero";
import { PageHero } from "./PageHero";

/** Renders any page from its content entry: the right hero, then its blocks. */
export function PageView({ page }: { page: PageContent }) {
  return (
    <>
      {page.hero.variant === "immersive" ? <Hero hero={page.hero} /> : <PageHero hero={page.hero} />}
      <BlockRenderer blocks={page.blocks} />
    </>
  );
}
